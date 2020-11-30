<template>
  <div class="viewport-container">
    <div
      class="has-background-light"
      id="sdv-container"
      style="width:100%;height:500px;"
    ></div>
    <div v-for="topology in topologies" :key="topology.index">
      <input
        type="checkbox"
        :id="topology.id"
        @click="togglePlugin"
        :disabled="!shapediverReady"
      />
      <label
        :class="shapediverReady ? 'has-text-success' : 'has-text-grey'"
        for="plugin1"
        >{{ topology.name }}</label
      ><br />
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      shapediverReady: false,
      geometryLoaded: {},
      shapediver: null,
      topologies: [
        {
          name: "Rectangular",
          loaded: false,
          id: "CommPlugin_0",
          index: 0,
          ticket:
            "22572ea61710ec728bfa3501c0f677911f379317103074c57998495eaca3c1a7034d12c9e47255fa97cfbdf469f79b7e4558f797d4f90a3602e082e271d2155a55a912e0999c769d7b1d864858934ab12b0490504c6a95242cebbacea3d27c765816d53e4982f307d208e92e5f95f766c572b2129ca7-cf75af7365fcd996aef3db010da65c5f",
          icon: "globe"
        },
        {
          name: "Arch",
          loaded: false,
          id: "CommPlugin_1",

          index: 1,
          ticket:
            "674c96267e7abfc9ad56d2eaed1de3e5040486649a65850b0d5b094ab1f33e45dbb7527877c5fda41adf9b9dfdc83f35e43b7fc852ef188f598f778ba78dbd58ad8f4f81dbeb811eefba6b165c442433fadc80dcce1c4f6f7b63800de38f053a1e824f5c6a8291cfd8fb614fc53a5b6333439d253f4d-bbb6c0f4d591df5bf2e77161f424bd06",
          icon: "phone"
        },
        {
          name: "Monopich",
          loaded: false,
          id: "CommPlugin_2",

          index: 2,
          ticket:
            "3422a552bddaad005dbe773ddaef0efefca0881f3b1d70db27e3103bb7f336aa62839005315e2aeb8dbf5f5f4bcab44529982a6e35a7af1a78f5d51c13d2c1dd75ea819ed569403b8eee7fa2ff1447adc86e3184c9bf4f1ce4404512a6694fa187b128482804e3079ce784e4dea80182e757bb1cbb7c-38e7ecc6f4bd38bd7147da84e21e801b",
          icon: "cogs"
        },
        {
          name: "Duopich",
          loaded: false,
          id: "CommPlugin_3",
          index: 3,
          ticket:
            "d96bfde054293d49d4266a9313e62dc971525fd5a962800c35c8c9d7122483f1b21dd3267802e2b1446eaa40f9fe277d797acc75b03b826d4dbcea6e1fa33c94016f0f83a3271c6461e2d9820fdc755fb94f2b1f19381b51970d1b54295e45f9c81f7f75a4cc8b6e0e30ea57792eaa3670e0496cc067-e60364391a0c2eb405acb24c580b2199",
          icon: "cogs"
        }
        // { name: "Conical", index: 5, ticket: 5, icon: "cogs" }
      ]
    };
  },

  mounted() {
    // there is a slight chance that loading has been completed already
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initSdvApp, false);
    } else {
      this.initSdvApp();
    }
  },

  methods: {
    async initSdvApp() {
      // Settings can be defined here, or as attributes of the viewport container. Settings defined here take precedence.
      let _container = document.getElementById("sdv-container");
      let settings = {
        container: _container
      };
      // See http://app.shapediver.com/api/SDVApp.ParametricViewer.html for all settings available via the constructor.
      var shapediver = new window.SDVApp.ParametricViewer(settings);
      this.shapediver = shapediver;
      //
      // initialize a session for the model, don't load geometry yet
      //
      this.topologies.forEach(topology => {
        this.initModel(topology.ticket, topology.id);
      });
      await this.enableCheckboxes();
    },

    visibilityOn() {
      this.shapediver.scene.addEventListener(
        this.shapediver.scene.EVENTTYPE.VISIBILITY_ON,
        () => {
          console.log("on visibility on");
        }
      );
    },
    async initModel(modelTicket, modelId) {
      await this.shapediver.plugins.registerCommPluginAsync({
        deferGeometryLoading: true,
        ticket: modelTicket,
        modelViewUrl: "eu-central-1",
        runtimeId: modelId
      });
      this.geometryLoaded[modelId] = false;
    },
    showPluginContents(pluginId, bShow) {
      // load the geometry the first time a specific model needs to be displayed
      if (!this.geometryLoaded[pluginId]) {
        this.shapediver.plugins.refreshPluginAsync(pluginId);
        this.geometryLoaded[pluginId] = true;
      }
      let assets = this.shapediver.scene.get(null, pluginId).data;
      let paths = [];
      for (let i = 0; i < assets.length; i++) {
        paths.push(assets[i].scenePath);
      }
      if (bShow) this.shapediver.scene.toggleGeometry(paths, []);
      else {
        this.shapediver.scene.toggleGeometry([], paths);
      }
    },
    togglePlugin(cb) {
      console.log(cb.target.id, cb.target.checked);
      this.showPluginContents(cb.target.id, cb.target.checked);
    },
    enableCheckboxes() {
      this.shapediverReady = true;
    }
  }
};
</script>
<style lang="scss" scoped>
#sdv-container {
  z-index: 1000 !important;
}
.viewport-container {
  width: 100vw !important;
  height: 100vh !important;

  // background-color: green;
}
</style>
