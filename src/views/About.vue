<template>
  <div class="viewport-container">
    <b-dropdown
      class="pb-1 is-absolute is-higher"
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
          <div class="media-content">
            <h3>
              <strong>{{ topo.name }}</strong>
            </h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
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
  name: "About",
  props: ["windowSize"],
  data() {
    return {
      maxHeight: 100,
      isScrollable: true,
      loadedTopologies: [],
      currentTopology: {
        name: "Rectangular",
        index: 0,
        ticket:
          "22572ea61710ec728bfa3501c0f677911f379317103074c57998495eaca3c1a7034d12c9e47255fa97cfbdf469f79b7e4558f797d4f90a3602e082e271d2155a55a912e0999c769d7b1d864858934ab12b0490504c6a95242cebbacea3d27c765816d53e4982f307d208e92e5f95f766c572b2129ca7-cf75af7365fcd996aef3db010da65c5f",
        icon: "globe"
      },
      topologies: [
        {
          name: "Rectangular",
          index: 0,
          ticket:
            "22572ea61710ec728bfa3501c0f677911f379317103074c57998495eaca3c1a7034d12c9e47255fa97cfbdf469f79b7e4558f797d4f90a3602e082e271d2155a55a912e0999c769d7b1d864858934ab12b0490504c6a95242cebbacea3d27c765816d53e4982f307d208e92e5f95f766c572b2129ca7-cf75af7365fcd996aef3db010da65c5f",
          icon: "globe"
        },
        {
          name: "Arch",
          index: 1,
          ticket:
            "674c96267e7abfc9ad56d2eaed1de3e5040486649a65850b0d5b094ab1f33e45dbb7527877c5fda41adf9b9dfdc83f35e43b7fc852ef188f598f778ba78dbd58ad8f4f81dbeb811eefba6b165c442433fadc80dcce1c4f6f7b63800de38f053a1e824f5c6a8291cfd8fb614fc53a5b6333439d253f4d-bbb6c0f4d591df5bf2e77161f424bd06",
          icon: "phone"
        },
        {
          name: "Monopich",
          index: 2,
          ticket:
            "3422a552bddaad005dbe773ddaef0efefca0881f3b1d70db27e3103bb7f336aa62839005315e2aeb8dbf5f5f4bcab44529982a6e35a7af1a78f5d51c13d2c1dd75ea819ed569403b8eee7fa2ff1447adc86e3184c9bf4f1ce4404512a6694fa187b128482804e3079ce784e4dea80182e757bb1cbb7c-38e7ecc6f4bd38bd7147da84e21e801b",
          icon: "cogs"
        },
        {
          name: "Duopich",
          index: 3,
          ticket:
            "d96bfde054293d49d4266a9313e62dc971525fd5a962800c35c8c9d7122483f1b21dd3267802e2b1446eaa40f9fe277d797acc75b03b826d4dbcea6e1fa33c94016f0f83a3271c6461e2d9820fdc755fb94f2b1f19381b51970d1b54295e45f9c81f7f75a4cc8b6e0e30ea57792eaa3670e0496cc067-e60364391a0c2eb405acb24c580b2199",
          icon: "cogs"
        }
      ]
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
    changeTopology() {
      this.shapediverInit();
    },
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
<style lang="scss" scoped>
.is-absolute {
  position: absolute;
}

.is-higher {
  z-index: 1000;
}

.sdv-container {
  width: 100vw !important;
  height: 100% !important;
}
.viewport-container {
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  // flex-direction: row;
  flex-wrap: wrap;

  overflow: hidden;
  background-color: green;
}
</style>
