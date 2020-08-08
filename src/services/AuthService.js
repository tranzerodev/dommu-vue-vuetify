import AjaxApiService from "./AjaxApiService";
import Vuex from "../store/store";
import AppHelper from "../helpers/AppHelper";

export default {
  isLoggedIn: false,
  user: false,
  getUser() {
    if (this.isLoggedIn) {
      return Promise.resolve(this.user);
    } else {
      return AjaxApiService.get("/api/v2/auth").then(
        res => {
          this.isLoggedIn = true;
          this.user = res;
          return this.user;
        },
        error => {
          this.isLoggedIn = false;
          this.user = false;
          delete AjaxApiService.config.headers.Authorization;
          return false;
        }
      );
    }
  },
  verify() {
    return AjaxApiService.get("/api/v2/auth").then(
      res => {
        this.isLoggedIn = true;
        this.user = res;
        return this.user;
      },
      error => {
        this.isLoggedIn = false;
        this.user = false;
        return false;
      }
    );
  },
  verifyHash() {
    const hash = AppHelper.getParameterFromURL("hash");
    return AjaxApiService.post("/api/v2/auth/verify-hash", {
      hash: hash
    }).then(res => {
      return res;
    });
  },
  login(email, password) {
    return AjaxApiService.post("/api/v2/auth/login", {
      email: email,
      password: password
    }).then(res => {
      this.isLoggedIn = true;
      this.user = res.user;
      return res;
    });
  },
  forgotPassword(email) {
    return AjaxApiService.post("/api/v2/auth/forgot-password", {
      email: email
    }).then(res => {
      return res;
    });
  },
  resetPassword(password) {
    const hash = AppHelper.getParameterFromURL("hash");
    return AjaxApiService.post("/api/v2/auth/reset-password", {
      password: password,
      hash: hash
    }).then(res => {
      this.isLoggedIn = true;
      this.user = res.user;
      Vuex.dispatch("loginWith", res);
      Vuex.dispatch("setAlert", "The new password saved correctly");
      return res;
    });
  },
  jwtLogin() {
    return AjaxApiService.post("/api/v2/auth/jwt-login").then(
      res => {
        this.isLoggedIn = true;
        this.user = res.user;
        Vuex.dispatch("loginWith", res);
        return res;
      },
      error => {
        this.isLoggedIn = false;
        this.user = false;
        document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        Vuex.dispatch("logout");
      }
    );
  },
  register(email, password, cuid) {
    return AjaxApiService.post("/api/v2/auth/register", {
      email: email,
      password: password,
      cuid: cuid
    }).then(res => {
      this.user = res.user;
      return res;
    });
  },
  signup(cuid, registration) {
    return AjaxApiService.post("/api/v2/auth/sign-up", {
      cuid: cuid,
      registration: registration
    }).then(res => {
      this.isLoggedIn = true;
      return res;
    });
  },
  logout() {
    return AjaxApiService.post("/api/v2/auth/logout").then(res => {
      this.isLoggedIn = false;
      this.user = false;
      document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      Vuex.dispatch("logout");
      return res;
    });
  },
  frontLogout() {
    this.isLoggedIn = false;
    this.user = false;
    document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    Vuex.dispatch("logout");
  }
};
