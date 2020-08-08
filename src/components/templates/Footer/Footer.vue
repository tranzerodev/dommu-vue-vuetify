<template>
  <v-footer height="auto" color="white">
    <v-container bg fill-height grid-list-md text-xs-center class="pa-3">
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 row align-center justify-center>
          <v-layout row wrap align-center justify-center>
            <div class="text-sm-right footer-logo-container">
              <img class="footer-logo" src="/img/logo.svg" />
            </div>
            <div class="text-sm-left text-xs-left footer-description pl-3 pt-1">
              <p class="mb-0 terms">
                Copyright&nbsp;&copy;&nbsp;{{
                  new Date().getFullYear()
                }}&nbsp;{{ this.siteName() }}, all&nbsp;rights&nbsp;reserved.
              </p>
              <v-flex xs12 class="pt-1 terms pl-0">
                <router-link
                  to="/terms-and-conditions"
                  target="_blank"
                  class="mr-3"
                >
                  Terms
                  <span v-if="$vuetify.breakpoint.mdAndUp">and Conditions</span>
                </router-link>
                <router-link to="/privacy-policy" target="_blank">
                  Privacy&nbsp;<span v-if="$vuetify.breakpoint.mdAndUp"
                    >and&nbsp;Cookie&nbsp;</span
                  >Policy
                </router-link>
              </v-flex>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 class="footer-caption mt-3">
          <p class="mb-0">
            Domun is a trading name of Firmview Associates Ltd, registered in
            England and Wales with company number 02735960. <br />Registered
            Office: 19 Chancel Way, Charlton Kings, Cheltenham, Gloucestershire,
            GL53 7RR.
          </p>
          <p class="mb-0 mt-0">
            YOUR PROPERTY MAY BE REPOSSESSED IF YOU DO NOT KEEP UP REPAYMENTS ON
            YOUR MORTGAGE.
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <cookie-law theme="dark-lime">
      <div slot="message">
        <b>domun.co.uk</b> uses cookies to deliver our services. By using the
        website you agree with our use of cookies. Learn more here -
        <router-link to="/privacy-policy" target="_blank"
          >Privacy&nbsp;and&nbsp;Cookies&nbsp;Policy</router-link
        >
      </div>
    </cookie-law>
  </v-footer>
</template>

<script>
import CookieLaw from "vue-cookie-law";
export default {
  components: { CookieLaw }
};
</script>

<style scoped lang="scss">
.footer-logo {
  height: 20px;
  padding-top: 2px;
  @media only screen and( max-width: 900px) {
    height: 15px;
  }
}

.footer-logo-container {
  border-right: 1.5px solid #49d586;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 15px;
  @media only screen and( max-width: 900px) {
    padding: 5px;
    padding-right: 15px;
  }
}

.footer-description {
  .terms {
    font-size: 12px;
    @media only screen and( max-width: 600px) {
      font-size: 8px;
    }
  }
}

.footer-caption {
  font-size: 10px;
  /*font-weight: 500;*/
  @media only screen and( max-width: 600px) {
    padding: 5px;
    font-size: 7px;
  }
}
</style>
