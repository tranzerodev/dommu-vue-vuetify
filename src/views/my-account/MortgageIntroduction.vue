<template>
  <div>
    <v-layout row justify-center>
      <v-flex lg10 md10 sm10 xs11>
        <div
          class="application-consent-description-box sm-custom"
          align="start"
          v-if="$vuetify.breakpoint.smAndDown"
        >
          <!--<div class="white-pointer pt-4" align="start">
            <p id="signupAddressTitle" class="headline bold">
              <b>Application consent</b>
            </p>
          </div>-->
          <div align="center">
            <img
              src="/img/broker-logos/fluent-mortgages-logo.svg"
              class="logo-size"
            />
          </div>

          <p>
            {{ siteName() }} have partnered with
            {{ search.currentProduct.broker }}, who are one of the UK's leading
            mortgage brokers. They will ensure you get the best mortgage for
            you.
          </p>
          <p>
            {{ siteName() }} does not provide advice,
            {{ search.currentProduct.broker }} will provide advice.
          </p>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row justify-center class="mb-4">
      <v-flex
        lg10
        md10
        sm10
        xs11
        class="white-dashboard introduction-container"
      >
        <v-layout
          row
          wrap
          :class="[$vuetify.breakpoint.mdAndUp ? 'pt-4 pb-2 mt-4' : '']"
        >
          <v-flex
            lg4
            md4
            sm12
            :class="[$vuetify.breakpoint.mdAndUp ? 'pr-4' : '']"
            align="start"
          >
            <v-form ref="mortgageIntroductionForm" v-model="valid">
              <v-card class="elevation-0 text-xs-left">
                <div class="green-pointer mb-4 pb-4" align="start">
                  <p id="signupAddressTitle" class="pt-3 signup-title mb-0">
                    Personal information
                  </p>
                </div>
                <v-text-field
                  name="fullname"
                  id="fullname"
                  type="text"
                  class="input-box-container mt-4 pt-4 mb-4 pb-4"
                  label="Full name"
                  :rules="fullnameRules"
                  v-model="registration.personalDetails.fullname"
                  @change="onChange($event)"
                  hide-details
                  required
                  v-on:blur="
                    $ga.event(
                      'ApplicationConsentForm',
                      'Fill',
                      'FullNameField',
                      registration.personalDetails.fullname
                    )
                  "
                ></v-text-field>
                <v-text-field
                  name="email"
                  id="email"
                  label="Email address"
                  type="text"
                  class="input-box-container mt-4 pt-4 mb-4 pb-4"
                  v-model="registration.personalDetails.email"
                  @change="onChange($event)"
                  hide-details
                  disabled
                ></v-text-field>
                <p class="text-xs-left">
                  <b>Please provide a contact number below:</b>
                </p>
                <v-text-field
                  name="phone"
                  id="phone"
                  type="text"
                  label="Contact number"
                  class="input-box-container mt-4 pt-4 mb-4 pb-4"
                  :rules="contactRules"
                  v-model="registration.personalDetails.phone"
                  @change="onChange($event)"
                  hide-details
                  v-on:blur="
                    $ga.event(
                      'ApplicationConsentForm',
                      'Fill',
                      'ContactNumberField',
                      registration.personalDetails.phone
                    )
                  "
                ></v-text-field>
              </v-card>
            </v-form>
          </v-flex>
          <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
          <v-flex
            lg7
            md7
            sm12
            :class="[$vuetify.breakpoint.mdAndUp ? 'pl-4' : '']"
          >
            <!-- <img
            :src="search.currentProduct.brokerLogo"
            style="height:133px; padding-top:20px padding-right:12px"
            />-->
            <!--
          <h4>
            Please provide your contact number so {{ item.broker }} can contact
            you.
          </h4>
          <p>
            {{ siteName() }} will never contact you by phone. We only ask for
            your contact number so {{ item.broker }} can contact you.
          </p>
            -->
            <div
              class="application-consent-description-box"
              align="start"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              <!--<div class="white-pointer pt-4" align="start">
                <p id="signupAddressTitle" class="display-1 bold">
                  <b>Application consent</b>
                </p>
              </div>-->
              <div align="center">
                <img
                  src="/img/broker-logos/fluent-mortgages-logo.svg"
                  width="200"
                />
              </div>

              <p style="padding-top: 50px;">
                {{ siteName() }} have partnered with
                {{ search.currentProduct.broker }}, who are one of the UK's
                leading mortgage brokers. They will ensure you get the best
                mortgage for you.
              </p>
              <p>
                {{ siteName() }} does not provide advice,
                {{ search.currentProduct.broker }} will provide advice.
              </p>
            </div>
            <div class="application-consent-inform-box" align="start">
              <p>
                By continuing, you are agreeing for this information to be sent
                to
                {{ search.currentProduct.broker }}.
                {{ search.currentProduct.broker }} are also available on 01204
                899500
              </p>

              <p class="mt-3">
                Fluent Mortgages are authorised and regulated by the Financial
                Conduct Authority (FCA). Firm registration number 458914.
              </p>
            </div>
          </v-flex>
        </v-layout>

        <v-layout row justify-space-between class="pt-4">
          <router-link
            :to="{
              name: 'mortgageSearch'
            }"
            tag="span"
          >
            <!--<v-btn
              class="btn-control"
              color="tertiary"
              @click="$ga.event('ApplicationConsentForm', 'Click', 'CancelBtn')"
              >Cancel</v-btn
            >-->
          </router-link>
          <v-btn color="primary" class="btn-control-wide" @click="onClickSave()"
            >Contact advisor</v-btn
          >
        </v-layout>

        <!-- <router-link
            :to="{
              name: 'mortgageIntroductionThankyou',
              params: { selectedItem }
            }"
            tag="span"
          >
            
        </router-link>-->
      </v-flex>
    </v-layout>

    <!--
        <p v-if="direct == 'true'">
          On selecting ‘Next Step’ you will be introduced to {{item.provider}}, who will be in
          contact with you by phone or email.
          <br />
          {{siteName()}} will earn {{item.ourCommision}} from your introduction if you complete a Mortgage
          with this Lender.
        </p>
        <p v-else>
          On selecting ‘Next Step’ you will be introduced to {{item.broker}}, who will be in
          contact with you by phone or email.
          
          <br />
          {{siteName()}} will earn {{item.ourBrokerCommision}} from your introduction if you complete a Mortgage
          with this Lender using this Broker.
          </p>    
        <p>
          This introduction is based on the below indicative quote.
          <br />
          It will expire on {{item.offerExpiry}}.
        </p>
        <p>This won’t impact your credit score and you can still cancel later.</p>
    -->
    <!-- TODO make this a component -->
    <!--
        <div>
          <h3 class="mb-0">{{ selectedItem.provider }} BOE + 0.74% for 2 years</h3>

          <h4 class="mb-0">Tracker</h4>
          <div style="text-align: center">
            <div style="display: inline-block">
              <table class="rates" style="text-align: left">
                <tr>
                  <td>APCR</td>
                  <td>{{ selectedItem.APRC }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Lender Fees</td>
                  <td>{{ selectedItem.lenderFees }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Interest Rate</td>
                  <td>{{ selectedItem.initialRate }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Total Cost</td>
                  <td>{{ selectedItem.totalCost }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Cost per month</td>
                  <td>{{ selectedItem.monthlyPayment }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Initial term cost</td>
                  <td>{{ selectedItem.initialTermCost }}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Savings</td>
                  <td>{{ selectedItem.savings }}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>

          <div>
            <strong>Representative example:</strong> A repayment mortgage of £160,000 over 25 years, representative 3.8% APRC. Total amount payable:
            £249,162.60. Includes interest of £88,163.60, Valuation fee of £0, Booking fee of £999 and Administration fee of £0.
            Repayments: 24 monthly repayments of £639.15 at 1.49% (variable), then 276 monthly repayments of £843.57 at 4.19% (variable).
          </div>
        </div>
    -->
    <!-- End of TODO make this a component -->
    <!--
        <v-btn color="primary" to="/my-account/mortgage-introduction-consent">Next step</v-btn>
        <p v-if="direct == 'true'">
          By proceeding you are agreeing to {{item.provider}},'s
          <a
            :href="item.providerTerms"
            target="_blank"
          >Terms</a> and
          <a :href="item.providerPrivacy" target="_blank">Privacy Policy</a>
        </p>
        <p v-else>
          By proceeding you are agreeing to {{item.broker}},'s
          <a
            :href="item.brokerTerms"
            target="_blank"
          >Terms</a> and
          <a :href="item.brokerPrivacy" target="_blank">Privacy Policy</a>
        </p>        
        <p></p>

    -->
  </div>
</template>

<script>
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
          /^(?=(?:\D*\d\D*){8,14}$)[ -]*\+?[ -]*(?:\((?:[ -]*\d)+[ -]*\))?[- \d]*/.test(
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
      }
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
    onClickSave(event) {
      if (this.$refs.mortgageIntroductionForm.validate()) {
        this.$ga.event("ApplicationConsentForm", "Click", "NextBtn");
        this.snackbar = true;

        this.$store.dispatch("setRegistration", this.registration);
        this.$router.push({
          name: "mortgageIntroductionThankyou",
          params: this.selectedItem
        });
      }
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
</script>
<style lang="scss" scoped>
.small {
  max-width: 450px;
  margin: 10px auto;
}

.rates td {
  font-size: 1.1em;
  padding-left: 10px;
}

.introduction-container {
  margin-top: 180px;
  border-radius: 20px;
  padding: 20px 70px;
}

.application-consent-description-box {
  border-radius: 50px 20px 20px 20px;
  background-color: #49d586;
  padding: 30px 50px 40px;
  color: #fff;
  margin-top: -150px;
  font-size: 17px;
  line-height: 25.2px;
  @media only screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 20px;
  }
}

.application-consent-description-box.sm-custom {
  border-radius: 20px 10px 10px 10px;
  padding: 10px 20px;
  margin-top: 100px;
  @media only screen and (max-width: 600px) {
    margin-top: 70px;
  }
}
.application-consent-inform-box {
  margin-top: 20px;
  border-radius: 20px 20px 20px 20px;
  border: #000 3px dashed;
  padding: 30px;
  font-size: 17px;
  line-height: 25.2px;
}

.logo-size {
  width: 200px;
}

@media only screen and (max-width: 1250px) {
  .introduction-container {
    margin-top: 180px;
    margin-bottom: 40px;
    padding: 20px 40px;
  }
  .logo-size {
    width: 150px;
  }
}

@media only screen and (max-width: 959px) {
  .introduction-container {
    margin-top: 20px;
    padding: 10px 10px;
  }
  .logo-size {
    width: 150px;
  }
}

@media only screen and (max-width: 900px) {
  .introduction-container {
    margin-top: 20px;
    padding: 10px 10px;
  }
  .logo-size {
    width: 100px;
  }
}

@media only screen and (max-width: 600px) {
  .introduction-container {
    margin-top: 20px;
    padding: 10px 10px;
  }
  .logo-size {
    width: 75px;
  }
}
</style>
