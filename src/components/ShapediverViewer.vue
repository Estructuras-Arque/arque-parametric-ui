<template>
  <div
    :class="
      windowSize.width > 1024 && windowSize.height > 1000
        ? 'desktop-sd-viewer'
        : 'mobile-sd-viewer'
    "
  >
    <div
      v-for="topology in topologies"
      :key="topology.index"
      class="sdv-container"
      :id="'sdv-container' + '-' + topology.name.toLowerCase()"
      :class="
        topology.name == currentTopology.name
          ? 'has-background-warning'
          : 'is-hidden'
      "
    >
      {{ currentTopology.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ShapediverViewer",
  props: ["windowSize", "topologies", "currentTopology"],
  data() {
    return {
      maxHeight: 100,
      isScrollable: true,
      loadedTopologies: []
    };
  },
  mounted() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.shapediverInit, false);
    } else {
      this.shapediverInit();
    }
  },
  methods: {
    shapediverInit() {
      var tipoName = this.currentTopology.name.toLowerCase();
      if (!this.loadedTopologies.includes(this.currentTopology.name)) {
        console.log("does not include");
        this.loadedTopologies.push(this.currentTopology.name);
        // console.log(tipoName);
        let _container = document.getElementById(
          "sdv-container" + "-" + tipoName
        );
        let settings = {
          container: _container,
          api: { version: 2, runtimeId: "My_runtime_id" },
          ticket: this.currentTopology.ticket,
          modelViewUrl: "eu-central-1"
        };
        // console.log(settings);
        var shapediver = new window.SDVApp.ParametricViewer(settings);
        console.log(shapediver.getRuntimeId()); // shows 'My_runtime_id'
      } else {
        console.log("includes");
      }
    }
  }
};
</script>

<style lang="scss">
.sdv-container {
  width: 50% !important;
  height: 50vh !important;
}
.viewport-container {
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;

  // overflow: hidden;
  background-color: green;
}
#sdv-container {
  width: 100%;
  height: 100%;
}
.mobile-sd-viewer {
  width: 100%;
  height: 720px !important;
  background-color: hsl(0, 1%, 90%);
}
.desktop-sd-viewer {
  width: 100%;
  height: calc(100vh - 53px) !important;
  background-color: hsl(0, 1%, 90%);
}
</style>
