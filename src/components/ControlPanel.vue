/* eslint-disable no-unused-vars */
<template>
  <div
    id="control-panel"
    class="column has-background-light"
    :class="windowSize.isDesktop ? 'desktop-sd-viewer' : 'mobile-control-panel'"
  >
    <b-tabs
      class="has-background-white tabs-component"
      type="is-toggle"
      size="is-small"
      expanded
    >
      <b-tab-item label="Parameters" icon="tools">
        <div class="section is-paddingless is-fullheight">
          <div
            class="container is-fluid is-paddingless is-fullheight has-background-light"
          >
            <b-tabs
              class="params-tabs"
              :position="windowSize.width < 1024 ? 'is-right' : ''"
              size="is-small"
              type="is-boxed"
              :vertical="windowSize.width < 1024 ? true : false"
            >
              <b-tab-item
                id="param-tab"
                v-for="(paramTab, index) in paramsTabs"
                :key="index"
              >
                <template #header>
                  <b-icon :icon="paramTab.icon"></b-icon>
                  <span
                    class="subtitle is-size-7"
                    v-if="windowSize.width > 1240"
                  >
                    {{ paramTab.name }}
                  </span>
                </template>
                <simplebar
                  data-simplebar-auto-hide="false"
                  :class="
                    windowSize.width < 1024 ? 'has-max-height' : 'simplebar'
                  "
                >
                  <div class="container" v-if="paramTab.name == 'Frame'">
                    <b-field
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
            </b-tabs>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item
        v-if="!windowSize.isDesktop"
        label="Structure Details"
        icon="cubes"
        ><div class="section is-paddingless">
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
      <!-- if mobile models tabs -->
      <b-tab-item
        v-if="!windowSize.isDesktop"
        label="Downloads"
        icon="cloud-download-alt"
      >
        <div class="section is-paddingless">
          <div class="container is-fluid is-paddingless">
            <div class="notification is-info">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book it has?
            </div>
          </div>
        </div>
      </b-tab-item>
      <!-- endif mobile models tabs -->

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
  props: ["windowSize", "topologies", "shapediver", "paramsTabs"],
  data() {
    return {
      isScrollable: true,
      maxHeight: 200,
      currentTopology: {
        name: "None Selected",
        loaded: false,
        id: null,
        assets: [],
        paths: [],
        params: [],
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
      this.$emit("topology-ready", this.currentTopology);
    },
    onParamChanged(param) {
      this.$emit("param-changed", param);
      console.log(param.value);
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
.has-max-height {
  max-height: 500px;
  min-height: 300px;
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
      padding-top: 0.75rem;
      height: 100%;
      width: 100%;
    }
  }
}
.tabs-component {
  height: 100% !important;
  box-shadow: inset 1px 1px 10px 6px rgba(0, 0, 0, 0.08);

  .tab-content {
    padding: 0.2rem;
    height: 94%;

    .tab-item {
      height: 100%;
      // background-color: hsl(0, 0%, 96%);
    }
  }
}

#control-panel {
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

#control-panel {
  padding: 0.75rem !important;
  z-index: 50;
  overflow: hidden;
  -webkit-box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 0px 5px -1px rgba(0, 0, 0, 0.3);
}
.mobile-control-panel {
  height: 450px;
}
</style>