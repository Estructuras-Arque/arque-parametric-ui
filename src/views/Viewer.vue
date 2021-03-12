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
        <control-panel-dev
          :params="params"
          :shapediver="shapediver"
          @param-changed="onParamChanged"
          @topology-changed="onTopologyChanged"
          :params-tabs="paramsTabs"
          :topologies="topologies"
          :window-size="windowSize"
        />

        <!-- shapediver-viewer -->

        <shapediver-viewer
          @shapediver-ready="onShapediverReady"
          @params-ready="onParamsReady"
          :param="param"
          @params-tabs-ready="onParamsTabsReady"
          :current-topology="currentTopology"
          :params-tabs="paramsTabs"
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
// import ControlPanel from "@/components/ControlPanel.vue";
import DownloadsPanel from "@/components/DownloadsPanel.vue";
import ShapediverViewer from "@/components/ShapediverViewer.vue";
import Navbar from "@/components/Navbar.vue";
import ControlPanelDev from "../components/ControlPanelDev.vue";

export default {
  name: "Viewer",
  props: ["windowSize", "authenticated", "claims"],
  components: {
    // ControlPanel,
    ShapediverViewer,
    DownloadsPanel,
    Navbar,
    ControlPanelDev
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
        }
      ],
      param: {},
      params: [],
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
            "674a0ee0ceaa34f6020e25592c27bfecc9d82654e8f94eeeeeabfb548dfde373c8585ef4d59405a9460c7c0eef69ada7f144324169fe4ee6eedb677c20996ab7b0d7c319324ba34828875b6d13fcfd5bb5c0d663dc78ef0b6ed54b6ee4a51b2e4ec40f6cb1307bae38cedf55a92d879c7a4e37aa07e9-bc1ca0d2e4cb4faa7b065c48c7dccfec",
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
            "4b4e99fdee7c573bbbda41eb34f40f6a0d945b9b112c6e302cd7d3e23b61af5d41678a6ed467a01d304a57715e21128eb15831e08c7adab8e6e5e81e89e02706f00b524b9c88e5101e1d15f7ae09f73b2b1d81a588e0a0810f18a5785dda2f67543fb2fa7bb3574eb17241bd6e9b1b78cb08730f57c7-3f253540f3cef9a88dd917bda88a3c77",
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
            "184767f387cf3a698e216dbe0ec41947731d2257ac98d53a24c9f028c7e025fd426912313cbc0b44e589f4e0431e910314265ccf51a582793f127dd33ffbad3b33de1e615148d6919a791133e9a0e25b3631a58a7061e7673656523f54ad780e02ca412757191407dad66f6a74854b35b9f72fc46063-e62e031cb2ae90dc781add9bf5c23188",
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
            "c1a9cb3f70d698081db55796ad9572fbe3117d868aa6f8fadc3a9ba66149eb7101e62615045ec87db961d25ff02657b6598150eba6ea4489230fab70bcf0d8099407e27e778b4e860aa7f1d69d18412120a9b86a63d3f25ee66215fc57dbdec052ff792b254ecd47c68b97e72520ad9f6570df5fa9b6-6b6efb564dc948033a238018700ad462",
          icon: ""
        },
        {
          name: "Circular",
          loaded: false,
          id: "CommPlugin_4",
          assets: [],
          paths: [],
          params: [],
          details: [],
          index: 4,
          ticket:
            "1d689b865b2e266c8a1035649bb7c9714a57fd61a70903b2b0ab0fefd5dc7ffe98d15f2a85dd4e38d466e51d0a0297b3de94ac910246aadcb31b07ed82091bda5be8dc515d7912e9a27c1c4f922b32cf8a20a8823e83ebf3356e89b0f31b8a93ec1cf154f50ad5e756916765749ef4687b2f75543c3e-d54abe92e68eba42629cd36ec295d8f7",
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
    onParamsReady(params) {
      this.params = params;
    },
    onParamsTabsReady(value) {
      this.paramsTabsReady = value;
    },

    async onParamChanged(param) {
      this.param = param; // console.log("param changed");
      // await this.shapediver.parameters.updateAsync({
      //   name: param.name,
      //   id: param.id,
      //   value: param.value,
      //   plugin: param.plugin
      // });
      // await this.getPluginDetails();
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
