<template>
  <div class="dashboard text-xs-left" id="dash">
    <panel-card id="panelTitle" title="Consent" sizes="xs12 sm10 md12">
      <template v-slot>
        <v-layout column style="margin:12px;">
          <v-flex xs12>
            <h5>Choose what information to share with your chosen broker</h5>
          </v-flex>

          <v-flex xs12>
            <p>
              By selecting 'Next Step', you are agreeing to send the following
              selected information to the broker:
            </p>
          </v-flex>

          <v-layout column wrap>
            <v-flex xs12>
              <template v-for="consent in consents.broker">
                <v-card style="margin:12px">
                  <v-layout row wrap style>
                    <v-flex xs12 sm11>
                      <v-card flat>
                        <v-card-text class="ma-0 pa-1">
                          <!-- 
                            {{ index }}
                          -->
                          <p>
                            <b>{{ consent.title }}</b>
                            {{ consent.text }}
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-flex>

                    <v-flex xs12 sm1>
                      <v-card flat>
                        <v-card-text class="ma-0 pa-1">
                          <v-checkbox v-model="consent.value"></v-checkbox>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-card>
              </template>
            </v-flex>
          </v-layout>

          <v-flex xs12>
            <v-btn color="primary" to="/my-account/mortgage-introduction"
              >Back</v-btn
            >
            <v-btn
              color="primary"
              to="/my-account/mortgage-introduction-consent"
              >Edit Information</v-btn
            >
            <v-btn color="primary" to="/my-account/introductions"
              >Next step</v-btn
            >
          </v-flex>
        </v-layout>
      </template>
    </panel-card>
  </div>
</template>
<script>
import Panel from "@/components/Panel.vue";

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  },
  props: ["selectedItem"],
  data() {
    return {
      consents: {
        broker: [
          {
            title: "Personal Details",
            text:
              "Full Name, Address History, Date of Birth, Email, Contact Number, Employment Status",
            value: true
          },
          {
            title: "Equifax Credit Report",
            text: "Credit Score, Adverse Credit History",
            value: true
          },
          {
            title: "Current Mortgage Details",
            text:
              "Lender, Address, Outstanding Balance, Monthly Payment, Start Date, Term Remaining, Rate Type, Repayment Type, Initial Rate Period",
            value: true
          },
          {
            title: "Property Details",
            text:
              "Address, House Type, Floor (Flat Only), Bedrooms, Residency, Tenure, Leasehold Term, Construction, Type, Country",
            value: true
          },
          {
            title: "New Mortgage Details",
            text:
              "Loan Purpose, Property Valuation, Current Equity, Loan Amount, Loan-to-value (LTV), Term, Shared Ownership / Equity",
            value: true
          },
          {
            title: "New Mortgage Preferences",
            text: "Rate Type, Repayment Type, Initial Rate Period",
            value: true
          },
          {
            title: "Affordability",
            text: "Income / Salary and Estimated Monthly Living Costs",
            value: true
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {}
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
</style>
