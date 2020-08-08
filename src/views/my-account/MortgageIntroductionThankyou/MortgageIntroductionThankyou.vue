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

<script src="./MortgageIntroductionThankyou.js"></script>
<style lang="scss" src="./MortgageIntroductionThankyou.scss"></style>
