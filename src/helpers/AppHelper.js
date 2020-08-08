import jwt from "jwt-simple";
const JWT_KEY = process.env.VUE_APP_JWT_KEY;
const ENABLE_JWT_HASH = process.env.VUE_APP_ENABLE_JWT_HASH;

export default {
  getTokenFromCookie() {
    return this.getCookie("jwt");
  },
  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
    return false;
  },
  getTokenFromBrowserStorage() {
    const appState = sessionStorage.getItem("app-state");
    if (appState) {
      try {
        if (ENABLE_JWT_HASH === "true") {
          const browserStorage = jwt.decode(appState, JWT_KEY);
          return browserStorage.token;
        } else {
          return JSON.parse(appState).token;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  getBrowserStorage() {
    const appState = sessionStorage.getItem("app-state");
    if (appState) {
      try {
        if (ENABLE_JWT_HASH === "true") {
          return jwt.decode(appState, JWT_KEY);
        } else {
          return JSON.parse(appState).token;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  getSourceVersion() {
    return localStorage.getItem("SOURCE_VERSION");
  },
  setSourceVersion(v) {
    return localStorage.setItem("SOURCE_VERSION", v);
  },
  getParameterFromURL(param, url = window.location.href) {
    let urlHandle = new URL(url);
    return urlHandle.searchParams.get(param);
  }
};
