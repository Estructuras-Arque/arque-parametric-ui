/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueCountryCode from "vue-country-code";


// internal icons
import {
    faCheck,
    faCheckCircle,
    faInfoCircle,
    faExclamationTriangle,
    faExclamationCircle,
    faArrowUp,
    faAngleRight,
    faAngleLeft,
    faAngleDown,
    faAngleUp,
    faEye,
    faEyeSlash,
    faCaretDown,
    faCaretUp,
    faUpload,
    faCogs,
    faCog,
    faTools,
    faPlus,
    faMinus,
    faRulerHorizontal,
    faBorderNone,
    faVectorSquare,
    faLightbulb,
    faArrowLeft,
    faArrowRight,
    faSyncAlt,
    faGlobe,
    faPhone,
    faSignature,
    faEnvelope,
    faBuilding,
    faRedo,
    faWindowRestore,
    faCloudDownloadAlt,
    faDrawPolygon,
    faRuler,
    faGripLinesVertical,
    faGripLines,
    faBorderAll
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {
    faGithubAlt,
    faLinkedinIn,
    faInstagram,
    faFacebookF
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
    faCheck,
    faCheckCircle,
    faInfoCircle,
    faExclamationTriangle,
    faExclamationCircle,
    faArrowUp,
    faAngleRight,
    faAngleLeft,
    faAngleUp,
    faAngleDown,
    faEye,
    faEyeSlash,
    faCaretDown,
    faCaretUp,
    faUpload,
    faGithubAlt,
    faEnvelope,
    faLinkedinIn,
    faInstagram,
    faFacebookF,
    faCogs,
    faCog,
    faTools,
    faPlus,
    faMinus,
    faRulerHorizontal,
    faBorderNone,
    faVectorSquare,
    faLightbulb,
    faArrowLeft,
    faArrowRight,
    faSyncAlt,
    faGlobe,
    faPhone,
    faSignature,
    faBuilding,
    faRedo,
    faWindowRestore,
    faCloudDownloadAlt,
    faDrawPolygon,
    faRuler,
    faGripLinesVertical,
    faGripLines,
    faBorderAll
);
Vue.component("vue-fontawesome", FontAwesomeIcon);
import Buefy from "buefy";

Vue.use(Buefy, {
    defaultIconComponent: "vue-fontawesome",
    defaultIconPack: "fas" || "far" || "fab"
});
Vue.use(VueCountryCode);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");