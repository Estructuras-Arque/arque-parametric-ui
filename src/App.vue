<template>
  <div id="app">
    <!-- <window-size /> -->
    <transition name="slidings">
      <router-view :window-size="windowSize" />
    </transition>
  </div>
</template>
<script>
// import WindowSize from "@/components/WindowSize.vue";

export default {
  name: "App",
  data: function() {
    return {
      windowSize: {
        width: null,
        height: null,
        isDesktop: null
      },
      authenticated: false,
      auth: null
    };
  },
  created() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);
      window.addEventListener("resize", this.getWindowType);

      //Init
      this.getWindowType();
      this.getWindowWidth();
      this.getWindowHeight();
    });
    this.isAuthenticated();
    this.auth = this.$auth;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
    window.removeEventListener("resize", this.getWindowType);
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated"
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      // Navigate back to home
      this.$router.push({ path: "/" });
    },
    login() {
      this.$auth.loginRedirect("/app");
    },
    isDesktop() {
      this.windowSize.isDesktop = true;
    },
    getWindowType() {
      if (
        document.documentElement.clientWidth < 1024 &&
        document.documentElement.clientHeight < 2000
      ) {
        this.windowSize.isDesktop = false;
      } else this.windowSize.isDesktop = true;
    },
    // eslint-disable-next-line no-unused-vars
    getWindowWidth(event) {
      this.windowSize.width = document.documentElement.clientWidth;
    },
    // eslint-disable-next-line no-unused-vars
    getWindowHeight(event) {
      this.windowSize.height = document.documentElement.clientHeight;
    }
  }
};
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #cc7a00;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$info: #eac997;
$info-invert: findColorInvert($info);
$warning: #ff9900;
$warning-invert: findColorInvert($warning);
// ::-webkit-scrollbar {
//   height: 6px;
// }
// /* Track */
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   -webkit-border-radius: 50px;
//   border-radius: 50px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   -webkit-border-radius: 50px;
//   border-radius: 50px;
//   background: rgba(74, 74, 74, 0.8);
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
// }

// ::-webkit-scrollbar-thumb:window-inactive {
//   background: rgba(74, 74, 74, 0.8);
// }
/* Let's get this party started */

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;
$tabs-toggle-link-active-background-color: $white;
$tabs-toggle-link-active-color: $dark;
$tabs-toggle-link-border-color: $info;
$tabs-boxed-link-active-background-color: $white;
$tabs-boxed-link-hover-background-color: hsl(0, 0%, 86%);

$tabs-boxed-link-background-color: $grey-light;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "~animate.css";

.slidings-enter-active {
  animation: fadeIn 1s;
}
.slidings-leave-active {
  animation: fadeOut 1s;
}
.slidings-enter-active {
  animation: fadeIn 1s;
}

.loading-overlay.viewer-loading {
  .loading-background {
    background: #ece9e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #ffffff,
      #ece9e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #ffffff,
      #ece9e6
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
