<template>
  <v-container fluid :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
    <v-layout align-center justify-center column>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-6 text-xs-left">
          <v-toolbar>
            <p class="pt-3">
              {{ msgObject.personalDetails.firstname }}, can you tell us about
              the joint applicant?
            </p>
            <!--
            <v-toolbar-title
              class="signup-title"
            >[First name], can you tell us about the joint applicant?</v-toolbar-title>
            -->
          </v-toolbar>
          <v-card-text :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
            <v-form>
              <p>
                To add a joint applicant they need to create an account
                themselves.
                <br />If you give us their contact details we will send them an
                invite <br />They can choose to share their data with you
                read-only or to hide it.
                <br />
              </p>
              <v-text-field
                prepend-icon="person"
                name="fullname"
                label="Full name including middle names"
                type="text"
                v-model="fullname"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="jointEmail"
                label="Email address"
                type="text"
              ></v-text-field>

              <p>
                Is their current address:
                {{ msgObject.addressDetails.addressOnOneLine }},
                {{ msgObject.addressDetails.postcode }}
              </p>
              <v-radio-group column>
                <v-radio
                  label="Yes"
                  value="radio-jointSameCurrentAddress"
                ></v-radio>
                <v-radio
                  label="No"
                  value="radio-newJointCurrentAddressRequired"
                ></v-radio>
              </v-radio-group>
              <!-- TODO: add new address block -->
            </v-form>
          </v-card-text>
          <v-card-text>
            <div class="error" v-html="error"></div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "register",
  props: {
    msgObject: Object
  },
  //data: () => ({
  //  visible: false
  //}),
  data() {
    return {
      fullname: "",
      password: "",
      dateOfBirth: "",
      error: null,
      visible: false,
      menu: false
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    //
    // TODO change all this so that it registers the joint applicant and emails them
    //
    async register() {
      try {
        const response = await AuthenticationService.register({
          withCredentials: true,
          User: {
            email: this.email,
            password: this.password
          }
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "dashboard"
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup-title {
  font-size: 0.9em;
}
</style>
