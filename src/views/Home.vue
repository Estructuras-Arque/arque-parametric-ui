<template>
  <div class="home">
    <section class="hero is-fullheight is-bold is-light">
      <!-- Hero head: will stick at the top -->
      <!-- <div class="hero-head">
        <b-navbar>
          <template slot="brand">
            <b-navbar-item href="http://estructurasarque.com">
              <img
                src="http://estructurasarque.com/wp-content/uploads/2017/11/logo-web-arque.png"
                alt="Lightweight UI components for Vue.js based on Bulma"
              />
            </b-navbar-item>
          </template>
          <template slot="start">
            <b-navbar-item href="#">
              Documentation
            </b-navbar-item>
            <b-navbar-dropdown collapsible label="About Us">
              <b-navbar-item href="/about">The team</b-navbar-item>
              <b-navbar-item
                href="http://estructurasarque.com/arque-spatial-systems/"
              >
                Our Services
              </b-navbar-item>
              <b-navbar-item @click="$router.push({ name: 'About' })">
                Contact Us
              </b-navbar-item>
            </b-navbar-dropdown>
          </template>

          <template slot="end" v-if="authIsActive == true">
            <b-navbar-item tag="div">
              <div class="buttons">
                <a class="button is-ghost">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-info is-outlined">
                  Log in
                </a>
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </div> -->

      <!-- Hero content: will be in the middle -->
      <div v-if="!showGif" class="hero-body">
        <div class="container has-text-centered">
          <figure class="image is-square" id="arque-logo">
            <transition :name="showLogo ? 'slide-left' : 'fadeOut'">
              <icon-orange v-if="showLogo" />
            </transition>
            <transition name="slide-right">
              <icon-black v-if="showLogo" />
            </transition>
          </figure>
          <transition :name="showTitle ? 'swing' : 'fade-out-down'">
            <h2
              class="title is-size-3-mobile has-text-grey has-text-semibold"
              v-if="showTitle"
              style="padding-bottom:1rem;"
            >
              Arqué Spatial Systems
            </h2>
          </transition>

          <transition :name="showTitle ? 'swing' : 'fade-out-down'">
            <h1
              class="subtitle is-3 has-text-warning has-text-semibold"
              v-if="showTitle"
            >
              WISHES YOU HAPPY HOLIDAYS & <br />
              A MERRY XMAS
            </h1>
          </transition>
          <!-- <transition name="swing">
            <b-tooltip
              type="is-white"
              label="Go to app"
              position="is-bottom"
              :active="true"
            >
              <b-button
                v-if="showTitle"
                @click="$router.push({ name: 'Viewer' })"
                >Start</b-button
              ></b-tooltip
            ></transition
          > -->
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <!-- <div class="hero-foot">
        <footer class="footer has-background-dark py-5">
          <div class="content has-text-centered">
            <div class="columns is-mobile">
              <div class="column has-background-light">Made with:</div>
              <div class="column has-background-light">CopyWrite</div>
              <div class="column has-background-light">Contacts location</div>
            </div>
          </div>
        </footer>
      </div> -->
      <transition v-else name="slide-left">
        <img
          class="image has-fullheight"
          src="../assets/Xmas.gif"
          alt="description of gif"
        />
      </transition>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import IconOrange from "@/components/animatedicons/IconSpatialOrange.vue";
import IconBlack from "@/components/animatedicons/IconSpatialBlack.vue";

export default {
  name: "Home",
  props: ["isDesktop"],
  data() {
    return {
      authIsActive: false,
      showLogo: false,
      showTitle: false,
      showBackB: false,
      startButton: false,
      showGif: false
    };
  },
  components: {
    IconOrange,
    IconBlack
  },
  created() {
    this.LoadLogo();
    this.LoadTitle();
    this.LoadBackB();
    setTimeout(() => {
      // alert("giff to lunch");
      this.showLogo = false;
      this.showTitle = false;
      this.showGif = true;
    }, 3000);
  },
  methods: {
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
.has-gradiant {
  // background: rgb(2, 0, 36);
  // background: linear-gradient(
  //   180deg,
  //   rgba(2, 0, 36, 1) 0%,
  //   rgba(255, 255, 255, 1) 0%,
  //   rgba(0, 0, 0, 1) 100%
  // );
}
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
  height: 350px;
  width: 350px;
  padding-top: 0;
  position: relative;
  /*top: 100%; */
  left: 50%;
  transform: translateX(-175px);
}
#arque-logo svg {
  position: relative;
}
#arque-logo .black-element {
  position: absolute;
  left: -webkit-calc(50% -175px);
  left: -moz-calc(50% - 175px);
  left: calc(50% - 175px);
}
.hero-foot {
  max-height: 100px !important;
}
.has-fullheight {
  height: 100vh;
}
</style>
