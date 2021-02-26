<template lang="html">
  <table
    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
  >
    <thead>
      <tr>
        <th v-for="(cl, index) in columnsTitle" :key="index">
          <abbr class="subtitle is-size-7 has-text-weight-bold" :title="cl">{{
            cl
          }}</abbr>
        </th>
      </tr>
    </thead>
    <table-body v-if="detailTab" :detail="detailTab" />
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
    return {};
  },

  props: ["detailTab", "columnsTitle", "isSplit", "isDownload", "tabIndex"]
};
</script>

<style></style>
