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
            "ded946bf07a0eb39194b08920c6022de6bc5c400a8467afaef0af1bf020d36570042dac7700c2667c9c30b491d004942f9ab4fbc6857a5de7e04ef0710054fb0ee4b99ee721e32d0c7694c0db1681d424da01b8526ae867b92393cbb8786adaa57e897f45223c9a034c48e6a489dda908f37dba6da1c-b187ace67d65248343379cd7b7b49cf6",
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
            "6b556e465e2a6aaceaa0f7131514741ae36de2ebe3b7d14a17051dd3877535d514a0af385599d13093b5d959974d81973594765500a7de6d4c5ab109b40edb899dd633238343fd49631e2c3b609b8ee1d36e922d0f430aead7f57f9067a86dee2bb22e361eebb6157365bbdc182bcc12848a777d7225-3580c76986e5ad8ebf1c89a1bcfb6941",
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
            "4ca80ea4c76e57857c889376beaa9b1ea3cce3b89672fc24487dae9958451313dc197160cc00a67fbb4d5d7f2061d10c6c6719ccf3a00c95ad48d0f7e1af94db0efb82b1355ec80e026666e67515854bd660f541f34fe4a7cbc962af148bec29bc10f1618abcd1c7e3a63accbc5eb75cd035efa3dc67-2ad76be9c05950c2a657ff5aa7aa23a9",
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
            "07579c6323ce66f42bacb2848d6687025861cb82385a035067177977ba09149ff2bcc71c7f826222bd7fffc9b0878e639d4a88d790e44c710010b0cfeab3623c61acf062a6bc3ce651417758165b2834267b8e1832ee9bd5240225206cb9463fcd898970fca9f76b88d80e057db2d4f465cb377d1c2f-0b7f8a2a94e37dfa1ab51a9491f823ad",
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
            "0ef61f1d239ed02a75d7f1d33e453900e115b986dfe93f613a8b77fc9ba1d6c0a8c237d90e8cbe8cba76b1bcf5ffcc1ea643f35124e1165ddc186cf2d3d82fe3703e6ceef48250e9d4c5aabf9647823dbd7581f80c199c7cc16f25b07b6c002eef3772b543fff75cf30adf36daf1009cfba6fb27bfc5-4937f5e780b9ce51b9b31f95c87dbffe",
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
