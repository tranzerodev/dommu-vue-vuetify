<template>
  <v-layout align-center justify-center column>
    <v-card class="elevation-0 text-xs-left">
      <div class="green-pointer">
        <p id="signupAddressTitle" class="pt-3 signup-title mb-0">
          Personal details
        </p>
      </div>
      <v-card-text class="px-0">
        <v-form ref="personalDetailsForm" v-model="valid">
          <!-- rules="[rules.required, rules.min]" -->
          <v-alert
            color="warning"
            icon="priority_high"
            value="false"
            v-if="errorString"
            >{{ errorString }}</v-alert
          >
          <v-layout row wrap class="pt-4 pb-2">
            <v-flex lg6 md6 sm6 xs12 class="pr-4">
              <v-text-field
                v-if="!$route.params.email || errorString"
                name="email"
                id="email"
                label="Email address"
                type="text"
                v-model="registration.email"
                @change="onChange($event)"
                class="iconRightSpace pr-4 mr-4"
                :rules="emailRules"
                required
                v-on:blur="
                  $ga.event(
                    'SignupPersonalDetailsForm',
                    'Fill',
                    'EmailAddressField',
                    registration.email
                  )
                "
              ></v-text-field>
            </v-flex>
            <v-flex lg6 md6 sm6 xs12>
              <v-text-field
                name="fullname"
                id="fullname"
                type="text"
                label="Full name including middle names"
                v-model="registration.fullname"
                @change="onChange($event)"
                :rules="fullnameRules"
                required
                v-on:blur="
                  $ga.event(
                    'SignupPersonalDetailsForm',
                    'Fill',
                    'FullNameField',
                    registration.fullname
                  )
                "
              ></v-text-field>
            </v-flex>

            <v-flex lg6 md6 sm6 xs12 justify-start class="mr-4 pr-4 mt-4">
              <v-text-field
                name="password"
                id="password"
                label="Password"
                v-model="registration.password"
                @change="onChange($event)"
                hint="12-32 characters with at least 1 number and special character"
                v-bind="$attrs"
                v-on="$listeners"
                :append-icon="visible ? 'visibility_off' : 'visibility'"
                @click:append="() => (visible = !visible)"
                :type="visible ? 'text' : 'password'"
                autocomplete="new-password"
                :rules="passwordRules"
                class="pr-4 mr-4"
                :counter="32"
                single-line
                outline
                required
                v-on:blur="
                  $ga.event(
                    'SignupPersonalDetailsForm',
                    'Fill',
                    'PasswordField'
                  )
                "
              ></v-text-field>
            </v-flex>
            <v-flex lg6 md6 sm6 xs12>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-if="dateOfBirthVisible" v-slot:activator="{ on }">
                  <v-text-field
                    v-model="registration.dateOfBirth"
                    @change="onChange($event)"
                    label="Date of Birth"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="registration.dateOfBirth"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1940-01-01"
                  @change="saveDateOnChange($event)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <!--<p>We never share your data with third parties without your permission.</p>-->
            <v-flex lg12 md12 sm12 xs12>
              <p class="mt-4 mb-1 text-sm-center">
                <!--
                    <v-checkbox v-model="registration.tandc">
                      <span slot="label">
                        By ticking this box, you agree to {{siteName()}}'s
                        <tanc-popup />-->
                <!--<a
                          href="/terms-and-conditions"
                          target="_blank"
                        >Terms and Conditions</a>
                        -->
                <!--</span>
                    </v-checkbox>
                  </p>
                  <p>
                    <v-checkbox v-model="registration.privacy">
                      <span slot="label">
                        By ticking this box, you agree to {{siteName()}}'s
                        <a
                          href="/privacy-policy"
                          target="_blank"
                        >Privacy and Cookie Policy</a>
                      </span>
                    </v-checkbox>-->
                By clicking 'Continue', you are agreeing to our
                <a href="/terms-and-conditions" target="_blank"
                  >Terms and Conditions</a
                >
                and
                <a href="/privacy-policy" target="_blank"
                  >Privacy and Cookie Policy</a
                >.
              </p>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
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
        email: null,
        password: null,
        dateOfBirth: null,
        firstname: null,
        fullname: null,
        phone: null
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
        v =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$%*#?&]{12,}$/.test(
            v
          ) || "12-32 characters with at least 1 number and special character"
      ]
    };
  },
  mounted() {
    // this.registration.email = this.$route.params.email;
    this.$root.$on("validatePersonalDetailsForm", () => {
      if (this.$refs.personalDetailsForm.validate()) {
        this.snackbar = true;
        setTimeout(() => {
          this.$root.$emit("goToHomeValueationStep");
        }, 300);
      }
    });
  },
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
