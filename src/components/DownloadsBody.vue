<template lang="html">
  <tbody v-if="detail">
    <tr v-for="(table, index) in tables" :key="index">
      <td
        v-for="(info, key) in table"
        :key="key"
        class="is-size-7 has-text-weight-semibold"
        :class="info != 'Available' ? 'has-text-dark' : 'has-text-primary'"
      >
        {{ info }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "DownloadsBody",
  data() {
    return {
      tables: []
    };
  },
  props: ["detail", "customNavigation"],
  watch: {
    detail: function(newData, oldData) {
      if (newData != oldData && oldData) {
        this.tables = [];
        this.organizeInTable(newData);
      } else {
        this.tables = [];
        this.organizeInTable(oldData);
      }
    }
  },
  created() {
    this.organizeInTable(this.detail);
  },
  methods: {
    organizeInTable(data) {
      data.forEach(element => {
        // eslint-disable-next-line no-useless-escape
        this.updateDownloadsList(element, "Available");
      });
    },
    updateDownloadsList(data, status) {
      var info;
      if (data == "ifc" || data == "dxf") {
        info = data + " (calculus)";
      } else info = data;
      this.tables.push({ format: info, status: status });
    }
  }
};
</script>

<style></style>
