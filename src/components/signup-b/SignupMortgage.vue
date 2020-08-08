<template>
  <v-container fluid :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
    <v-layout align-center justify-center column wrap>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-6 text-xs-left">
          <v-toolbar>
            <p id="signupMortgageTitle" class="pt-3">
              {{ msgObject.personalDetails.firstname }}, what type of mortgage
              are you looking for?
            </p>
          </v-toolbar>
          <v-card-text :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
            <v-form>
              <v-radio-group
                row
                v-model="registration.buyerType"
                @change="onChange($event)"
              >
                <v-radio
                  label="First Time Buyer"
                  value="firstTimeBuyer"
                ></v-radio>
                <v-radio label="Remortgage" value="remortgage"></v-radio>
                <v-radio label="Home Mover" value="homeMover"></v-radio>
              </v-radio-group>

              <p>Select this if you want to look at joint mortgages</p>
              <v-switch
                label="Joint"
                value="true"
                v-model="registration.joint"
                @change="onChange($event)"
              ></v-switch>

              <p>
                Is your mortgage for:
                {{ msgObject.addressDetails.addressOnOneLine }},
                {{ msgObject.addressDetails.postcode }}
              </p>
              <v-radio-group
                column
                v-model="registration.sameAddress"
                @change="onChange($event)"
              >
                <v-radio label="Yes" value="radio-sameAddress"></v-radio>
                <v-radio label="No" value="radio-newAddressRequired"></v-radio>
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
export default {
  name: "signupMortgage",
  props: {
    msgObject: Object
  },
  mounted() {
    this.syncDataToObj();
  },
  data() {
    return {
      error: null,
      visible: false,
      menu: false,
      registration: {
        buyerType: "remortgage",
        joint: null,
        sameAddress: "radio-sameAddress"
      }
    };
  },
  methods: {
    onChange: function(event) {
      this.syncDataToObj();
      // this.$emit("childUpdated", this.msgObject);
    },
    syncDataToObj: function() {
      // TODO Dont hardcode it
      this.msgObject.buyerType = this.registration.buyerType;
      // this.msgObject.buyerType = "FTB";
      this.msgObject.joint = this.registration.joint;
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
