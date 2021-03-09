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
    <downloads-body v-if="detailTab" :detail="detailTab.choices" />
  </table>
</template>

<script>
import DownloadsBody from "../components/DownloadsBody.vue";
export default {
  name: "DownloadsTable",
  components: {
    DownloadsBody
  },

  data() {
    return {};
  },

  props: ["detailTab", "columnsTitle", "customNavigation"]
};
</script>

<style></style>
