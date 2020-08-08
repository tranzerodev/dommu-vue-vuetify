<template>
  <div class="dashboard">
    <panel-card
      id="panelTitle"
      title="Mortgage Health Indicator"
      sizes="xs12 sm10 md8"
    >
      <template v-slot>
        <p class="main">
          Based on a review with the whole of the Mortgage market,
        </p>
        <p class="main" v-if="!hasGoodRate">
          you may be paying {{ savings.headline }} per month too much.
        </p>
        <p class="main" v-if="hasGoodRate">
          it looks like you are on a good deal, check your details are right
          <router-link to="/my-account/profile/mortgage">here</router-link>.
        </p>
        <div class="small">
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-card>
                  <v-card-text class="ma-0 pa-1">
                    <h3>{{ valuation }}</h3>
                    <p>Property Value</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 class="ma-0 pa-1">
                <v-card>
                  <v-card-text class="ma-0 pa-0">
                    <h3>{{ outstandingMortgageBalance }}</h3>
                    <p>Outstanding mortgage</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card>
                  <v-card-text class="ma-0 pa-1">
                    <h3>{{ monthlyPayment }}</h3>
                    <p>Monthly repayment</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid fill-height class="ma-0 pa-0">
            <v-layout align-center justify-center class="ma-0 pa-0">
              <v-flex xs12>
                <circle-statistic
                  :title="savings.subheading"
                  :sub-title="savings.headline"
                  :caption="savings.caption"
                  :icon="savings.icon.label"
                  :percent="savings.percent"
                  :color="savings.linear.color"
                  :value="savings.linear.value"
                ></circle-statistic>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <v-btn>Potential saving explained</v-btn>
        <p>You can search the whole of Mortgage market by clicking below</p>
        <v-btn color="primary" to="/my-account/mortgage-search"
          >Search the Mortgage market</v-btn
        >
      </template>
    </panel-card>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import CircleStatistic from "@/components/CircleStatistic";

export default {
  name: "panel",
  components: {
    "panel-card": Panel,
    "circle-statistic": CircleStatistic
  },
  data() {
    return {
      registration: null,
      search: null,
      valuation: null,
      monthlyPayment: null,
      outstandingMortgageBalance: null,
      potentialSaving: null,
      hasGoodRate: false,
      savings: {
        subheading: "Potental Savings",
        headline: "£593",
        caption: "per month",
        percent: 70,
        icon: {
          label: "money",
          color: "info"
        },
        linear: {
          value: "£593",
          color: "warning"
        }
      }
    };
  },

  created() {
    this.fillData();
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {
    fillData() {
      this.registration = this.clonedeep(this.$store.state.registration);
      this.search = this.clonedeep(this.$store.state.search);

      var bestBuysByProduct = this.search.initialSearch["s:Envelope"][
        "s:Body"
      ][0]["GetBestBuysByProductResponse"][0];
      var allSchemes =
        bestBuysByProduct.AllSchemes[0]["a:MBPublicSchemeSummary"];
      var cheepestInitialMonthlyPayment = parseFloat(
        allSchemes[0]["a:InitialMonthlyPayment"][0]
      );

      var currentMonthlyPayment = 0;
      if (this.registration.mortgageDetails.monthlyPayment) {
        currentMonthlyPayment = parseInt(
          this.registration.mortgageDetails.monthlyPayment
        );
      } else {
        // TODO: for demo guess it. 17% for live tell the user we dont have it
        currentMonthlyPayment = parseInt(cheepestInitialMonthlyPayment * 1.17);
      }
      this.potentialSaving =
        currentMonthlyPayment - cheepestInitialMonthlyPayment;

      if (this.potentialSaving < 20) {
        // TODO: agree this cut off level
        this.hasGoodRate = true;
      }
      this.savings.headline = this.$helper.fm0(this.potentialSaving);
      this.savings.percent = parseInt(
        (this.potentialSaving / currentMonthlyPayment) * 100 * 2
      );
      if (this.savings.percent > 100) {
        this.savings.percent = 100;
      }

      // TODO take into account amoutn as well, i.e. 10% is ok untill its more than £300 a month as this will wipe out any fees
      if (this.savings.percent < 10) {
        this.savings.linear.color = "#2dc937";
      } else if (this.savings.percent < 20) {
        this.savings.linear.color = "#99c140";
      } else if (this.savings.percent < 30) {
        this.savings.linear.color = "#e7b416";
      } else if (this.savings.percent < 40) {
        this.savings.linear.color = "#db7b2b";
      } else {
        this.savings.linear.color = "#cc3232";
      }

      this.savings.linear.value = this.$helper.fm0(this.potentialSaving);

      if (this.registration.addressDetails.valuation) {
        this.valuation = this.$helper.fm0(
          this.registration.addressDetails.valuation
        );
      } else {
        this.valuation = this.$helper.fm0(
          this.registration.avmDetails.Valuation
        );
      }
      this.monthlyPayment = this.$helper.fm0(currentMonthlyPayment);

      this.registration.mortgageDetails.outstandingBalance;
      var outstandingBalance = 0;
      if (this.registration.mortgageDetails.outstandingBalance) {
        outstandingBalance = parseInt(
          this.registration.mortgageDetails.outstandingBalance
        );
      } else {
        // TODO: for demo guess it. 75% for live tell the user we dont have it
        outstandingBalance = parseInt(
          this.registration.avmDetails.Valuation * 0.75
        );
      }
      this.outstandingMortgageBalance = this.$helper.fm0(outstandingBalance);
    }
  }
};
</script>
<style>
.small {
  max-width: 450px;
  margin: 10px auto;
}

p.main {
  font-size: 1.3em;
}

.v-progress-circular__info {
  font-size: 2.3em;
}
</style>
