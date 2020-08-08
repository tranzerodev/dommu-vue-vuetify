import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/Panel.vue";
import { estimateChangeReasonList } from "@/data/propertyTypeLists.json";
import AuthService from "../../../services/AuthService";
import AjaxApiService from "../../../services/AjaxApiService";
const clonedeep = require("lodash.clonedeep");

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  },
  data() {
    return {
      valid: false,
      estimateChangeReasonList,
      fullnameRules: [
        v => !!v || "Please provide your full name",
        v =>
          /[ ]/.test(v) ||
          "Please provide your full name / Please provide a valid last name",
        v =>
          /^([a-zA-Z][a-zA-Z]+\s)*[a-zA-Z][a-zA-Z]+$/.test(v) ||
          "Please provide your full name / Please provide a valid last name"
      ],
      contactRules: [
        v => {
          if (!v) {
            return true;
          }
          return (
            /^(?=(?:\D*\d\D*){8,14}$)[ -]*\+?[ -]*(?:\((?:[ -]*\d)+[ -]*\))?[- \d]*/.test(
              v
            ) || "Please enter a valid contact number"
          );
        }
      ],
      homeValueRules: [
        v => {
          if (!v) {
            return true;
          }
          return /^[\d\,]+$/.test(v) || "Please enter a valid estimated value";
        }
      ],
      currency: "£",
      registration: {
        // Note: have one object per screen and search
        personalDetails: {},
        addressDetails: {},
        mortgageDetails: {},
        jointDetails: {},
        employmentDetails: {},
        avmDetails: {},
        avmReportDetails: {}
      },
      search: {
        filter: {},
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      },
      testEstimateChangeReason: "",
      correctedValuationTouched: false
    };
  },
  created() {
    this.registration = clonedeep(this.$store.state.registration);
    if (
      this.registration.addressDetails.correctedValuation === false ||
      this.registration.addressDetails.correctionReason === false
    ) {
      this.registration.addressDetails.correctedValuation =
        this.registration.addressDetails.correctedValuation || "";
      this.registration.addressDetails.correctionReason =
        this.registration.addressDetails.correctionReason || "";
      this.$store.dispatch("setRegistration", this.registration);
    }
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {
    async onClick() {
      // TODO register a GA click event
    },
    async onChange() {
      // TODO if first time change for this field register a GA fill in / edit event
    },

    // TODO: refactor, the onClickSave and fill methods are going to be the same if not identical across all the priofils pages
    async onClickSave() {
      if (this.$refs.profileForm.validate()) {
        this.snackbar = true;
        this.$ga.event("ProfileForm", "Click", "SaveBtn");
        // TODO remove hack for missing employment details only needed for a week after 20th June to make old test users work
        if (!this.registration.employmentDetails) {
          this.registration.employmentDetails = {};
        }
        if (
          this.registration.addressDetails.correctedValuation &&
          this.registration.addressDetails.correctedValuation !==
            this.$store.state.registration.addressDetails.correctedValuation &&
          this.$store.state.search.filter
        ) {
          const search = _.cloneDeep(this.$store.state.search);
          search.filter.CurrentValue = this.registration.addressDetails.correctedValuation;
          search.filter.NewLoanAmount = Math.round(
            search.filter.CurrentValue * 0.75
          );
          delete search.initialSearch;
          this.$store.dispatch("setSearch", search);
        }
        // save to vueState
        // save to DB
        const res = await this.$store.dispatch(
          "setRegistration",
          this.registration
        );
        this.$store.dispatch("setAlert", "");
        if (res) {
          this.$store.dispatch("setAlert", "Personal Details saved");
        } else {
          this.$store.dispatch(
            "setErrorAlert",
            "There was a problem saving your changes to the database"
          );
        }
      }
    },
    test() {
      AjaxApiService.post("/api/v2/test").then(res => {});
    }
  },
  computed: {
    store() {
      return this.$store.state;
    },
    homeValuation: {
      get() {
        let v = false;
        if (this.correctedValuationTouched) {
          if (
            this.registration.addressDetails.correctedValuation ||
            this.registration.addressDetails.correctedValuation === ""
          ) {
            v = this.registration.addressDetails.correctedValuation;
          } else {
            v = this.registration.addressDetails.valuation;
          }
        } else {
          v =
            this.registration.addressDetails.correctedValuation ||
            this.registration.addressDetails.valuation;
        }
        return v ? this.$helper.formatNumber(v) : "";
      },
      set(payload) {
        this.correctedValuationTouched = true;
        this.registration.addressDetails.correctedValuation = payload
          ? parseInt(payload.replace(/\,/g, ""))
          : "";
      }
    }
  }
};
