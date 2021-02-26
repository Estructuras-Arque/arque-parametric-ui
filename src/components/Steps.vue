<template>
  <div class="container has-text-centered">
    <b-steps
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
        label="Request"
        icon="question"
        :clickable="isStepsClickable"
      >
        <b-loading
          :is-full-page="true"
          :active.sync="isLoad"
          :can-cancel="false"
        >
        </b-loading>
        <downloads-table
          v-if="infoLoaded"
          :detailTab="downloadParams"
          :columnsTitle="tableTitles"
          :tab-index="tabIndex"
      /></b-step-item>

      <!-- <b-step-item
        class="is-paddingless"
        step="1"
        label="Evaluating"
        icon="diagnoses"
        :clickable="isStepsClickable"
      >
        <b-loading
          :is-full-page="true"
          :active.sync="isLoad"
          :can-cancel="false"
        >
        </b-loading>
        <user-details v-if="infoLoaded" :claims="claims" />
      </b-step-item> -->

      <b-step-item
        class="is-paddingless"
        step="1"
        label="Files"
        icon="cart-arrow-down"
        :clickable="isStepsClickable"
        :type="isProfileSuccess == true ? 'is-success' : ''"
        ><b-loading
          :is-full-page="true"
          :active.sync="isLoad"
          :can-cancel="false"
        >
        </b-loading>
        <p v-if="infoLoaded">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem.
        </p>
      </b-step-item>
      <template v-if="customNavigation" #navigation="{previous, next}">
        <b-button
          outlined
          size="is-small"
          type="is-info"
          icon-left="angle-left"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
        </b-button>
        <b-button
          outlined
          size="is-small"
          type="is-success"
          icon-right="angle-right"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
        </b-button>
      </template>
    </b-steps>
  </div>
</template>
<script>
import DownloadsTable from "@/components/DownloadsTable.vue";
// import UserDetails from "@/components/UserDetails.vue";

export default {
  name: "Steps",
  props: ["downloadParams", "exportSets", "tabIndex", "claims"],
  components: { DownloadsTable },
  data() {
    return {
      hasNavigation: true,
      customNavigation: true,
      activeStep: 0,
      isAnimated: "slide-next",
      isRounded: true,
      isStepsClickable: false,
      isProfileSuccess: false,
      mobileMode: "minimalist",
      tableTitles: ["File Format", "Status"],
      isLoad: false,
      infoLoaded: false
    };
  },
  watch: {
    activeStep: function(newStep, oldStep) {
      if (newStep != oldStep) {
        this.stepChanged(newStep);
      }
    }
  },
  mounted() {
    this.stepReady();
  },
  methods: {
    updateSteps(step) {
      this.isLoad = true;
      this.infoLoaded = false;
      if (step != 2) {
        setTimeout(() => {
          this.isLoad = false;
          this.infoLoaded = true;
        }, 1000);
      } else
        setTimeout(() => {
          this.isProfileSuccess = true;
          this.isLoad = false;
          this.infoLoaded = true;
        }, 2500);
    },
    stepReady() {
      this.updateSteps(this.activeStep);
      this.$emit("step-ready", this.activeStep);
    },
    stepChanged(step) {
      this.updateSteps(step);
      this.$emit("step-changed", step);
    },
    inputUserDetails() {
      console.log("inputing");
    }
  }
};
</script>

<style lang="scss">
.step-content {
  padding-top: 0.3rem;
  height: 400px;
}
// .step-navigation {
//   position: absolute;
//   bottom: 0;
//   right: 50%;
// }
</style>
