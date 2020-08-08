import Api from "@/services/Api";
import AjaxApiService from "./AjaxApiService";
export default {
  signup(credentials) {
    return AjaxApiService.post("/api/v1/signup", credentials);
  },
  register(credentials) {
    return AjaxApiService.post("/api/v1/register", credentials);
  },
  registerPut(credentials) {
    return AjaxApiService.put("/api/v1/register", credentials);
  },
  login(credentials) {
    return AjaxApiService.post("/api/v1/login", credentials);
  },
  verify(credentials) {
    return AjaxApiService.post("/api/v1/verify", credentials);
  },
  auth(credentials) {
    return AjaxApiService.post("/api/v1/auth", credentials);
  },
  logout(credentials) {
    return AjaxApiService.post("/api/v1/logout", credentials);
  }
};
