const clonedeep = require("lodash.clonedeep");
import EmailService from "@/services/EmailService";
import LeadService from "@/services/LeadService";

export default {
  name: "panel",
  components: {},
  props: ["selectedItem", "lead"],
  data() {
    return {
      item: "",
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
      }
    };
  },
  async created() {
    this.fillData();
    if (this.selectedItem) {
      this.item = this.selectedItem;
    }
    if (this.$route.query.direct) {
      this.direct = this.$route.query.direct;
    } else {
      // TODO if not set log error and return to search
    }
    this.sendClientDetailsToBroker();
    // THIS CODE WORKS WITH LATEST API-SERVER
    const leadsData = JSON.parse(this.lead.data);
    const registration = _.cloneDeep(this.registration);
    if (registration.addressDetails.correctedValuation) {
      registration.addressDetails.correctedValuation =
        "" + registration.addressDetails.correctedValuation;
    }
    const response = await LeadService.sendLoanLead({
      leadid: "" + this.lead.id,
      campaignid: leadsData.campaignid,
      nextcontact: leadsData.nextcontact,
      // TODO: remove the BIG nodes we don't want to sent
      registration: {
        ...registration,
        ...{
          mortgageDetails: {},
          jointDetails: {},
          employmentDetails: {}
        }
      },
      search: {
        ...this.search
      }
    });
    try {
      const caseId = response.data.Response.CaseID;
      await this.$store.dispatch("leads/update", {
        id: this.lead.id,
        sets: { caseid: caseId }
      });
      logger.log(response);
    } catch (e) {
      logger.log("something wrong");
    }
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {
    sendClientDetailsToBroker() {
      var emailPayload = {
        Params: {
          clientName: this.registration.personalDetails.fullname, //this.registration.personalDetails.fullname,
          clientEmail: this.registration.personalDetails.email,
          clientPhone: this.registration.personalDetails.phone,
          brokerName: "Fluent Mortages",
          brokerEmail: "paul.duncan@domun.co.uk"
        }
      };
      EmailService.sendClientDetailsToBroker(emailPayload);
    },

    fillData() {
      if (this.$store.state.registration) {
        this.registration = clonedeep(this.$store.state.registration);
      }
      if (this.$store.state.search) {
        this.search = clonedeep(this.$store.state.search);
      }
    }
  }
};
