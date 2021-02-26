<template>
  <div class="container has-text-centered">
    <table
      class="ui table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead class="is-size-7">
        <tr>
          <th>Claims</th>
          <th>Informations</th>
        </tr>
      </thead>
      <tbody class="is-size-7">
        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{ claim.claim }}</td>
          <td :id="'claim-' + claim.claim">{{ claim.value }}</td>
        </tr>
      </tbody>
    </table>
  </div></template
>

<script>
export default {
  name: "UserDetails",
  props: ["claims"]
};
</script>

<style lang="scss"></style>
