import { CircleLoader } from "@saeris/vue-spinners";

import { estimateChangeReasonList } from "@/data/propertyTypeLists.json";

const clonedeep = require("lodash.clonedeep");

export default {
  name: "signupMortgage",
  components: {
    "circle-loader": CircleLoader
  },
  props: {
    msgObject: Object
  },
  data() {
    return {
      // this is the main data holder
      reg: "Registration Details", // holder for the registration properties passed in
      currency: "£",
      estimateChangeReasonList,
      hasRegistration: false,
      hasAvm: false,
      hasAvmValuation: false,
      hasAvmError: false,
      show: null,
      error: null,
      visible: false,
      menu: false,
      valuation: "",
      valuationFormatted: "",
      registration: null,
      correctValue: false,
      testValuation: null,
      testEstimateChangeReason: null,
      valuationInfoDialog: false,
      correctedHomeValuation: false,
      estimatedValueRules: [
        v => /^[\d\,]*$/.test(v) || "Please enter a valid estimated value"
      ],
      homeValueRules: [
        v => !!v || "Home valuation is required",
        v => /^[\d\,]*$/.test(v) || "Please enter a valid home value"
      ]
    };
  },

  mounted() {
    this.decideWhatScreen();
    //this.show = "showSpinner";
  },

  computed: {
    correctedValuation: {
      get() {
        const v = this.correctedHomeValuation;
        return v ? this.$helper.formatNumber(v) : "";
      },
      set(nv) {
        this.correctedHomeValuation = nv
          ? parseInt(nv.replace(/\,/g, ""))
          : false;
      }
    },
    homeValuation: {
      get() {
        const v = this.correctedHomeValuation;
        return v ? this.$helper.formatNumber(v) : "";
      },
      set(nv) {
        this.registration.addressDetails.valuation = nv;
        this.correctedHomeValuation = nv
          ? parseInt(nv.replace(/\,/g, ""))
          : false;
      }
    },
    avm() {
      return this.$store.state.registration.avmDetails;
    },
    avmValuation() {
      return this.$store.state.registration.avmDetails.Valuation;
    },
    avmError() {
      try {
        return this.$store.state.registration.avmDetails.ErrorMessage;
      } catch (e) {}
      return null;
    }
  },
  watch: {
    avm(newAvm, old) {
      if (newAvm) {
        this.hasAvm = true;
      }
    },
    avmValuation(newAvmValuation, old) {
      if (newAvmValuation) {
        this.hasAvmValuation = true;
        //this.parseReportData();
        this.decideWhatScreen();
      }
    },
    avmError(newAvmError, old) {
      if (newAvmError) {
        this.hasAvmError = true;
      }
    }
  },
  methods: {
    fillData() {
      this.registration = clonedeep(this.$store.state.registration);
      if (this.registration) {
        if (
          this.registration.addressDetails &&
          this.registration.addressDetails.valuation
        ) {
          this.valuationFormatted = this.$helper.fm0(
            this.registration.addressDetails.valuation
          );
        } else if (this.registration.avmDetails) {
          this.valuationFormatted = this.$helper.fm0(
            this.registration.avmDetails.Valuation
          );
        }
        this.registration.addressDetails.correctedValuation = "";
      }
    },
    decideWhatScreen() {
      this.fillData();
      logger.log(
        this.$store.state.avmReportStatus === "success",
        this.$store.state.avmStatus === "success"
      );
      if (
        this.$store.state.avmReportStatus === "success" &&
        this.$store.state.avmStatus === "success"
      ) {
        this.show = "showGraph";
      } else {
        this.show = "showMoreData";
      }
      this.reg = this.$store.state.registration;
    },
    //  write by Vlad
    stepHomeValuation() {
      if (
        this.$store.state.avmReportStatus === "success" &&
        this.$store.state.avmStatus === "success"
      ) {
        if (this.$refs.correctedValuationForm.validate()) {
          let correctedValuation = false;
          let correctionReason = false;
          if (this.correctedHomeValuation) {
            correctedValuation = parseInt(this.correctedHomeValuation);
          }
          if (this.registration.addressDetails.correctionReason) {
            correctionReason = this.registration.addressDetails
              .correctionReason;
          }
          this.$store.dispatch("setRegistration", this.registration);
          this.$emit("stepNext", {
            correctedValuation: correctedValuation,
            correctionReason: correctionReason
          });
        }
      } else {
        if (this.$refs.homeValuationForm.validate()) {
          let correctedValuation = false;
          let correctionReason = false;
          if (this.correctedHomeValuation) {
            correctedValuation = parseInt(this.correctedHomeValuation);
          }
          if (this.registration.addressDetails.correctionReason) {
            correctionReason = this.registration.addressDetails
              .correctionReason;
          }
          this.$store.dispatch("setRegistration", this.registration);
          this.$emit("stepNext", {
            correctedValuation: correctedValuation,
            correctionReason: correctionReason
          });
        }
      }
    }
  }
};
