import AvmService from "@/services/AvmService";
import SignupPersonal from "@/components/signup/SignupPersonal/SignupPersonal.vue";
import SignupAddress from "@/components/signup/SignupAddress/SignupAddress.vue";
import SignupHomeValuation from "@/components/signup/SignupHomeValuation/SignupHomeValuation.vue";
import { uuid } from "@/utils";
import AuthService from "@/services/AuthService";
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "signup-default",
  components: {
    SignupPersonal,
    SignupAddress,
    SignupHomeValuation,
    CircleLoader
  },
  props: {},
  data() {
    return {
      error: null,
      e1: 1,
      steps: 3,
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
      search: {
        filter: {},
        currentProduct: {},
        initialSearch: {},
        lastSearch: {},
        savedSearches: {}
      },
      waitAVM: Promise.resolve(false),
      showSpinner: false,
      avmProcessing: false
    };
  },
  mounted() {},
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    "registration.joint": function(newValue) {
      if (newValue) {
        // add an extra step to the process
        this.steps = 4;
      } else {
        this.steps = 3;
      }
    }
  },
  computed: {
    register_store() {
      return this.$store.state.registration
        ? this.$store.state.registration
        : false;
    },
    avmDetails_store() {
      return this.$store.state.registration &&
        this.$store.state.registration.avmDetails
        ? this.$store.state.registration.avmDetails
        : false;
    }
  },
  methods: {
    track() {
      this.$ga.page("/signup");
    },
    async signupUser() {
      if (
        this.registration.personalDetails &&
        this.registration.personalDetails.email
      ) {
        // TODO now I see it might as well make it 4 separate objects, as makes it easg to add the AVM data in a separate column. maybe even call it user data?
        const registration = _.cloneDeep(this.registration);
        delete registration.personalDetails.password;
        return AuthService.signup(
          this.$store.state.cuid,
          JSON.stringify(registration)
        ).then(
          res => {
            this.$store.dispatch(
              "setAlert",
              "AVM has returned and the Users details have been saved"
            );
            this.$store.dispatch(
              "setRegistration",
              JSON.parse(res.registration)
            );
            return res.registration;
          },
          error => {
            this.error = error.response.data.error;
            this.registration.avmDetails.ErrorMessage = this.error;
            return false;
          }
        );
      }
    },
    async registerUser() {
      try {
        const response = await AuthService.register(
          this.registration.personalDetails.email,
          this.registration.personalDetails.password,
          uuid()
        );
        // TODO: store this in cookie
        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setCuid", response.cuid);
        this.error = null;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async getAvm() {
      // store in Vue state TODO: who should call setregestration? do it bfore this, after if and after users saved?
      this.$store.dispatch("setAvmStatus", "calling");
      this.$store.dispatch("setRegistration", this.registration);
      return AvmService.getAvm({
        Bedrooms: this.registration.addressDetails.bedrooms,
        Receptions: this.registration.addressDetails.receptions,
        Address: this.registration.addressDetails.addressOnOneLine, // TODO: decide what to send here
        Postcode: this.registration.addressDetails.postcode,
        PropertyType: this.registration.addressDetails.propertyType
      }).then(({ data }) => {
        try {
          if ("Address could not be found" === data || !data.Valuation) {
            this.registration.avmDetails.ErrorMessage = data;
            this.$store.dispatch("setAvmStatus", "error");
            return false;
          } else {
            this.registration.avmDetails = data;
            this.$store.dispatch("setAvmStatus", "success");

            // set the valuation on address so it can be overidden
            this.registration.addressDetails.valuation = data.Valuation;
            // store in DB
            // TODO update the signup data, maybe just the AVM part, but for now...just sign them up here
            // NOTE: movec to after AVMReport but thats WAY to late
            //this.signupUser();
            // TODO consider callnig
            //this.signupUserPut();
          }
          // allways store in Vue state
          this.$store.dispatch("setRegistration", this.registration);
          return data;
        } catch (error) {
          this.error = error.response.data.error;
          this.registration.avmDetails.ErrorMessage = this.error;
          return false;
        }
      });
    },

    //
    // TODO: Note this was added after and has more info. We might need to do just one,
    // i.e. no getAVM and just getAvm report.
    // BUT if we do that remember to copy over the resgistration and sign up calls from method above
    //
    async getAvmReport(transactionIdParam) {
      // store in Vue state TODO: who should call setregestration? do it bfore this, after if and after users saved?
      this.$store.dispatch("setAvmReportStatus", "calling");
      const { data } = await AvmService.getAvmReport({
        transactionId: transactionIdParam,
        bedrooms: this.registration.addressDetails.bedrooms,
        receptions: this.registration.addressDetails.receptions,
        address: this.registration.addressDetails.addressOnOneLine, // TODO: decide what to send here
        postcode: this.registration.addressDetails.postcode,
        propertyType: this.getAlternativeValue(
          this.registration.addressDetails.propertyType
        )
      });
      if (!data) {
        return Promise.resolve(false);
      }
      this.$store.dispatch("setRegistration", this.registration);
      return this.parseXml(data).then(dataParsed => {
        // TODO: better to access data here and
        // TODO: add error handleing here for nothing being returned
        const jsonData = this.registration.avmReportDetails;
        if ("Address could not be found" === jsonData) {
          this.registration.avmReportDetails.ErrorMessage = jsonData;
          this.$store.dispatch("setAvmReportStatus", "error");
        } else {
          this.$store.dispatch("setAvmReportStatus", "success");
          this.$store.dispatch(
            "setAlert",
            "Your automated home value report is now ready"
          );
          return dataParsed;
        }
      });
    },
    // TODO take this.registration.avmReportDetails out and make it generic parse xml method
    async parseXml(xml) {
      return new Promise((resolve, reject) => {
        const parseString = require("xml2js").parseString; // todo jsut do this once
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          } else {
            this.registration.avmReportDetails = result;
            resolve(result);
          }
        });
      });
    },

    //
    // TODO as these promises are fulfilled how early can we cick off a mortgage search,
    // when we know home value and current outstanding ballance
    //
    backStep(n) {
      if (n === 1) {
        this.$ga.event("SignupForm", "Click", "SignupAddressDetailsBackBtn");
        this.$router.push({ name: "home" });
      } else if (n === 2) {
        this.$ga.event("SignupForm", "Click", "SignupPersonalDetailsBackBtn");
        this.$router.push({ name: "home" });
      } else {
        this.$ga.event("SignupForm", "Click", "SignupHomeValuationBackBtn");
        this.$router.push({ name: "home" });
      }
    },
    stepAddress() {
      this.$ga.event("SignupForm", "Click", "SignupAddressDetailsContinueBtn");
      const transactionId = this.siteName() + "-100001-" + uuid();
      this.waitAVM = Promise.all([
        this.getAvm(),
        this.getAvmReport(transactionId)
      ]).then(res => {
        if (res[0] && res[1]) {
          return true;
        } else if (!res[0]) {
          this.$store.dispatch(
            "setErrorAlert",
            "Sorry, we can't find avm for the value that you entered"
          );
          return false;
        } else if (!res[1]) {
          this.$store.dispatch(
            "setErrorAlert",
            "Sorry, we can't find avmDetails for the value that you entered"
          );
          return false;
        }
      });
    },
    async stepPersonal() {
      this.$ga.event("SignupForm", "Click", "SignupPersonalDetailsContinueBtn");
      this.showSpinner = true;
      await this.registerUser();
      if (this.error) {
        this.showSpinner = false;
        return false;
      }
      // TODO: we need to wait here until we have the AVM because on the next screen we show the value...
      this.avmProcessing = true;
      this.stepAddress();
      const avmRes = await this.waitAVM;
      this.showSpinner = false;
      this.avmProcessing = false;
      if (avmRes) {
        const res = await this.signupUser();
        if (res === false) {
          return false;
        } else {
          this.e1 = 3;
        }
      } else if (
        this.$store.state.avmReportStatus === "success" &&
        this.$store.state.avmStatus === "error"
      ) {
        const res = await this.signupUser();
        this.e1 = 3;
      } else {
        alert("unexpected result");
      }
    },
    async stepHomeValuation(payload) {
      this.showSpinner = true;
      this.registration.addressDetails.correctedValuation =
        payload.correctedValuation || "";
      this.registration.addressDetails.correctionReason =
        payload.correctionReason || "";
      const registration = _.cloneDeep(this.registration);
      delete registration.personalDetails.password;
      await this.$store.dispatch("setRegistration", registration);
      this.$router.push({
        name: "dashboard",
        params: this.registration
      });
      this.showSpinner = false;
      this.$ga.event("SignupForm", "Click", "SignupHomeValuationContinueBtn");
    },
    // TODO the 2 APIS support different values! if the avmReport is the one we end up with
    // consider changing the DDL values so this mapping is not needed
    // TODO add this second house typ to the main resgister json so we always have it
    getAlternativeValue(value) {
      const keyValue = {
        "detached house": "House - Detached",
        "semi detached house": "House - Semi-Detached",
        "end terrace house": "House - End Terrace",
        "mid terrace house": "House - Mid Terrace",
        "purpose built flat": "Flat - Purpose Built",
        "converted flat": "Flat - Converted",
        "detached bungalow": "Bungalow - Detached",
        "semi detached bungalow": "Bungalow - Semi-Detached",
        "end terrace bungalow": "Bungalow - End Terrace",
        "mid terrace bungalow": "Bungalow - Mid Terrace"
      };
      return keyValue[value];
    }
  }
};
