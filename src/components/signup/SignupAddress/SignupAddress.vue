<template>
  <div>
    <v-layout align-center justify-center column>
      <v-card class="elevation-0 text-xs-left">
        <div
          :class="{
            'mb-4': $vuetify.breakpoint.smAndUp,
            'mb-1': $vuetify.breakpoint.xs,
            'green-pointer': true
          }"
        >
          <p id="signupAddressTitle" class="mt-2 signup-title mb-0">
            What is your address?
          </p>
        </div>
        <v-card-text
          :class="{ 'pt-0 pb-0': $vuetify.breakpoint.xs, 'px-0': true }"
        >
          <v-form ref="addressForm" v-model="valid">
            <v-layout row wrap class="pt-2 pb-2">
              <v-flex
                lg4
                md4
                sm6
                xs12
                :class="{
                  'mb-4': $vuetify.breakpoint.smAndUp,
                  'mb-0': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <v-text-field
                  name="postcode"
                  id="postcode"
                  label="Postcode"
                  type="text"
                  v-model="postcode"
                  ref="zip"
                  @change="onPostcodeChange($event)"
                  :class="{
                    iconRightSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown,
                    'postal-code-box': true
                  }"
                  :rules="postCodeRules"
                  required
                  autocapitalize="words"
                >
                </v-text-field>
              </v-flex>
              <v-flex
                lg8
                md8
                sm6
                xs12
                :class="{
                  'mb-4': $vuetify.breakpoint.smAndUp,
                  'mb-0': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <v-select
                  :disabled="!addressForPostCode || !addresses"
                  :items="addresses"
                  item-value="value"
                  item-text="name"
                  label="Address"
                  id="address"
                  menu-props="auto"
                  :class="{ 'px-1': $vuetify.breakpoint.smAndDown }"
                  @change="onAddressChange($event)"
                  :rules="[v => !!v || 'Please select an address']"
                  :error-messages="errors"
                  required
                  ref="addressField"
                ></v-select>
              </v-flex>
            </v-layout>

            <div
              :class="{
                'mb-4': $vuetify.breakpoint.smAndUp,
                'mb-3': $vuetify.breakpoint.xs,
                'periwinkle-pointer': true
              }"
            >
              <p id="signupAddressTitle" class="signup-title mb-0">
                Tell us about your home
              </p>
            </div>
            <!-- TODO: populate address fields and show then so customer can correct any errors or if new build etc -->

            <!--
                        v-if="propertyTypesList"
                      :rules="[(v) => !!v || 'Property Type is required']"
                        required
                      -->
            <v-layout
              row
              wrap
              :class="{
                'pt-0': $vuetify.breakpoint.xs,
                'pt-4': $vuetify.breakpoint.smAndUp
              }"
            >
              <v-flex
                lg4
                md4
                sm6
                xs12
                :class="{
                  'mb-4': $vuetify.breakpoint.smAndUp,
                  'mb-0': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <v-select
                  :items="propertyTypesList"
                  item-value="value"
                  item-text="name"
                  id="propertyType"
                  label="Type of property"
                  :class="{
                    iconRightSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown
                  }"
                  v-model="registration.propertyType"
                  menu-props="auto"
                  :rules="[v => !!v || 'Please select a property type']"
                  required
                  @change="
                    $ga.event(
                      'SignupAddressesForm',
                      'Select',
                      'PropertyTypeField',
                      registration.propertyType
                    )
                  "
                ></v-select>
              </v-flex>

              <v-flex
                lg4
                md4
                sm6
                xs12
                :class="{
                  'mb-4': $vuetify.breakpoint.smAndUp,
                  'mb-0': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <!--  :rules="[(v) => !!v || 'Number of bedrooms is required']"
                              required

                              -->
                <v-select
                  :items="bedroomsList"
                  item-value="value"
                  item-text="name"
                  id="numberOfBedrooms"
                  label="Number of bedrooms"
                  v-model="registration.bedrooms"
                  menu-props="auto"
                  :class="{
                    iconRightSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown
                  }"
                  :rules="[v => !!v || 'Please select number of bedrooms']"
                  required
                  @change="
                    $ga.event(
                      'SignupAddressesForm',
                      'Select',
                      'NumberOfBedroomsField',
                      registration.bedrooms
                    )
                  "
                ></v-select>
              </v-flex>

              <v-flex lg4 md4 sm6 xs12>
                <v-select
                  :items="receptionsList"
                  item-value="value"
                  item-text="name"
                  id="numberOfReceptions"
                  label="Number of reception rooms"
                  :class="{ 'px-1': $vuetify.breakpoint.smAndDown }"
                  v-model="registration.receptions"
                  menu-props="auto"
                  :rules="[
                    v => !!v || 'Please select number of reception rooms'
                  ]"
                  required
                  @change="
                    $ga.event(
                      'SignupAddressesForm',
                      'Select',
                      'NumberOfReceptionRoomsField',
                      registration.receptions
                    )
                  "
                >
                  <v-tooltip slot="append-outer" bottom max-width="400">
                    <v-icon slot="activator" color="dark">info</v-icon>
                    <span>
                      A room where people can sit together such as a living or
                      dining room. A kitchen or bedroom is not a reception room.
                    </span>
                  </v-tooltip>
                </v-select>
              </v-flex>
            </v-layout>
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
              <template v-if="purchaseDateVisible" v-slot:activator="{ on }">
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
        <v-card-text v-if="error">
          <div class="error" v-html="error"></div>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-layout row justify-space-between>
      <v-spacer></v-spacer>
      <v-btn
        :id="`1-continue`"
        color="primary white--text"
        @click="stepAddress()"
        class="btn-control"
        >Continue</v-btn
      >
    </v-layout>
  </div>
</template>

<script src="./SignUpAddress.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./SignUpAddress.scss"></style>
