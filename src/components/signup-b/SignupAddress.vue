<template>
  <v-container fluid :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
    <v-layout align-center justify-center column>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-6 text-xs-left">
          <v-toolbar>
            <p id="signupAddressTitle" class="pt-3">
              {{
                this.capitalizeFirstLetter(msgObject.personalDetails.firstname)
              }}, we need 3 years of address history, but lets start where you
              live now
            </p>
          </v-toolbar>
          <v-card-text :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
            <v-form>
              <!-- rules="[rules.required, rules.min]" -->
              <!-- :rules="[() => !!postcode || 'This field is required']" -->
              <p>What is your address?</p>
              <v-text-field
                prepend-icon="mail_outline"
                name="postcode"
                id="postcode"
                label="Postcode"
                placeholder="Enter your postcode"
                v-model="postcode"
                ref="zip"
                required
                @change="onPostcodeChange($event)"
              ></v-text-field>
              <!-- TODO: populate address fields and show then so customer can correct any errors or if new build etc -->
              <v-select
                prepend-icon="domain"
                v-if="addresses"
                :items="addresses"
                item-value="value"
                item-text="name"
                label="Address"
                id="address"
                menu-props="auto"
                @change="onAddressChange($event)"
              ></v-select>
              <!--
                v-if="propertyTypesList"
               :rules="[(v) => !!v || 'Property Type is required']"
                required
              -->
              <v-select
                prepend-icon="location_city"
                :items="propertyTypesList"
                item-value="value"
                item-text="name"
                id="propertyType"
                label="Property Type"
                v-model="registration.propertyType"
                menu-props="auto"
              ></v-select>

              <!--  :rules="[(v) => !!v || 'Number of bedrooms is required']"
               required
               
              -->
              <v-select
                prepend-icon="hotel"
                :items="bedroomsList"
                item-value="value"
                item-text="name"
                id="numberOfBedrooms"
                label="Number of bedrooms"
                v-model="registration.bedrooms"
                menu-props="auto"
              ></v-select>

              <v-select
                prepend-icon="weekend"
                :items="receptionsList"
                item-value="value"
                item-text="name"
                id="numberOfReceptions"
                label="Number of reception rooms"
                v-model="registration.receptions"
                menu-props="auto"
              ></v-select>

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
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="registration.dateMovedIn"
                    label="Date moved in"
                    name="dateMovedIn"
                    id="dateMovedIn"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="registration.dateMovedIn"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1940-01-01"
                  @change="saveDateOnChange($event)"
                ></v-date-picker>
              </v-menu>
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
import PostcodeService from "@/services/PostcodeService";
import { getAddressOnOneLine, sortAlphaNumValueObject } from "@/utils.js";
import {
  bedroomsList,
  receptionsList,
  propertyTypesList
} from "@/data/propertyTypeLists.json";

export default {
  name: "signupAddress",
  props: {
    msgObject: Object
  },
  data() {
    return {
      error: null,
      visible: false,
      menu: false,
      postcode: null,
      addresses: null,
      registration: {
        addressOnOneLine: null,
        address1: null,
        address2: null,
        address3: null,
        address4: null,
        locality: null,
        cityTown: null,
        county: null,
        country: null,
        postcode: null,
        propertyType: null,
        bedrooms: null,
        receptions: null,
        dateMovedIn: null
      },
      bedroomsList,
      receptionsList,
      propertyTypesList
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },

    postcode: function(val) {
      if (val.length > 5) {
        // TODO: consider adding support for expand to get more address details back?
        // format ["Line1,Line2,Line3,Line4,Locality,Town/City,County"]
        PostcodeService.getAddresses(val)
          .then(response => {
            var addressObjectList = [];
            //

            // TODO: if not found or other errors show address boxes so they can add address.
            if (response.data.Message) {
            } else {
              response.data.addresses.forEach(function(value) {
                var addressOneLine = getAddressOnOneLine(value);

                //add an addressObject to the array
                const addressObject = {
                  name: addressOneLine,
                  value: value
                };
                addressObjectList.push(addressObject);
              });
              // sort with the values of the object
              addressObjectList.sort(sortAlphaNumValueObject);
              this.addresses = addressObjectList;
              this.registration.postcode = val;
            }
          })
          .catch(e => {});
      } else {
        //
      }
    }
  },
  methods: {
    onAddressChange: function(value) {
      //
      //format ["Line1,Line2,Line3,Line4,Locality,Town/City,County"]
      var partsOfAddress = value.split(", ");
      this.registration.address1 = partsOfAddress[0];
      this.registration.address2 = partsOfAddress[1];
      this.registration.address3 = partsOfAddress[2];
      this.registration.address4 = partsOfAddress[3];
      this.registration.locality = partsOfAddress[4];
      this.registration.cityTown = partsOfAddress[5];
      this.registration.county = partsOfAddress[6];

      this.registration.addressOnOneLine = getAddressOnOneLine(value);
      this.syncDataToObj();
      //this.$emit("childUpdated", this.msgObject);
    },

    onPostcodeChange: function(value) {
      // format the postcode an set it
      value = value.replace(/ /g, "");
      value = value.toUpperCase();
      if (value.length > 4) {
        var position = value.length - 3;
        value = [value.slice(0, position), " ", value.slice(position)].join("");
      }
      this.postcode = value;
      this.registration.postcode = value;
      this.syncDataToObj();
    },
    onChange: function(event) {
      this.syncDataToObj();
      //this.$emit("childUpdated", this.msgObject);
    },
    syncDataToObj: function() {
      this.msgObject.addressDetails = this.registration;
      this.$emit("childUpdated", this.msgObject);
    },
    saveDateOnChange(dateEvent) {
      this.$refs.menu.save(dateEvent);
      this.onChange(dateEvent);
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
