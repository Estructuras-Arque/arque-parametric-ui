<template>
  <div
    id="model-info"
    class="column is-one-fifth-fullhd is-one-fifth-desktop has-background-light"
  >
    <div class="container has-background-white tabs-component">
      <b-tabs
        class="has-background-white tabs-component"
        type="is-toggle"
        size="is-small"
        expanded
      >
        <b-tab-item label="Structure Details" icon="table">
          <div class="section is-paddingless is-fullheight">
            <div
              class="container is-paddingless is-fullheight has-background-light"
            >
              <simplebar
                data-simple-bar-auto-hide="false"
                class="is-fullheight"
              >
                <b-collapse
                  class="card mb-1"
                  animation="slide"
                  v-for="(details, index) of this.allDetails"
                  :key="index"
                  :open="isOpen == index"
                  @open="isOpen = index"
                >
                  <template #trigger="props">
                    <div class="card-header" role="button">
                      <p class="card-header-title is-size-7">
                        {{ details.name }}
                      </p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'angle-down' : 'angle-up'">
                        </b-icon>
                      </a>
                    </div>
                  </template>
                  <div class="card-content">
                    <div class="content">
                      <table class="table">
                        <thead>
                          <tr>
                            <th
                              v-for="(detail, index) in details.data"
                              :key="index"
                            >
                              <abbr title="Position">{{ detail }}</abbr>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </b-collapse>
              </simplebar>
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
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
  name: "DownloadsPanel",
  props: ["windowSize", "shapediver", "currentTopology"],
  components: { simplebar },
  data() {
    return {
      allDetails: [],
      isOpen: 0,
      detailsName: ["Count:", "Weight:", "Weight/m²:"]
    };
  },
  mounted() {
    this.detailsReady();
    this.orderBy();
  },
  methods: {
    async detailsReady() {
      this.allDetails = this.currentTopology.details;
    },
    orderBy() {
      // sort by name
      this.allDetails.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
  }
};
</script>

<style lang="scss">
#model-info {
  padding: 0.75rem !important;
  z-index: 50;
  overflow: hidden;
  -webkit-box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
}
#model-info {
  ::-webkit-scrollbar {
    height: 6px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background: rgba(74, 74, 74, 0.8);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background-color: rgba(74, 74, 74, 0.8);
  }
}
</style>
