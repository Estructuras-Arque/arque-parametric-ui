/* eslint-disable no-unused-vars */
<template>
  <div id="control-panel" class="column has-background-light">
    <b-tabs
      id="panel-tabs"
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
                  <!-- <span> {{ paramTab.name }} </span> -->
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
                        class="pb-1"
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
                        <button class="button is-info is-outlined is-small">
                          <b-icon icon="sync-alt"></b-icon>
                        </button>
                      </p>
                    </b-field>
                  </div>
                  <div class="container" v-else>
                    <button class="button is-info is-outlined is-small">
                      <b-icon icon="sync-alt"></b-icon>
                    </button>
                    <b-field
                      class="has-text-grey"
                      message="Feel free to select one of the following topolgies"
                      label="Topology"
                      label-position="on-border"
                    >
                      <b-dropdown
                        class="pb-1"
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
                            <b-icon :icon="currentTopology.icon"></b-icon>
                            <span>{{ currentTopology.name }}</span>
                          </template>
                          <b-icon icon="angle-down"></b-icon>
                        </button>
                        <b-dropdown-item
                          v-for="(topo, index) in topologies"
                          :key="index"
                          :value="topo"
                          aria-role="listitem"
                        >
                          <div class="media">
                            <b-icon
                              class="media-left"
                              :icon="topo.icon"
                            ></b-icon>
                            <div class="media-content">
                              <h3>{{ topo.name }}</h3>
                            </div>
                          </div>
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-field>
                    <div v-for="i in 2" :key="i">
                      <b-field
                        label="Compact, rounded and right aligned controls"
                      >
                        <b-numberinput
                          size="is-small"
                          controls-alignment="right"
                          controls-position="compact"
                          controls-rounded
                        ></b-numberinput>
                      </b-field>
                    </div>
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

      <!-- TODO -->
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
  props: ["windowSize", "topologies"],
  data() {
    return {
      paramsTabs: [
        {
          name: "Frame",
          icon: "draw-polygon",
          params: []
        },
        {
          name: "Dimensions",
          icon: "ruler",
          params:
            "What light is light, if Silvia be not seen? What joy is joy, if Silvia be not by - Unless it be to think that she is by And feed upon the shadow of perfection? Except I be by Silvia in the night, There is no music in the nightingale."
        },
        {
          name: "Subdivisions",
          icon: "border-all",
          params:
            "What light is light, if Silvia be not seen? What joy is joy, if Silvia be not by - Unless it be to think that she is by And feed upon the shadow of perfection? Except I be by Silvia in the night, There is no music in the nightingale."
        },
        {
          name: "Columns",
          icon: "grip-lines-vertical",
          params:
            "What light is light, if Silvia be not seen? What joy is joy, if Silvia be not by - Unless it be to think that she is by And feed upon the shadow of perfection? Except I be by Silvia in the night, There is no music in the nightingale."
        }
      ],
      isScrollable: true,
      maxHeight: 200,
      currentTopology: {
        name: "Rectangular",
        ticket:
          "22572ea61710ec728bfa3501c0f677911f379317103074c57998495eaca3c1a7034d12c9e47255fa97cfbdf469f79b7e4558f797d4f90a3602e082e271d2155a55a912e0999c769d7b1d864858934ab12b0490504c6a95242cebbacea3d27c765816d53e4982f307d208e92e5f95f766c572b2129ca7-cf75af7365fcd996aef3db010da65c5f",
        icon: "globe"
      },
      topologyMessage: null,
      parametersTab: 1,
      modifiersTab: 0,
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
  },
  methods: {
    changeTopology() {
      this.$emit("topology-ready", this.currentTopology);
      // console.log("on topology clicked: ", this.currentTopology.ticket);
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
.is-fullheight {
  height: 100%;
}
.has-max-height {
  max-height: 300px;
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
</style>
