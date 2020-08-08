<template>
  <v-container
    fluid
    fill-height
    :class="{ 'px-0': $vuetify.breakpoint.xsOnly }"
  >
    <v-layout align-center justify-center>
      <!--
      <v-flex :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">
      -->
      <v-flex>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="e1 > n"
                :step="n"
                editable
              >
                <span v-if="n == 1">Personal Details B</span>
                <span v-if="n == 2">Address Details</span>
                <span v-if="n == 3">Mortgage Details</span>
                <span v-if="n == 4">Joint Applicant</span>
              </v-stepper-step>

              <v-divider v-if="n !== steps" :key="n"></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="n in steps"
              :key="`${n}-content`"
              :step="n"
            >
              <v-card class="_mb-5" color="darken-1">
                <SignupPersonal
                  v-if="n == 1"
                  :totalSteps="`${steps}`"
                  :msgObject="registration"
                  :errorString="error"
                  @childUpdated="handleChildUpdated"
                />
                <SignupAddress
                  v-if="n == 2"
                  :msgObject="registration"
                  @childUpdated="handleChildUpdated"
                />
                <SignupMortgage
                  v-if="n == 3"
                  firstname="registration.firstname"
                  :msgObject="registration"
                  @childUpdated="handleChildUpdated"
                />
                <SignupJoint
                  v-if="n == 4"
                  :msgObject="registration"
                  @childUpdated="handleChildUpdated"
                />
              </v-card>
              <v-btn :id="`${n}-cancel`">Cancel</v-btn>
              <v-btn
                :id="`${n}-continue`"
                v-if="n != steps"
                color="primary"
                @click="nextStep(n)"
                >Continue</v-btn
              >
              <router-link
                :id="`${n}-continueLink`"
                v-if="n === steps"
                :to="{ name: 'dashboard-b', params: { registration } }"
                tag="span"
              >
                <v-btn :id="`${n}-continue`" color="primary">Continue</v-btn>
              </router-link>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import AvmService from "@/services/AvmService";
import SignupPersonal from "@/components/signup-b/SignupPersonal.vue";
import SignupAddress from "@/components/signup-b/SignupAddress.vue";
import SignupMortgage from "@/components/signup-b/SignupMortgage.vue";
import SignupJoint from "@/components/signup-b/SignupJoint.vue";
import { uuid } from "@/utils";

export default {
  name: "signup-b",
  components: {
    SignupPersonal,
    SignupAddress,
    SignupMortgage,
    SignupJoint
  },
  props: {},
  data() {
    return {
      error: null,
      e1: 1,
      steps: 3,
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
  mounted() {
    //
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    "registration.joint": function(newValue) {
      if (newValue) {
        // add an extra step to the process

        this.steps = 4;
      } else {
        this.steps = 3;
      }
    }
  },

  methods: {
    async signupUser() {
      // TODO now I see it might as well make it 4 separate objects, as makes it easg to add the AVM data in a separate column. maybe even call it user data?
      AuthenticationService.signup({
        //Apikey:"861c6163-f369-40e6-8585-b4d5190e57ee",
        withCredentials: true,
        Signup: {
          // TODO: Fix HACK: sort out validation to make use they are logged on and own the cuid
          // TODO: HACK separate out int separate tables, columns, or even microservices
          // TODO: Remove very sensitive data
          cuid: this.$store.state.cuid,
          registration: JSON.stringify(this.registration) // This has to be passed as a string
        }
      }).then(({ data }) => {
        try {
          this.$store.dispatch(
            "setAlert",
            "AVM has returned and the Users details have been saved"
          );
        } catch (error) {
          this.error = error.response.data.error;
          this.registration.avmDetails.ErrorMessage = this.error;
        }
      });
    },
    async registerUser() {
      try {
        const response = await AuthenticationService.register({
          //Apikey:"861c6163-f369-40e6-8585-b4d5190e57ee",
          withCredentials: true,
          User: {
            email: this.registration.personalDetails.email,
            password: this.registration.personalDetails.password,
            cuid: uuid()
          }
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setCuid", response.data.cuid);

        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    function2() {},
    async getAvm() {
      // store in Vue state TODO: who should call setregestration? do it bfore this, after if and after users saved?
      this.$store.dispatch("setAvmStatus", "calling");
      this.$store.dispatch("setRegistration", this.registration);

      //await setTimeout(this.function2, 5000);

      AvmService.getAvm({
        Bedrooms: this.registration.addressDetails.bedrooms,
        Receptions: this.registration.addressDetails.receptions,
        //Address: this.registration.addressDetails.address1,
        Address: this.registration.addressDetails.addressOnOneLine, // TODO: decide what to send here
        Postcode: this.registration.addressDetails.postcode,
        PropertyType: this.registration.addressDetails.propertyType
      }).then(({ data }) => {
        try {
          if ("Address could not be found" == data || !data.Valuation) {
            this.registration.avmDetails.ErrorMessage = data;
            this.$store.dispatch("setAvmStatus", "error");
          } else {
            this.registration.avmDetails = data;
            this.$store.dispatch("setAvmStatus", "success");

            // set the valuation on address so it can be overidden
            this.registration.addressDetails.valuatuion = data.Valuation;
            // store in DB
            // TODO update the signup data, maybe just the AVM part, but for now...just sign them up here
            // NOTE: movec to after AVMReport but thats WAY to late
            //this.signupUser();
          }
          // allways store in Vue state
          this.$store.dispatch("setRegistration", this.registration);
        } catch (error) {
          this.error = error.response.data.error;
          this.registration.avmDetails.ErrorMessage = this.error;
        }
      });
    },

    //
    // TODO: Note this was added after and has more info. We might need to do just one,
    // i.e. no getAVM and just getAvm report.
    // BUT if we do that remember to copy over the resgistration and sign up calls from method above
    //
    async getAvmReport(transactionIdParam) {
      // store in Vue state TODO: who should call setregestration? do it bfore this, after if and after users saved?
      this.$store.dispatch("setAvmReportStatus", "calling");
      // this.$store.dispatch("setRegistration", this.registration);

      // await setTimeout(this.function2, 5000);
      //
      AvmService.getAvmReport({
        transactionId: transactionIdParam,
        bedrooms: this.registration.addressDetails.bedrooms,
        receptions: this.registration.addressDetails.receptions,
        //Address: this.registration.addressDetails.address1,
        address: this.registration.addressDetails.addressOnOneLine, // TODO: decide what to send here
        postcode: this.registration.addressDetails.postcode,
        propertyType: this.getAlternativeValue(
          this.registration.addressDetails.propertyType
        )
      }).then(({ data }) => {
        try {
          this.parseXml(data).then(({ data }) => {
            // TODO: better to access data here and

            //

            //
            // TODO: add error handleing here for nothing being returned
            var jsonData = this.registration.avmReportDetails;
            if (
              //"Address could not be found" == jsonData || !jsonData.property-valuation-report-v2
              "Address could not be found" == jsonData
            ) {
              this.registration.avmReportDetails.ErrorMessage = jsonData;
              this.$store.dispatch("setAvmReportStatus", "error");
            } else {
              //
              //this.registration.avmReportDetails = jsonData;
              //
              this.$store.dispatch("setAvmReportStatus", "success");
              this.$store.dispatch(
                "setAlert",
                "Your automated home value report is now ready"
              );

              // store in DB
              // TODO update the signup data, maybe just the AVM part, but for now...just sign them up here
              this.signupUser();
            }
          });
          // }
          // });
          // allways store in Vue state
          this.$store.dispatch("setRegistration", this.registration);
        } catch (error) {
          this.error = error.response.data.error;
          this.registration.avmReportDetails.ErrorMessage = this.error;
        }
      });
    },
    // TODO take this.registration.avmReportDetails out and make it generic parse xml method
    async parseXml(xml) {
      return new Promise((resolve, reject) => {
        const parseString = require("xml2js").parseString; // todo jsut do this once
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            //
            this.registration.avmReportDetails = result;
          }
        });
      });
    },

    //
    // TODO as these promises are fulfilled how early can we cick off a mortgage search,
    // when we know home value and current outstanding ballance
    //

    handleChildUpdated: function(sendMsgObject) {},
    nextStep(n) {
      // if we are on the last step go to dash
      // TODO see router-link work arround above. this.$router.push does not seem to work with params
      // could be scope, or this. check the other stats and events
      /*
      if (n === this.steps) {

        this.$router.push({
          name: "dashboard",
          params: this.registration
        });
        */

      if (n === 1) {
        this.$ga.event("SignupForm", "Click", "AccountCreationBtn");
        this.registerUser().then(() => {
          if (this.error) {
          } else {
            this.e1 = n + 1;
          }
        });
      } else if (n === 2) {
        this.$ga.event("SignupForm", "Click", "AddressBtn");

        this.getAvm().then(() => {
          if (this.error) {
          } else {
            this.e1 = n + 1;
          }
        });

        // TODO: its needs a transaction Id, that needs to me linked to teh user
        //but just pass in here for now...
        var transactionId = "CasaFi-100001-" + uuid();
        this.getAvmReport(transactionId).then(() => {
          if (this.error) {
          }
        });
      } else {
        this.$ga.event("SignupForm", "Click", "Step-" + n + "-Btn");
        this.e1 = n + 1;
      }
    },
    // TODO the 2 APIS support different values! if the avmReport is the one we end up with
    // consider changing the DDL values so this mapping is not needed
    // TODO add this second house typ to the main resgister json so we always have it
    getAlternativeValue(value) {
      if (value == "detached house") return "House - Detached";
      if (value == "semi detached house") return "House - Semi-Detached";
      if (value == "end terrace house") return "House - End Terrace";
      if (value == "mid terrace house") return "House - Mid Terrace";

      if (value == "purpose built flat") return "Flat - Purpose Built";
      if (value == "converted flat") return "Flat - Converted";

      if (value == "detached bungalow") return "Bungalow - Detached";
      if (value == "semi detached bungalow") return "Bungalow - Semi-Detached";
      if (value == "end terrace bungalow") return "Bungalow - End Terrace";
      if (value == "mid terrace bungalow") return "Bungalow - Mid Terrace";
    }
  }
};
</script>

<style scoped lang="scss"></style>
