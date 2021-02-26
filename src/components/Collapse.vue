<template lang="html">
  <div class="is-fullheight">
    <b-collapse
      class="card mb-1"
      animation="slide"
      v-for="(detailTab, index) in orderedDetails"
      :key="index"
      :open="isOpen == index"
    >
      <template #trigger="props">
        <div class="card-header" role="button">
          <p class="card-header-title is-size-7 has-text-weight-bold">
            {{ detailTab.name }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'angle-down' : 'angle-up'"> </b-icon>
          </a>
        </div>
      </template>
      <div class="card-content is-paddingless">
        <div class="content">
          <details-table
            :tab-index="tabIndex"
            :is-split="isSplit"
            :detail-tab="detailTab"
            :ordered-details="orderedDetails"
            :columns-title="columnsTitle"
            :is-download="isDownload"
          />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import DetailsTable from "../components/DetailsTable.vue";
export default {
  name: "Collapse",
  components: {
    DetailsTable
  },
  data() {
    return {
      columnsTitle: ["Property", "Value", "Unit"],
      isSplit: true,
      isDownload: false
    };
  },
  props: ["isOpen", "details", "tabIndex"],
  computed: {
    orderedDetails: function() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.details.slice(0).sort(compare);
    }
  }
};
</script>

<style lang="scss">
.has-max-height-7 {
  min-height: 300px;
}
</style>
