import AuthService from "../../../services/AuthService";
import { CircleLoader } from "@saeris/vue-spinners";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
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
      ],
      confirmPassword: "",
      confirmPasswordRules: [
        v => {
          if (this.password && this.password !== this.confirmPassword) {
            return "Passwords don't match";
          } else {
            return true;
          }
        }
      ],
      errorMessage: false,
      showSpinner: false,
      visible: false
    };
  },
  methods: {
    resetPassword() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      this.showSpinner = true;
      AuthService.resetPassword(this.password).then(
        res => {
          this.showSpinner = false;
          if (res.error) {
            this.errorMessage = true;
          } else {
            this.$router.push({ name: "dashboard" });
          }
        },
        error => {
          this.showSpinner = false;
          this.errorMessage = true;
        }
      );
    }
  },
  components: {
    CircleLoader
  },
  mounted() {
    AuthService.verifyHash().then(
      res => {
        if (res.error) {
          this.errorMessage = true;
        }
      },
      error => {
        this.errorMessage = true;
      }
    );
  }
};
