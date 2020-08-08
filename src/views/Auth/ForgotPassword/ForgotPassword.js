import AuthService from "../../../services/AuthService";
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      error: false,
      errorMessage: false,
      successMessage: false,
      showSpinner: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ]
    };
  },
  methods: {
    sendEmail() {
      if (this.$refs.form.validate()) {
        this.showSpinner = true;
        this.errorMessage = false;
        this.successMessage = false;
        AuthService.forgotPassword(this.email).then(res => {
          this.showSpinner = false;
          if (res.error) {
            this.errorMessage = res.error;
          } else {
            this.successMessage = res.message;
          }
        });
      }
    }
  },
  components: {
    CircleLoader
  }
};
