/* eslint-disable no-unused-vars */
<template>
  <div
    v-if="currentTopology.id != null"
    id="parameters-panel"
    class="column is-one-fifth-fullhd is-one-quarter-desktop has-background-white control-panel tabs-component"
    :class="windowSize.width < 1007 ? 'mobile-height' : ''"
  >
    <b-tabs
      class="has-background-white"
      :class="windowSize.width < 1007 ? 'mobile-height' : 'has-height-third'"
      type="is-toggle"
      size="is-small"
      expanded
      animation="slide-next"
    >
      <b-tab-item
        v-for="(tab, index) in parentTabs"
        :key="index"
        :label="windowSize.width < 1240 ? '' : tab.name"
        :icon="tab.icon"
        :disabled="tab.disabled"
      >
        <div
          v-if="tab.name == 'Parameters'"
          class="container is-fluid is-paddingless has-background-light is-fullheight"
        >
          <simplebar data-simplebar-auto-hide="false" class="simplebar py-4">
            <div v-for="(param, index) in params" :key="index">
              <b-field
                class="px-5"
                v-if="param.plugin == currentTopology.id"
                :label="param.name"
              >
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
              </b-field>
            </div>
          </simplebar>
        </div>
      </b-tab-item>
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
  props: [
    "windowSize",
    "topologies",
    "shapediver",
    "paramsTabs",
    "details",
    "params"
  ],
  data() {
    return {
      isOpen: 2,
      isScrollable: true,
      maxHeight: 100,
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
      parentTabs: [
        {
          name: "Parameters",
          icon: "tools",
          disabled: false
        },
        {
          name: "Viewer",
          icon: "eye",
          disabled: true
        },
        {
          name: "Materials",
          icon: "cube",
          disabled: true
        },
        {
          name: "Camera",
          icon: "camera-retro",
          disabled: true
        },
        {
          name: "Lights",
          icon: "lightbulb",
          disabled: true
        }
      ],
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
    orderedParams(params) {
      return params.slice(0).sort(this.compareOrder);
    },
    compareOrder(a, b) {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    },

    clearStorage() {
      localStorage.clear();
      location.reload();
    },
    changeTopology() {
      this.$emit("topology-changed", this.currentTopology);
    },
    onParamChanged(param) {
      this.$emit("param-changed", param);
      this.$emit("update:change", true);
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
  min-height: 300px;
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
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.4);
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
</style>
