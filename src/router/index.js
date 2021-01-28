/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import Viewer from "../views/Viewer.vue";
import About from "../views/About.vue";
import Documentation from "../views/Documentation.vue";

import Auth from "@okta/okta-vue";

const redirectUri = process.env.VUE_APP_OKTA_REDIRECT_URI;

Vue.use(Auth, {
    issuer: "https://dev-526462.okta.com/oauth2/default",
    clientId: "0oap9gpp9ld7EBWaB4x6",
    redirectUri,
    scopes: ["openid", "profile", "email", "phone", "address"],
    pkce: true
});

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn
    },
    {
        path: "/implicit/callback",
        component: Auth.handleCallback()
    },
    {
        path: "/app",
        name: "Viewer",
        component: Viewer,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/about",
        name: "About",
        component: About
    },
    {
        path: "/documentation",
        name: "Documentation",
        component: Documentation,
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
Vue.use(VueRouter);

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;