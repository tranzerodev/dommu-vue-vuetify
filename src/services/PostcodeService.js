import Api from "@/services/ApiGoServer";
export default {
  getAddresses(postcode) {
    postcode = postcode.replace(/ /g, "");
    postcode = postcode.toUpperCase();
    return Api().get("api/v1/addresses?postcode=" + postcode);
  }
};
