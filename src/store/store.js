import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import jwt from "jwt-simple";
import AppHelper from "../helpers/AppHelper";
import AjaxApiService from "../services/AjaxApiService";
import AuthService from "../services/AuthService";
import _ from "lodash";
import Leads from "./modules/leads-store";

const JWT_KEY = process.env.VUE_APP_JWT_KEY;
const ENABLE_JWT_HASH = process.env.VUE_APP_ENABLE_JWT_HASH;
const vuexPersist = new VuexPersist({
  key: "app-state",
  storage: window.sessionStorage,
  reducer: state => ({
    isInMyAccount: state.isInMyAccount,
    isUserLoggedIn: state.isUserLoggedIn,
    registration: state.registration,
    search: state.search,
    route: state.route,
    cuid: state.cuid,
    leads: state.leads,
    avmStatus: state.avmStatus,
    avmReportStatus: state.avmReportStatus,
    // initialMortgageSearchStatus: state.setInitialMortgageSearchStatus,
    initialMortgageSearchStatus: state.initialMortgageSearchStatus,
    token: state.token // TODO: Move the token to a cookie,
    //user: {id: 35, email: "asdasd@asd.cds",…} // do not store this here
  }),
  restoreState: (key, storage) => {
    const data = storage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        try {
          return jwt.decode(data, JWT_KEY);
        } catch (e) {}
      }
    }
  },
  saveState: (key, state, storage) => {
    if (ENABLE_JWT_HASH === "true") {
      const hash = jwt.encode(state, JWT_KEY);
      storage.setItem(key, hash);
    } else {
      storage.setItem(key, JSON.stringify(state));
    }
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  // strict: true,
  state: {
    token: null,
    cuid: null,
    avmStatus: null,
    avmReportStatus: null,
    initialMortgageSearchStatus: null,
    alert: null,
    errorAlert: null,
    //user: null,
    registration: null,
    search: null,
    isUserLoggedIn: false,
    isInMyAccount: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setCuid(state, cuid) {
      state.cuid = cuid;
    },

    // TODO move all these status under one node
    setAvmStatus(state, avmStatus) {
      state.avmStatus = avmStatus;
    },
    setAvmReportStatus(state, avmReportStatus) {
      state.avmReportStatus = avmReportStatus;
    },
    setInitialMortgageSearchStatus(state, initialMortgageSearchStatus) {
      state.initialMortgageSearchStatus = initialMortgageSearchStatus;
    },
    setAlert(state, alert) {
      state.alert = alert;
    },
    setErrorAlert(state, errorAlert) {
      state.errorAlert = errorAlert;
    },
    // setUser(state, user) {
    //   state.user = user;
    // },
    setRegistration(state, registration) {
      state.registration = registration;
    },
    setSearch(state, search) {
      state.search = search;
    },
    setSearchFilter(state, filter) {
      const search = {
        ...state.search.filter,
        ...filter
      };
      state.search = search;
    },
    setInMyAccount(state, isInMyAccount) {
      state.isInMyAccount = isInMyAccount;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setCuid({ commit }, cuid) {
      commit("setCuid", cuid);
    },
    setAvmStatus({ commit }, avmStatus) {
      commit("setAvmStatus", avmStatus);
    },
    setAvmReportStatus({ commit }, avmReportStatus) {
      commit("setAvmReportStatus", avmReportStatus);
    },
    setInitialMortgageSearchStatus({ commit }, initialMortgageSearchStatus) {
      commit("setInitialMortgageSearchStatus", initialMortgageSearchStatus);
    },
    setAlert({ commit }, alert) {
      commit("setAlert", alert);
    },
    setErrorAlert({ commit }, alert) {
      commit("setErrorAlert", alert);
    },
    // setUser({ commit }, user) {
    //   commit("setUser", user);
    // },
    setRegistration({ commit, state }, registration) {
      let reg = _.cloneDeep(registration);
      if (reg && reg.personalDetails && reg.personalDetails.password) {
        delete reg.personalDetails.password;
      }
      commit("setRegistration", reg);
      // need more check
      if (AuthService.isLoggedIn && state.registration && reg) {
        let r = _.cloneDeep(reg);
        r.lastSearch = {};
        return AjaxApiService.post("/api/v2/auth/update-sign-up", {
          sets: { registration: JSON.stringify(r) }
        }).then(res => {
          return res;
        });
      }
      return Promise.resolve(reg);
    },

    setSearch({ commit }, search) {
      commit("setSearch", search);
      if (AuthService.isLoggedIn && search) {
        let s = _.cloneDeep(search);
        delete s.initialSearch;
        s.lastSearch = {};
        return AjaxApiService.post("/api/v2/auth/update-sign-up", {
          sets: { search: JSON.stringify(s) }
        }).then(res => {
          return res;
        });
      }
      return Promise.resolve(search);
    },

    setSearchFilter({ dispatch, commit, state }, filter) {
      const search = {
        ...state.search,
        ...{
          filter: filter
        }
      };
      return dispatch("setSearch", search);
    },

    setInMyAccount({ commit }, isInMyAccount) {
      commit("setInMyAccount", isInMyAccount);
    },
    logout({ dispatch, commit }, payload) {
      dispatch("setAlert", null);
      dispatch("setToken", null);
      dispatch("setCuid", null);
      dispatch("setAvmStatus", null);
      dispatch("setAvmReportStatus", null);
      dispatch("setInitialMortgageSearchStatus", null);
      commit("setRegistration", null);
      commit("setSearch", null);
      dispatch("setInMyAccount", false);
    },
    loginWith({ dispatch, commit }, payload) {
      if (payload.Signup) {
        commit("setRegistration", JSON.parse(payload.Signup.registration));
      } else {
        alert("Sorry!, You don't have sign up data");
        dispatch("logout");
        return false;
      }
      dispatch("setToken", payload.token);
      dispatch("setCuid", payload.cuid);
      commit("setSearch", JSON.parse(payload.Signup.search));
    }
  },
  modules: {
    leads: Leads
  }
});
