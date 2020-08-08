<template>
  <v-layout row justify-center>
    <v-flex
      lg11
      md11
      sm11
      xs11
      :class="{
        'mt-120': $vuetify.breakpoint.smAndUp,
        'mt-80': $vuetify.breakpoint.xs,
        'white-dashboard round-container': true
      }"
    >
      <v-form ref="profileForm" v-model="valid">
        <v-container fluid grid-list-sm class="std-table text-left">
          <div
            :class="{
              'mb-4': $vuetify.breakpoint.smAndUp,
              'mb-1 pb-1': $vuetify.breakpoint.xs,
              'green-pointer': true
            }"
            align="start"
          >
            <p id="signupAddressTitle" class="pt-3 signup-title mb-0">
              My profile
            </p>
          </div>
          <v-layout row wrap>
            <v-flex
              d-flex
              xs12
              md6
              sm6
              :class="{
                'pr-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pr-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-text-field
                label="Full name"
                type="text"
                :rules="fullnameRules"
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                v-model="registration.personalDetails.fullname"
                v-on:blur="
                  $ga.event(
                    'ProfileForm',
                    'Fill',
                    'FullNameField',
                    registration.personalDetails.fullname
                  )
                "
                required
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex
              d-flex
              xs12
              md6
              sm6
              :class="{
                'pl-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pl-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-text-field
                label="Email address"
                type="text"
                v-model="registration.personalDetails.email"
                @change="onChange($event)"
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                required
                readonly
                disabled
              />
            </v-flex>
            <v-flex
              d-flex
              xs12
              md6
              sm6
              :class="{
                'pr-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pr-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-text-field
                label="Contact number"
                type="text"
                :rules="contactRules"
                v-model="registration.personalDetails.phone"
                @change="onChange($event)"
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                v-on:blur="
                  $ga.event(
                    'ProfileForm',
                    'Fill',
                    'ContactNumberField',
                    registration.personalDetails.phone
                  )
                "
              />
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex
              d-flex
              xs12
              md6
              sm6
              :class="{
                'pl-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pl-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-text-field
                label="Address"
                type="text"
                v-model="registration.addressDetails.addressOnOneLine"
                @change="onChange($event)"
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                readonly
                disabled
              />
            </v-flex>
          </v-layout>

          <!--<v-flex d-flex xs12>
              <v-text-field
                label="Mortgage Address"
                type="text"
                v-model="registration.addressDetails.addressOnOneLine"
                @change="onChange($event)"
              />
              </v-flex>-->
          <v-layout wrap>
            <v-flex
              xs12
              sm6
              :class="{
                'pr-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pr-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-text-field
                label="Home valuation"
                type="text"
                v-model="homeValuation"
                :rules="homeValueRules"
                :prefix="currency"
                required
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                v-on:blur="
                  $ga.event(
                    'ProfileForm',
                    'Fill',
                    'HomeValuationField',
                    homeValuation
                  )
                "
              />
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex
              xs12
              sm6
              :class="{
                'pl-4 mt-4': $vuetify.breakpoint.smAndUp,
                'pl-0 mt-1': $vuetify.breakpoint.xs
              }"
            >
              <v-select
                :items="estimateChangeReasonList"
                item-value="value"
                item-text="name"
                id="estimateChangeReason"
                :class="{
                  'pr-0': $vuetify.breakpoint.xs
                }"
                label="Reason for adjustment"
                v-model="registration.addressDetails.correctionReason"
                menu-props="auto"
                required
                v-on:change="
                  $ga.event(
                    'ProfileForm',
                    'Select',
                    'ReasonForAdjustmentField',
                    registration.addressDetails.correctionReason
                  )
                "
              ></v-select>
            </v-flex>
          </v-layout>
          <!-- <v-divider class="std-divider-spacing mt-0"/> -->
          <v-layout wrap>
            <v-flex d-flex xs12>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card flat class="sub-header">
                    <v-card-text class="ma-0 pa-0">
                      <h3 class="mb-3">Account</h3>
                      <h5 class="subtitle-2 mb-2">Contact preferences</h5>
                      <p class="mb-1">
                        We don‛t currently send email marketing messages. If we
                        decide to in the future, we will seek your permission to
                        do so.
                      </p>
                      <p class="mb-3">
                        We only contact you by email regarding your account,
                        security, legal updates, privacy matters and to assist
                        with customer support requests. For your security, this
                        cannot be opted out of.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <!-- <v-layout wrap>
              <v-flex d-flex xs12 sm12 md12 lg12 xl6>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0">
                        <h4>Password</h4>
                        <a @click="onClick($event)" href>Change</a>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0">
                        <h4>Communication Preferences</h4>
                        <a @click="onClick($event)" href>Change</a>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex d-flex xs12 sm12 md12 lg12 xl6>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0">
                        <h4>Account deletion</h4>
                        <p>
                          Note - account deletion is final
                          <br />
                          <a @click="onClick($event)" href>Delete my account</a>
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0">
                        <h4>Quotation Search Preferences</h4>
                        <p>
                          Choose whether or not we can use quotation searches
                          <br />
                          <a @click="onClick($event)" href>Change</a>
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex d-flex xs12 sm12 md12 lg12 xl6>
                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0">
                        <h4>Legal</h4>
                        <p>
                          You agreed to our updated Terms of Use on the xx/xx/xx
                          <br />
                          <router-link
                            to="/terms-and-conditions"
                            target="_blank"
                            >Terms &amp; Conditions</router-link
                          >
                          <br />
                          <router-link to="/privacy-policy" target="_blank"
                            >Privacy Policy</router-link
                          >
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex d-flex xs12 sm6 md5 lg4>
                    <v-card flat class="sub-header">
                      <v-card-text class="ma-0 pa-0"></v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout> -->

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
              <v-btn
                class="std-btn btn-control"
                color="primary"
                @click="onClickSave()"
                >Save</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script src="./Profile.js"></script>
<style src="./Profile.scss" lang="scss"></style>
