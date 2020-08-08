import Api from "@/services/Api";
import AjaxApiService from "./AjaxApiService";
export default {
  sendClientWelcome(payload) {
    return AjaxApiService.post("/api/v1/email?send=clientWelcome", payload);
  },
  sendClientPasswordReminder(payload) {
    return AjaxApiService.post("/api/v1/email?send=passwordReminder", payload);
  },
  sendClientDetailsToBroker(payload) {
    return AjaxApiService.post(
      "/api/v1/email?send=clientDetailsToBroker",
      payload
    );
  },
  sendCallToAction(payload) {
    return AjaxApiService.post("/api/v1/email?send=callToAction", payload);
  }
};
