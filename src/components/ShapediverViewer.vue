<template lang="html">
  <div
    class="column is-three-fifths-fullhd is-half-desktop has-background-white"
    :class="windowSize.isDesktop ? 'desktop-sd-viewer' : 'mobile-sd-viewer'"
  >
    <div class="has-background-light" id="sdv-container">
      <b-loading
        :is-full-page="true"
        :active="geometryLoading"
        :can-cancel="false"
        class="geometry-loading"
      >
      </b-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShapediverViewer",
  props: ["windowSize", "topologies", "currentTopology", "paramsTabs"],
  data() {
    return {
      geometryLoading: true,
      shapediver: null,
      maxHeight: 100,
      isScrollable: true,
      allParams: []
    };
  },
  watch: {
    // whenever currentTopology changes, this function will run
    currentTopology: function(newTopo, oldTopo) {
      if (newTopo != oldTopo && oldTopo.id != null) {
        this.showPluginContents(oldTopo.id, false);
        this.showPluginContents(newTopo.id, true);
      }
    }
  },
  mounted() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initApp, false);
    } else {
      this.initApp();
    }
  },
  // beforeDestroy() {
  //   this.shapediver.viewports.destroy();
  // },
  methods: {
    async initApp() {
      // Load the viewer without a ticket, and register separate communication plugins for each model ticket.
      // Settings can be defined here, or as attributes of the viewport container. Settings defined here take precedence.
      let _container = document.getElementById("sdv-container");
      let settings = {
        container: _container
      };
      // See http://app.shapediver.com/api/SDVApp.ParametricViewer.html for all settings available via the constructor.
      var shapediver = await new window.SDVApp.ParametricViewer(settings);

      this.shapediver = shapediver;
      this.$emit("shapediver-ready", this.shapediver);

      // register separate communication plugins for each model ticket.
      // initialize a session for the model, don't load geometry yet
      this.allParams = [];
      for (let i = 0; i < this.topologies.length; i++) {
        await this.initModel(this.topologies[i].ticket, this.topologies[i].id);
      }
      this.allParams = this.shapediver.parameters.get().data;
      await this.getPluginParams();
      await this.showPluginContents(
        this.currentTopology.id,
        this.currentTopology.loaded
      );
    },

    async initModel(modelTicket, modelId) {
      await this.shapediver.plugins.registerCommPluginAsync({
        deferGeometryLoading: true,
        ticket: modelTicket,
        modelViewUrl: "eu-central-1",
        runtimeId: modelId
      });
    },

    async getPluginParams() {
      this.topologies.forEach(topology => {
        topology.params = this.allParams.filter(
          param => param.plugin == topology.id
        );
      });
    },

    // eslint-disable-next-line no-unused-vars
    async showPluginContents(pluginId, bShow) {
      // load the geometry the first time a specific model needs to be displayed
      await this.shapediver.plugins.refreshPluginAsync(pluginId);

      var assets = this.shapediver.scene.get(null, pluginId).data;
      var paths = [];
      for (let i = 0; i < assets.length; i++) {
        paths.push(assets[i].scenePath);
      }
      this.currentTopology.paths = paths;
      this.currentTopology.assets = assets;

      if (bShow) {
        this.shapediver.scene.toggleGeometry(paths, []);
        this.geometryLoading = false;

        for (let i = 0; i < this.paramsTabs.length; i++) {
          this.filterParamTabs(this.paramsTabs[i].name);
        }
      } else {
        this.shapediver.scene.toggleGeometry([], paths);
      }
    },

    filterParamTabs(name) {
      var currentParams = this.currentTopology.params;

      var tab = this.paramsTabs.filter(element => element.name == name)[0];

      var frameParamNames = tab.names;

      // console.log(frameParamNames, tab);

      tab.params = currentParams.filter(function(param) {
        return frameParamNames.includes(param.name.trim());
      });

      // console.log("after load", currentParams);
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
.geometry-loading {
  position: relative;
  width: 100%;
  height: 100%;
}
.mobile-sd-viewer {
  width: 100% !important;
  height: 50vh;
  background-color: white;
}
.desktop-sd-viewer {
  width: 100%;
  max-height: calc(100vh - 53px) !important;
  background-color: white;
}
</style>
