import Vue from "vue";
import Router from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import SignupB from "../views/SignupB.vue";
import About from "../views/About.vue";
import Home from "../views/Public/Home/Home.vue"; // TODO: change to NotFoundComponent
import ForgotPassword from "../views/Auth/ForgotPassword/ForgotPassword.vue";
import ResetPassword from "../views/Auth/ResetPassword/ResetPassword.vue";
import Test from "../views/Public/Test/Test.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home-b",
      name: "home-b",
      component: function() {
        return import("../views/HomeEmailFirst.vue");
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/signup-b",
      name: "signup-b",
      component: SignupB
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/blog",
      name: "blog",
      component: function() {
        return import("../views/Blog.vue");
      }
    },
    {
      path: "/glossary",
      name: "glossary",
      component: function() {
        return import("../views/Learn.vue");
      }
    },
    {
      path: "/careers",
      name: "careers",
      component: function() {
        return import("../views/Careers.vue");
      }
    },
    {
      path: "/contact",
      name: "contact",
      component: function() {
        return import("../views/Contact.vue");
      }
    },
    {
      path: "/terms-and-conditions",
      name: "termsAndConditions",
      component: function() {
        return import("../views/TermsAndConditions.vue");
      }
    },
    {
      path: "/privacy-policy",
      name: "privacyPolicy",
      component: function() {
        return import("../views/PrivacyPolicy.vue");
      }
    },
    {
      path: "/my-account/dashboard-b",
      name: "dashboard-b",
      meta: {
        requiresAuth: true
      },
      // TODO: route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function() {
        return import("../views/my-account/DashboardB.vue");
        /* webpackChunkName: "dashboard" ("../views/DashboardB.vue"););*/
      },
      props: true
    },
    {
      path: "/app-env/shows",
      name: "env",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/Public/Env/Env.vue");
      }
    },
    {
      path: "/my-account/dashboard",
      name: "dashboard",
      meta: {
        requiresAuth: true
      },
      // TODO: route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function() {
        return import("../views/my-account/Dashboard/Dashboard.vue");
        /* webpackChunkName: "dashboard" ("../views/Dashboard.vue"););*/
      },
      props: true
    },
    {
      path: "/my-account/profile",
      name: "profile",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/Profile/Profile.vue");
      }
    },
    {
      path: "/my-account/profile/property",
      name: "profile-property",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/ProfilePropertyDetails.vue");
      }
    },
    {
      path: "/my-account/profile/mortgage",
      name: "profile-mortgage",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/ProfileMortgageDetails.vue");
      }
    },
    {
      path: "/my-account/searches",
      name: "searches",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/Searches.vue");
      }
    },
    {
      path: "/my-account/introductions",
      name: "introductions",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/Introductions.vue");
      }
    },
    {
      path: "/my-account/report",
      name: "report",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/Report.vue");
      }
    },
    {
      path: "/my-account/coaching",
      name: "coaching",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/Coaching.vue");
      }
    },
    {
      path: "/my-account/mortgage-cost-ratio",
      name: "mortgageCostRatio",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/MortgageCostRatio.vue");
      }
    },
    {
      path: "/my-account/mortgage-search",
      name: "mortgageSearch",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/MortgageSearch/MortgageSearch.vue");
      }
    },
    {
      path: "/my-account/mortgage-detail",
      name: "mortgageDetail",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/MortgageDetail.vue");
      }
    },
    {
      path: "/my-account/mortgage-introduction",
      name: "mortgageIntroduction",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import(
          "../views/my-account/MortgageIntroduction/MortgageIntroduction.vue"
        );
      },
      props: true
    },
    {
      path: "/my-account/mortgage-introduction-b",
      name: "mortgageIntroductionB",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/MortgageIntroductionB.vue");
      },
      props: true
    },
    {
      path: "/my-account/mortgage-introduction-consent",
      name: "mortgageIntroductionConsent",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import("../views/my-account/MortgageIntroductionConsent.vue");
      },
      props: true
    },
    {
      path: "/my-account/mortgage-introduction-thankyou",
      name: "mortgageIntroductionThankyou",
      meta: {
        requiresAuth: true
      },
      component: function() {
        return import(
          "../views/my-account/MortgageIntroductionThankyou/MortgageIntroductionThankyou.vue"
        );
      },
      props: true
    },
    {
      path: "/share",
      name: "test",
      component: Test
    },
    { path: "*", component: Home }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
