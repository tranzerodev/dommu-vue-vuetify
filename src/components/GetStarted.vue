<template>
  <div>
    <v-card id="gettingStarted" sizes="xs12 sm8" flat color="transparent">
      <template v-slot>
        <v-form v-model="postCodeForm" ref="form" onSubmit="return false;">
          <v-layout row class="mt-4">
            <v-text-field
              name="postcode"
              id="postcode"
              label="Enter your postcode"
              v-model="postcode"
              ref="zip"
              required
              :rules="postCodeRules"
              @change="onPostcodeChange($event)"
              solo
              class="postcode-box"
              browser-autocomplete="off"
            ></v-text-field>

            <div style="margin-left:12px; margin-bottom: 6px;">
              <v-btn
                class="ma-0"
                color="primary"
                id="getStarted"
                type="submit"
                @click="getStarted"
                dark
              >
                Get started
              </v-btn>
            </div>
          </v-layout>
        </v-form>
      </template>
    </v-card>
  </div>
</template>
<script>
import { uuid } from "@/utils";
// TODO: Add autocomplete
//import PostcodeService from "@/services/PostcodeService";

import AuthService from "@/services/AuthService";

export default {
  name: "getStarted",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      postcode: "",
      error: null,
      visible: false,
      postCodeForm: false,
      logoutConfirm: false,
      postCodeRules: [
        v => !!v || "Postcode is required", //was "Postcode is required"
        v =>
          /^\s*[a-zA-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][a-zA-Z]{2}\s*$/g.test(v) ||
          "Please enter a valid UK postcode"
      ]
    };
  },
  methods: {
    track() {
      this.$ga.screenview("getStartedComonentViewed");
    },
    async getStarted() {
      if (this.$refs.form.validate()) {
        if (AuthService.isLoggedIn) {
          this.logoutAndSingUp();
        } else {
          this.$ga.event(
            "GetStartedPostcodeForm",
            "Click",
            "GetStartedBtn",
            this.postcode
          );
          this.$router.push({
            name: "signup",
            params: { postcode: this.postcode }
          });
        }
      }
    },
    logoutAndSingUp() {
      AuthService.logout();
      this.$ga.event("Navgation", "Click", "LogoutBtn");
      this.$router.push({
        name: "signup",
        params: { postcode: this.postcode }
      });
    },
    onPostcodeChange: function(value) {
      // TODO: Add autocomplete

      // format the postcode an set it
      value = value.replace(/ /g, "");
      value = value.toUpperCase();
      if (value.length > 4) {
        var position = value.length - 3;
        value = [value.slice(0, position), " ", value.slice(position)].join("");
      }
      this.postcode = value;
      // this.registration.postcode = value;
      // this.syncDataToObj();
    }
  }
};
</script>
<style lang="scss">
#email {
  color: "red";
  // background-color: yellow;
}
#getStarted {
  height: 48px;
  margin-bottom: 6px;
}

.postcode-box {
  .v-text-field__details {
    min-height: 15px;
  }
  @media only screen and (min-width: 600px) {
    max-width: 50% !important;
  }
}
</style>
