import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/store";
import Vuetify from "vuetify";
import VueHead from "vue-head";
import VueAnalytics from "vue-analytics";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vuetify/dist/vuetify.min.css";
//import theme from "./theme"
//import "@/sass/style.scss"
import "@/stylus/main.styl";
const SocialSharing = require("vue-social-sharing");
Vue.use(SocialSharing);

Vue.use(VueHead);

// for date manipulation
import moment from "moment";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });
// for ordinals
import ordinal from "ordinal-js";
Object.defineProperty(Vue.prototype, "$ordinal", { value: ordinal });

import { sync } from "vuex-router-sync";
sync(store, router);

// Include client side router guards for security
// Before each route is called see if we need to check the JWT token
import Guard from "@/router/guards";
const enableGuards = true;
if (enableGuards) {
  router.beforeEach((to, from, next) => {
    Guard.guardBeforeEach(to, from, next);
  });
} else {
  //
}

//import { Ripple } from "vuetify/lib/directives";
Vue.config.productionTip = false;
Vue.use(Vuetify, {
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
});

// does nto use  G-XZ7X6N61D1 but use the account number in the UA format

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA || "UA-145588321-1",
  router,
  debug: {
    // sendHitTask: process.env.NODE_ENV === "production", // only run on server
    sendHitTask: true
    // enabled: true
  },
  fields: {
    cookieDomain: "auto"
  },
  checkDuplicatedScript: true,
  autoTracking: {}
});

// TODO: write a std plugin that renders content and has behavior

// install common helper functions
import Helper from "./plugins/Helper";
import AppHelper from "./helpers/AppHelper";
Vue.prototype.$helper = Helper;
Vue.use(Helper);

// Add any mixins to modify behavior of all components.
// TODO: general helper methods are probably best in the helper plugin above - this is jsut an example
Vue.mixin({
  methods: {
    capitalizeFirstLetter(str) {
      if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
    siteName() {
      // TODO: have a mapping file so we can decide on the URL
      return "Domun";
    }
  }
});

function formatAsCurrency(value, dec) {
  dec = dec || 0;
  if (value === null) {
    return 0;
  }
  return "" + value.toFixed(dec).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

import Logger from "./helpers/AppLogger";
window.Logger = Logger;
window.logger = Logger;
new Vue({
  router,
  store,
  el: "#app",
  data: () => ({
    //
    currency: "£"
  }),
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  beforeCreate() {
    const existingVersion = AppHelper.getSourceVersion();
    if (
      existingVersion &&
      process.env.VERSION !== AppHelper.getSourceVersion()
    ) {
      AppHelper.setSourceVersion(process.env.VERSION);
      window.location.reload(true);
    } else {
      AppHelper.setSourceVersion(process.env.VERSION);
    }
  },
  created() {
    //
    // TODO get an auto increase version number from env
    this.$vuetify.theme.primary = "#49d586";
    this.$vuetify.theme.secondary = "#f9a825";
    this.$vuetify.theme.accent = "#49d586";
    this.$vuetify.theme.error = "#ff5252";
    this.$vuetify.theme.tertiary = "#fd7574";
    this.$vuetify.theme.quaternary = "#9e9ebd";
  },
  render: function(h) {
    return h(App);
  },
  computed: {
    NewLoanAmountComputed: {
      get: function() {
        return formatAsCurrency(search.filter.NewLoanAmount, 0);
      },
      set: function(newValue) {
        search.filter.NewLoanAmount = Number(newValue.replace(/[^0-9\.]/g, ""));
      }
    },
    store() {
      return this.$store.state;
    },
    password() {
      if (
        this.$store.state.registration &&
        this.$store.state.registration.personalDetails &&
        this.$store.state.registration.personalDetails.password
      ) {
        return this.$store.state.registration.personalDetails.password;
      }
      return false;
    }
  },
  watch: {
    password(nv, ov) {
      if (nv) {
        const registration = this.$store.state.registration;
        delete registration.personalDetails.password;
        this.$store.dispatch("setRegistration", registration);
      }
    }
  },
  mounted() {
    if (this.password) {
      const registration = this.$store.state.registration;
      delete registration.personalDetails.password;
      this.$store.dispatch("setRegistration", registration);
    }
  }
});
