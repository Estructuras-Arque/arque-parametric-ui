<template lang="html">
  <div
    class="column is-one-fifth-fullhd is-one-quarter-desktop control-panel model-info"
  >
    <div class="container has-background-light tabs-component">
      <b-tabs
        v-model="activeTab"
        class="has-background-white tabs-component"
        type="is-toggle"
        size="is-small"
        expanded
      >
        <b-tab-item label="Structure Details" icon="table">
          <div class="section is-paddingless info-panel">
            <simplebar data-simple-bar-auto-hide="false" class="simplebar">
              <div class="container is-paddingless">
                <collapse
                  :tab-index="activeTab"
                  :details="details"
                  :isOpen="isOpen"
                />
              </div>
            </simplebar>
          </div>
        </b-tab-item>
        <b-tab-item label="Downloads" icon="cloud-download-alt">
          <div class="section is-paddingless">
            <div class="container is-fluid is-paddingless">
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
  </div>
</template>

<script>
import simplebar from "simplebar-vue";
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
  components: { simplebar, Collapse, Steps },
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
.info-panel {
  margin-top: 0.2em;
  -webkit-box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
}
</style>
