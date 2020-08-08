import TermsAndConditionsPopup from "@/components/TermsAndConditionsPopup";

export default {
  name: "signupPersonel",
  components: {
    //"tanc-popup": TermsAndConditionsPopup
  },
  props: {
    totalSteps: String,
    msgObject: Object,
    errorString: String
  },
  data() {
    return {
      valid: false,
      visible: false,
      dateOfBirthVisible: false,
      menu: false,
      registration: {
        email: "",
        password: "",
        dateOfBirth: "",
        firstname: "",
        fullname: "",
        phone: ""
      },
      emailRules: [
        v => !!v || "Email address is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ],
      fullnameRules: [
        v => !!v || "Please provide your full name",
        v => /[ ]/.test(v) || "Please provide your full name",
        v =>
          /^([a-zA-Z][a-zA-Z]+\s)*[a-zA-Z][a-zA-Z]+$/.test(v) ||
          "Please provide your full name"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => {
          let azCount = 0;
          let AZCount = 0;
          let numberCount = 0;
          let specialCount = 0;
          for (let i = 0; i < v.length; i++) {
            const char = v[i];
            if (/^[a-z]$/.test(char)) {
              azCount++;
            } else if (/^[A-Z]$/.test(char)) {
              AZCount++;
            } else if (/^\d$/.test(char)) {
              numberCount++;
            } else {
              specialCount++;
            }
          }
          if (
            azCount >= 1 &&
            AZCount >= 1 &&
            numberCount >= 1 &&
            specialCount >= 1 &&
            v.length >= 12
          ) {
            return true;
          }
          return "12-32 characters at least one uppercase, lowercase, number and special";
        }
      ]
    };
  },
  mounted() {},
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    errorString(val) {
      if (val) {
      }
    }
  },
  methods: {
    onChange: function(event) {
      if (this.registration.fullname) {
        var nameArray = this.registration.fullname.split(" ");
        this.registration.firstname = nameArray[0].trim();
        this.syncDataToObj();
      }
    },
    syncDataToObj: function() {
      this.msgObject.personalDetails = this.registration;
      this.$emit("childUpdated", this.msgObject);
    },
    saveDateOnChange(dateEvent) {
      this.$refs.menu.save(dateEvent);
      this.onChange(dateEvent);
    },
    triggerEvent(event) {
      this.$emit("input", event.target.value);
    },
    // write by Vlad
    stepPersonal() {
      if (this.$refs.personalDetailsForm.validate()) {
        this.$emit("stepNext");
        window.scrollTo(0, 0);
      }
    }
  }
};
