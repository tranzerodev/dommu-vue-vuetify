<template>
  <div class="dashboard">
    <panel-std-card
      id="panelTitle"
      title=""
      sizes="xs12 sm10 md8"
      v-model="show"
      v-if="show == 'showGraph'"
    >
      <template v-slot>
        <h3 id="dashboardGreeting" class="pt-3">
          {{ reg.personalDetails.firstname }}, since {{ sinceYearText }}:
        </h3>
        <p class="main" v-if="valuationChangeText">{{ valuationChangeText }}</p>
        <!--
          <p class="main" v-if="equityChangeText">{{equityChangeText}}</p>
        -->

        <h3>Home value</h3>
        <div class="small">
          <line-chart
            :chart-data="datacollection"
            :options="options"
          ></line-chart>
        </div>
        <!--
        <p class="main" v-if="mortgageChangeText">{{mortgageChangeText}}</p>
        <v-btn color="primary" to="/my-account/mortgage-cost-ratio">Mortgage Health Indicator</v-btn>
        -->
        <p class="pa-5">
          The average homeowner can be overspending by up to 33% every month on
          their mortgage.<br />Click on 'Mortgage search' to check you're on the
          best deal.
        </p>
        <v-btn
          color="primary"
          to="/my-account/mortgage-search"
          v-on:click="$ga.event('DashboardPage', 'Click', 'MortgageSearchBtn')"
          >Mortgage search</v-btn
        >
        <p style="height:10px"></p>
      </template>
    </panel-std-card>
    <panel-std-card
      id="panelTitle"
      title=""
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
      title=""
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
      title=""
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

<script>
//import axios from "axios";
//const formatCurrency = require('format-currency')
import { getRateForYear } from "@/rateUtils.js"; // TODO add these utils to a class so we access them line RateUtils.getRateForYear
import { numberToText } from "@/utils.js";
import PanelStd from "@/components/PanelStd.vue";
import LineChart from "@/components/LineChart.vue";
import { CircleLoader } from "@saeris/vue-spinners";
const clonedeep = require("lodash.clonedeep");

import MortgageService from "@/services/MortgageService";

export default {
  name: "panel",
  components: {
    "panel-std-card": PanelStd,
    "line-chart": LineChart,
    "circle-loader": CircleLoader
  },
  data() {
    return {
      // this is the main data holder
      reg: "Registration Details", // holder for the registration properties passed in

      hasRegistration: false,
      hasAvm: false,
      hasAvmValuation: false,
      hasAvmError: false,
      hasAvmReport: false,
      hasAvmReportValuation: false,
      hasAvmReportError: false,
      show: null,
      registration: null,
      output: "",

      valuation: "",
      valuationFormatted: "",

      date: new Date(),
      dateFormatted: null,

      lsd: null,
      lsv: null,
      pc: null,
      ev: null,
      sinceYearText: null,
      valuationChangeText: null,
      equityChangeText: null,
      mortgageChangeText: null,
      search: {
        filter: {},
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      },
      datacollection: null,
      options: {
        responsive: true,
        title: {
          display: false,
          text: "Home Value"
        },
        legend: {
          display: false,
          position: "bottom"
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Date in Years" //was Date in Years
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          ]
        }
      }
    };
  },

  computed: {
    avm() {
      try {
        return this.$store.state.registration.avmDetails;
      } catch (e) {}
      return null;
    },
    avmValuation() {
      try {
        return this.$store.state.registration.avmDetails.Valuation;
      } catch (e) {}
      return null;
    },
    avmError() {
      try {
        return this.$store.state.registration.avmDetails.ErrorMessage;
      } catch (e) {}
      return null;
    },

    avmReport() {
      try {
        // todo pass in the report of the empty mode
        return this.$store.state.registration.avmReportDetails;
      } catch (e) {}
      return null;
    },
    avmReportValuation() {
      try {
        return this.$store.state.registration.avmReportDetails[
          "property-valuation-report-v2"
        ];
      } catch (e) {}
      return null;
    },
    avmReportError() {
      // TODO
      return null;
    },
    personal_store() {
      return this.$store.state.registration
        ? this.$store.state.registration.personalDetails.firstname
        : null;
    }
  },
  watch: {
    avm(newAvm, old) {
      if (newAvm) {
        this.hasAvm = true;
        this.$ga.event("DashboardPage", "Data", "GotAvmValue");
      }
    },
    avmValuation(newAvmValuation, old) {
      if (newAvmValuation) {
        this.hasAvmValuation = true;
        this.parseReportData();
        this.decideWhatScreen();
      }
    },
    avmError(newAvmError, old) {
      if (newAvmError) {
        this.hasAvmError = true;
      }
    },
    avmReport(newAvmReport, old) {
      if (newAvmReport) {
        this.hasAvmReport = true;
      }
    },
    avmReportValuation(newAvmReportValuation, old) {
      if (newAvmReportValuation) {
        if (this.show == "showGraph") {
          return;
        }
        this.hasAvmReport = true;
        this.parseReportData();
        this.decideWhatScreen();
        // TODO: tell this method we already have the data so it does not need to
        // call get mortgage results again as its creatrnig an infinite loop
      }
    },
    avmReportError(newAvmReportError, old) {
      if (newAvmReportError) {
        this.hasAvmReportError = true;
      }
    }
  },

  mounted() {
    this.$store.dispatch("setInMyAccount", true);
    this.fillData(); // make sure you do this first so the structure is created

    // set the flags to decide what to show
    this.decideWhatScreen();

    // set up the curency formatter /// TODO move to utils or mixims same with date below too
    this.dateFormatted = this.$helper.formatDate(this.date);

    // TODO: sort out order of these to methods, there is no need to fill data with placeholder stuff
    if (this.show == "showGraph") {
      this.parseReportData();

      // TODO call inital search here too if we already are on show graph?
    }
  },
  methods: {
    decideWhatScreen() {
      var registration = false;
      var avm = false;
      var valuation = false; // seeif we can jsut do with need thiis on and error, i.e no avm or avmReport
      var avmError = false;

      var report = false;
      var reportValuation = false; // seeif we can jsut do with need thiis on and error, i.e no avm or avmReport
      var reportError = false;

      var registrationStore = false;
      var avmStore = false;
      var valuationStore = false;
      var avmErrorStore = false;

      var reportStore = false;
      var reportValuationStore = false;
      var reportErrorStore = false;
      try {
        if (this.registration) {
          registration = true;
        }
      } catch (e) {}
      try {
        if (this.registration.avmDetails) {
          avm = true;
        }
      } catch (e) {}
      try {
        if (this.registration.avmDetails.Valuation) {
          valuation = true;
        }
      } catch (e) {}

      try {
        if (this.registration.avmDetails.Valuation.ErrorMessage) {
          avmError = true;
        }
      } catch (e) {}

      try {
        if (this.registration.avmReportDetails) {
          report = true;
        }
      } catch (e) {}
      try {
        if (
          this.registration.avmReportDetails["property-valuation-report-v2"][
            "valuation"[0]
          ][0]
        ) {
          reportValuation = true;
        }
      } catch (e) {}

      // check the store
      try {
        if (this.$store.state.registration) {
          registrationStore = true;
        }
      } catch (e) {}
      try {
        if (this.$store.state.registration.avmDetails) {
          avmStore = true;
        }
      } catch (e) {}
      try {
        if (this.$store.state.registration.avmDetails.Valuation) {
          valuationStore = true;
        }
      } catch (e) {}
      try {
        if (this.$store.state.registration.avmReportDetails) {
          reportStore = true;
        }
      } catch (e) {}
      try {
        if (
          this.$store.state.registration.avmReportDetails[
            "property-valuation-report-v2"
          ]["valuation"][0]
        ) {
          reportValuationStore = true;
        }
      } catch (e) {}
      try {
        if (this.$store.state.registration.avmDetails.Valuation.ErrorMessage) {
          avmErrorStore = true;
        }
      } catch (e) {}

      // now test what you have and decide what to show
      if (registration == false && registrationStore == false) {
        this.show = "showNoData";
      } else if (
        (avm == false && avmStore == false) ||
        (report == false && reportStore == false)
      ) {
        // TODO change this as it an empty object {}
        this.show = "showSpinner";
      } else if (
        (avm == true || avmStore == true) &&
        (avmError == true || avmErrorStore == true)
      ) {
        this.show = "showMoreData";
      } else if (
        ((valuation == true || valuationStore == true) &&
          (reportValuation == true || reportValuationStore == true)) ||
        reportValuationStore == true
      ) {
        this.show = "showGraph";
      } else {
        if (
          (avm == true && valuation == false && avmError == false) ||
          (report == true && reportValuation == false && reportError == false)
        ) {
          // TODO HACK fix above as avm can be an empty object
          this.show = "showSpinner";
        } else {
          this.show = "showNoData";
        }
      }

      // if showGraph then we must have all teh data so call get search results now?
      if (this.show == "showGraph") {
        // wait untill we also have mortgage balance data then call here?
        // TODO decide if here is the right place, its nto it cause a infinite loop!
        if (!reportValuationStore) {
        } else {
          this.registration = clonedeep(this.$store.state.registration);
          // see if we have a recent search
          // TODO expire afer a day
          if (this.$store.state.search && this.$store.state.search.filter) {
            this.search.filter = clonedeep(this.$store.state.search.filter);
          }
          if (
            this.$store.state.search &&
            this.$store.state.search.initialSearch
          ) {
            // TODO: just do this anyway? and then test the local
            this.search = clonedeep(this.$store.state.search);
          } else {
            this.getMortgageSearch().then(() => {
              if (this.error) {
              }
            });
          }
        }
      }

      // TODO remove this HACK once we have a fast way to test the 3 screens
      /*
      this.show = "showNoData";
      this.show = "showSpinner";
      this.show = "showMoreData";
      this.show = "showGraph";
      */
      if (this.registration) {
        this.reg = this.registration;
        this.parseReportData();
      }

      if (this.$store.state.token) {
        //this.parseReportData();
      }

      this.reg = this.$store.state.registration;
      //this.parseReportData();
    },

    parseReportData() {
      var graphIndex = 0;
      if (!this.reg.avmReportDetails["property-valuation-report-v2"]) {
        return;
      }
      var valuationNode = this.reg.avmReportDetails[
        "property-valuation-report-v2"
      ]["valuation"][0];
      // see if we have last sell information, if we do add as the first graph point
      // at a later date we can overlay a national, or area growth pattern to fill in gap from now till then
      // HACK hardcoded sale date for testing
      // valuationNode["last-sale-value"][0] = 315000;
      // valuationNode["last-sale-date"][0] = "2011-08-20";
      // HACK hardcoded sale date for testing

      if (!valuationNode || valuationNode["last-sale-value"][0] == 0) {
      } else {
        this.lsd = valuationNode["last-sale-date"][0];
        this.lsv = valuationNode["last-sale-value"][0];
        this.pc = valuationNode["price-change"][0];

        this.datacollection.datasets[2].data[graphIndex] = this.lsv;
        var dateParts = this.lsd.toString().split("-");
        var purchaseYear = dateParts[0];
        this.datacollection.labels[graphIndex] = purchaseYear;
        graphIndex++;
      }

      // Now add the hostoric prices
      var valuationVisualisationNode = this.reg.avmReportDetails[
        "property-valuation-report-v2"
      ]["valuation-visualisation"][0];

      if (!valuationVisualisationNode) {
      } else {
        var series =
          valuationVisualisationNode["value-over-last-five-years"][0]["series"];

        var alreadyFilled = false;
        var wasBoughtWithin5Years = false;
        var overridenValuation = false;
        for (var i = 0; i < series.length; i++) {
          var valuation = series[i];
          // TODO - maybe this is a local var - after all whats the point of changing it on each loop?
          this.ev = valuation["estimated-value"];
          var evd = valuation["date"];

          var graphDateParts = evd.toString().split("-");
          var graphValuationYear = graphDateParts[0];

          // if there was a sell point put in extra years
          // TODO reflect area price changes not linier

          // if they bought this year, then ignore the last price and fillin, TODO consider filling in the purchase price later? at the end of grph not begining
          if (!wasBoughtWithin5Years && purchaseYear > graphValuationYear) {
            graphIndex = 0;
            alreadyFilled = true; // its really a skipFill now
            wasBoughtWithin5Years = true;
          }
          if (
            graphIndex == 1 &&
            purchaseYear != graphValuationYear &&
            !alreadyFilled
          ) {
            var fillInYears = graphValuationYear - purchaseYear;
            var fillInValue = this.ev - this.lsv;
            var annualfillInValue = fillInValue / fillInYears;

            var firstGraphValuation = series[0]["estimated-value"];
            var firstGraphDate = series[0]["date"];
            // TODO - maybe this is a local var - after all whats the pont of changing it on each loop?

            var fillinPoints = this.getFillinPoints(
              purchaseYear,
              firstGraphDate,
              this.lsv,
              firstGraphValuation
            );

            for (var j = 0; j < fillInYears - 1; j++) {
              var currentGraphValuationYear =
                parseInt(purchaseYear, 10) + j + 1;
              this.datacollection.labels[
                graphIndex
              ] = currentGraphValuationYear;

              // now work out the price
              var currentGraphValuationAmount = fillinPoints[j];
              this.datacollection.datasets[2].data[
                graphIndex
              ] = currentGraphValuationAmount;

              graphIndex++;
              alreadyFilled = true;
            }
          }
          this.datacollection.datasets[2].data[graphIndex] = this.ev;
          this.datacollection.labels[graphIndex] = graphValuationYear;
          graphIndex++;
        }
      }

      // work out the scentence to display
      var startYear = this.datacollection.labels[0];
      var len = this.datacollection.datasets[2].data.length;
      var startValue = this.datacollection.datasets[2].data[0];
      var endValue = this.datacollection.datasets[2].data[len - 1];

      var overRideMultiplier = 1;
      // if the user has overridden the valuation, use that instead.
      if (
        this.reg.addressDetails.valuation &&
        this.reg.addressDetails.valuation != endValue
      ) {
        overridenValuation = true;
        overRideMultiplier = this.reg.addressDetails.valuation / endValue;

        endValue = this.reg.addressDetails.valuation;
      }
      var changeInGraph = endValue - startValue;
      var direction = "increased";
      if (changeInGraph < 0) {
        direction = "decreased";
        changeInGraph = changeInGraph * -1;
      }

      // var home = "Your Home";
      // TODO for screenshot debuging print the name
      this.valuation = endValue[0];
      var home =
        "" +
        this.reg.addressDetails.address1 +
        ", " +
        this.reg.addressDetails.postcode;

      if (wasBoughtWithin5Years) {
        this.sinceYearText = "" + purchaseYear;

        this.valuationChangeText =
          home +
          " has " +
          direction +
          " in value from " +
          this.$helper.formatMoneyHouseValue(this.lsv) +
          " to " +
          this.$helper.formatMoneyHouseValue(endValue) +
          ".";
      } else {
        this.sinceYearText = "" + startYear;
        this.valuationChangeText =
          home +
          " has " +
          direction +
          " in value from " +
          this.$helper.formatMoneyHouseValue(startValue) +
          " to " +
          this.$helper.formatMoneyHouseValue(endValue) +
          ".";
      }

      // Now fill in equity and morgage balance
      // HACK create fake equity ownership assume 75% LTV linerar repayments on a 25 year term
      // use actual values, if you don't have it just use the start of the graph
      var mortgageStartBalance = wasBoughtWithin5Years
        ? this.lsv * 0.75
        : startValue * 0.75;

      //var mortgageStartBalance = startValue * 0.75;
      var mortgageBalance = mortgageStartBalance;
      var mortgageAnnualDecrease = mortgageBalance / 25;
      var graphSeries = this.datacollection.datasets[2].data;
      for (i = 0; i < graphSeries.length; i++) {
        // see if we need to skip some years
        if (
          wasBoughtWithin5Years &&
          purchaseYear >= this.datacollection.labels[i]
        ) {
          //skip
        } else {
          //
          // TODO: put this back in it calulates LTV and Equity
          // TAKEN OUT 26/078/2019 for demo where we don't have credit report
          // for simple dashboard don't show mortgageBalance
          //
          /*
          this.datacollection.datasets[1].data[i] = mortgageBalance;
          mortgageBalance = mortgageBalance - mortgageAnnualDecrease;

          mortgageAnnualDecrease = mortgageAnnualDecrease * 1.05; // HACK for you pay more equity off later on
          // set the equity as value minus motgage balance
          this.datacollection.datasets[0].data[i] =
            this.datacollection.datasets[2].data[i] -
            this.datacollection.datasets[1].data[i];
            */
        }
      }

      // loop it a again and resmooth if they have changed their price
      if (overridenValuation) {
        for (i = 0; i < graphSeries.length; i++) {
          this.datacollection.datasets[2].data[i] =
            this.datacollection.datasets[2].data[i] * overRideMultiplier; // valuation line
          this.datacollection.datasets[0].data[i] =
            this.datacollection.datasets[0].data[i] * overRideMultiplier; // ltv line
        }
      }

      var equityStartValue = wasBoughtWithin5Years
        ? this.lsv - mortgageStartBalance
        : startValue - mortgageStartBalance;

      var equityValue = endValue - mortgageBalance;
      var equityDirection = "increased";
      if (equityStartValue > equityValue) {
        equityDirection = "decreased";
      }
      this.equityChangeText =
        "Your equity ownership has " +
        equityDirection +
        " from " +
        this.$helper.formatMoneyHouseValue(equityStartValue) +
        " to " +
        this.$helper.formatMoneyHouseValue(equityValue) +
        ".";

      var mortgageDirection = "decreased";
      if (mortgageStartBalance < mortgageBalance) {
        mortgageDirection = "increased";
      }
      this.mortgageChangeText =
        "Your mortgage balance has " +
        mortgageDirection +
        " from " +
        this.$helper.formatMoneyHouseValue(mortgageStartBalance) +
        " to " +
        this.$helper.formatMoneyHouseValue(mortgageBalance) +
        ".";

      // save any data that we caclulated
      var registration = clonedeep(this.$store.state.registration);
      registration.addressDetails.purchasePrice = this.lsv;
      this.$store.dispatch("setRegistration", registration);
    },

    // TODO move this to a server where address is passed, or jurastriction aread
    // Then it can get the real interest rate changes
    getFillinPoints(startYear, endYear, startAmount, endAmount) {
      // note end year has the quarters in it too.
      var rates = this.getRates(startYear, endYear);
      return this.fitAverageRates(
        parseInt(startAmount),
        parseInt(endAmount),
        rates
      );
    },
    getRates(startYear, endYear) {
      endYear = "" + endYear;
      var dif = endYear.substring(0, 4) - startYear;
      var rates = [];
      for (var i = 0; i < dif; i++) {
        rates[i] = getRateForYear(parseInt(startYear) + i);
      }
      return rates;
    },

    fitAverageRates(start, end, rates) {
      var totalRateChange = 0;
      var amountChangePerPercent = 0;
      var totalAmountChange = end - start;
      for (var j = 0; j < rates.length; j++) {
        totalRateChange = totalRateChange + rates[j];
      }

      amountChangePerPercent = totalAmountChange / totalRateChange;
      var amountChanges = [];
      for (var i = 0; i < rates.length - 1; i++) {
        // we already know the end value
        totalRateChange = totalRateChange + rates[i];
        if (i == 0) {
          amountChanges[i] = start + rates[i] * amountChangePerPercent;
        } else {
          amountChanges[i] =
            amountChanges[i - 1] + rates[i] * amountChangePerPercent;
        }
      }

      return amountChanges;
    },

    fillData() {
      this.datacollection = {
        labels: [2015, 2016, 2017, 2018, 2019],
        seriese: "seriese",
        datasets: [
          {
            label: "",
            backgroundColor: "transparent",
            borderColor: "transparent",
            data: [null, null, null, null, null]
          },

          {
            label: "",
            backgroundColor: "transparent",
            borderColor: "transparent",
            data: [null, null, null, null, null]
          },

          /*
          {
            label: "Equity",
            backgroundColor: "transparent",
            borderColor: "grey",
            data: [null, null, null, null, null]
          },
          {
            label: "Mortgage",
            backgroundColor: "transparent",
            borderColor: "orange",
            fillStyle: "transparent",
            data: [null, null, null, null, null]
          },
          */
          {
            label: "Home Value",
            backgroundColor: "transparent",
            borderColor: "blue",
            fillStyle: "transparent",
            data: [null, null, null, null, null]
          }
        ]
      };
    },

    // TODO calling search here for now but when this is no longer the dashboard then call it
    // from the first page we get to. Infact you can call it as soon as AVM and credit beauru results return
    async getMortgageSearch() {
      // store in Vue state TODO: who should call setregestration? do it bfore this, after if and after users saved?
      this.$store.dispatch("setInitialMortgageSearchStatus", "calling");

      var filter = {
        Period: "2",
        NumberOfSchemes: "20",
        Adverse: "false",
        DepositEquity:
          "" + Math.round(this.registration.avmDetails.Valuation * 0.25),
        Capped: "false",
        Discounted: "true",
        Fixed: "true",
        Variable: "true",
        Tracker: "true",
        NewLTV: "75",
        NewLoanAmount:
          "" + Math.round(this.registration.avmDetails.Valuation * 0.75),
        CurrentLoanAmount:
          "" + Math.round(this.registration.avmDetails.Valuation * 0.75),
        LoanTerm: "25", // TODO: work out from retirement age - age
        NumberOfBedrooms: numberToText(
          this.registration.addressDetails.bedrooms
        ),
        CurrentValue: "" + this.registration.avmDetails.Valuation,
        PurchaseType: "HOME_MOVER",
        RepaymentBasis: "REPAYMENT",
        RepaymentVehicle: "false",
        SearchBy: "BEST_INTEREST_RATE"
      };
      this.search.filter = filter; // TODO probably asve thsi strict away in bue state?
      this.$store.dispatch("setSearch", this.search);

      // TODO: do this when the AVM returns

      MortgageService.getBestBuysByProduct(filter) // <- TODO assumes 75% LTV btu graph assmumes 75% LTV at purchse tienm, so surface that function here to calulate that
        .then(({ data }) => {
          try {
            this.parseMbXml(data).then(({ data }) => {
              // TODO dotn se the veu state have parse pass
              //back the data then use ir then refactor the other method

              // TODO: better to access data here and
              // TODO: add error handleing here for nothing being returned
              //var jsonData = this.registration.avmReportDetails;
              var jsonData = this.search.initialSearch;
              if (
                // TODO work out what an error state is
                "" == jsonData
              ) {
                this.$store.dispatch("setInitialMortgageSearchStatus", "error");
              } else {
                this.$store.dispatch(
                  "setInitialMortgageSearchStatus",
                  "success"
                );
                this.$store.dispatch(
                  "setAlert",
                  "Your mortgage search results are ready now"
                );

                // store in DB
                // TODO update the signup data, maybe just the AVM part, but for now...just sign them up here
                //this.saveSearch();
              }
            });

            // allways store in Vue state
            this.$store.dispatch("setSearch", this.search);
          } catch (error) {
            this.error = error.response.data.error;
            //this.search.ErrorMessage = this.error;
          }
        });
    },

    // TODO: refactor into the parse xml method in SignupVue as all it does is set search results
    async parseMbXml(xml) {
      return new Promise((resolve, reject) => {
        const parseString = require("xml2js").parseString; // todo jsut do this once
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
            this.search.initialSearch = result;
            this.search.lastSearch = result;
            //this.search.savedSearches[  splice it in to the array ] = result;
          }
        });
      });
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
</style>
