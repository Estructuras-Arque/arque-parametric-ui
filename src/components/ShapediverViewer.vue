<template lang="html">
  <div
    class="column is-three-fifths-fullhd is-three-fifths-desktop has-background-white"
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
      allParams: [],
      details: [],
      detailsTable: [],
      tempArray: []
    };
  },
  computed: {
    orderedDetails: function() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.details.slice(0).sort(compare);
    }
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

    async getPluginDetails() {
      var allDetails = this.shapediver.scene.getData(
        {},
        this.currentTopology.id
      ).data;
      // filter details by model id
      this.details = allDetails.filter(detail => {
        return detail.plugin == this.currentTopology.id;
      });
      this.$emit("details-ready", this.details);
    },

    splitDetailString(data, index) {
      for (let i = 0; i < data.data.length; i++) {
        var element = data.data[i];
        // eslint-disable-next-line no-useless-escape
        this.detailsTable[index].data.push(element.match(/[\d\.]+|\D+/g));
      }
    },

    organizeDetailsArray() {
      for (let i = 0; i < this.orderedDetails.length; i++) {
        var table = this.orderedDetails[i];
        this.detailsTable.length = this.orderedDetails.length;
        this.detailsTable[i] = new Object();
        this.detailsTable[i].name = table.name;
        this.detailsTable[i].id = table.id;
        this.detailsTable[i].plugin = table.plugin;
        this.detailsTable[i].data = [];
        this.splitDetailString(table, i);
        this.$emit("details-ready", this.detailsTable);
      }
    },
    addToObject(obj, key, value, index) {
      // Create a temp object and index variable
      var temp = {};
      var i = 0;

      // Loop through the original object
      for (var prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop)) {
          // If the indexes match, add the new item
          if (i === index && key && value) {
            temp[key] = value;
          }

          // Add the current item in the loop to the temp obj
          temp[prop] = obj[prop];

          // Increase the count
          i++;
        }
      }

      // If no index, add to the end
      if (!index && key && value) {
        temp[key] = value;
      }

      return temp;
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
        await this.getPluginDetails();
        this.organizeDetailsArray();
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
  height: 720px !important;
  background-color: white;
}
.desktop-sd-viewer {
  width: 100%;
  height: calc(100vh - 53px) !important;
  background-color: white;
}
</style>
