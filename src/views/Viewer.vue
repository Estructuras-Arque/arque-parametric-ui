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
            "959eb26ead8006c698761856c270bbdc6bf91bc14eca686d349de757c994bd468a48e10a2f2082e38ffb3ad4d7e0b1ef2263a982c748a83c7dabb9ed679c7d88e13da55633de140aaa943289e705f6acea19e762af80fe8253b7dc1ee89e8eee8b852166c70fc56bac5bd91560ef4c9c6f556d005f5e-eb85cd636b075f38075ca5e65d706794",
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
            "fdd110c40a39a8bcb8f18e911e4233f954cd78f9797ddd58daa3ba2a5c097ff2a1d6b980fc24bd4de6d15d6509073948edcf97bc741d6b10a39d4003161c0bceec994b08a8580601a8c4b7c83124c4cb37b87336155f086c9044c4f8d3f5ace1901638cfbaf407eb94d479942719f8efc3d1b0bd9642-f0693bb4b4128165877051d171e81b37",
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
            "e8117709c0c5d6573ea4485f0c22da84f932eae92414d629c83b0a7ab107d8dc29dff18ada5f6e83a513ac0e9ce688c6a48bf5702feb6cc7bf228aac4f09b218464a258f115b3fd3f146426168982a96bdf7db590affeb570fff71833d349d483cc3b0b7473ec20b9fa7542d3ef2f65450fcd7bcd38f-2372bd240d9c73996655abf58c8a0be2",
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
            "9d75f27c5b4bde1e901ed967a696d6a19744102b1b7b0956c536872f18b41707d8d21a7bd2f9f4af24bdc37bf50c34fed25c6524a823169955d3daa4a8598b0062a3e9bfef0609eaf5421b84c8f54e51ccdc8d4d44e90aa4869fae864458c471da635fd9cae4880a76051369885b226ef3106ebfb31b-f549cf6d7d9beb0a603b768b2fc60d6b",
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
            "921a4bd269392faf44564e90d51d73ed88c5993a5a9350bba99723b2d53ad40f4cd655c14fb74260b619216f1ea9a0c93244798f5b66423363356f43d4720176ec761630de411a176e1efa5af6612e2c9289bbdb2f801b50a7b7d46cc8937111f773309e5ab2bdd2ffb5a086d8c97747fe8189ccaa94-3890c4f27dbf9f3193bf13b384c6d9fc",
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
