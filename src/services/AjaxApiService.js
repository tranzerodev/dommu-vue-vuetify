import axios from "axios";
import AppHelper from "../helpers/AppHelper";
const envBaseServerApiUrl = process.env.VUE_APP_BASE_SERVER_URL;

const token = AppHelper.getTokenFromCookie();
export default {
  axios: axios.create(),
  token: token,
  config: {
    headers: token
      ? {
          Authorization: "bearer " + token
        }
      : {}
  },
  post(endPoint, payload = {}) {
    return this.axios.post(endPoint, payload, this.config).then(res => {
      this.filterTokenFromResponse(res);
      return res.data;
    });
  },
  put(endPoint, payload = {}) {
    return this.axios.put(endPoint, payload, this.config).then(res => {
      this.filterTokenFromResponse(res);
      return res.data;
    });
  },
  get(endPoint) {
    return this.axios.get(endPoint, this.config).then(res => {
      this.filterTokenFromResponse(res);
      return res.data;
    });
  },
  filterTokenFromResponse(res) {
    if (res.data.token) {
      this.token = AppHelper.getTokenFromCookie();
      this.config.headers.Authorization = "bearer " + res.data.token;
    }
  }
};
