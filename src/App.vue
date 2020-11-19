<template>
  <div id="app">
    <!-- <window-size /> -->
    <transition name="slidings">
      <router-view />
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
        width: 0,
        height: 0
      },
      isDesktop: true,
      authenticated: false,
      auth: null
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.isAuthenticated();
    this.auth = this.$auth;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
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
    handleResize() {
      this.windowSize.width = window.innerWidth;
      // console.log(this.windowSize.width);
      this.windowSize.height = window.innerHeight;
      // console.log(this.windowSize.height);
    }
  }
};
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #3273dc;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$info: #ff9900;
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
