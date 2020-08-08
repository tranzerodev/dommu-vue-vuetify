import Api from "@/services/ApiGoServer";
export default {
  getHomeTrackAvmData: function() {
    var avmJson = {
      Apikey: "861c6163-f369-40e6-8585-b4d5190e57ee",
      Property: {
        Bedrooms: 3,
        Receptions: 1,
        Reference: "casafiTestTHardcoded",
        Address: "22 Greenhurst Road",
        Postcode: "SE27 0LH",
        PropertyType: "end terrace house"
      }
    };

    return Api().post("api/v1/avm", avmJson, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  getHomeTrackAvmReportData: function() {
    var avmReportJson = {
      transactionId: "10000023-DD27-4E7C-9032-D37993DEA650",
      address: "131 GLENGALL ROAD LONDON",
      postcode: "NW6 7HH",
      bedrooms: 2,
      propertyType: "House - Detached",
      receptions: 1,
      yearBuilt: 1900,
      floorArea: 90,
      valuationDate: "2016-04-12",
      reference: "casafiTESTHardcoded"
    };

    return Api().post("api/v1/avm-report", avmReportJson, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  // TODO: use or remove
  getAvm(propertyDetailsJson) {
    var avmJson = { Apikey: "861c6163-f369-40e6-8585-b4d5190e57ee" };
    avmJson.Property = propertyDetailsJson;
    avmJson.Property.Reference = "casafiTESTAvm";
    return Api().post("/api/v1/avm", avmJson);
  },

  getAvmReport(propertyDetailsJson) {
    const avmReportJson = propertyDetailsJson;
    avmReportJson.reference = "casafiTESTAvmReport";
    return Api().post("/api/v1/avm-report", avmReportJson);
  }
};
