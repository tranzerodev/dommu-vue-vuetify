<template>
  <v-layout row justify-center>
    <v-flex
      lg10
      md10
      sm10
      xs11
      :class="{
        'mt-80': $vuetify.breakpoint.xs,
        'white-dashboard round-container': true
      }"
    >
      <!--<h4>We have passed your contact details to {{ item.broker }}</h4>-->
      <div
        :class="{
          'mb-1': $vuetify.breakpoint.xs,
          'green-pointer pb-2 text-xs-left': true
        }"
        align="start"
      >
        <p id="signupAddressTitle" class="pt-3 signup-title mb-0">
          Introduction complete
        </p>
      </div>
      <p class="main-title text-center mb-0">
        <b>We have passed your details to Fluent Mortgages</b>
      </p>
      <p class="sub-title">
        A Fluent Mortgages broker will be in touch shortly.
        <!-- Alternatively,
            you can speak to a Fluent Mortgages broker by calling
            {{ item.brokerNumber }}.
        -->
        Thank you for using {{ siteName() }} and we hope your mortgage
        application goes well.
      </p>
      <p class="sub-title-2">
        YOUR HOME OR PROPERTY MAY BE REPOSSESSED IF YOU DO NOT KEEP UP
        REPAYMENTS ON YOUR MORTGAGE.
      </p>
      <!-- TODO this is the my searches page so they can manage differnt
               types of searches but we don't have it yet"
            <v-btn color="primary" to="/my-account/searches"
              >Mortgage search</v-btn
            >
      -->
      <router-link
        :to="{
          name: 'mortgageSearch'
        }"
        tag="span"
      >
        <v-btn
          color="primary"
          class="btn-control block"
          :block="$vuetify.breakpoint.xs"
          @click="
            $ga.event('IntroductionCompletePage', 'Click', 'MortgageSearchBtn')
          "
          >Mortgage search</v-btn
        >
      </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
const clonedeep = require("lodash.clonedeep");
import Panel from "@/components/Panel.vue";
import EmailService from "@/services/EmailService";
//import LeadService from "@/services/LeadService";

export default {
  name: "panel",
  components: {},
  props: ["selectedItem"],
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
  created() {
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

    // TODO get a lead id from new lead DB and add it to xml below
    // TODO make it async and save caseId to DB later
    // const response = await LeadService.sendLoanLead({

    //
    // Added 26/11/2019 as a place holder for calling fluent API
    //
    /*
    // THIS CODE WORKS WITH LATEST API-SERVER
    const response = LeadService.sendLoanLead({
      leadid: "2069",
      campaignid: "Web01-Domun-A3M-Q4",
      nextcontact: "2019-12-22T11:30:00Z",
      // TODO: remove the BIG nodes we don't want to sent
      registration: this.registration,
      search: this.search
    });
    */
    // TODO: test responce and show an error message on failure it gets this on success
    // <xml>
    //   <Response>
    //     <Status>SUCCESS</Status>
    //     <CaseID>63f1ce09-1810-4dcf-9225-96f910df4dbe</CaseID>
    //     <Description>Lead entered into system successfully</Description>
    //   </Response>
    // </xml>
    // TODO store the case ID in the lead table
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
      //
      EmailService.sendClientDetailsToBroker(emailPayload);
      //this.$store.dispatch("setCuid", response.data.cuid);
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
</script>
<style>
.small {
  max-width: 450px;
  margin: 10px auto;
}

.rates td {
  font-size: 1.1em;
  padding-left: 10px;
}

.main-title {
  font-size: 66px;
  text-align: center;
  font-weight: bold;
  line-height: 1.17;
  letter-spacing: normal;
}

.sub-title {
  padding-top: 20px;
  font-size: 18px;
  font-weight: 500;
}

.sub-title-2 {
  margin-top: 100px;
  padding: 20px;
  font-size: 16px;
  font-weight: 400;
  border: #000 2px dashed;
  border-radius: 20px;
}
@media only screen and (max-width: 900px) {
  .main-title {
    font-size: 2.4em;
  }
  .sub-title-2 {
    margin-top: 40px;
  }
}
@media only screen and (max-width: 600px) {
  .main-title {
    font-size: 1.8em;
    text-align: center;
    line-height: 1.6;
  }
}
</style>
