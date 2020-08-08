import Panel from "@/components/Panel.vue";
import AuthService from "../../services/AuthService";
export default {
  name: "login",
  components: {
    "panel-card": Panel
  },
  props: {
    msg: String,
    errorString: String
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      visible: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email"
      ]
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const response = await AuthService.login(this.email, this.password);
          this.$store.dispatch("loginWith", response);

          this.$router.push({
            name: "dashboard"
          });
        } catch (error) {
          //this.error = error.response.data.error;
          this.error = error;
          this.errorString = "Please enter a valid email/password.";
        }
      }
    }
  }
};
