import AuthService from "../services/AuthService";
import AppHelper from "../helpers/AppHelper";
import jwt from "jwt-simple";
const JWT_KEY = process.env.VUE_APP_JWT_KEY;

/**
 * Simple client side route guard to ensure user is authenticated.
 * If the route meta data requires authentication a serverside call is made to validate the token
 * Otherwise, the user will be redirected to the login page.
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function guardBeforeEach(to, from, next) {
  let token = AppHelper.getTokenFromCookie();
  if (!token) {
    AuthService.frontLogout();
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // TODO decide if get from cookie or from session storage
    // let token = AppHelper.getTokenFromBrowserStorage();
    if (!token) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });

      // TODO we could look in JWT for roles, admin broker etc
    } else {
      // see if its valid token
      if (AuthService.isLoggedIn) {
        next();
      } else {
        AuthService.jwtLogin().then(res => {
          next();
        });
      }
      // TODO: maybe see if its authenticated user? maybe a bit over kill for routes. Can do auth server side.
    }
  } else {
    if (AppHelper.getTokenFromCookie() && to.name === "forgot-password") {
      AuthService.logout().then(res => {
        next();
      });
    } else if (token && AuthService.isLoggedIn === false) {
      AuthService.jwtLogin().then(res => {
        next();
      });
    } else {
      next();
    }
  }
}

export default {
  guardBeforeEach
};
