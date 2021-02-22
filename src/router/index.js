/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Viewer from "../views/Viewer.vue";
import Profile from "../views/Profile.vue";
import About from "../views/About.vue";
import Documentation from "../views/Documentation.vue";

import Auth from "@okta/okta-vue";

Vue.use(Auth, {
    issuer: "https://dev-526462.okta.com/oauth2/default",
    clientId: "0oa12fq53wsT6tep74x7",
    redirectUri: window.location.origin + "/implicit/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true
});

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true
        }
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

const onAuthRequired = async(from, to, next) => {
    if (
        from.matched.some(record => record.meta.requiresAuth) &&
        !(await Vue.prototype.$auth.isAuthenticated())
    ) {
        // Navigate to custom login page
        next({ path: "/login" });
    } else {
        next();
    }
};

router.beforeEach(onAuthRequired);

export default router;