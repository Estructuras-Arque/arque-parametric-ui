<template lang="html">
  <div
    class="column is-one-fifth-fullhd is-one-quarter-desktop control-panel model-info"
  >
    <div class="container has-background-light tabs-component">
      <b-tabs
        class="has-background-white tabs-component"
        type="is-toggle"
        size="is-small"
        expanded
      >
        <b-tab-item label="Structure Details" icon="table">
          <div class="section is-paddingless info-panel">
            <simplebar data-simple-bar-auto-hide="false" class="simplebar">
              <div class="container is-paddingless">
                <collapse
                  :details="details"
                  :current-topology="currentTopology"
                  :isOpen="isOpen"
                />
              </div>
            </simplebar>
          </div>
        </b-tab-item>
        <b-tab-item label="Downloads" icon="cloud-download-alt">
          <div class="section is-paddingless">
            <div class="container is-fluid is-paddingless">
              <p class="notification is-warning">
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?
              </p>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import Collapse from "@/components/Collapse.vue";
export default {
  name: "DownloadsPanel",
  props: ["windowSize", "shapediver", "currentTopology", "details"],
  components: { simplebar, Collapse },
  data() {
    return {
      isOpen: 2
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.info-panel {
  margin-top: 0.2em;
  -webkit-box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.19);
}
</style>
