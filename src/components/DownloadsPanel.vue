<template>
  <div
    v-if="shapediver"
    id="model-info-panel"
    class="column is-one-fifth-fullhd is-one-quarter-desktop has-background-white control-panel tabs-component model-info"
    :class="windowSize.width < 1007 ? 'mobile-height' : ''"
  >
    <b-tabs
      v-model="activeTab"
      class="has-background-white"
      :class="windowSize.width < 1007 ? 'mobile-height' : 'has-height-third'"
      type="is-toggle"
      size="is-small"
      expanded
      animation="slide-next"
    >
      <b-tab-item
        :label="windowSize.width < 1240 ? '' : 'Structure Details'"
        icon="info-circle"
      >
        <div
          class="container is-fluid is-paddingless has-background-light is-fullheight inset"
        >
          <simplebar data-simplebar-auto-hide="true" class="simplebar py-4">
            <div class="container px-1">
              <collapse
                :tab-index="activeTab"
                :details="details"
                :isOpen="isOpen"
              />
            </div>
          </simplebar>
        </div>
      </b-tab-item>
      <b-tab-item
        :label="windowSize.width < 1240 ? '' : 'Downloads'"
        icon="file-alt"
      >
        <div
          class="container is-fluid is-paddingless has-background-light is-fullheight inset"
        >
          <simplebar
            id="downloads"
            data-simplebar-auto-hide="true"
            class="simplebar py-4"
          >
            <div class="container px-1 is-fullheight">
              <steps
                :window-size="windowSize"
                :shapediver="shapediver"
                :download-formats="downloadsTab"
                :details="details"
                :current-topology="currentTopology"
                :claims="claims"
                :tab-index="activeTab"
                :format.sync="selectedFormat"
                :requesting.sync="downloadRequested"
                :exports-sets="exportsSets"
                :download-valid="downloadValid"
                :activated.sync="downloadTriggered"
              />
            </div>
          </simplebar>
        </div>
      </b-tab-item>
    </b-tabs>
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
    "exportsSets",
    "downloadsTab",
    "claims",
    "downloadValid"
  ],
  components: { simplebar, Collapse, Steps },
  data() {
    return {
      activeTab: 0,
      isLoad: false,
      isOpen: 2,
      selectedFormat: 0,
      downloadRequested: false,
      downloadTriggered: false
    };
  },

  watch: {
    selectedFormat: function(newFormat, oldFormat) {
      if (newFormat != oldFormat) {
        this.emitIndexToParent(newFormat);
      }
    },
    downloadRequested: function(newRequest) {
      if (newRequest == true) {
        this.emitRequestedToParent(true);
      } else this.emitRequestedToParent(false);
    },
    downloadTriggered: function(newValidity, oldValidity) {
      if (newValidity != oldValidity && newValidity == true) {
        this.emitActivationToParent(true);
      } else if (newValidity != oldValidity && newValidity == false) {
        this.emitActivationToParent(false);
      }
    }
  },
  methods: {
    emitIndexToParent(format) {
      this.$emit("update:index", format);
    },
    emitRequestedToParent(requested) {
      this.$emit("requested-ready", requested);
    },
    emitActivationToParent(activated) {
      this.$emit("activation-ready", activated);
    }
  }
};
</script>

<style lang="scss">
#model-info-panel {
  z-index: 90 !important;
}
#downloads {
  .simplebar-content {
    height: 100%;
  }
}
.info-panel {
  min-height: 510px;
  margin-top: 0.2em;
  -webkit-box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
}
.inset {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
