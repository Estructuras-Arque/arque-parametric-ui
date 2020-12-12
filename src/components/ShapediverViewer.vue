/* eslint-disable no-unused-vars */
<template>
  <div
    class="column has-background-white viewport-container"
    :class="
      windowSize.width > 1024
        ? 'is-half-desktop is-three-fifths-widescreen is-three-fifths-fullhd desktop-sd-viewer'
        : 'mobile-sd-viewer'
    "
  >
    <div class="has-background-light" id="sdv-container"></div>
  </div>
</template>

<script>
export default {
  name: "ShapediverViewer",
  props: ["windowSize", "topologies", "currentTopology"],
  data() {
    return {
      shapediverReady: false,
      shapediver: null,
      maxHeight: 100,
      isScrollable: true,
      loadedGeometries: {},
      paths: [],
      assets: []
    };
  },
  watch: {
    // whenever currentTopology changes, this function will run
    currentTopology: function(newTopo, oldTopo) {
      if (oldTopo.id != null) {
        console.log("Exists", oldTopo);
      } else {
        console.log("does not exist", oldTopo);
      }
      if (newTopo != oldTopo) {
        oldTopo.loaded = false;
        this.loadedGeometries[oldTopo.id] = false;
        this.showPluginContents(oldTopo.id, oldTopo.loaded);
        this.showPluginContents(newTopo.id, newTopo.loaded);
      }
    }
  },
  mounted() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initApp, false);
    } else {
      this.initApp();
      console.log("shapediver loaded successfully");
    }
  },
  methods: {
    async initApp() {
      // Load the viewer without a ticket, and register separate communication plugins for each model ticket.
      // Settings can be defined here, or as attributes of the viewport container. Settings defined here take precedence.
      let _container = document.getElementById("sdv-container");
      let settings = {
        container: _container
      };
      // See http://app.shapediver.com/api/SDVApp.ParametricViewer.html for all settings available via the constructor.
      var shapediver = new window.SDVApp.ParametricViewer(settings);

      this.shapediver = shapediver;

      // register separate communication plugins for each model ticket.
      // initialize a session for the model, don't load geometry yet
      for (let i = 0; i < this.topologies.length; i++) {
        this.initModel(this.topologies[i].ticket, this.topologies[i].id);
      }
      await this.enableCheckbox();
    },

    async initModel(modelTicket, modelId) {
      await this.shapediver.plugins.registerCommPluginAsync({
        deferGeometryLoading: true,
        ticket: modelTicket,
        modelViewUrl: "eu-central-1",
        runtimeId: modelId
      });
      this.loadedGeometries[modelId] = false;
    },

    async showPluginContents(pluginId, bShow) {
      // load the geometry the first time a specific model needs to be displayed
      if (!this.loadedGeometries[this.currentTopology.id]) {
        this.shapediver.plugins.refreshPluginAsync(this.currentTopology.id);
        // console.log(this.shapediver.plugins.refreshPluginAsync(pluginId));
        this.loadedGeometries[this.currentTopology.id] = true;
        // console.log("geometry loaded", this.loadedGeometries[pluginId]);
      }
      var assets = this.shapediver.scene.get(null, pluginId).data;
      var paths = [];
      for (let i = 0; i < assets.length; i++) {
        paths.push(assets[i].scenePath);
      }
      // console.log("paths", paths, "assets", assets);
      if (bShow) {
        this.shapediver.scene.toggleGeometry(paths, []);
      } else {
        this.shapediver.scene.toggleGeometry([], paths);
      }
    },

    enableCheckbox() {
      this.shapediverReady = true;
      this.$emit("shapediver-ready", this.shapediverReady);
    }
  }
};
</script>

<style lang="scss">
#sdv-container {
  width: 100% !important;
  height: 100% !important;
}
// .viewport-container {
//   // display: flex;
//   // flex-direction: row;
//   // flex-wrap: wrap;

//   // overflow: hidden;
//   // background-color: green;
// }
// #sdv-container {
//   width: 100%;
//   height: 100%;
// }
.mobile-sd-viewer {
  width: 100%;
  height: 720px !important;
  background-color: white;
}
.desktop-sd-viewer {
  width: 100%;
  height: calc(100vh - 53px) !important;
  background-color: white;
}
</style>
