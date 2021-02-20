<template lang="html">
  <table class="table">
    <thead>
      <tr>
        <th v-for="(cl, index) in columnsTitle" :key="index">
          <abbr
            class="subtitle is-size-7 has-text-weight-semibold"
            :title="cl"
            >{{ cl }}</abbr
          >
        </th>
      </tr>
    </thead>
    <table-body :detail="detailTab.data" />
  </table>
</template>

<script>
import TableBody from "../components/TableBody.vue";
export default {
  name: "DetailsTable",
  components: {
    TableBody
  },

  data() {
    return {
      columnsTitle: ["Property", "Value", "Unit"]
    };
  },

  props: ["detailTab", "currentTopology"]
};
</script>

<style></style>
