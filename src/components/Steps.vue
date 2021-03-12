<template>
  <div class="container">
    <b-steps
      class=""
      :has-navigation="hasNavigation"
      v-model="activeStep"
      size="is-small"
      :mobile-mode="mobileMode"
      :rounded="isRounded"
      :animation="isAnimated"
    >
      <b-step-item
        class="is-paddingless"
        step="0"
        label="Available Files"
        icon="table"
        :clickable="!isStepsClickable"
      >
        <downloads-table
          :detail-tab="downloadFormats"
          :columnsTitle="tableTitles"
          :tab-index="tabIndex"
          :custom-navigation="customNavigation"
      /></b-step-item>

      <b-step-item
        class="is-paddingless step"
        step="1"
        label="Download"
        icon="cloud-download-alt"
        :clickable="isStepsClickable"
        :type="downloadValid == true ? 'is-success' : ''"
      >
        <div class="container is-flex is-flex-direction-column">
          <div class="is-widththird">
            <b-button
              :disabled="!includes && downloadValid"
              class="mt-6 is-flex-shrink-1"
              type="is-primary"
              icon-left="file-download"
              @click="download(downloadTriggered)"
            >
              Download
            </b-button>
          </div>
          <b-checkbox
            required
            v-model="isTermsGroup"
            size="is-small"
            class="pt-5"
            native-value="terms"
            :value="terms"
          >
            <p class="is-size-7">
              {{ termsText }}
              <a target="_blank" :href="termsLink">Terms and Conditions</a>
            </p>
          </b-checkbox>
          <b-checkbox
            v-model="isTermsGroup"
            size="is-small"
            class="pt-2"
            native-value="newsletter"
            :value="newsletter"
          >
            <p class="is-size-7">
              {{ newsLetterText }}
              <a target="_blank" :href="companyLink"
                >Arque Spatial Structures</a
              >
            </p>
          </b-checkbox>
          <p class="mt-5">
            <!-- {{ exportsSets }} -->
          </p>
        </div>
      </b-step-item>
      <template v-if="customNavigation" #navigation="">
        <div class="step-navigation">
          <div
            v-if="activeStep == 0 && formatsLoaded == true"
            class="format-list pl-4"
          >
            <b-field
              message="Select the format you desire"
              class="mt-1 pb-6 ml-3 has-text-grey"
            >
              <p class="control">
                <b-dropdown
                  :max-height="windowSize.width < 1007 ? 150 : ''"
                  :scrollable="windowSize.width < 1007 ? isScrollable : ''"
                  position="is-top-right"
                  aria-role="list"
                  :mobile-modal="false"
                  class="pb-1"
                  v-model="currentFormat"
                >
                  <template #trigger>
                    <b-button
                      position="is-top-right"
                      class="is-outlined"
                      icon-left="ellipsis-v"
                      size="is-small"
                      type="is-primary"
                    />
                  </template>

                  <b-dropdown-item
                    class="has-text-left"
                    v-for="(item, index) in downloadFormats.choices"
                    :key="index"
                    aria-role="listitem"
                    :value="index"
                    @click="changeFileFormat()"
                  >
                    <div class="media">
                      <div class="media-content">
                        <h3>
                          <a class="has-text-black">{{ item }}</a>
                        </h3>
                      </div>
                    </div></b-dropdown-item
                  >
                </b-dropdown>
              </p>

              <p class="control">
                <b-button
                  class="is-outlined"
                  disabled
                  size="is-small"
                  label="Available"
                  type="is-primary"
                />
              </p>
            </b-field>
            <!-- <b-button
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
            </b-button> -->
          </div>
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
    "shapediver",
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
      isTermsGroup: [],
      terms: false,
      termsText: "I agree to the",
      termsLink: "https://www.w3schools.com",
      newsLetterText: "I agree be contacted by",
      newsletter: false,
      companyLink: "http://estructurasarque.com",
      isScrollable: true,
      maxHeight: 200,
      hasNavigation: false,
      customNavigation: true,
      isMobileModal: false,
      activeStep: 0,
      isAnimated: "slide-next",
      isRounded: true,
      isStepsClickable: false,
      isProfileSuccess: false,
      mobileMode: null,
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
        this.isTermsGroup;
      } else if (newValidty != oldValidity && newValidty == true) {
        this.downloadTriggered = true;
      }
    }
  },
  computed: {
    includes: function() {
      return this.isTermsGroup.slice(0).includes("terms");
    }
  },
  mounted() {
    if (this.downloadFormats != null) this.formatsLoaded = true;
  },

  methods: {
    async changeFileFormat() {
      // console.log(this.currentFormat);
      await this.shapediver.parameters.updateAsync({
        name: this.downloadFormats.name,
        id: this.downloadFormats.id,
        plugin: this.downloadFormats.plugin,
        value: this.currentFormat
      });
      this.$emit("update:format", this.currentFormat);
      this.requestDownloads(true);
      this.activeStep = 1;
    },
    requestDownloads(requesting) {
      this.$emit("update:requesting", requesting);
    },
    download(download) {
      if (download == true) {
        // console.log("download: ", download);
        this.activeStep = 0;
        this.requestDownloads(false);
      }
      this.$emit("update:activated", download);
    }
  }
};
</script>

<style lang="scss">
.is-widththird {
  width: 40%;
}
.step {
  .loading-background {
    background: rgba(255, 255, 255, 0);
  }
}
.step-content {
  padding-top: 0.3rem;
  // height: 400px;
}
// .step-navigation {
// position: absolute;
// bottom: 5%;
// width: 100%;
// }
.is-borderless {
  width: 100%;
  border-width: 0;
}
.is-borderless:hover {
  background: hsl(0, 0%, 96%);
}
</style>
