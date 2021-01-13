<template>
  <div id="model-info" class="column has-background-light">
    <div class="container has-background-white tabs-component">
      <b-tabs
        class="has-background-white tabs-component"
        type="is-toggle"
        size="is-small"
        expanded
      >
        <b-tab-item label="Structure Details" icon="cubes">
          <div class="section is-paddingless">
            <div class="container is-fluid is-paddingless">
              <div class="notification is-danger">
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?
              </div>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Downloads" icon="cloud-download-alt">
          <div class="section is-paddingless">
            <div class="container is-fluid is-paddingless">
              <div class="notification is-warning">
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadsPanel",
  props: ["windowSize", "shapediver"]
};
</script>

<style lang="scss">
#model-info {
  padding: 0.75rem !important;
  z-index: 50;
  -webkit-box-shadow: -5px 0px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: -5px 0px 5px -1px rgba(0, 0, 0, 0.3);
}
</style>
