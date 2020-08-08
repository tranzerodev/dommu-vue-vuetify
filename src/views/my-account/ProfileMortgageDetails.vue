<template>
  <div class="dashboard">
    <panel-card
      id="panelTitle"
      title="My Profile - Mortgage Details"
      sizes="xs12 sm12 md12"
    >
      <template v-slot>
        <v-container fluid grid-list-sm class="std-table">
          <v-layout wrap>
            <v-flex d-flex xs12>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card flat class="sub-header">
                    <v-card-text class="ma-0 pa-0">
                      <h3>Current Mortgage Details</h3>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <!--TODO my IDE auto corrects this disabled=true-->
                  <v-text-field
                    label="Address"
                    type="text"
                    v-model="registration.addressDetails.addressOnOneLine"
                    @change="onChange($event)"
                  />
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <!--TODO my IDE auto corrects this disabled=true-->
                  <v-text-field
                    label="Postcode"
                    type="text"
                    v-model="registration.addressDetails.postcode"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-divider class="std-divider-spacing" />

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.mortgageDetails.currentLender"
                    :items="lenderList"
                    item-value="value"
                    item-text="name"
                    id="currentLender"
                    label="Current Lender"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.outstandingBalance"
                    id="outstandingBalance"
                    label="Outstanding balance"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.monthlyPayment"
                    id="monthlyPayment"
                    label="Monthly payment"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.startDate"
                    id="startDate"
                    label="Start date"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.mortgageDetails.initialRatePeriod"
                    :items="initialRatePeriodList"
                    item-value="value"
                    item-text="name"
                    id="initialRatePeriod"
                    label="Initial rate period"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.introductoryEndDate"
                    id="introductoryEndDate"
                    label="Introductory end date"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.mortgageDetails.rateType"
                    :items="rateTypeList"
                    item-value="value"
                    item-text="name"
                    id="rateType"
                    label="Rate type"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.termRemaining"
                    id="termRemaining"
                    label="Term remaining"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.mortgageDetails.repaymentType"
                    :items="repaymentTypeList"
                    item-value="value"
                    item-text="name"
                    id="repaymentType"
                    label="Repayment type"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="registration.mortgageDetails.earlyRepaymentCharges"
                    id="earlyRepaymentCharges"
                    label="Early Repayment charges"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <!--
          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    style="min-width:220px"
                    v-model="registration.mortgageDetails.repaymentType"
                    :items="repaymentTypeList"
                    item-value="value"
                    item-text="name"
                    id="repaymentType"
                    label="Repayment type"
                  ></v-select>

                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-text-field
                      v-model="registration.mortgageDetails.earlyRepaymentCharges"
                      id="earlyRepaymentCharges"
                      label="Early Repayment charges"
                      type="text"
                      @change="onChange($event)"
                    />
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          -->
          <v-layout wrap>
            <v-flex d-flex xs6 sm6 md6 lg6 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs6 sm5 md3 lg2>
                  <v-btn class="std-btn" color="primary" @click="onClickSave()"
                    >Save Changes</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </panel-card>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/Panel.vue";
const clonedeep = require("lodash.clonedeep");
import {
  initialRatePeriodList,
  rateTypeList,
  repaymentTypeList,
  lenderList
} from "@/data/mortgageDetailLists.json";

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  },
  data() {
    return {
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
      search: null,
      initialRatePeriodList,
      rateTypeList,
      repaymentTypeList,
      lenderList
    };
  },
  created() {
    this.fillData();
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {
    // TODO: refactor, the onClickSave and fill methods are going to be the same if not identical across all the priofils pages
    async onClickSave() {
      // save to vueState

      // overide filter selections and call a new search
      if (
        this.registration.mortgageDetails.outstandingBalance &&
        this.registration.mortgageDetails.outstandingBalance > 0 &&
        this.search.filter.NewLoanAmount !=
          this.registration.mortgageDetails.outstandingBalance
      ) {
        this.search.filter.NewLoanAmount = this.registration.mortgageDetails.outstandingBalance;
      }
      if (
        this.registration.mortgageDetails.termRemaining &&
        this.registration.mortgageDetails.termRemaining > 0 &&
        this.search.filter.LoanTerm !=
          this.registration.mortgageDetails.termRemaining
      ) {
        this.search.filter.LoanTerm = this.registration.mortgageDetails.termRemaining;
      }

      this.$store.dispatch("setRegistration", this.registration);
      this.$store.dispatch("setSearch", this.search);
      // save to DB
      try {
        const response = await AuthenticationService.registerPut({
          withCredentials: true,
          Signup: {
            cuid: this.$store.state.cuid,
            registration: JSON.stringify(this.$store.state.registration)
            // TODO: leave in for a bit as its a quick way to force the testing of a DB error
            //registration: this.$store.state.registration
          }
        });

        if (response.status == 200) {
          // alert the user
          this.$store.dispatch("setAlert", "Mortgage Details saved");
        } else {
          this.$store.dispatch(
            "setErrorAlert",
            "There was a problem saving your changes to the database"
          );
        }
      } catch (error) {
        this.$store.dispatch(
          "setErrorAlert",
          "There was a problem saving your changes to the database"
        );
      }
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
.dashboard {
  margin-top: 65px;
}
@media only screen and (max-width: 959px) {
  .dashboard {
    margin-top: 50px;
  }
}
.std-table input {
  width: 200px !important;
  min-width: 200px !important;
  padding: 5px;
}

.std-table .sub-header {
  background-color: transparent;
}

.std-table .sub-header h4 {
  padding-top: 1.5em;
}

.std-table .std-btn {
  margin: 0px;
  padding: 0px;
  padding-right: 3px;
  padding-left: 3px;
}
.std-divider-spacing {
  margin-top: 1.8em;
  padding-top: 0.8em;
}
</style>
