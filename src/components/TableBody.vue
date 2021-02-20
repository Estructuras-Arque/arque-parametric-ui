<template lang="html">
  <tbody>
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
      tables: [],
      property: "",
      value: null,
      unit: ""
    };
  },
  props: ["detail"],
  watch: {
    detail: function(newData, oldData) {
      if (newData != oldData && newData != null) {
        this.tables = [];
        this.splitDetailString(newData);
      } else {
        this.tables = [];
        this.splitDetailString(oldData);
      }
    }
  },
  mounted() {
    this.splitDetailString(this.detail);
  },
  methods: {
    splitDetailString(data) {
      for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line no-useless-escape
        this.tables.push(data[i].match(/[\d\.]+|\D+/g));
      }
    }
  }
};
</script>

<style></style>
