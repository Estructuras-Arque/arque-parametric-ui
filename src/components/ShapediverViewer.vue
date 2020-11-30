<template>
  <div
    class="column has-background-white viewport-container"
    :class="
      windowSize.width > 1024
        ? 'is-half-desktop is-three-fifths-widescreen is-three-fifths-fullhd desktop-sd-viewer'
        : 'mobile-sd-viewer'
    "
  >
    <div
      class="has-background-light"
      id="sdv-container"
      style="width:100%;height:500px;"
    ></div>
    <!-- <div v-for="topology in topologies" :key="topology.index">
      <input
        @click="togglePlugin"
        :id="topology.id"
        type="checkbox"
        :disabled="!shapediverReady"
      />
      <label :class="shapediverReady ? 'has-text-info' : 'has-text-dark'">{{
        topology.id
      }}</label
      ><br />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ShapediverViewer",
  props: ["windowSize", "topologies", "currentTopology"],
  data() {
    return {
      shapediverReady: false,
      maxHeight: 100,
      isScrollable: true,
      geometryLoaded: {},
      paths: [],
      assets: []
    };
  },
  watch: {
    // whenever currentTopology changes, this function will run
    currentTopology: function(newTopo, oldTopo) {
      if (newTopo != oldTopo) {
        this.togglePlugin(newTopo);
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

      this.topologies.forEach(topology => {
        this.initModel(topology.ticket, topology.id);
      });
      await this.enableCheckbox();
    },

    async initModel(modelTicket, modelId) {
      await this.shapediver.plugins.registerCommPluginAsync({
        deferGeometryLoading: true,
        ticket: modelTicket,
        modelViewUrl: "eu-central-1",
        runtimeId: modelId
      });
      this.geometryLoaded[modelId] = false;
      this.visibilityOn();
    },

    togglePlugin(cb) {
      console.log(cb);
      if (cb.target != null) {
        this.showPluginContents(cb.target.id, cb.target.checked);
      } else {
        this.showPluginContents(cb.id, cb.loaded);
      }
    },

    showPluginContents(pluginId, bShow) {
      console.log("show plugin content", pluginId, bShow);
      // load the geometry the first time a specific model needs to be displayed
      if (!this.geometryLoaded[pluginId]) {
        this.shapediver.plugins.refreshPluginAsync(pluginId);
        // console.log(this.shapediver.plugins.refreshPluginAsync(pluginId));
        this.geometryLoaded[pluginId] = true;
        // console.log("geometry loaded", this.geometryLoaded[pluginId]);
      }
      this.assets = this.shapediver.scene.get(null, pluginId).data;
      this.paths = [];
      for (let i = 0; i < this.assets.length; i++) {
        this.paths.push(this.assets[i].scenePath);
      }
      if (bShow) {
        this.shapediver.scene.toggleGeometry(this.paths, []);
      } else {
        this.shapediver.scene.toggleGeometry([], this.paths);
      }
    },

    enableCheckbox() {
      this.shapediverReady = true;
      this.$emit("shapediver-ready", this.shapediverReady);
    },
    visibilityOn() {
      this.shapediver.scene.addEventListener(
        this.shapediver.scene.EVENTTYPE.VISIBILITY_ON,
        () => {
          console.log("on visibility on");
        }
      );
    },

    visibilityOff() {
      this.shapediver.scene.removeEventListener(
        this.shapediver.scene.EVENTTYPE.VISIBILITY_OFF,
        () => {
          console.log("on visibility off");
        }
      );
    }
  }
};
</script>

<style lang="scss">
// .sdv-container {
//   width: 100% !important;
//   height: 100% !important;
// }
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
