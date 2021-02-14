<template>
  <div
    class="column is-one-fifth-fullhd is-one-fifth-desktop control-panel model-info"
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
                <b-collapse
                  class="card mb-1"
                  animation="slide"
                  v-for="(dts, index) in details"
                  :key="index"
                  :open="isOpen == index"
                >
                  <template #trigger="props">
                    <div class="card-header" role="button">
                      <p
                        class="card-header-title is-size-7 has-text-weight-bold"
                      >
                        {{ dts.name }} - {{ dts.plugin }}
                      </p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'angle-down' : 'angle-up'">
                        </b-icon>
                      </a>
                    </div>
                  </template>
                  <div class="card-content is-paddingless">
                    <div class="content">
                      <table
                        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                      >
                        <thead>
                          <tr>
                            <th v-for="(value, index) in row" :key="index">
                              <abbr
                                class="is-size-7 has-text-weight-bold"
                                :title="value"
                                >{{ value }}</abbr
                              >
                            </th>
                          </tr>
                        </thead>
                        <!-- <tfoot>
                          <tr>
                            <th><abbr title="Position">Pos</abbr></th>
                          </tr>
                        </tfoot> -->
                        <tbody>
                          <tr v-for="(data, index) in dts.data" :key="index">
                            <th v-for="(detail, index) in data" :key="index">
                              <p
                                class="is-size-7 has-text-weight-semibold"
                                v-if="index == 0"
                              >
                                {{ detail }}
                              </p>
                              <p
                                class="is-size-7 has-text-weight-normal"
                                v-if="index != 0"
                              >
                                {{ detail }}
                              </p>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </simplebar>
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
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
  name: "DownloadsPanel",
  props: ["windowSize", "shapediver", "currentTopology", "details"],
  components: { simplebar },
  data() {
    return {
      isOpen: 2,
      row: ["Name:", "Value", "Unit"]
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
