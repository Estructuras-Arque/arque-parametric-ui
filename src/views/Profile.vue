<template>
  <div class="profile">
    <navbar :authenticated="authenticated" />
    <h1 class="ui header">
      <i aria-hidden="true" class="drivers license outline icon"> </i>
      My User Profile (ID Token Claims)
    </h1>
    <p>
      Below is the information from your ID token which was obtained during the
      <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce"
        >PKCE Flow</a
      >
      and is now stored in local storage.
    </p>
    <p>
      This route is protected with the <code>onAuthRequired</code>, navigation
      guard which will ensure that this page cannot be accessed until you have
      authenticated.
    </p>
    <user-details :claims="claims" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserDetails from "@/components/UserDetails.vue";
export default {
  name: "Profile",
  props: ["authenticated", "claims"],
  components: {
    Navbar,
    UserDetails
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
