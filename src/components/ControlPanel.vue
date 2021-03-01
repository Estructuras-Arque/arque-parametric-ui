/* eslint-disable no-unused-vars */
<template>
  <div
    id="parameters-panel"
    class="column is-one-fifth-fullhd is-one-quarter-desktop has-background-light control-panel tabs-component"
    :class="windowSize.width < 1007 ? 'mobile-height' : ''"
  >
    <b-tabs
      class="has-background-white"
      :class="windowSize.width < 1007 ? 'mobile-height' : ' has-height-third'"
      type="is-toggle"
      size="is-small"
      expanded
      animation="slide-next"
    >
      <b-tab-item label="Parameters" icon="tools">
        <div
          class="container is-fluid is-paddingless has-background-light is-fullheight"
        >
          <b-tabs
            class="params-tabs"
            :position="windowSize.width < 1007 ? 'is-right' : ''"
            size="is-small"
            type="is-boxed"
            :vertical="windowSize.width < 1007 ? true : false"
          >
            <template v-for="(paramTab, index) in paramsTabs">
              <b-tab-item
                v-if="paramTab.displayed == true"
                :icon="paramTab.icon"
                :key="index"
                :label="windowSize.width > 1240 ? paramTab.name : ''"
                id="param-tab"
              >
                <simplebar
                  data-simplebar-auto-hide="true"
                  class="simplebar py-4"
                >
                  <div class="container" v-if="paramTab.name == 'Frame'">
                    <b-field
                      v-if="shapediver"
                      class="mt-1 ml-3 has-text-grey"
                      :message="topologyMessage"
                      label="Topology"
                      label-position="on-border"
                    >
                      <b-dropdown
                        :disabled="!shapediver"
                        focus
                        :mobile-modal="
                          windowSize.isDesktop == false ? true : false
                        "
                        class="pb-1 is-zindex"
                        :scrollable="isScrollable"
                        :max-height="maxHeight"
                        v-model="currentTopology"
                        aria-role="list"
                      >
                        <button
                          class="button is-small is-info is-outlined"
                          type="button"
                          slot="trigger"
                        >
                          <template>
                            <!-- <b-icon :icon="currentTopology.icon"></b-icon> -->
                            <span
                              ><strong>{{ currentTopology.name }}</strong></span
                            >
                          </template>
                          <b-icon icon="angle-down"></b-icon>
                        </button>
                        <b-dropdown-item
                          @click="changeTopology"
                          v-for="(topo, index) in topologies"
                          :id="topo.id"
                          :key="index"
                          :value="topo"
                          aria-role="listitem"
                        >
                          <div class="media">
                            <!-- <b-icon
                                class="media-left"
                                :icon="topo.icon"
                              ></b-icon> -->
                            <div class="media-content">
                              <h3>
                                <strong>{{ topo.name }}</strong>
                              </h3>
                            </div>
                          </div>
                        </b-dropdown-item>
                      </b-dropdown>
                      <p class="control">
                        <button
                          @click="clearStorage"
                          class="button is-info is-outlined is-small"
                        >
                          <b-icon icon="sync-alt"></b-icon>
                        </button>
                      </p>
                    </b-field>
                    <b-field
                      v-for="(param, key, index) in paramTab.params"
                      :key="index"
                      class="param-controllers"
                      :label="param.name"
                      grouped
                    >
                      <b-input
                        @input="onParamChanged(param)"
                        class="is-input-number my-1"
                        size="is-small"
                        v-if="param.type == 'Int' || param.type == 'Float'"
                        v-model.number="param.value"
                        maxlength="param.max"
                        :step="param.type == 'Int' ? 1 : 0.1"
                        type="number"
                        lazy
                      ></b-input>
                      <b-slider
                        type="is-info"
                        size="is-small"
                        @input="onParamChanged(param)"
                        v-if="param.type == 'Int' || param.type == 'Float'"
                        :min="param.min"
                        :max="param.max"
                        v-model="param.value"
                        :step="param.type == 'Int' ? 1 : 0.1"
                        rounded
                        ticks
                        lazy
                      ></b-slider>
                      <b-switch
                        type="is-info"
                        size="is-small"
                        @input="onParamChanged(param)"
                        v-if="param.type == 'Bool'"
                        v-model="param.value"
                      ></b-switch>
                    </b-field>
                  </div>
                  <div class="container" v-else>
                    <b-field
                      v-for="(param, index) in paramTab.params"
                      :key="index"
                      class="param-controllers"
                      :label="param.name"
                      grouped
                    >
                      <b-input
                        @input="onParamChanged(param)"
                        class="is-input-number my-1"
                        size="is-small"
                        v-if="param.type == 'Int' || param.type == 'Float'"
                        v-model.number="param.value"
                        maxlength="param.max"
                        :step="param.type == 'Int' ? 1 : 0.1"
                        type="number"
                        lazy
                      ></b-input>
                      <b-slider
                        type="is-info"
                        size="is-small"
                        @input="onParamChanged(param)"
                        v-if="param.type == 'Int' || param.type == 'Float'"
                        :min="param.min"
                        :max="param.max"
                        v-model="param.value"
                        :step="param.type == 'Int' ? 1 : 0.1"
                        rounded
                        ticks
                        lazy
                      ></b-slider>
                      <b-switch
                        type="is-info"
                        size="is-small"
                        @input="onParamChanged(param)"
                        v-if="param.type == 'Bool'"
                        v-model="param.value"
                      ></b-switch>
                    </b-field>
                  </div>
                </simplebar>
              </b-tab-item>
            </template>
          </b-tabs>
        </div>
      </b-tab-item>

      <!-- TODO -->
      <b-tab-item disabled label="Viewer" icon="eye">
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
      <b-tab-item disabled label="Materials" icon="cube">
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
      <b-tab-item disabled label="Camera" icon="camera-retro">
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
      <b-tab-item disabled label="Lights" icon="lightbulb">
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
      <!-- TODO END-->
    </b-tabs>
  </div>
</template>

<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
  name: "ControlPanel",
  components: {
    simplebar
  },
  props: ["windowSize", "topologies", "shapediver", "paramsTabs", "details"],
  data() {
    return {
      isOpen: 2,
      isScrollable: true,
      maxHeight: 200,
      currentTopology: {
        name: "None Selected",
        loaded: false,
        id: null,
        assets: [],
        paths: [],
        params: [],
        details: [],
        ticket: null,
        icon: null
      },
      topologyMessage: null,
      collapses: [
        {
          title: "Dimensions",
          text: "Text 1"
        },
        {
          title: "Spatial Frame",
          text: "Text 2"
        },
        {
          title: "Columns",
          text: "Text 3"
        }
      ]
    };
  },

  mounted() {
    this.getTopologiesMessage();
    this.currentTopology = this.topologies[0];
    this.changeTopology();
  },
  methods: {
    clearStorage() {
      localStorage.clear();
      location.reload();
    },
    changeTopology() {
      this.$emit("topology-changed", this.currentTopology);
    },
    onParamChanged(param) {
      this.$emit("param-changed", param);
      // console.log(param.value);
    },
    getTopologiesMessage() {
      var count = "(" + this.topologies.length.toString() + ")";
      this.topologyMessage =
        "Select one of the " + count.toString() + " different topologies";
    }
  }
};
</script>

<style lang="scss">
#parameters-panel {
  z-index: 90 !important;
}
.has-height-third {
  height: 720px;
}
.param-controllers {
  margin-right: 1rem;
  margin-left: 1rem;
  .label {
    font-size: 0.8rem;
    font-weight: 500;
  }
  .is-input-number {
    width: 80px;
  }
}
.is-fullheight {
  height: 100%;
}
.has-max-height-4 {
  max-height: 720px;
}
.has-max-height-5 {
  max-height: 400px;
}

.container .has-min-height {
  min-height: 100px;
}

.simplebar {
  width: 100%;
  height: 100%;
}

.params-tabs {
  width: 100%;
  height: 100%;
  box-shadow: 1px 1px 20px 2px rgba(0, 0, 0, 0.19);

  .tabs.is-boxed a {
    background-color: hsl(0, 1%, 90%);
    box-shadow: 2px 0px 6px 2px rgba(0, 0, 0, 0.19);
    border-color: white;
  }

  .tab-content {
    .tab-item {
      background-color: white;
      // margin-top: 100px;
      height: 100%;
      width: 100%;
    }
  }
}

.tabs-component {
  height: 100% !important;
  overflow: hidden;

  .tab-content {
    padding: 0.2rem;
    height: 94%;

    .tab-item {
      height: 100%;
      // background-color: hsl(0, 0%, 96%);
    }
  }
}

.control-panel {
  overflow: hidden;
  ::-webkit-scrollbar {
    height: 3px;
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
    background: rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.mobile-height {
  overflow: hidden;
  height: calc(30vh - 53px) !important;
}
.dropdown.is-mobile-modal > .dropdown-menu {
  z-index: 100 !important;
}
.control-panel {
  padding: 0.75rem !important;
  // z-index: 50;
  overflow: hidden;
  -webkit-box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
}
.control-panel.model-info {
  -webkit-box-shadow: -5px 0px 5px -1px rgba(0, 0, 0, 0.3) !important;
  box-shadow: -5px 0px 5px -1px rgba(0, 0, 0, 0.3) !important;
}
.mobile-control-panel {
  height: 250px;
}
</style>
