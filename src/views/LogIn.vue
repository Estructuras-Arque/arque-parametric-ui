<template>
  <div id="login">
    <navbar :authenticated="authenticated" />
    <div class="hero is-small">
      <div class="hero-body">
        <div class="columns container">
          <div class="column has-va-center">
            <b-button
              type="is-info"
              icon-left="angle-left"
              @click="$router.push({ name: 'Home' })"
              >Back</b-button
            >
            <div class="container"></div>
          </div>
          <div class="column">
            <div id="osw-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import Navbar from "../components/Navbar.vue";

export default {
  name: "login",
  components: { Navbar },
  props: ["authenticated"],
  data() {
    return {
      widget: null,
      oktaSignIn: null,
      google: null,
      claims: [],
      error: {
        errorSummary: "API Error",
        errorCauses: [
          {
            errorSummary: "Custom field level error",
            reason: "registration.error.address",
            resource: "User",
            property: "address", //should match field name
            arguments: []
          }
        ]
      }
    };
  },
  async mounted() {
    this.$nextTick(function() {
      this.widget = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: "https://dev-526462.okta.com",
        clientId: "0oa12fq53wsT6tep74x7",
        redirectUri: window.location.origin + "/implicit/callback",
        logo: require("@/assets/logo.png"),
        logoText: "logo text",
        helpSupportNumber: "+34 623 196 662",
        brandName: "Spaghetti Inc.",
        i18n: {
          en: {
            "primaryauth.title": "Sign in to Vue & Company",
            "primaryauth.username.placeholder":
              "Your Computation Geometries Username"
          }
        },
        idps: [
          {
            type: "Linkedin",
            id: "0oa12u1ebmu4k5X4I4x7"
          },
          {
            type: "Google",
            id: "0oa135ztpt9CGBx824x7"
          }
        ],
        oAuthTimeout: 300000,
        registration: {
          // parseSchema: function(schema, onSuccess, onFailure) {
          //   // This example will add an additional field to the registration form
          // schema.profileSchema.properties.address = {
          //   type: "string",
          //   description: "Street Address",
          //   default: "Enter your street address",
          //   maxLength: 255
          // };
          //   // schema.profileSchema.fieldOrder.push("address");
          //   onSuccess(schema);
          //   onFailure(this.error);
          // },
          // preSubmit: function(postData, onSuccess, onFailure) {
          //   // This example will add @companyname.com to the email if user fails to add it during registration
          //   onSuccess(postData);
          //   onFailure(this.error);
          // },
          // postSubmit: function(response, onSuccess, onFailure) {
          //   // handle postsubmit callback
          //   onSuccess(response);
          //   onFailure(this.error);
          // }
        },
        features: {
          // Used to enable registration feature on the widget.
          // https://github.com/okta/okta-signin-widget#feature-flags
          registration: true, // REQUIRED
          idpDiscovery: true,
          router: true
        },
        // An example that adds a custom button underneath the login form on the primary auth page
        customButtons: [
          {
            title: "Go Back",
            className: "btn-customAuth",
            click: function() {
              // clicking on the button navigates to another page
              window.location.href =
                "https://dev-526462.okta.com/oauth2/v1/authorize?idp=0oa12u1ebmu4k5X4I4x7&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}";
            }
          }
        ],
        // helpLinks: {
        //   help: "https://acme.com/help",
        //   forgotPassword: "https://acme.com/forgot-password",
        //   unlock: "https://acme.com/unlock-account",
        //   custom: [
        //     {
        //       text: "What is Okta?",
        //       href: "https://acme.com/what-is-okta"
        //     },
        //     {
        //       text: "Acme Portal",
        //       href: "https://acme.com",
        //       target: "_blank"
        //     }
        //   ]
        // },
        tokenManager: {
          storage: "cookie"
        },
        cookies: {
          secure: true
        },
        authParams: {
          pkce: true,
          issuer: "https://dev-526462.okta.com/oauth2/default",
          display: "page",
          scopes: ["openid", "profile", "email", "phone", "address"]
        }
      });

      this.widget.renderEl(
        { el: "#osw-container" },
        () => {
          /**
           * In this flow, the success handler will not be called because we redirect
           * to the Okta org for the authentication workflow.
           */
        },
        err => {
          throw err;
        }
      );
    });
  },
  destroyed() {
    // Remove the widget from the DOM on path change
    this.widget.remove();
  },
  methods: {
    login() {
      this.$auth.loginRedirect("/app");
    }
  }
};
</script>

<style lang="scss"></style>
