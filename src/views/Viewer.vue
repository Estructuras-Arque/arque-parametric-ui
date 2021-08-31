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
            "5d2c8c20df4c0daf19ec81be342d533b3b432622b790ef0484bf836afc07d75f97e20488595b7bb3b82273ca86cea11a689fc01732b0eee88a6c25e5a62f6aaaf752c5bf432361005cad141a1bf1992f86be2c9fd77e88a9600b17e70dccfafcf23bbc98f77c6fd61b7ac597d0662d0db6225ae48b844bd55bf58e1b93699b33-155c7464b169c40b437c485d6ca98f76",
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
            "c0f37b234bbc0e479381d4850a151435ada16f9465ecbd8f4faf5b14cfe221691d5aa6970a8cfd295758474ccd0dce5f744a52caa1dde784f28bbcf923d8ac6fe3cbf76d2358296ae227f1423f6dcac72ca8d61cf24daa5a4583a7fd7452825f3185a31b2ef9351bbed0e665f9fb6cecc3c8aa9b4be6a005a908299f478efb2d-dadcc29276420df45e4c5984b51ed321",
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
            "e63438140846df27317fe4528c9795561d7b7e0ccb1032f4cc6a9c0365658cce79c0672de0daf6ddc5f8dbeeb49b17b8d00712d21bd997914f57626939965ddb918f0dc449946194e0eae259451a75a81883b72d743eee3b0986503654fba54de618dc90e6a79bc62f237c1e8fab6b58f684f86b47289642ab84f1b67db3d854-887a748eaf571eb8f8736239180bc790",
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
            "ce9db4b620fe60d8f8061a7a29ae8b9b23227aceb45ce7de8a500fee75a424c04521903aa415dc312cee0619d9ecee70b52969b5d8a84455b83d5e50b55e9c67fccead1d8bda2ad79227cae09502c02e6e96c6279bb82d9836750cda76543b75b49f45f6d9c9862414aaaee0afca154f9de82925cf4e42a4a273755d50b9d039-edd4f325c17e819e7a04ccc9b90092aa",
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
            "91fb52ffcccee01812c482c72a92f8b010bbb5555d8300b38d06332ebca079893d52c75c6f6d2a287b725489860b86b259149ba05a2184c69272775500cbd43fdef2781182f5ca17603a7777098b6719b38538ac07b4cbff4e0fb7bf97581eb5b0bfa0f52fe85e722df3069fe26f4f49d2d2960534f01a70dcb3115d72b6301e-0a4ab0e1426fc283d369b81e75b33166",
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
