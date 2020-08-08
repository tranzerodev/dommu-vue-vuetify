/* eslint-disable no-console */

import { register } from "register-service-worker";
import store from "@/store/store";

// if (process.env.NODE_ENV === "production") {
// TODO: add support for environment specific server workers.
register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {},
  registered() {},
  cached() {},
  updatefound() {},
  updated() {
    // Alerts are handled by content.vue. Note, this text is not displayed but must start with refresh
    store.dispatch("setAlert", "Refresh Alert " + Date.now());
    // TODO: doing it here forces it to refresh, then it thinks it needs to update, so does it again
    // Also its not very please on the user to get teh screen reloaded. We need to fix this
    //window.location.reload(true);
  },
  offline() {},
  error(error) {
    console.error("Error during service worker registration:", error);
  }
});
//} // end of if production
