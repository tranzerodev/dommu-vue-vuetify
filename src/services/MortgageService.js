import Api from "@/services/ApiGoServer";
export default {
  getMbBestBuysByProduct: function() {
    var mortgageJson = {
      Period: "2",
      NumberOfSchemes: "5",
      Adverse: "false",
      DepositEquity: "50000",
      Capped: "false",
      Discounted: "true",
      Fixed: "false",
      Variable: "false",
      Tracker: "false",
      NewLTV: "66",
      NewLoanAmount: "100000",
      CurrentLoanAmount: "100000",
      LoanTerm: "25",
      NumberOfBedrooms: "TWO",
      CurrentValue: "300000",
      PurchaseType: "HOME_MOVER",
      RepaymentBasis: "REPAYMENT",
      RepaymentVehicle: "false",
      SearchBy: "BEST_INTEREST_RATE"
    };

    return Api().post("api/v1/bestbuysbyproduct", mortgageJson, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  // This is used to get mortgage results
  getBestBuysByProduct(mortgageJson) {
    //
    return Api().post("/api/v1/bestbuysbyproduct", mortgageJson);
  }
};
