<template>
  <div id="viewer">
    <b-loading
      :is-full-page="true"
      :active="isLoading"
      :can-cancel="false"
      class="viewer-loading"
    >
    </b-loading>
    <b-navbar id="viewer-navbar" class="has-background-light" shadow>
      <template slot="brand">
        <b-navbar-item href="http://estructurasarque.com">
          <img
            src="http://estructurasarque.com/wp-content/uploads/2017/11/logo-web-arque.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template type="is-light" slot="start">
        <b-navbar-item href="/">
          Home
        </b-navbar-item>
        <b-navbar-item href="#">
          Documentation
        </b-navbar-item>
        <b-navbar-dropdown collapsible label="About Us">
          <b-navbar-item
            href="http://estructurasarque.com/arque-spatial-systems/"
          >
            Our Services
          </b-navbar-item>
          <b-navbar-item href="mailto:spatial@estructurasarque.com">
            Contact Us
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-info is-outlined">
              <strong>Sign Out</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- desktop format -->
    <div class="columns is-desktop is-gapless is-fullheight">
      <!-- control panel -->
      <div
        id="control-panel"
        class="column is-one-fifth has-background-light is-higher"
      >
        <nav class="panel">
          <b-tabs v-model="activeTab" size="is-small" type="is-boxed">
            <b-tab-item label="Model" icon="cogs">
              <div class="fixed-params">
                <p class="title is-6 has-text-weight-medium">
                  Structure's Parameters:
                </p>
              </div>
              <b-field
                custom-class="has-text-danger"
                message="Select your desired topology"
              >
                <div class="pr-2" id="topologies-button">
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
                        <p
                          class="is-hidden-desktop-only	is-hidden-tablet-only is-hidden-mobile-only"
                        >
                          <span>{{ currentTopology.name }}</span>
                        </p>
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
                        <b-icon class="media-left" :icon="topo.icon"></b-icon>
                        <div class="media-content">
                          <h3>{{ topo.name }}</h3>
                        </div>
                      </div>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div id="reset-button">
                  <b-tooltip
                    type="is-info"
                    multilined
                    label="Resetting the parameters to its default value, this action is irreversible"
                    position="is-right"
                  >
                    <button class="button is-small">
                      <b-icon icon="sync-alt" size="is-small"> </b-icon>
                      <span class="">Reset</span>
                    </button>
                  </b-tooltip>
                </div>
              </b-field>

              <b-tabs
                class="pt-5"
                v-model="parametersTab"
                size="is-small"
                type="is-toggle"
              >
                <b-tab-item label="Customize" icon="draw-polygon">
                  <!-- <div id="parameters-content">
                        Nunc nec velit nec libero vestibulum eleifend. Curabitur
                        pulvinar congue luctus. Nullam hendrerit iaculis augue
                        vitae ornare. Maecenas vehicula pulvinar tellus, id
                        sodales felis lobortis eget.
                      </div> -->
                </b-tab-item>
                <b-tab-item label="Dimensions" icon="ruler">
                  <div id="parameters-content">
                    <div v-for="n in 30" :key="n">Example content</div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Subdivisons" icon="border-all">
                  <!-- <div id="parameters-content">
                        Nunc nec velit nec libero vestibulum eleifend. Curabitur
                        pulvinar congue luctus. Nullam hendrerit iaculis augue
                        vitae ornare. Maecenas vehicula pulvinar tellus, id
                        sodales felis lobortis eget.
                      </div> -->
                </b-tab-item>
                <b-tab-item label="Columns" icon="grip-lines-vertical">
                  <!-- <div id="parameters-content">
                        Nunc nec velit nec libero vestibulum eleifend. Curabitur
                        pulvinar congue luctus. Nullam hendrerit iaculis augue
                        vitae ornare. Maecenas vehicula pulvinar tellus, id
                        sodales felis lobortis eget.
                      </div> -->
                </b-tab-item>
              </b-tabs>
            </b-tab-item>
            <b-tab-item label="Viewer" disabled icon="tools"> </b-tab-item>
          </b-tabs>
        </nav>
      </div>
      <!-- shapediver viewer -->
      <div id="viewport" class="column is-three-fifths has-background-white">
        Shapediver Viewer
      </div>
      <!-- downloads -->
      <div
        id="model-info"
        class="column is-one-fifth has-background-light is-higher"
      >
        <b-tabs type="is-boxed" expanded>
          <b-tab-item icon="info-circle" label="Model Details">
            <section>
              <b-collapse
                class="card"
                animation="fade"
                v-for="(collapse, index) of collapses"
                :key="index"
                :open="isOpen == index"
                @open="isOpen = index"
              >
                <div
                  slot="trigger"
                  slot-scope="props"
                  class="card-header"
                  role="button"
                >
                  <p class="card-header-title">
                    {{ collapse.title }}
                  </p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'angle-down' : 'angle-up'">
                    </b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    {{ collapse.text }}
                  </div>
                </div>
              </b-collapse>
            </section>
          </b-tab-item>
          <b-tab-item icon="cloud-download-alt" label="Downloads"></b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Viewer",

  data() {
    return {
      currentTopology: { name: "Rectangular", ticket: 0, icon: "globe" },
      isScrollable: true,
      maxHeight: 200,
      topologies: [
        { name: "Rectangular", index: 0, ticket: 0, icon: "globe" },
        { name: "Arch", index: 1, ticket: 1, icon: "phone" },
        { name: "Monopich", index: 3, ticket: 3, icon: "cogs" },
        { name: "Duoopich", index: 4, ticket: 4, icon: "cogs" },
        { name: "Conical", index: 5, ticket: 5, icon: "cogs" }
      ],
      windowSize: {
        width: 0,
        height: 0
      },
      parametersTab: 1,
      activeTab: 0,
      isLoading: true,
      isOpen: 0,
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
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowSize.width = window.innerWidth;
      // console.log(this.windowSize.width);
      this.windowSize.height = window.innerHeight;
      // console.log(this.windowSize.height);
    }
  }
};
</script>

<style lang="scss" scoped>
#viewer {
  height: 100vh !important;
  width: 100% !important;
  overflow: hidden;
}

.fixed-params {
  width: 100%;
  min-height: 40px;
  max-height: 50px;
}

// .is-fullwidth {
//   width: 100vw;
// }
.is-higher {
  z-index: 90;
}
#control-panel {
  padding: 0.75rem !important;
  -webkit-box-shadow: 1px 0px 5px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.5);
}
#model-info {
  -webkit-box-shadow: -1px 0px 5px -1px rgba(0, 0, 0, 0.5);
  box-shadow: -1px 1px 5px -1px rgba(0, 0, 0, 0.5);
}
#viewer-navbar {
  z-index: 100;
  -webkit-box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
}
#viewport {
  height: 100% !important;
}
</style>
