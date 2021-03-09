<template>
  <div class="container is-fullheight">
    <b-steps
      class="is-fullheight"
      :has-navigation="hasNavigation"
      v-model="activeStep"
      size="is-small"
      :mobile-mode="mobileMode"
      :rounded="isRounded"
      :animation="isAnimated"
    >
      <b-step-item
        class="is-paddingless has-max-height-4"
        step="0"
        label="Available Files"
        icon="table"
        :clickable="isStepsClickable"
      >
        <downloads-table
          :detail-tab="downloadFormats"
          :columnsTitle="tableTitles"
          :tab-index="tabIndex"
          :custom-navigation="customNavigation"
      /></b-step-item>

      <b-step-item
        class="is-paddingless has-max-height-4 step"
        step="1"
        label="Download"
        icon="cloud-download-alt"
        :clickable="isStepsClickable"
        :type="isProfileSuccess == true ? 'is-success' : ''"
      >
        <div class="container">
          <b-button
            class="mt-6"
            :disabled="!downloadValid"
            type="is-primary"
            icon-left="file-download"
            @click="download(downloadTriggered)"
          >
            Download
          </b-button>
          <p class="mt-5">
            {{ exportsSets }}
          </p>
        </div>
      </b-step-item>
      <template v-if="customNavigation" #navigation="{previous,next}">
        <div
          v-if="activeStep == 0 && formatsLoaded == true"
          class="format-list pl-4"
        >
          <b-field
            message="Feel free to select one of the available formats you desire"
          >
            <p class="control">
              <b-dropdown
                :mobile-modal="windowSize.isDesktop == false ? true : false"
                v-model="currentFormat"
                aria-role="list"
                :triggers="['hover']"
              >
                <b-button
                  slot="trigger"
                  size="is-small"
                  type="is-primary"
                  outlined
                  icon-right="ellipsis-v"
                >
                </b-button>
                <div
                  class="has-text-left"
                  v-for="(item, index) in downloadFormats.choices"
                  :key="index"
                >
                  <b-dropdown-item
                    @click="changeFileFormat()"
                    aria-role="listitem"
                    :value="index"
                    >{{ item }}
                  </b-dropdown-item>
                </div>
              </b-dropdown>
            </p>
            <p class="control">
              <b-button
                class="is-outlined"
                disabled
                size="is-small"
                label="Available"
                type="is-primary"
              >
              </b-button>
            </p>
          </b-field>
        </div>

        <div class="step-navigation has-text-centered">
          <b-button
            outlined
            size="is-small"
            type="is-info"
            icon-left="angle-left"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
            @click="requestDownloads(false)"
          >
          </b-button>
          <b-button
            outlined
            size="is-small"
            type="is-info"
            icon-left="angle-right"
            @click.prevent="next.action"
            :disabled="next.disabled"
            @click="requestDownloads(true)"
          >
          </b-button>
        </div>
      </template>
    </b-steps>
  </div>
</template>
<script>
import DownloadsTable from "@/components/DownloadsTable.vue";

export default {
  name: "Steps",
  props: [
    "windowSize",
    "downloadFormats",
    "currentTopology",
    "tabIndex",
    "claims",
    "details",
    "exportsSets",
    "downloadValid"
  ],
  components: { DownloadsTable },
  data() {
    return {
      isScrollable: true,
      maxHeight: 200,
      hasNavigation: false,
      customNavigation: true,
      activeStep: 0,
      isAnimated: "slide-next",
      isRounded: true,
      isStepsClickable: false,
      isProfileSuccess: false,
      mobileMode: "minimalist",
      tableTitles: ["File Format", "Status"],
      formatsLoaded: false,
      currentFormat: 0,
      downloadTriggered: false
    };
  },
  watch: {
    tabIndex: function(newIndex, oldIndex) {
      if ((newIndex == 0 || oldIndex == 0) && this.activeStep == 1) {
        this.activeStep = 0;
      } else if ((newIndex == 1 || oldIndex == 1) && this.activeStep == 0) {
        this.formatsLoaded = true;
      }
    },
    downloadValid: function(newValidty, oldValidity) {
      if (newValidty != oldValidity && newValidty == false) {
        this.downloadTriggered = false;
        this.download(this.downloadTriggered);
      } else if (newValidty != oldValidity && newValidty == true) {
        this.downloadTriggered = true;
      }
    }
  },
  mounted() {
    if (this.downloadFormats != null) this.formatsLoaded = true;
  },

  methods: {
    changeFileFormat() {
      this.$emit("update:format", this.currentFormat);
    },
    requestDownloads(requesting) {
      this.$emit("update:requesting", requesting);
    },
    download(download) {
      if (download == true) {
        console.log("download: ", download);
        this.activeStep = 0;
        this.requestDownloads(false);
      }
      this.$emit("update:activated", download);
    }
  }
};
</script>

<style lang="scss">
.step {
  .loading-background {
    background: rgba(255, 255, 255, 0);
  }
}
.step-content {
  padding-top: 0.3rem;
  // height: 400px;
}
.step-navigation {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.is-borderless {
  width: 100%;
  border-width: 0;
}
.is-borderless:hover {
  background: hsl(0, 0%, 96%);
}
</style>
