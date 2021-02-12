<template>
  <div class="viewer">
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
      <div class="hero-head has-background-light">
        <b-navbar class="navbar" id="navbar-viewer">
          <template slot="brand">
            <b-navbar-item href="http://estructurasarque.com">
              <img
                src="http://estructurasarque.com/wp-content/uploads/2017/11/logo-web-arque.png"
                alt="Lightweight UI components for Vue.js based on Bulma"
              />
            </b-navbar-item>
          </template>
          <template slot="start">
            <b-navbar-item href="/documentation">
              Documentation
            </b-navbar-item>
            <b-navbar-dropdown collapsible label="About Us">
              <b-navbar-item href="/about">The team</b-navbar-item>
              <b-navbar-item
                href="http://estructurasarque.com/arque-spatial-systems/"
              >
                Our Services
              </b-navbar-item>
              <b-navbar-item @click="$router.push({ name: 'About' })">
                Contact Us
              </b-navbar-item>
            </b-navbar-dropdown>
          </template>

          <template slot="end">
            <b-navbar-item tag="div">
              <div class="buttons">
                <a class="button is-info is-outlined" @click="logout">
                  <strong>Sign out</strong>
                </a>
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </div>

      <!-- viewer -->

      <div id="viewer" class="columns is-desktop is-gapless">
        <!-- control panel -->

        <control-panel
          :params-tabs="paramsTabs"
          :shapediver="shapediver"
          @param-changed="onParamChanged"
          @topology-ready="onTopologyReady"
          :topologies="topologies"
          :window-size="windowSize"
        />

        <!-- shapediver-viewer -->

        <shapediver-viewer
          @details-ready="onDetailsReady"
          :params-tabs="paramsTabs"
          @shapediver-ready="onShapediverReady"
          :window-size="windowSize"
          :current-topology="currentTopology"
          :topologies="topologies"
        />

        <!-- model downloads -->

        <downloads-panel
          v-if="windowSize.isDesktop"
          :shapediver="shapediver"
          :window-size="windowSize"
          :currentTopology="currentTopology"
          :details="details"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ControlPanel from "../components/ControlPanel.vue";
import DownloadsPanel from "../components/DownloadsPanel.vue";
import ShapediverViewer from "../components/ShapediverViewer.vue";

export default {
  name: "Viewer",
  props: ["windowSize", "isAuthenticated"],
  components: {
    ControlPanel,
    ShapediverViewer,
    DownloadsPanel
  },
  data() {
    return {
      paramsTabs: [
        {
          name: "Frame",
          icon: "draw-polygon",
          names: [
            "Cantilever",
            "Positive Height",
            "Negative Height",
            "Tubes Diameter (mm)",
            "Tubes Thickness (mm)"
          ],
          params: []
        },
        {
          name: "Customize",
          icon: "ruler",
          names: [
            "Width (m)  (X)",
            "Length (m)   (Y)",
            "System Height (m)",
            "Arch Height (m)",
            "Pich Height (m)",
            "Minimum Radius (m)"
          ],
          params: []
        },
        {
          name: "Subdivisions",
          icon: "border-all",
          names: [
            "N⍛ Divisions  (X)",
            "N⍛ Divisions  (Y)",
            "Axis Count",
            "N⍛ Divisions",
            "Threshold"
          ],
          params: []
        },
        {
          name: "Columns",
          icon: "grip-lines-vertical",
          names: [
            "N⍛ Columns (X)",
            "N⍛ Columns (Y)",
            "Intermediate Columns",
            "Columns Diameter (mm)",
            "Columns Thickness (mm)",
            "Interior Columns",
            "N⍛ Columns",
            "N⍛ Intermediate Columns"
          ],
          params: []
        }
      ],
      shapediver: null,
      details: [],
      geometryReady: false,
      showRight: true,
      showLeft: true,
      isLoading: true,
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
            "22572ea61710ec728bfa3501c0f677911f379317103074c57998495eaca3c1a7034d12c9e47255fa97cfbdf469f79b7e4558f797d4f90a3602e082e271d2155a55a912e0999c769d7b1d864858934ab12b0490504c6a95242cebbacea3d27c765816d53e4982f307d208e92e5f95f766c572b2129ca7-cf75af7365fcd996aef3db010da65c5f",
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
            "674c96267e7abfc9ad56d2eaed1de3e5040486649a65850b0d5b094ab1f33e45dbb7527877c5fda41adf9b9dfdc83f35e43b7fc852ef188f598f778ba78dbd58ad8f4f81dbeb811eefba6b165c442433fadc80dcce1c4f6f7b63800de38f053a1e824f5c6a8291cfd8fb614fc53a5b6333439d253f4d-bbb6c0f4d591df5bf2e77161f424bd06",
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
            "3422a552bddaad005dbe773ddaef0efefca0881f3b1d70db27e3103bb7f336aa62839005315e2aeb8dbf5f5f4bcab44529982a6e35a7af1a78f5d51c13d2c1dd75ea819ed569403b8eee7fa2ff1447adc86e3184c9bf4f1ce4404512a6694fa187b128482804e3079ce784e4dea80182e757bb1cbb7c-38e7ecc6f4bd38bd7147da84e21e801b",
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
            "d96bfde054293d49d4266a9313e62dc971525fd5a962800c35c8c9d7122483f1b21dd3267802e2b1446eaa40f9fe277d797acc75b03b826d4dbcea6e1fa33c94016f0f83a3271c6461e2d9820fdc755fb94f2b1f19381b51970d1b54295e45f9c81f7f75a4cc8b6e0e30ea57792eaa3670e0496cc067-e60364391a0c2eb405acb24c580b2199",
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
            "d6f1065553dc495611ad53e43d30cfa23bb32af84bcc433e3ac31ec993ee98a18cef1fdc4e3b0b260a8c3fe445f7c768d8b4d17ff14a60c3d3be55b3dccdb273748d66a0c110e98c05af7c465a5b22c695542291f5cbbc4ce123645a016c3103740ec26ce205bea62c43b0ca753fca9b74efe63e8ad5-092b3c8c0d6431811184f2dcbe10fbd1",
          icon: ""
        }
      ]
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      // Navigate back to home
      this.$router.push({ path: "/" });
    },
    onShapediverReady(value) {
      this.shapediver = value;
      if (this.shapediver != null) {
        this.isLoading = false;
      }
    },
    onDetailsReady(value) {
      this.details = value;
    },
    onTopologyReady(value) {
      value.loaded = true;
      this.currentTopology = value;
    },

    onParamsTabsReady(value) {
      this.paramsTabs = value;
    },
    onParamChanged(param) {
      this.shapediver.parameters.updateAsync({
        name: param.name,
        id: param.id,
        value: param.value,
        plugin: param.plugin
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// .has-max-mobile {
//   height: 500px;
// }
#viewer {
  width: 100%;
  margin: 0;
  overflow: hidden;
  height: calc(100vh - 53px) !important;
}

.hero-head {
  z-index: 100;
  height: 53px !important;
}
#navbar-viewer {
  z-index: 100;
  height: 53px !important;
  -webkit-box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.3);
}
</style>
