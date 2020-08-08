<template>
  <v-card id="gettingStarted" sizes="xs12 sm8" flat color="transparent">
    <template v-slot>
      <!--
      <v-layout column style="margin:12px;" class="text-xs-left">
        <v-flex xs12>
          <h1>
            Track the value of your home,
            <br />equity and related financial costs
            <br />for free.
          </h1>
          <p style="font-size:2.0em;"><b>
            CasaFi’s always-on monitoring could help you
            <br />stay on the best mortgage and insurance deals.</b>
          </p>
        </v-flex>
      </v-layout>
      -->
      <v-layout row style="margin-top:12px;">
        <!-- outline -->
        <v-flex>
          <v-text-field
            name="email"
            id="email"
            label="Enter your email address"
            type="text"
            v-model="email"
            solo
            background-color="white"
            color="white"
            class="text-xs-right"
          ></v-text-field>
        </v-flex>
        <v-flex class="text-xs-left">
          <div style="margin-left: 12px;margin-bottom: 6px;">
            <v-btn color="primary" id="getStarted" @click="getStarted" dark
              >Get Started
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </template>
  </v-card>
</template>
<script>
import { uuid } from "@/utils";

export default {
  name: "getStarted",
  components: {},
  props: {
    msg: String
  },
  data() {
    return {
      email: "",
      error: null,
      visible: false
    };
  },
  methods: {
    async getStarted() {
      this.$ga.event("GetStartedForm", "Click", "GetStartedBtn");
      /*
      try {
        
        const response = await AuthenticationService.register({
          //Apikey:"861c6163-f369-40e6-8585-b4d5190e57ee",
          User: {
            email: this.email,
            password: this.password,
            cuid: uuid()
          }
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setCuid", response.data.cuid);
        //this.$store.dispatch("setUser", response.data.user);


        this.$router.push({
          name: "dashboard"
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
      */

      this.$router.push({
        name: "signup-b",
        params: { email: this.email }
      });
    }
  }
};
</script>
<style scoped lang="scss">
#email {
  color: "red";
  background-color: yellow;
}
#getStarted {
  height: 3.2em;
  margin-bottom: 6px;
}
</style>
