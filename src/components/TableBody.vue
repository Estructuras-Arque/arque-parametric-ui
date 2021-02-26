<template lang="html">
  <tbody v-if="detail">
    <tr v-for="(table, index) in tables" :key="index">
      <td
        v-for="(info, index) in table"
        :key="index"
        class="is-size-7 has-text-weight-semibold"
      >
        {{ info }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TableBody",
  data() {
    return {
      tables: []
    };
  },
  props: ["detail"],
  watch: {
    detail: function(newData, oldData) {
      if (newData != oldData && oldData) {
        this.tables = [];
        this.splitDetailString(newData);
      } else {
        this.tables = [];
        this.splitDetailString(oldData);
      }
    }
  },
  created() {
    this.splitDetailString(this.detail);
  },
  methods: {
    splitDetailString(data) {
      for (let i = 0; i < data.data.length; i++) {
        var element = data.data[i];
        // eslint-disable-next-line no-useless-escape
        this.tables.push(element.match(/[\d\.]+|\D+/g));
      }
    }
  }
};
</script>

<style></style>
