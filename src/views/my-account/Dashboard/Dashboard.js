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
      valuationFrom: null,
      valuationTo: null,
      valuationChangeTextForFirstLine: null,
      valuationChangeTextForSecondLine: null,
      equityChangeText: null,
      mortgageChangeText: null,
      search: {
        filter: {},
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      },
      datacollection: {
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
          {
            label: "Home Value",
            backgroundColor: "transparent",
            fillStyle: "transparent",
            data: [null, null, null, null, null],
            pointBackgroundColor: "#7a78ff",
            pointBorderColor: "#7a78ff",
            pointRadius: 4,
            pointHoverRadius: 8,
            borderColor: "#7a78ff"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value"
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: (value, index, values) => {
                  return (
                    "£" + this.thousands_separators(Number(value).toFixed(0))
                  );
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            title: (items, data) => data["labels"][items[0]["index"]],
            label: (items, data) =>
              data["datasets"][2]["label"] +
              ": £" +
              this.thousands_separators(Number(items["value"]).toFixed(0))
          },
          backgroundColor: "#efeff7",
          titleFontSize: 24,
          titleFontColor: "black",
          titleFontStyle: "bold",
          bodyFontColor: "black",
          bodyFontSize: 24,
          bodyFontStyle: "bold",
          displayColors: false,
          titleAlign: "left",
          bodyAlign: "left",
          footerAlign: "left",
          // Disable the on-canvas tooltip
          enabled: false,
          custom: function(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById("chartjs-tooltip");

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = "<table></table>";
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = "<thead>";

              titleLines.forEach(function(title) {
                innerHtml += "<tr><th>" + title + "</th></tr>";
              });
              innerHtml += "</thead><tbody>";

              bodyLines.forEach(function(body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = "background:" + colors.backgroundColor;
                style += "; border-color:" + colors.borderColor;
                style += "; border-width: 2px";
                var span = '<span style="' + style + '"></span>';
                innerHtml += "<tr><td>" + span + body + "</td></tr>";
              });
              innerHtml += "</tbody>";

              var tableRoot = tooltipEl.querySelector("table");
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX -
              70 +
              "px";
            tooltipEl.style.top =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY +
              30 +
              "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = "20px 30px 15px"; // 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = "none";
          }
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
        this.decideWhatScreen();
        this.parseReportData();
        this.extendsGraphYAxes();
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
    avmReportValuation(newAvmReportValuation) {
      if (newAvmReportValuation) {
        if (this.show == "showGraph") {
          return;
        }
        this.hasAvmReport = true;
        this.decideWhatScreen();
        this.parseReportData();
        this.extendsGraphYAxes();
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
    // set the flags to decide what to show
    if (this.$store.state.search && this.$store.state.search !== {}) {
      this.search = _.cloneDeep(this.$store.state.search);
    }
    this.decideWhatScreen();

    // set up the curency formatter /// TODO move to utils or mixims same with date below too
    this.dateFormatted = this.$helper.formatDate(this.date);

    // TODO: sort out order of these to methods, there is no need to fill data with placeholder stuff
    if (this.show === "showGraph") {
      this.parseReportData();
      this.extendsGraphYAxes();
      // TODO call inital search here too if we already are on show graph?
    }
  },
  methods: {
    thousands_separators(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = (Math.round(Number(num_parts[0]) / 1000) * 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    },
    decideWhatScreen() {
      let registration = false;
      let avm = false;
      let valuation = false; // seeif we can jsut do with need thiis on and error, i.e no avm or avmReport
      let avmError = false;

      let report = false;
      let reportValuation = false; // seeif we can jsut do with need thiis on and error, i.e no avm or avmReport
      let reportError = false;

      let registrationStore = false;
      let avmStore = false;
      let valuationStore = false;
      let avmErrorStore = false;

      let reportStore = false;
      let reportValuationStore = false;
      if (this.registration) {
        registration = true;
        if (this.registration.avmDetails) {
          avm = true;
          if (this.registration.avmDetails.Valuation) {
            valuation = true;
            if (this.registration.avmDetails.Valuation.ErrorMessage) {
              avmError = true;
            }
          }
        }
        if (this.registration.avmReportDetails) {
          report = true;
          if (
            this.registration.avmReportDetails["property-valuation-report-v2"][
              "valuation"[0]
            ][0]
          ) {
            reportValuation = true;
          }
        }
      }
      if (this.$store.state.registration) {
        registrationStore = true;
        if (this.$store.state.registration.avmDetails) {
          avmStore = true;
          if (this.$store.state.registration.avmDetails.Valuation) {
            valuationStore = true;
            if (
              this.$store.state.registration.avmDetails.Valuation.ErrorMessage
            ) {
              avmErrorStore = true;
            }
          }
        }
        if (this.$store.state.registration.avmReportDetails) {
          reportStore = true;
          if (
            this.$store.state.registration.avmReportDetails[
              "property-valuation-report-v2"
            ]["valuation"][0]
          ) {
            reportValuationStore = true;
          }
        }
      }
      // now test what you have and decide what to show
      if (registration === false && registrationStore === false) {
        this.show = "showNoData";
      } else if (
        (avm === false && avmStore === false) ||
        (report === false && reportStore === false)
      ) {
        // TODO change this as it an empty object {}
        this.show = "showSpinner";
      } else if (
        (avm === true || avmStore === true) &&
        (avmError === true || avmErrorStore === true)
      ) {
        this.show = "showMoreData";
      } else if (
        ((valuation === true || valuationStore === true) &&
          (reportValuation === true || reportValuationStore === true)) ||
        reportValuationStore === true
      ) {
        this.show = "showGraph";
      } else {
        if (
          (avm === true && valuation === false && avmError === false) ||
          (report === true &&
            reportValuation === false &&
            reportError === false)
        ) {
          // TODO HACK fix above as avm can be an empty object
          this.show = "showSpinner";
        } else {
          this.show = "showNoData";
        }
      }

      // if showGraph then we must have all teh data so call get search results now?
      if (this.show === "showGraph") {
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
            this.getMortgageSearch();
          }
        }
      }

      // TODO remove this HACK once we have a fast way to test the 3 screens
      this.reg = this.$store.state.registration;
    },

    parseReportData() {
      let graphIndex = 0;
      if (!this.reg.avmReportDetails["property-valuation-report-v2"]) {
        return;
      }
      let valuationNode = this.reg.avmReportDetails[
        "property-valuation-report-v2"
      ]["valuation"][0];
      let purchaseYear;
      if (!valuationNode || valuationNode["last-sale-value"][0] == 0) {
      } else {
        this.lsd = valuationNode["last-sale-date"][0];
        this.lsv = valuationNode["last-sale-value"][0];
        this.pc = valuationNode["price-change"][0];

        this.datacollection.datasets[2].data[graphIndex] = this.lsv;
        let dateParts = this.lsd.toString().split("-");
        purchaseYear = dateParts[0];
        this.datacollection.labels[graphIndex] = purchaseYear;
        graphIndex++;
      }

      // Now add the hostoric prices
      let valuationVisualisationNode = this.reg.avmReportDetails[
        "property-valuation-report-v2"
      ]["valuation-visualisation"][0];

      let overriddenValuation = false;
      let wasBoughtWithin5Years = false;

      if (!valuationVisualisationNode) {
      } else {
        let series =
          valuationVisualisationNode["value-over-last-five-years"][0]["series"];

        let alreadyFilled = false;
        for (var i = 0; i < series.length; i++) {
          let valuation = series[i];
          // TODO - maybe this is a local var - after all whats the point of changing it on each loop?
          this.ev = valuation["estimated-value"];
          let evd = valuation["date"];

          let graphDateParts = evd.toString().split("-");
          let graphValuationYear = graphDateParts[0];

          // if there was a sell point put in extra years
          // TODO reflect area price changes not linier

          // if they bought this year, then ignore the last price and fillin, TODO consider filling in the purchase price later? at the end of grph not begining
          if (!wasBoughtWithin5Years && purchaseYear > graphValuationYear) {
            graphIndex = 0;
            alreadyFilled = true; // its really a skipFill now
            wasBoughtWithin5Years = true;
          }
          if (
            graphIndex === 1 &&
            purchaseYear !== graphValuationYear &&
            !alreadyFilled
          ) {
            let fillInYears = graphValuationYear - purchaseYear;
            let fillInValue = this.ev - this.lsv;
            let annualfillInValue = fillInValue / fillInYears;

            let firstGraphValuation = series[0]["estimated-value"];
            let firstGraphDate = series[0]["date"];
            // TODO - maybe this is a local var - after all whats the pont of changing it on each loop?

            let fillinPoints = this.getFillinPoints(
              purchaseYear,
              firstGraphDate,
              this.lsv,
              firstGraphValuation
            );

            for (var j = 0; j < fillInYears - 1; j++) {
              let currentGraphValuationYear =
                parseInt(purchaseYear, 10) + j + 1;
              this.datacollection.labels[
                graphIndex
              ] = currentGraphValuationYear;

              // now work out the price
              let currentGraphValuationAmount = fillinPoints[j];
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
      let startYear = this.datacollection.labels[0];
      let len = this.datacollection.datasets[2].data.length;
      let startValue = this.datacollection.datasets[2].data[0];
      let endValue = this.datacollection.datasets[2].data[len - 1];
      let overRideMultiplier = 1;
      // if the user has overridden the valuation, use that instead.
      if (
        this.reg.addressDetails.correctedValuation &&
        this.reg.addressDetails.correctedValuation !== endValue
      ) {
        overriddenValuation = true;
        overRideMultiplier =
          this.reg.addressDetails.correctedValuation / endValue;
        endValue = this.reg.addressDetails.correctedValuation;
        startValue = startValue * overRideMultiplier;
      }
      let changeInGraph = endValue - startValue;
      let direction = "increased";
      if (changeInGraph < 0) {
        direction = "decreased";
        changeInGraph = changeInGraph * -1;
      }

      // var home = "Your Home";
      // TODO for screenshot debuging print the name
      this.valuation = endValue[0];
      let home =
        "" +
        this.reg.addressDetails.address1 +
        ", " +
        this.reg.addressDetails.postcode;

      if (wasBoughtWithin5Years) {
        this.sinceYearText = "" + purchaseYear;

        this.valuationChangeTextForFirstLine = home;

        this.valuationChangeTextForSecondLine =
          "has " + direction + " in value from ";
        // need to check future because is same as else operation
        // this.valuationFrom = this.$helper.formatMoneyHouseValue(this.lsv);
        this.valuationFrom = this.$helper.formatMoneyHouseValue(startValue);
        this.valuationTo = this.$helper.formatMoneyHouseValue(endValue);
      } else {
        this.sinceYearText = "" + startYear;
        this.valuationChangeTextForFirstLine = home;

        this.valuationChangeTextForSecondLine =
          "has " + direction + " in value from ";

        this.valuationFrom = this.$helper.formatMoneyHouseValue(startValue);
        this.valuationTo = this.$helper.formatMoneyHouseValue(endValue);
      }

      // Now fill in equity and morgage balance
      // HACK create fake equity ownership assume 75% LTV linerar repayments on a 25 year term
      // use actual values, if you don't have it just use the start of the graph
      let mortgageStartBalance = wasBoughtWithin5Years
        ? this.lsv * 0.75
        : startValue * 0.75;

      //var mortgageStartBalance = startValue * 0.75;
      let mortgageBalance = mortgageStartBalance;
      let mortgageAnnualDecrease = mortgageBalance / 25;
      let graphSeries = this.datacollection.datasets[2].data;
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
        }
      }

      // loop it a again and resmooth if they have changed their price
      if (overriddenValuation) {
        for (i = 0; i < graphSeries.length; i++) {
          this.datacollection.datasets[2].data[i] =
            this.datacollection.datasets[2].data[i] * overRideMultiplier; // valuation line
          this.datacollection.datasets[0].data[i] =
            this.datacollection.datasets[0].data[i] * overRideMultiplier; // ltv line
        }
      }

      let equityStartValue = wasBoughtWithin5Years
        ? this.lsv - mortgageStartBalance
        : startValue - mortgageStartBalance;

      let equityValue = endValue - mortgageBalance;
      let equityDirection = "increased";
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

      let mortgageDirection = "decreased";
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
      let registration = clonedeep(this.$store.state.registration);
      registration.addressDetails.purchasePrice = this.lsv;
      this.$store.dispatch("setRegistration", registration);
    },

    extendsGraphYAxes() {
      let gv = -Infinity;
      let lv = Infinity;
      this.datacollection.datasets[2].data.map(v => {
        gv = Math.max(v, gv);
        lv = Math.min(v, lv);
      });
      if (gv === -Infinity || lv === Infinity) {
        return false;
      }
      let mv = Math.round((gv - lv) / 2);
      gv = Math.round(gv + mv);
      lv = Math.round(lv - mv);
      const dis = (gv - lv) / 10;
      const step = 10000 * Math.round(dis / 10000) || 10000;
      this.options.scales.yAxes[0].ticks.min = step * Math.round(lv / step);
      this.options.scales.yAxes[0].ticks.max = step * Math.round(gv / step);
      this.options.scales.yAxes[0].ticks.stepSize = step;
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
        CurrentValue:
          "" +
          (this.registration.addressDetails.correctedValuation
            ? this.registration.addressDetails.correctedValuation
            : this.registration.avmDetails.Valuation),
        PurchaseType: "HOME_MOVER",
        RepaymentBasis: "REPAYMENT",
        RepaymentVehicle: "false",
        SearchBy: "BEST_INTEREST_RATE"
      };
      filter.NewLoanAmount = "" + Math.round(filter.CurrentValue * 0.75);
      if (this.$store.state.search && this.$store.state.search.filter) {
        this.search.filter = this.$store.state.search.filter;
      } else {
        this.search.filter = filter; // TODO probably save this strict away in bue state?
        this.$store.dispatch("setSearch", this.search);
      }

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

            // always store in Vue state
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
