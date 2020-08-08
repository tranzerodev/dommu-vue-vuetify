/*
helper plugin for methods that are used a lot. It is included in main.js
so you  can call anywhere in the components or any where in the application using:
this.$helper.formatMoney()
*/

// This exports the plugin object.
export default {
  // Add what ever methods you want to expose
  formatDate(date) {
    return Intl.DateTimeFormat("en-GB").format(date);
  },

  // round to the specified level of precision
  // 2 rounds to 2 dec places
  // 0 rounds to no dec places
  // -2 rounds to nearest 100
  round(number, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(number * multiplier) / multiplier;
  },

  // round to 1 dec place fixed
  formatApr(number) {
    return parseFloat(parseFloat(this.round(number, 1)).toFixed(1)); // "5.0"
  },
  // round to 2 dec place fixed
  formatInterestRate(number) {
    return parseFloat(parseFloat(this.round(number, 2)).toFixed(2)); // "5.0"
  },
  fm(number) {
    return this.formatMoney(parseFloat(this.round(number, 2)).toFixed(2)); // "5.0"
  },
  fm0(number) {
    return this.formatMoneyHouseValue(number); // "5.0"
  },
  // round to pound
  formatMoneyHouseValue(number) {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  },
  // format money
  formatMoney(number) {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP"
    }).format(number);
  },

  formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  },
  // TODO: move this representativeExample helper else where maybe an representative microservice?
  // representative
  //"A repayment mortgage of £160,000 over 25 years, representative 3.8% APRC. Total amount payable: £249,162.60. Includes interest of £88,163.60, Valuation fee of £0, Booking fee of £999 and Administration fee of £0. Repayments: 24 monthly repayments of £639.15 at 1.49% (variable), then 276 monthly repayments of £843.57 at 4.19% (variable)."
  representativeExample(mortgage) {
    var totlaInterestPayable =
      mortgage["a:TotalAmountPayableOverTerm"][0] -
      mortgage["a:LoanAmount"][0] -
      mortgage["a:TotalFees"][0];
    var discountPeriod = mortgage["a:RateControlPeriod"][0];
    var type = "repayment"; // TODO ask MB where we can get this
    var expectedInterestOnlyAmount =
      (((mortgage["a:FinalRate"][0] / 100) * mortgage["a:LoanAmount"][0]) /
        12) *
      1.1; //fudge factor
    if (mortgage["a:FinalMonthlyPayment"][0] < expectedInterestOnlyAmount) {
      type = "interest only"; // TODO ask MB where we can get this
    }
    var initialRateType = mortgage["a:Notes"][0].toLowerCase();
    var finalRateType = "variable"; // TODO ask MB where we can get this
    var finalRatePayments = 12 * mortgage["a:Term"][0] - discountPeriod;

    var rep =
      "A " +
      type +
      " mortgage of " +
      this.fm(mortgage["a:LoanAmount"][0]) +
      " over " +
      mortgage["a:Term"][0] +
      " years, representative " +
      this.formatApr(mortgage["a:APR"][0]) +
      "% APRC (Annual Percentage Rate of Charge). Total amount payable:" +
      this.fm(mortgage["a:TotalAmountPayableOverTerm"][0]) +
      ". Includes interest of " +
      this.fm(totlaInterestPayable) +
      ", " +
      "Valuation fee of " +
      this.fm(mortgage["a:ValuationAdminFee"][0]) +
      ", Booking fee of  " +
      this.fm(mortgage["a:BookingFee"][0]) +
      " and Administration fee of " +
      this.fm(mortgage["a:TotalAdminFee"][0]) +
      " Product fee of " +
      this.fm(mortgage["a:AddedFees"][0]) +
      " Total fees of " +
      this.fm(mortgage["a:TotalFees"][0]) +
      ".";

    if (discountPeriod > 1) {
      rep =
        rep +
        " Repayments: " +
        discountPeriod +
        " monthly repayments of " +
        this.fm(mortgage["a:InitialMonthlyPayment"][0]) +
        " at " +
        mortgage["a:InitialRate"][0] +
        "% (" +
        initialRateType +
        "), then " +
        finalRatePayments +
        " monthly repayments of " +
        this.fm(mortgage["a:FinalMonthlyPayment"][0]) +
        " at " +
        this.fm(mortgage["a:FinalRate"][0]) +
        "% (" +
        finalRateType +
        ").";
    } else {
      rep =
        rep +
        " Repayments: " +
        finalRatePayments +
        " monthly repayments of " +
        this.fm(mortgage["a:FinalMonthlyPayment"][0]) +
        " at " +
        this.fm(mortgage["a:FinalRate"][0]) +
        "% (" +
        finalRateType +
        ").";
    }

    return rep;
  },

  // All lpugisn need an install method and it will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue, options) {
    // Add or modify global methods or properties.
    //Vue.yourMethod = value => value;
    // Add a component or directive to your plugin, so it will be installed globally to your project.
    //Vue.component('component', Component)
    /*
    // Add `Vue.mixin()` to inject options to all components.
    Vue.mixin({
      // Add component lifecycle hooks or properties.
      created() {
        //
      }
    });
    // Add Vue instance methods by attaching them to Vue.prototype.
    //Vue.property.$myProperty = "This is a Vue instance property.";
    */
  }
};
