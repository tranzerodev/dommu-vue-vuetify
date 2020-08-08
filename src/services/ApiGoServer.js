import axios from "axios";

const envBaseApiUrl = process.env.VUE_APP_BASE_API_URL;

export default () => {
  return axios.create({
    baseURL: envBaseApiUrl
  });
};
