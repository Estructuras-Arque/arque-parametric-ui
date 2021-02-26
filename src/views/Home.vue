<template>
  <div class="home">
    <section class="hero is-fullheight is-bold is-light">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <navbar :authenticated="authenticated" />
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <figure class="image is-square" id="arque-logo">
            <transition name="slide-left">
              <icon-orange v-if="showLogo" />
            </transition>
            <transition name="slide-right">
              <icon-black v-if="showLogo" />
            </transition>
          </figure>
          <transition name="swing">
            <h2
              class="title is-size-3-mobile"
              v-if="showTitle"
              style="padding-bottom:1rem;"
            >
              Arqué Spatial Systems
            </h2>
          </transition>

          <transition name="swing">
            <h1 class="subtitle" v-if="showTitle">
              P A R A M E T R I C . U I
            </h1>
          </transition>

          <transition name="swing">
            <b-tooltip
              type="is-white"
              label="Go to app"
              position="is-bottom"
              :active="true"
            >
              <b-button v-if="showTitle" @click="$router.push({ path: '/app' })"
                ><p v-if="authenticated">Start</p>
                <p v-else>Sign In</p></b-button
              ></b-tooltip
            ></transition
          >
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <footer class="footer has-background-dark py-5">
          <div class="content has-text-centered">
            <div class="columns is-mobile">
              <div class="column has-background-light">Made with:</div>
              <div class="column has-background-light">CopyWrite</div>
              <div class="column has-background-light">Contacts location</div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import IconOrange from "@/components/animatedicons/IconSpatialOrange.vue";
import IconBlack from "@/components/animatedicons/IconSpatialBlack.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  props: ["isDesktop", "authenticated"],
  data() {
    return {
      authIsActive: false,
      showLogo: false,
      showTitle: false,
      showBackB: false,
      startButton: false
    };
  },
  components: {
    IconOrange,
    IconBlack,
    Navbar
  },
  created() {
    this.LoadLogo();
    this.LoadTitle();
    this.LoadBackB();
  },
  methods: {
    login() {
      this.$auth.loginRedirect("/app");
    },
    LoadLogo() {
      setTimeout(this.ShowLogo, 1000);
    },
    ShowLogo() {
      this.showLogo = true;
    },
    LoadTitle() {
      setTimeout(this.ShowTitle, 1000);
    },
    ShowTitle() {
      //       var isActive = false
      //       setTimeout(isActive = true, 1000);
      // if (isActive == true) {
      this.showTitle = true;
      // }
    },
    LoadBackB() {
      setTimeout(this.ShowBackB, 2500);
    },
    ShowBackB() {
      this.showBackB = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.slide-left-enter-active {
  animation: zoomIn 0.6s;
}
.slide-left-leave-active {
  animation: zoomOut 0.6s;
}
.slide-right-enter-active {
  animation: zoomInLeft 0.4s;
}
.slide-right-leave-active {
  animation: zoomOut 0.6s;
}
.swing-enter-active {
  animation: fadeInUp 0.6s;
}
#arque-logo {
  height: 150px;
  width: 150px;
  padding-top: 0;
  position: relative;
  /*top: 100%; */
  left: 50%;
  transform: translateX(-75px);
}
#arque-logo svg {
  position: relative;
}
#arque-logo .black-element {
  position: absolute;
  left: -webkit-calc(50% -75px);
  left: -moz-calc(50% - 75px);
  left: calc(50% - 75px);
}
.hero-foot {
  max-height: 100px !important;
}
</style>
