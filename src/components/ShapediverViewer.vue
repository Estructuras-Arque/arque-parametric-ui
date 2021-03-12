<template>
  <div
    class="column is-three-fifths-fullhd is-half-desktop has-background-white"
    :class="windowSize.width < 1007 ? 'mobile-sd-height m-1 inset' : ''"
  >
    <b-loading
      :is-full-page="true"
      :active="geometryLoading"
      :can-cancel="false"
      class="geometry-loading"
    >
    </b-loading>
    <div
      class="has-background-light"
      id="sdv-container"
      :class="windowSize.width < 1007 ? 'mobile-sd-viewer' : ''"
    >
      <div class="is-absolute" v-if="windowSize.width < 1007">
        <message-box :is-mobile="true" />
      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from "@/components/MessageBox.vue";
export default {
  name: "ShapediverViewer",
  components: {
    MessageBox
  },
  props: [
    "windowSize",
    "topologies",
    "currentTopology",
    "paramsTabs",
    "downloadFormatIndex",
    "downloadRequested",
    "downloadTriggered",
    "param"
  ],
  data() {
    return {
      geometryLoading: true,
      shapediver: null,
      maxHeight: 100,
      isScrollable: true,
      allParams: [],
      exportSets: [],
      downloadValid: false
    };
  },
  watch: {
    param: function(newParam, oldParam) {
      if (newParam.value != oldParam.value || oldParam != null) {
        console.log(newParam, oldParam);
        this.onParamChanged(newParam);
      }
    },

    // whenever currentTopology changes, this function will run
    currentTopology: function(newTopo, oldTopo) {
      if (newTopo != oldTopo && oldTopo.id != null) {
        this.showPluginContents(oldTopo.id, false);
        this.showPluginContents(newTopo.id, true);
      }
    },
    downloadRequested: function(newDownload, oldDownload) {
      if (newDownload != oldDownload && newDownload == true) {
        // console.log("requesting");
        this.listDownloads(true);
      } else if (newDownload != oldDownload && newDownload == false) {
        this.listDownloads(false);
      }
    },
    downloadTriggered: function(newDownload, oldDownload) {
      if (newDownload != oldDownload && newDownload == true) {
        this.activateDownloads();
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
      this.$emit("params-ready", this.allParams);
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

    async onParamChanged(param) {
      await this.shapediver.parameters.updateAsync({
        name: param.name,
        id: param.id,
        value: param.value,
        plugin: param.plugin
      });
      this.$emit("update:changed", false);
    },

    filterParamTabs(name) {
      var currentParams = this.currentTopology.params;

      var tab = this.paramsTabs.filter(element => element.name == name)[0];

      var frameParamNames = tab.names;

      // console.log(frameParamNames, tab);

      tab.params = currentParams.filter(function(param) {
        return frameParamNames.includes(param.name.trim());
      });

      this.updateOrder(tab, frameParamNames);
      // console.log("after load", currentParams);
      this.$emit("params-tabs-ready", true);
    },

    updateOrder(tab, names) {
      for (let i = 0; i < tab.params.length; i++) {
        const param = tab.params[i];
        names.filter(function(name) {
          var index = names.indexOf(name);
          if (param.name == name) {
            param.order = index;
            // console.log(index, param.order);
          }
        });
        this.shapediver.parameters.updateAsync({
          name: param.name,
          order: param.order
        });
      }
    },
    // async onParamChanged(param) {
    //   // console.log("param changed");
    //   await this.shapediver.parameters.updateAsync({
    //     name: param.name,
    //     id: param.id,
    //     value: param.value,
    //     plugin: param.plugin
    //   });
    // },
    async listDownloads(activate) {
      // console.log("listing");
      var plugin = this.currentTopology.id;
      var exportSettings = await this.shapediver.exports.get().data;
      this.exportSets = exportSettings.filter(function(param) {
        return param.plugin.includes(plugin);
      });
      this.$emit("update:exports", this.exportSets);
      this.downloadValid = activate;
      this.$emit("update:download", activate);
    },
    async activateDownloads() {
      for (let i = 0; i < this.exportSets.length; i++) {
        var download = this.exportSets[i];
        // console.log(download);
        await this.download(download.name, download.type, download.plugin);
      }
    },
    async download(name, type, plugin) {
      await this.shapediver.exports
        .requestAsync({ name: name, type: type, plugin: plugin })
        .catch(function(err) {
          return Promise.reject(err);
        })
        .then(function(response) {
          if (response.data.type == "download") {
            let link = response.data.content[0].href;
            window.location = link;
            alert("Download Successful");
            localStorage.clear();
          } else;
        });
    }
  }
};
</script>

<style lang="scss">
.is-absolute {
  position: absolute;
}
#sdv-container {
  z-index: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.geometry-loading {
  position: relative;
  width: 100%;
  height: 100%;
}
.mobile-sd-viewer {
  width: 100% !important;
  background-color: white;
}
.mobile-sd-height {
  box-shadow: inset 1px 1px 10px 6px rgba(0, 0, 0, 0.08);
  height: calc(50vh - 53px) !important;
}
.desktop-sd-viewer {
  width: 100%;
  height: calc(100vh - 53px) !important;
  background-color: white;
}
.inset {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
