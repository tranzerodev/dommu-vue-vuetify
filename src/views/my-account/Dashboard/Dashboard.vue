<template>
  <div class="dashboard">
    <v-layout
      v-if="show == 'showGraph' && $vuetify.breakpoint.smAndUp"
      row
      justify-center
      class="container fluid"
    >
      <v-flex xs11 sm11 md11 style="background: transparent;">
        <v-layout row align-center class="justify-space-between">
          <v-flex sm11 md10>
            <div
              v-if="this.$vuetify.breakpoint.smAndUp"
              class="round-container mt-20 mb-0 left-radius white-background pa-4 text-left"
            >
              <v-layout row class="justify-space-between">
                <v-flex md9>
                  <p class="mb-0 text-xs-left pr-4 mr-2">
                    The average homeowner can be overspending by up to
                    <span class="title font-weight-bold">33%</span> every month
                    on their mortgage. Click on 'Mortgage search' to check
                    you're on the best deal.
                  </p>
                </v-flex>
                <v-flex
                  md3
                  sm3
                  align-self-center
                  v-if="$vuetify.breakpoint.smAndUp"
                >
                  <v-btn
                    block
                    color="primary"
                    class="my-0"
                    to="/my-account/mortgage-search"
                    v-on:click="
                      $ga.event('DashboardPage', 'Click', 'MortgageSearchBtn')
                    "
                    >Mortgage search</v-btn
                  >
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout
      row
      align-center
      justify-center
      v-if="this.$vuetify.breakpoint.xs"
    >
      <v-flex md8 sm12 xs11>
        <div class="round-container mt-20 mb-2 left-radius white-background">
          <v-layout row justify-center>
            <v-flex xs12 sm12>
              <p class="text-xs-left mb-0">
                The average homeowner can be overspending by up to
                <span class="title font-weight-bold">33%</span> every month on
                their mortgage. <br />Click on 'Mortgage search' to check you're
                on the best deal.
              </p>
              <v-btn
                v-if="this.$vuetify.breakpoint.xs"
                block
                color="primary"
                to="/my-account/mortgage-search"
                v-on:click="
                  $ga.event('DashboardPage', 'Click', 'MortgageSearchBtn')
                "
                >Mortgage search</v-btn
              >
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
    <panel-std-card
      id="panelTitle"
      title
      sizes="xs11 sm11 md11"
      v-model="show"
      v-if="show == 'showGraph'"
    >
      <template v-slot>
        <v-layout
          row
          justify-center
          :class="{
            'mb4 mt-40': $vuetify.breakpoint.smAndUp,
            'mb-2 mt-2': $vuetify.breakpoint.xs,
            'white-dashboard round-container': true
          }"
        >
          <v-flex lg11 xs11>
            <h3 id="dashboardGreeting" class="pt-3 text-xs-left black--text">
              <v-icon color="#7a78ff" class="title-icon" left
                >mdi-arrow-right-bold-circle</v-icon
              >
              <span style="color: #7a78ff">
                <!--{{ reg.personalDetails.firstname }}, -->
                Since
                {{ sinceYearText }} </span
              >&nbsp;
              <br v-if="$vuetify.breakpoint.xs" />
              <span class="main" v-if="valuationChangeTextForFirstLine">{{
                valuationChangeTextForFirstLine
              }}</span>
            </h3>
            <h3
              class="hidden-sm-and-down hidden-xs text-xs-left black--text mb-4"
            >
              <span class="main" v-if="valuationChangeTextForSecondLine">{{
                valuationChangeTextForSecondLine
              }}</span>
              <span class="red--text">{{ valuationFrom }}</span> to
              <span style="color: #49d586">{{ valuationTo }}</span>
            </h3>
            <p
              class="hidden-md-and-up hidden-xs text-xs-left black--text subheading font-weight-bold mt-1"
            >
              <span class="main" v-if="valuationChangeTextForSecondLine">{{
                valuationChangeTextForSecondLine
              }}</span>
              <span class="red--text">{{ valuationFrom }}</span> to
              <span style="color: #49d586">{{ valuationTo }}</span>
            </p>

            <line-chart
              :chart-data="datacollection"
              :options="options"
              :styles="{ height: $vuetify.breakpoint.xs ? '250px' : '350px' }"
            ></line-chart>
            <!--
                <p class="main" v-if="mortgageChangeText">{{mortgageChangeText}}</p>
                <v-btn color="primary" to="/my-account/mortgage-cost-ratio">Mortgage Health Indicator</v-btn>
            -->
          </v-flex>
        </v-layout>
      </template>
    </panel-std-card>

    <v-layout
      v-if="show == 'showGraph'"
      row
      justify-center
      class="container fluid"
    >
      <v-flex xs11 sm11 md11 style="background: transparent;"></v-flex>
    </v-layout>

    <panel-std-card
      id="panelTitle"
      title
      sizes="xs12 sm10 md8"
      v-model="show"
      v-if="show == 'showMoreData'"
    >
      <template v-slot>
        <div
          class="loader"
          align="center"
          style="min-height:500px; padding-top:150px;"
        >
          <h3 id="dashboardGreeting">{{ personalDetails.firstname }},</h3>
          <p>
            we could not locate any accurate valuation data for your property:
          </p>
          <p>
            {{ reg.addressDetails.addressOnOneLine }},
            {{ reg.addressDetails.postcode }}
          </p>
          <p>How much do you think your property is worth?</p>
          <p>TODO</p>
        </div>
      </template>
    </panel-std-card>

    <panel-std-card
      id="panelTitle"
      title
      sizes="xs12 sm10 md8"
      v-model="show"
      v-if="show == 'showSpinner'"
    >
      <template v-slot>
        <div
          class="loader"
          align="center"
          style="min-height:500px; padding-top:150px;background-color:lightgrey"
        >
          <circle-loader color="#49D586" />
        </div>
      </template>
    </panel-std-card>
    <panel-std-card
      id="panelTitle"
      title
      sizes="xs12 sm10 md8"
      v-model="show"
      v-if="show == 'showNoData'"
    >
      <template v-slot>
        <div
          class="loader"
          align="center"
          style="min-height:500px; padding-top:150px;"
        >
          <p>You have no registration data.</p>
          <p>
            Normally a user could not get here without first having signed up
          </p>

          <p>Investigate how this happened or go through the sign up flow:</p>
          <p>
            <a href="/signup">Signup</a>
          </p>
          <br />
        </div>
      </template>
    </panel-std-card>
  </div>
</template>

<script src="./Dashboard.js"></script>
<style src="./Dashboard.scss" lang="scss"></style>
