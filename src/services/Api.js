import axios from "axios";

const envBaseServerApiUrl = process.env.VUE_APP_BASE_SERVER_URL;

export default () => {
  return axios.create({
    baseURL: envBaseServerApiUrl
  });
};
