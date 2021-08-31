<template>
  <div v-if="authenticated" class="viewer">
    <section class="hero is-fullheight is-bold">
      <!-- Hero head: will stick at the top -->
      <b-loading
        :is-full-page="true"
        :active="isLoading"
        :can-cancel="false"
        class="viewer-loading"
      >
      </b-loading>
      <!-- navbar -->
      <div class="hero-head has-background-light" id="navbar-viewer">
        <navbar :authenticated="authenticated" />
      </div>

      <!-- viewer -->

      <div id="viewer" class="columns is-desktop is-gapless">
        <!-- control panel -->
        <control-panel
          :shapediver="shapediver"
          :params-tabs="paramsTabs"
          @param-changed="onParamChanged"
          @topology-changed="onTopologyChanged"
          :topologies="topologies"
          :window-size="windowSize"
        />

        <!-- shapediver-viewer -->

        <shapediver-viewer
          @shapediver-ready="onShapediverReady"
          @params-tabs-ready="onParamsTabsReady"
          :params-tabs="paramsTabs"
          :current-topology="currentTopology"
          :window-size="windowSize"
          :topologies="topologies"
          :download-format-index="downloadFormatIndex"
          :download-requested="downloadRequested"
          :exports.sync="exportsSets"
          :download.sync="downloadValid"
          :download-triggered="downloadTriggered"
        />

        <!-- model downloads -->
        <downloads-panel
          :claims="claims"
          :shapediver="shapediver"
          :params-tabs="paramsTabs"
          :details="details"
          :downloads-tab="paramsTabs[downloadsParamsIndex].params[0]"
          :window-size="windowSize"
          :current-topology="currentTopology"
          :index.sync="downloadFormatIndex"
          @requested-ready="onRequestingReady"
          :exports-sets="exportsSets"
          :download-valid="downloadValid"
          @activation-ready="onDownloadingReady"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ControlPanel from "@/components/ControlPanel.vue";
import DownloadsPanel from "@/components/DownloadsPanel.vue";
import ShapediverViewer from "@/components/ShapediverViewer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Viewer",
  props: ["windowSize", "authenticated", "claims"],
  components: {
    ControlPanel,
    ShapediverViewer,
    DownloadsPanel,
    Navbar
  },
  data() {
    return {
      paramsTabsReady: false,
      paramsTabs: [
        {
          name: "Frame",
          icon: "draw-polygon",
          index: 0,
          names: [
            "Cantilever",
            "Positive Height",
            "Negative Height",
            "Width (m)  (X)",
            "Length (m)   (Y)",
            "System Height (m)",
            "Arch Height (m)",
            "Pich Height (m)",
            "Cone Height (m)",
            "Minimum Radius (m)",
            "Tubes Diameter (mm)",
            "Tubes Thickness (mm)"
          ],
          params: [],
          displayed: true
        },
        {
          name: "Subdivisions",
          icon: "border-all",
          index: 1,
          names: [
            "N⍛ Divisions  (X)",
            "N⍛ Divisions  (Y)",
            "Axis Count",
            "N⍛ Divisions",
            "Threshold"
          ],
          params: [],
          displayed: true
        },
        {
          name: "Columns",
          icon: "grip-lines-vertical",
          index: 2,
          names: [
            "N⍛ Columns (X)",
            "N⍛ Columns (Y)",
            "Intermediate Columns",
            "Columns Diameter (mm)",
            "Columns Thickness (mm)",
            "Columns Height (m)",
            "Interior Columns",
            "N⍛ Columns",
            "N⍛ Intermediate Columns"
          ],
          params: [],
          displayed: true
        },
        {
          name: "Downloads",
          icon: "cloud-download-alt",
          index: 3,
          names: ["Export Type"],
          params: [],
          displayed: false
        },
        {
          name: "User Info",
          icon: "user-circle",
          index: 4,
          names: [
            "name",
            "preferred_username",
            "organization",
            "locale",
            "mobile",
            "email",
            "message"
          ],
          params: [],
          displayed: false
        },
        {
          name: "Rulers",
          icon: "ruler",
          index: 5,
          names: ["Rulers", "Rulers Offset (m)", "Rulers Size (m)"],
          params: [],
          displayed: true
        }
      ],
      param: {},
      downloadsParamsIndex: 0,
      userParamsIndex: 0,
      shapediver: null,
      geometryReady: false,
      showRight: true,
      showLeft: true,
      isLoading: true,
      exportsSets: [],
      currentTopology: {
        name: "undefined",
        loaded: false,
        id: null,
        assets: [],
        paths: [],
        params: [],
        details: [],
        index: null,
        ticket: null,
        icon: null
      },
      topologies: [
        {
          name: "Rectangular",
          loaded: false,
          id: "CommPlugin_0",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 0,
          ticket:
            "a9acf698f69a7ef68d5f903847ec83ffe022b36885ded0f14d16937a2df10afeb24cf66fe8c8051b31bf0a6133204d6273ef5848c2323f0211be5bc7de617b2dbe64c9c8e8b0cab0534a67f510abbed3b48a5b1658adf4ad70d404aa8f5762e4980c657d570ac7459b6aa697ae4fd45f12ef456fb494d62022fec7f67e6f8d38-3e0475ddc737e2d064e5f800252ae097",
          icon: ""
        },
        {
          name: "Arch",
          loaded: false,
          id: "CommPlugin_1",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 1,
          ticket:
            "90421d6e6a87b5c1dde3c70f163dfbc33309f5c9d22ea6608795e1f3bd5f9888b1fdb59256a2be567b859d83ad043545a7011d9dd2c01fb83bab19fc295920d3e3fbb7f5aa956498f9c8b93161fe3edb8cb9c68f8e357daa0f7c71989f0221352ca5b547a82b08c7dcacb82ed586eb761d14f58cf7f1dadff8e68ade789403e4-5eec9a9d339dadbc84036ba295a287f4",
          icon: ""
        },
        {
          name: "Monopich",
          loaded: false,
          id: "CommPlugin_2",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 2,
          ticket:
            "c1c80fc928a1edc48588fc93d5efda9e74c5487566cd0bd47bfcccbbc2f4f16e924d6d7399c70fa24766ddd2d29584752d88ac67fae98a2ce92fc3e467f6d3c34e34d91bbc1a2f998634cd9e0535a669c882200679c42191479592c7d6eac25b468098886f9558d7712f9f53f501d7cb306c37c1a28b76e13cdaae4fee999230-ee583295f69a2b82258fa489e90d16c9",
          icon: ""
        },
        {
          name: "Duopich",
          loaded: false,
          id: "CommPlugin_3",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 3,
          ticket:
            "aee093647f0203226097f1cc7506b46e33774b56de36cc25d0ba1c04f9f50e45d88fdfce6816aac41d6f5e45168559d423b8faede9a6a85f9fa0d9edc5c0936fa8dd49b6defa5b92f140ba53ce89b2e1076f83dc9a92539d5114ea6c8d8fff51fb3f2f4a99b697283d0d3b3d75888a8ee776a7d967a5b9c6e8a617317f467217-c797c52006929835649a3599d80223af",
          icon: ""
        },
        {
          name: "Conical",
          loaded: false,
          id: "CommPlugin_4",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 4,
          ticket:
            "2abf290b4bd99f77d586ac643c73677b35bed6c7477e7c89ffb85a864ff8bbda3028b3184022855e707364a87cd3a71499f41a4327899bbd9b3e90c90c9b09856770de13e2a14fca3965ff86123c9fbcb236b9d5f9340bf653041a93fbe6053bf2fa53a3051798cf052b16c93873274bb1ce716f940c7da36079b1828998ba1a-31ce16c3756f511a3d9f69ccb0bebba0",
          icon: ""
        }
      ],
      details: [],
      downloadFormatIndex: 0,
      downloadRequested: false,
      downloadValid: false,
      downloadTriggered: false
    };
  },
  watch: {
    downloadValid: function(newTrigger, oldTrigger) {
      if (newTrigger != oldTrigger && newTrigger == true) {
        this.getUserDetails();
      }
    }
  },
  created() {
    this.getDownloadsParamsIndex();
    this.getUserParamsIndex();
  },
  methods: {
    getDownloadsParamsIndex() {
      var downloads = this.paramsTabs.filter(
        element => element.name == "Downloads"
      );
      this.downloadsParamsIndex = downloads[0].index;
    },

    getUserParamsIndex() {
      var userIndex = this.paramsTabs.filter(
        element => element.name == "User Info"
      );
      this.userParamsIndex = userIndex[0].index;
    },
    onShapediverReady(value) {
      this.shapediver = value;
      if (this.shapediver != null) {
        this.isLoading = false;
      }
    },

    onTopologyChanged(value) {
      value.loaded = true;
      this.currentTopology = value;
    },
    onRequestingReady(value) {
      this.downloadRequested = value;
    },
    onDownloadingReady(value) {
      this.downloadTriggered = value;
    },
    async getPluginDetails() {
      var allDetails = await this.shapediver.scene.getData(
        {},
        this.currentTopology.id
      ).data;
      // filter details by model id
      this.details = allDetails.filter(detail => {
        return detail.plugin == this.currentTopology.id;
      });
    },

    onParamsTabsReady(value) {
      this.paramsTabsReady = value;
    },

    async onParamChanged(param) {
      this.param = param; // console.log("param changed");
      await this.shapediver.parameters.updateAsync({
        name: param.name,
        id: param.id,
        value: param.value,
        plugin: param.plugin
      });
      await this.getPluginDetails();
    },

    // async onFormatChanged(index) {
    //   console.log(index);
    //   await this.shapediver.parameters.updateAsync({
    //     name: this.paramsTabs[this.downloadsParamsIndex].name,
    //     id: this.paramsTabs[this.downloadsParamsIndex].id,
    //     plugin: this.paramsTabs[this.downloadsParamsIndex].plugin,
    //     value: index
    //   });
    // },

    getUserDetails() {
      var claims = this.claims;
      var params = this.paramsTabs[this.userParamsIndex].params;

      // console.log("user claims", claims);
      // console.log("user params", params);
      for (const [, value] of Object.entries(claims)) {
        var claim = value["claim"];
        // eslint-disable-next-line no-unused-vars
        var input = value["value"];

        // console.log(key, "claim:", claim, "value:", input);
        // eslint-disable-next-line no-unused-vars
        for (const [k, v] of Object.entries(params)) {
          if (v.name == "mobile") {
            v.name = "phone_number";
          } else if (v.name === claim) {
            v.value = input;
            // console.log("found", v.name, claim, "input", input);
            // console.log(`${k}: name: ${v.name} value: ${v.value}`);
            // console.log(`${key}: ${value}`);
            // console.log(`${k}: name: ${v.name} type: ${v.type}`);

            this.shapediver.parameters.updateAsync({
              name: v.name,
              value: v.value,
              plugin: this.currentTopology.id
            });
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#viewer {
  z-index: 0;
  width: 100%;
  margin: 0;
  overflow: hidden;
  height: calc(100vh - 53px) !important;
}

.hero-head {
  z-index: 1000;
  height: 53px !important;
}

#navbar-viewer {
  -webkit-box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.3);
}
</style>
