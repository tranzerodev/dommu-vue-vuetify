import {
  // TODO do a look up on these too
  //getLenderName,
  //getLenderUrl,
  getLenderImage
} from "@/lenderMapping.js";

import Vue from "vue";
import Panel from "@/components/Panel.vue";
import MultiFiltersPlugin from "../../../plugins/MultiFilters";
import { CircleLoader } from "@saeris/vue-spinners";
import MortgageService from "@/services/MortgageService";

Vue.use(MultiFiltersPlugin);

export default {
  name: "panel",
  components: {
    "panel-card": Panel,
    "circle-loader": CircleLoader
  },
  computed: {
    borrowingAmount: {
      get() {
        const v = this.search.filter.NewLoanAmount;
        return v ? this.$helper.formatNumber(v) : "";
      },
      set(nv) {
        const v = parseInt(nv.replace(/\,/g, ""));
        this.search.filter.NewLoanAmount = v;
      }
    },
    propertyValue: {
      get() {
        const v = this.search.filter.CurrentValue;
        return v ? this.$helper.formatNumber(v) : "";
      },
      set(nv) {
        const v = parseInt(nv.replace(/\,/g, ""));
        this.search.filter.CurrentValue = v;
      }
    },
    // TODO: add support for search error handling
    // TODO should this be the mortgages data element?
    watchSearch() {
      try {
        return this.$store.state.search.initialSearch["s:Envelope"];
      } catch (e) {
        // do nothing
      }
      return null;
    }
  },
  watch: {
    watchSearch(newSearch) {
      if (newSearch) {
        if (this.show === "showMain") {
          return;
        }
        this.fillData();
      }
    }
  },
  methods: {
    rowSelected(key) {
      this.selectedRow = key;
    },
    showMortgageDetails(props) {
      this.$ga.event(
        "MortgageSearchFormResult",
        "Click",
        "ViewMortgageDetailsBtn"
      );
      this.dialog = true;
      this.selectedItem = props.item;
      this.search.currentProduct = props.item;
      // TODO don't save the whole seach node as it takes too long.
      // jsut store the current item
      this.$store.dispatch("setSearch", this.search);
    },
    fillData() {
      try {
        if (this.$store.state.search && this.$store.state.search.filter) {
          this.search = _.cloneDeep(this.$store.state.search);
          if (!this.search.filter.isNewLoanAmountTouched) {
            this.search.filter.NewLoanAmount =
              "" + Math.floor(this.search.filter.CurrentValue * 0.75);
            this.search.filter.isNewLoanAmountTouched = true;
          }
        }
        if (
          this.$store.state.search &&
          this.$store.state.search.initialSearch &&
          this.$store.state.search.initialSearch["s:Envelope"]
        ) {
          this.show = "showMain";

          // TODO use all results then on filter and flick between the two  or jsut filter out? (is this broker lender?)
          let search = this.$store.state.search.initialSearch["s:Envelope"][
            "s:Body"
          ][0]["GetBestBuysByProductResponse"][0];

          let returnStatus =
            search["GetBestBuysByProductResult"][0]["a:ReturnStatus"][0];

          //var fixedSchemes = search.FixedSchemes[0]["a:MBPublicSchemeSummary"];
          let fixedSchemes = search.AllSchemes[0]["a:MBPublicSchemeSummary"];
          //var trackerSchemes = search.TrackerSchemes[0]["a:MBPublicSchemeSummary"]
          this.mortgages = [];
          for (let i = 0; i < fixedSchemes.length; i++) {
            // TODO: this is where the error messages are so check that

            let newResult = {
              id: i, // todo get cheme id
              provider: fixedSchemes[i]["a:LenderName"][0],
              img: getLenderImage(fixedSchemes[i]["a:BaseLenderID"][0]),
              monthlyPayment: this.$helper.formatMoney(
                fixedSchemes[i]["a:InitialMonthlyPayment"][0]
              ),
              initialRate: this.$helper.formatInterestRate(
                fixedSchemes[i]["a:InitialRate"][0]
              ),
              lenderFees: this.$helper.formatMoney(
                fixedSchemes[i]["a:AddedFees"][0]
              ),
              APRC: this.$helper.formatApr(fixedSchemes[i]["a:APR"][0]),
              initialTermCost: this.$helper.formatMoney(
                fixedSchemes[i]["a:NYearCostIncFeesExERC"][0]
              ),
              totalCost: this.$helper.formatMoney(
                fixedSchemes[i]["a:TotalAmountPayableOverTerm"][0]
              ),
              // TODO: work these out
              savings: "£3,000",
              ourCommision: "£250",
              offerExpiry: "25/06/2019",
              providerNumber: "0800 169 6333",
              providerLink:
                "https://www.online-mortgages.hsbc.co.uk/1/2/!ut/p/z1/hY7BToNAEIafhiM7wy4F2hs0lqiNNCUG2AtZ2u1CpCyBrUSfXqIXm1Q7t5n5vy8_cMiBd-K9UcI0uhPtvBfcK5144cbRGp9jtvQxXNPU2e1SxNiB7DuAVxNitKcRm_8JBf4Pj7f536Z7_BNw1erqp2rYVSxQwAd5koMcyGWYz7Ux_biy0MJpmkg9Vgdy0OTyZuFZD0YJJUcLaz3ZRtui79sPC2-5aj0ayK8VUMzt_T_rBYt7AR9S4MDlWDbNEYqHtNxsk-zxZZOsqE8ZI0jcAKkXoOehy5jPltCfX_PPrczsfa--AHIxRFE!/",
              providerTerms:
                "https://lmsuk.com/ConveyancerZone/Pages/Download.aspx?dem_id=442390",
              providerPrivacy: "https://www.hsbc.co.uk/privacy-notice/",
              broker: "Fluent Mortgages",
              ourBrokerCommision: "£240",
              brokerNumber: "01204 899500",
              brokerLogo: "/img/broker-logos/fluent-mortgages-120-logo.png",
              brokerLink:
                "https://www.landc.co.uk/online/mortgage-finder?purchaseOrRemortgage=r&leadId=18170804",
              brokerTerms:
                "https://www.landc.co.uk/about-us/terms-of-business-advised/",
              brokerPrivacy:
                "https://www.landc.co.uk/about-us/privacy-statement/",
              // TODO get this checked by legal and complience
              // TODO get mortgage type
              representativeExample: this.$helper.representativeExample(
                fixedSchemes[i]
              )
            };

            if (this.mortgages) {
              this.mortgages.push(newResult);
            } else {
              this.mortgages = [newResult];
            }
          }
        } else {
          // TODO also do this on error? also monitr for results and pop on change
          this.show = "showSpinner";
        }
      } catch (error) {
        this.show = "showMain";
      }
    },
    customFilter(items, filters, filter, headers) {
      // Init the filter class.
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      cf.registerFilter("search", function(searchWord, items) {
        if (searchWord.trim() === "") return items;

        return items.filter(item => {
          return item.provider.toLowerCase().includes(searchWord.toLowerCase());
        }, searchWord);
      });

      cf.registerFilter("added_by", function(added_by, items) {
        if (added_by.trim() === "") return items;

        return items.filter(item => {
          return item.added_by.toLowerCase() === added_by.toLowerCase();
        }, added_by);
      });

      // Its time to run all created filters.
      // Will be executed in the order thay were defined.
      return cf.runFilters();
    },

    /**
     * Handler when user input something at the "Filter" text field.
     */
    filterSearch(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        search: val
      });
    },

    /**
     * Handler when user  select some author at the "Author" select.
     */
    filterAuthor(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        added_by: val
      });
    },

    incrementMortgageTerm() {
      if (parseInt(this.search.filter.LoanTerm, 10) < 40) {
        this.search.filter.LoanTerm = String(
          parseInt(this.search.filter.LoanTerm, 10) + 1
        );
      }
    },
    decrementMortgageTerm() {
      if (parseInt(this.search.filter.LoanTerm, 10) > 1) {
        this.search.filter.LoanTerm = String(
          parseInt(this.search.filter.LoanTerm, 10) - 1
        );
      }
    },

    onRepaymentBasisChange(value) {
      this.search.filter.RepaymentBasis = value;
    },
    onInitialTermChange(value) {
      if (value == 0) {
        this.search.filter.Discounted = "false";
      } else {
        this.search.filter.Discounted = "true";
      }
      this.search.filter.Period = String(value);
    },
    onLenderFeeChange(value) {
      this.$ga.event(
        "MortgageSearchFilterForm",
        "Select",
        "LenderFeesField",
        value
      );
      if (value === "Yes") {
        // this.search.filter.lenderFees = "Yes";
        // TODO: handle  lender fee filtering  - it can be done on the current dataset
      } else {
        // this.search.filter.lenderFees = "No";
      }
    },

    onRepaymentFeesChange(value) {
      this.$ga.event(
        "MortgageSearchFilterForm",
        "Select",
        "EarlyRepaymentFeesField",
        value
      );
      if (value == "Yes") {
        // TODO: handle  ERP filtering  - it can be done on the current dataset
        // this.search.filter.Variable = true;
      } else {
      }
    },
    // ---------------------------------------------------------------------------------------
    showLenders() {},
    showBrokers() {},
    showFilters() {},
    applySortBy(value) {
      this.$ga.event("MortgageSearchForm", "Select", "SortByField", value);
      this.pagination.sortBy = value;
    },

    filterDialogSave() {
      this.$ga.event("MortgageSearchFilterForm", "Click", "SaveBtn");
      this.filterDialog = false;
      this.$store.dispatch("setSearchFilter", this.search.filter);
      setTimeout(() => {
        this.searchMortgages();
      }, 300);
    },
    filterDialogReset() {
      this.search.filter.Period = "2";
      this.search.filter.Tracker = true;
      this.search.filter.Variable = true;
      this.search.filter.Fixed = true;
      this.search.filter.lenderFees = "None";
      this.search.filter.earlyRepaymentFees = "None";
    },
    filterDialogCancel() {
      this.search.filter = _.cloneDeep(this.$store.state.search.filter);
    },
    searchMortgages() {
      this.$ga.event("MortgageSearchForm", "Click", "SearchBtn");
      this.getMortgageSearch();
    },

    //
    //
    // TODO: refact
    //
    //
    getMortgageSearch() {
      if (this.$refs.mortgageSearchForm.validate()) {
        this.snackbar = true;
        this.show = "showSpinner";
        this.$store.dispatch("setInitialMortgageSearchStatus", "calling");

        // check the current search filter
        /*
        // Search.filter:
        {"Period":"2","NumberOfSchemes":"20","Adverse":"false","DepositEquity":"190000",
        "Capped":"false","Discounted":"true","Fixed":"true","Variable":"true","Tracker":"true",
        "NewLTV":"75","NewLoanAmount":"570000","CurrentLoanAmount":"570000","LoanTerm":"25",
        "NumberOfBedrooms":"THREE","CurrentValue":"760000","PurchaseType":"HOME_MOVER",
        "RepaymentBasis":"REPAYMENT","RepaymentVehicle":"false","SearchBy":"BEST_INTEREST_RATE"}
        */
        let searchFilter = Object.assign({}, this.search.filter);
        delete searchFilter.isNewLoanAmountTouched;
        searchFilter.NewLoanAmount = "" + searchFilter.NewLoanAmount;
        searchFilter.CurrentValue = "" + searchFilter.CurrentValue;
        if (this.search.filter.Fixed) {
          searchFilter.Fixed = String(this.search.filter.Fixed);
        } else {
          searchFilter.Fixed = "false";
        }
        if (this.search.filter.Variable) {
          searchFilter.Variable = String(this.search.filter.Variable);
        } else {
          searchFilter.Variable = "false";
        }
        if (this.search.filter.Tracker) {
          searchFilter.Tracker = String(this.search.filter.Tracker);
        } else {
          searchFilter.Tracker = "false";
        }
        /*
        // MB filter does nto have fees?
        Lender Fees
        value="search.filter.initialTerm
        Early Repayment Fees
        :value="search.filter.initialTerm"
        */

        searchFilter.LoanTerm = String(this.search.filter.LoanTerm);

        // TODO work out how to set these
        /*
        this.search.filter.DepositEquity = 190000,
        this.search.filter.NewLTV":"75
        this.search.filter.NewLoanAmount":"570000
        this.search.filter.CurrentLoanAmount":"570000
        this.search.filter.CurrentValue":"760000"
        */

        //search.filter.CurrentValue
        //search.filter.NewLoanAmount

        // await setTimeout(this.function2, 5000);
        MortgageService.getBestBuysByProduct(searchFilter) // <- TODO assumes 75% LTV btu graph assmumes 75% LTV at purchse tienm, so surface that function here to calulate that
          .then(({ data }) => {
            try {
              if (!data) {
              }
              this.parseMbXml(data).then(res => {
                if (!res) {
                  return false;
                }
                const json = res.json;
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
                  //this.registration.avmReportDetails.ErrorMessage = jsonData;
                  this.$store.dispatch(
                    "setInitialMortgageSearchStatus",
                    "error"
                  );
                } else {
                  this.$store.dispatch(
                    "setInitialMortgageSearchStatus",
                    "success"
                  );
                  this.$store.dispatch(
                    "setAlert",
                    "Your mortgage search results are ready now"
                  );
                  this.$store.dispatch("setSearch", this.search);
                  this.fillData();
                  // store in DB
                  // TODO update the signup data, maybe just the AVM part, but for now...just sign them up here
                  //this.saveSearch();
                }
              });
            } catch (error) {
              this.error = error.response.data.error;
              //this.search.ErrorMessage = this.error;
            }
          });
      }
    },

    // TODO: refactor into the parse xml method in SignupVue as all it does is set search results
    async parseMbXml(xml) {
      return new Promise((resolve, reject) => {
        const parseString = require("xml2js").parseString; // todo jsut do this once
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          } else {
            this.search.initialSearch = result;
            resolve(result);
          }
        });
      });
    }
  },
  data() {
    return {
      mortgages: [], // this is the main list
      RESULT_LIMIT: 20,
      pagination: {
        sortBy: "initialTermCost",
        rowsPerPage: 10
      },
      show: "showSpinner",
      dialog: false,
      mortgageTermDialog: false,
      paymentOptionDialog: false,
      filterDialog: false,
      initialTermDialog: false,
      rateTypeDialog: false,
      lenderFeesDialog: false,
      earlyRepaymentFeesDialog: false,
      LTVDialog: false,
      notifications: false,
      sound: false,
      widgets: false,
      currency: "£",
      filters: {
        search: "",
        added_by: ""
      },
      search: {
        filter: {
          // This is the filter passed to MB
          mortgageTerm: 25,
          mortgageAmount: 250000,
          propertyValue: 550000,
          repaymentType: "capitalAndInterest" //interestOnly
        },
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      },

      defaultSortBySelected: {
        text: "Initial term cost",
        value: "initialTermCost"
      },
      sortByList: [
        { text: "Monthly payment", value: "monthlyPayment" },
        { text: "Initial term cost", value: "initialTermCost" },
        { text: "Initial rate", value: "initialRate" },
        { text: "Total cost", value: "totalCost" },
        { text: "Lender fees", value: "lenderFees" },
        { text: "APRC", value: "APRC" },
        { divider: true },
        { header: "Advanced" },
        { text: "Initial term (early repayment)", value: "initialTermEr" },
        { text: "Initial term (slip over into SRV)", value: "initialTermSvr" }
      ],
      selectedItem: {
        id: 0,
        provider: null,
        img: null,
        monthlyPayment: null,
        initialRate: null,
        lenderFees: null,
        APRC: null,
        initialTermCost: null,
        totalCost: null,
        // TODO: set these to null when we have the real data from DB
        offerExpiry: "25/06/2019",
        ourCommision: "£140",
        providerNumber: "0800 169 6333",
        providerLink:
          "https://www.online-mortgages.hsbc.co.uk/1/2/!ut/p/z1/hY7BToNAEIafhiM7wy4F2hs0lqiNNCUG2AtZ2u1CpCyBrUSfXqIXm1Q7t5n5vy8_cMiBd-K9UcI0uhPtvBfcK5144cbRGp9jtvQxXNPU2e1SxNiB7DuAVxNitKcRm_8JBf4Pj7f536Z7_BNw1erqp2rYVSxQwAd5koMcyGWYz7Ux_biy0MJpmkg9Vgdy0OTyZuFZD0YJJUcLaz3ZRtui79sPC2-5aj0ayK8VUMzt_T_rBYt7AR9S4MDlWDbNEYqHtNxsk-zxZZOsqE8ZI0jcAKkXoOehy5jPltCfX_PPrczsfa--AHIxRFE!/",
        providerTerms:
          "https://lmsuk.com/ConveyancerZone/Pages/Download.aspx?dem_id=442390",
        providerPrivacy: "https://www.hsbc.co.uk/privacy-notice/",

        ourBrokerCommision: "£240",
        brokerNumber: "0800 169 6333",
        brokerLink:
          "https://www.landc.co.uk/online/mortgage-finder?purchaseOrRemortgage=r&leadId=18170804",
        brokerTerms:
          "https://www.landc.co.uk/about-us/terms-of-business-advised/",
        brokerPrivacy: "https://www.landc.co.uk/about-us/privacy-statement/",
        representativeExample: null
      },
      expand: true,
      headers: [
        { text: "Provider", value: "provider", align: "left", width: "" },
        {
          text: "Monthly payment",
          value: "monthlyPayment",
          align: "left",
          width: ""
        },
        {
          text: "Initial rate",
          value: "initialRate",
          align: "left",
          width: ""
        },
        { text: "Lender fees", value: "lenderFees", align: "left", width: "" },
        { text: "APRC", value: "APRC", align: "left", width: "" },
        {
          text: "Initial term cost",
          value: "initialTermCost",
          align: "left",
          width: ""
        },
        {
          text: "",
          value: "action",
          align: "left",
          width: "",
          sortable: false
        }
      ],
      valid: false,
      borrowingAmountRules: [
        v => !!v || "Please enter borrowing amount",
        v => /^[\d\,]+$/.test(v) || "Please enter a valid borrowing amount"
      ],
      propertyValueRules: [
        v => !!v || "Please enter property value",
        v => /^[\d\,]+$/.test(v) || "Please enter a valid property value"
      ],
      mortgageTermRules: [
        v => !!v || "Please enter valid mortgage term",
        v => v <= 40 || "Maximum mortgage term is 40 years",
        v => v > 0 || "Minimum mortgage term is 1 years",
        v => /^(0|[1-9]\d*)$/.test(v) || "Whole values are allowed"
      ],
      selectedRow: null
    };
  },
  created() {},
  mounted() {
    this.fillData();
    if (
      !(
        this.$store.state.search &&
        this.$store.state.search.initialSearch &&
        this.$store.state.search.initialSearch["s:Envelope"]
      )
    ) {
      setTimeout(() => {
        this.getMortgageSearch();
      }, 100);
    }
    this.$store.dispatch("setInMyAccount", true);
  }
};
