<template>
  <div class="dashboard">
    <panel-card
      id="panelTitle"
      title="Mortgage Introduction"
      sizes="xs12 sm10 md8"
    >
      <template v-slot>
        <p v-if="direct == 'true'">
          On selecting ‘Next Step’ you will be introduced to
          {{ item.provider }}, who will be in contact with you by phone or
          email.
          <br />
          CasaFi will earn {{ item.ourCommision }} from your introduction if you
          complete a Mortgage with this Lender.
        </p>
        <p v-else>
          On selecting ‘Next Step’ you will be introduced to {{ item.broker }},
          who will be in contact with you by phone or email.
          <br />
          CasaFi will earn {{ item.ourBrokerCommision }} from your introduction
          if you complete a Mortgage with this Lender using this Broker.
        </p>

        <p>
          This introduction is based on the below indicative quote.
          <br />
          It will expire on {{ item.offerExpiry }}.
        </p>
        <p>
          This won’t impact your credit score and you can still cancel later.
        </p>

        <!-- TODO make this a component -->

        <div>
          <h3 class="mb-0">
            {{ selectedItem.provider }} BOE + 0.74% for 2 years
          </h3>

          <h4 class="mb-0">Tracker</h4>
          <div style="text-align: center">
            <div style="display: inline-block">
              <table class="rates" style="text-align: left">
                <tr>
                  <td>APRC</td>
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
            <strong>Representative example:</strong> A repayment mortgage of
            £160,000 over 25 years, representative 3.8% APRC (Annual Percentage
            Rate of Charge). Total amount payable: £249,162.60. Includes
            interest of £88,163.60, Valuation fee of £0, Booking fee of £999 and
            Administration fee of £0. Repayments: 24 monthly repayments of
            £639.15 at 1.49% (variable), then 276 monthly repayments of £843.57
            at 4.19% (variable).
          </div>
        </div>
        <!-- End of TODO make this a component -->
        <v-btn color="primary" to="/my-account/mortgage-introduction-consent"
          >Next step</v-btn
        >
        <p v-if="direct == 'true'">
          By proceeding you are agreeing to {{ item.provider }},'s
          <a :href="item.providerTerms" target="_blank">Terms</a> and
          <a :href="item.providerPrivacy" target="_blank">Privacy Policy</a>
        </p>
        <p v-else>
          By proceeding you are agreeing to {{ item.broker }},'s
          <a :href="item.brokerTerms" target="_blank">Terms</a> and
          <a :href="item.brokerPrivacy" target="_blank">Privacy Policy</a>
        </p>
        <p></p>
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
      item: "",
      direct: false
    };
  },
  mounted() {
    if (this.selectedItem) {
      this.item = this.selectedItem;
    }
    if (this.$route.query.direct) {
      this.direct = this.$route.query.direct;
    } else {
      // TODO if not set log error and return to search
    }
  },
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
