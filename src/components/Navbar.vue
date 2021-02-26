<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item @click="$router.push({ path: '/' })">
        <img
          src="http://estructurasarque.com/wp-content/uploads/2017/11/logo-web-arque.png"
          alt="Lightweight Metal Structures"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/documentation">
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
      <b-navbar-item
        v-if="$router.currentRoute.fullPath != '/app'"
        class="has-text-weight-semibold"
        href="/app"
      >
        CloudApp
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="authenticated" class="buttons">
          <button
            class="button is-light rounded ml-2"
            :class="$router.currentRoute.fullPath == '/app' ? '' : 'is-hovered'"
            @click="$router.push({ name: 'Profile' })"
          >
            <b-icon icon="user-circle" size="is-large" type="is-primary">
            </b-icon>
          </button>
          <a class="button is-light" @click="logout">
            <b-icon icon="sign-out-alt" size="is-large" type="is-primary" />
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      window: {}
    };
  },
  props: ["authenticated"],

  methods: {
    accessUserProfile() {
      this.$router.push({ name: "Profile" });
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      // Navigate back to home
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss">
.navbar {
  height: 100% !important;
}
.rounded {
  border-radius: 50% !important;
}
</style>
