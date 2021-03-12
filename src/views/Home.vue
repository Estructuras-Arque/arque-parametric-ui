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
              <b-button v-if="showTitle" @click="startApp"
                ><p>Sign In</p></b-button
              ></b-tooltip
            ></transition
          >
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot has-background-dark">
        <footer class="footer has-background-dark py-5">
          <div class="content has-text-centered has-background-dark">
            <div
              class="container is-flex is-flex-direction-column has-background-dark p-3"
            >
              <div
                class="is-flex is-justify-content-center has-background-dark is-flex is-align-items-center mb-5"
              >
                <a
                  href="https://linkedin.com/showcase/arque-spatial-systems-sl"
                  class="is-medium"
                  target="_blank"
                >
                  <b-icon
                    type="is-grey"
                    size="is-medium"
                    pack="fab"
                    icon="linkedin-in"
                  ></b-icon> </a
                ><a
                  href="https://github.com/christiandimitri/"
                  class="is-medium"
                  target="_blank"
                >
                  <b-icon
                    type="is-grey"
                    size="is-medium"
                    pack="fab"
                    icon="github-alt"
                  ></b-icon> </a
                ><a
                  href="mailto:spatial@estructurasarque.com"
                  class="is-medium"
                  target="_blank"
                >
                  <b-icon
                    type="is-grey"
                    size="is-medium"
                    pack="fas"
                    icon="envelope"
                  ></b-icon>
                </a>
              </div>
              <div
                class="has-background-dark is-flex is-justify-content-center is-align-items-center mb-5"
              >
                <a
                  href="https://www.rhino3d.com/6/new/grasshopper"
                  target="_blank"
                >
                  <figure class="image is-32x32">
                    <img class="" src="@/assets/rhino.png" />
                  </figure> </a
                ><a href="https://www.shapediver.com/" target="_blank">
                  <figure class="image is-32x32">
                    <img
                      class=""
                      src="https://res.cloudinary.com/postman/image/upload/t_team_logo_pubdoc/v1/team/26cba4f348bf9e2d0049069d2f9fbb41fa16d501b32620229d83249cd6f651bd"
                    />
                  </figure> </a
                ><a href="https://geometrygym.wordpress.com/" target="_blank">
                  <figure class="image is-32x32">
                    <img class="" src="@/assets/GeometryGym.png" />
                  </figure> </a
                ><a href="https://vuejs.org/" target="_blank">
                  <figure class="image is-32x32">
                    <img class="" src="@/assets/logo.png" />
                  </figure> </a
                ><a href="https://www.buildingsmart.org/" target="_blank">
                  <figure class="image is-32x32">
                    <img
                      class=""
                      src="//geometrygym.files.wordpress.com/2020/02/building-smart-logo.png?w=225"
                    />
                  </figure>
                </a>
              </div>
              <div class="has-background-dark">
                <p
                  id="license-released"
                  class="subtitle is-size-6-fullhd is-size-7-widescreen is-size-7-desktop is-size-7-tablet is-size-7-touch is-size-7-mobile has-text-grey has-text-grey"
                >
                  Released under the
                  <a href="https://opensource.org/licenses/MIT" target="_blank"
                    ><strong class="has-text-grey-light">MIT License</strong></a
                  >
                </p>
                <p
                  id="author"
                  class="subitile is-size-6-fullhd is-size-7-widescreen is-size-7-desktop is-size-7-tablet is-size-7-touch is-size-7-mobile has-text-grey"
                >
                  © 2020 ARQUÉ SPATIAL SYSTEMS / APP BY
                  <a href="https://chrisdimi.me/" target="_blank"
                    ><strong class="has-text-grey-light"
                      >CHRISTIAN DIMITRI</strong
                    ></a
                  >
                </p>
              </div>
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
  props: ["windowSize", "isDesktop", "authenticated"],
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
  watch: {
    authenticated: function(newAuth, oldAuth) {
      if (newAuth != oldAuth && newAuth == true) {
        this.startApp();
      }
    }
  },
  methods: {
    async startApp() {
      await this.$router.push({ path: "/app" });
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
.is-centered {
  margin-right: auto;
  margin-left: auto;
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
