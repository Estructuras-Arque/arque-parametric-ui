<template lang="html">
  <div
    id="downloads-panel"
    class="column is-one-fifth-fullhd is-one-quarter-desktop has-background-light control-panel tabs-component model-info"
    :class="windowSize.width < 1007 ? 'mobile-height' : ''"
  >
    <b-tabs
      v-model="activeTab"
      class="has-background-white"
      :class="windowSize.width < 1007 ? 'mobile-height' : ''"
      type="is-toggle"
      size="is-small"
      expanded
      animation="slide-next"
    >
      <b-tab-item label="Structure Details" icon="table">
        <div class="section is-paddingless info-panel">
          <div class="container is-paddingless has-background-white">
            <collapse
              :tab-index="activeTab"
              :details="details"
              :isOpen="isOpen"
            />
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Downloads" icon="cloud-download-alt">
        <div class="section is-paddingless">
          <div class="container is-fluid is-paddingless info-panel">
            <steps
              :claims="claims"
              :tab-index="activeTab"
              :download-params="downloadsTab"
              @step-changed="stepChanged"
              @step-ready="stepReady"
              :export-sets="exportSets"
            />
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
// import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import Collapse from "@/components/Collapse.vue";
import Steps from "@/components/Steps.vue";
export default {
  name: "DownloadsPanel",
  props: [
    "windowSize",
    "shapediver",
    "currentTopology",
    "details",
    "downloadsTab",
    "claims"
  ],
  components: { Collapse, Steps },
  data() {
    return {
      activeTab: 0,
      isLoad: false,
      exportSets: [],
      isOpen: 2,
      activeStep: 0
    };
  },

  methods: {
    stepChanged(value) {
      this.activeStep = value;
    },
    stepReady(value) {
      this.activeStep = value;
      this.requestDownloads();
    },
    requestDownloads() {
      var plugin = this.currentTopology.id;
      setTimeout(() => {
        this.isLoad = false;
        var exportSettings = this.shapediver.exports.get().data;
        this.exportSets = exportSettings.filter(function(param) {
          return param.plugin.includes(plugin);
        });
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
#downloads-panel {
  z-index: 90 !important;
}
.info-panel {
  min-height: 510px;
  margin-top: 0.2em;
  -webkit-box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);

  .container {
    min-height: 510px;
  }
}
</style>
