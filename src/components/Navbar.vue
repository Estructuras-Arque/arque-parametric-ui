<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item href="http://estructurasarque.com">
        <img
          src="http://estructurasarque.com/wp-content/uploads/2017/11/logo-web-arque.png"
          alt="Lightweight Metal Structures"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/app">
        CloudApp
      </b-navbar-item>
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
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="authenticated" class="buttons">
          <a class="button is-link" @click="$router.push({ path: '/profile' })">
            <strong>Profile</strong>
          </a>
          <a class="button is-info is-outlined" @click="logout">
            <strong>Sign out</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: ["authenticated"],
  methods: {
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
</style>
