import Api from "@/services/ApiGoServer";
import { testFluentLead } from "@/data/fluentTestLead.json";

export default {
  sendFluentTestLead: function() {
    var leadJson = testFluentLead;

    return Api().post("/api/v1/leads/fluent?method=loan", leadJson, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  // TODO: use or remove
  sendLoanLead(leadJson) {
    //
    return Api().post("/api/v1/leads/fluent?method=loan", leadJson, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
