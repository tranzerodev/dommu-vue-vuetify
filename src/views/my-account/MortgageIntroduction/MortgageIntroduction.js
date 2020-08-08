import Panel from "@/components/Panel.vue";
const clonedeep = require("lodash.clonedeep");

export default {
  name: "panel",
  components: {},
  props: ["selectedItem"],
  data() {
    return {
      valid: false,
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
        v => !!v || "Contact Number is required",
        v =>
          /^(?=(?:\D*\d\D*){11,15}$)[ -]*\+?[ -]*(?:\((?:[ -]*\d)+[ -]*\))?[- \d]*/.test(
            v
          ) || "Please enter a valid contact number"
      ],
      item: null,
      direct: false,
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
      date: null,
      time: null,
      dateModal: false,
      timeModal: false
    };
  },

  created() {
    this.fillData();
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
    if (this.selectedItem) {
      this.item = this.selectedItem;
    }

    if (this.$route.query.direct) {
      this.direct = this.$route.query.direct;
    } else {
      // TODO if not set log error and return to search
    }
  },
  methods: {
    async onClickSave(event) {
      if (this.$refs.mortgageIntroductionForm.validate()) {
        this.$ga.event("ApplicationConsentForm", "Click", "NextBtn");
        this.snackbar = true;
        this.$store.dispatch("setRegistration", this.registration);
        const leadData = {
          campaignid: "Web01-Domun-A3M-Q4"
        };
        if (this.date) {
          leadData.nextcontact = this.date + "T";
          leadData.nextcontact += this.time ? this.time + ":00Z" : "00:00:00Z";
        }
        const leadSets = {
          caseid: "default caseid",
          data: JSON.stringify(leadData)
        };
        const lead = await this.$store.dispatch("leads/insert", leadSets);
        this.$router.push({
          name: "mortgageIntroductionThankyou",
          params: { selectedItem: this.selectedItem, lead: lead }
        });
      }
    },
    allowedMinutes(v) {
      return v % 5 === 0;
    },
    fillData() {
      if (this.$store.state.registration) {
        this.registration = clonedeep(this.$store.state.registration);
      }
      if (this.$store.state.search) {
        this.search = clonedeep(this.$store.state.search);
      }
    },
    onChange(e) {}
  }
};
