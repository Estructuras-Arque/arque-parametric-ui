<template>
  <div
    :class="
      windowSize.width > 1024 && windowSize.height > 1000
        ? 'desktop-sd-viewer'
        : 'mobile-sd-viewer'
    "
  >
    <div id="sdv-container"></div>
  </div>
</template>

<script>
export default {
  name: "ShapediverViewer",
  props: ["windowSize", "topologies", "currentTopology"],
  data() {
    return {
      cotas: true,
      params: null,
      settings: null,
      setDefinitions: null,
      shapediver: null,
      exampleTicket:
        "85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c"
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
      let _container = document.getElementById("sdv-container");

      let settings = {
        container: _container,
        api: { version: 2, runtimeId: "My_runtime_id" },
        ticket: this.currentTopology.ticket,
        modelViewUrl: "eu-central-1"
      };
      console.log(settings);
      var shapediver = new window.SDVApp.ParametricViewer(settings);

      console.log(shapediver.getRuntimeId()); // shows 'My_runtime_id'
      // // further API v2 objects can be created if needed:
      // var api_other = shapediver.getApiV2({
      //   runtimeId: "My_other_runtime_id"
      // });
      // console.log(api_other.getRuntimeId()); // shows 'My_other_runtime_id'
      // shapediver.scene.addEventListener(
      //   shapediver.scene.EVENTTYPE.VISIBILITY_ON,
      //   () => {
      //     var params = null;
      //     params = shapediver.parameters.get().data;
      //     this.params = params;
      //     this.settings = shapediver.getSettings();
      //     this.setDefinitions = shapediver.getSettingDefinitions();
      //     this.scene = shapediver.scene;
      //     console.log(topology.name, this.params);
      //     this.$emit("viewer-ready");
      //   }
      // );
      // this.shapediver = shapediver;
    }
  }
};
</script>

<style lang="scss">
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
