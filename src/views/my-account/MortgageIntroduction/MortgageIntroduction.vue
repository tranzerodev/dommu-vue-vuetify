<template>
  <div>
    <v-layout row justify-center>
      <v-flex lg10 md10 sm10 xs11>
        <div
          class="application-consent-description-box sm-custom"
          align="start"
          v-if="$vuetify.breakpoint.smAndDown"
        >
          <!--<div class="white-pointer pt-4" align="start">
            <p id="signupAddressTitle" class="headline bold">
              <b>Application consent</b>
            </p>
          </div>-->
          <div align="center">
            <img
              src="/img/broker-logos/fluent-mortgages-logo.svg"
              class="logo-size"
            />
          </div>

          <p>
            {{ siteName() }} have partnered with
            {{ search.currentProduct.broker }}, who are one of the UK's leading
            mortgage brokers. They will ensure you get the best mortgage for
            you.
          </p>
          <p>
            {{ siteName() }} does not provide advice,
            {{ search.currentProduct.broker }} will provide advice.
          </p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex
        lg10
        md10
        sm10
        xs11
        class="white-dashboard introduction-container"
      >
        <v-layout
          row
          wrap
          :class="[$vuetify.breakpoint.mdAndUp ? 'pb-2 mt-0' : '']"
        >
          <v-flex
            lg4
            md4
            sm12
            :class="[$vuetify.breakpoint.mdAndUp ? 'pr-4' : '']"
            align="start"
          >
            <v-form ref="mortgageIntroductionForm" v-model="valid">
              <div class="green-pointer mb-2 pb-2 text-xs-left" align="start">
                <p id="signupAddressTitle" class="pt-3 signup-title mb-0">
                  Personal information
                </p>
              </div>
              <v-text-field
                name="fullname"
                id="fullname"
                type="text"
                :class="{
                  'mt-4 pt-4 mb-2 pb-2': $vuetify.breakpoint.smAndUp,
                  'mt-4 pt-0 mb-0 pb-2': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
                label="Full name"
                :rules="fullnameRules"
                v-model="registration.personalDetails.fullname"
                @change="onChange($event)"
                hide-details
                required
                v-on:blur="
                  $ga.event(
                    'ApplicationConsentForm',
                    'Fill',
                    'FullNameField',
                    registration.personalDetails.fullname
                  )
                "
              ></v-text-field>
              <v-text-field
                name="email"
                id="email"
                label="Email address"
                type="text"
                :class="{
                  'mt-4 pt-4 mb-2 pb-2': $vuetify.breakpoint.smAndUp,
                  'mt-4 pt-0 mb-0 pb-2': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
                v-model="registration.personalDetails.email"
                @change="onChange($event)"
                hide-details
                disabled
              ></v-text-field>
              <p class="text-xs-left mb-0">
                <b>Please provide a contact number below:</b>
              </p>
              <v-text-field
                name="phone"
                id="phone"
                type="text"
                label="Contact number"
                :class="{
                  'mt-4 pt-4 mb-2': $vuetify.breakpoint.smAndUp,
                  'mt-4 pt-0 mb-0 pb-2': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
                :rules="contactRules"
                v-model="registration.personalDetails.phone"
                @change="onChange($event)"
                hide-details
                v-on:blur="
                  $ga.event(
                    'ApplicationConsentForm',
                    'Fill',
                    'ContactNumberField',
                    registration.personalDetails.phone
                  )
                "
              ></v-text-field>
              <p class="text-xs-left">
                <b>Optionally, choose a preferred time for callback:</b>
              </p>
              <v-layout>
                <v-flex class="flex-grow-0">
                  <v-dialog
                    ref="dateDialog"
                    v-model="dateModal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Date"
                        readonly
                        v-on="on"
                        hide-details
                        style="width: 100%; padding-right: 0px !important;"
                        :class="{
                          'mt-4 mb-4': $vuetify.breakpoint.smAndUp,
                          'mt-0 pt-1 mb-1': $vuetify.breakpoint.xs,
                          'input-box-container': true
                        }"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="dateModal = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.dateDialog.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex class style="min-width: 0px;">
                  <v-dialog
                    ref="timeDialog"
                    v-model="timeModal"
                    :return-value.sync="time"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Time"
                        readonly
                        hide-details
                        v-on="on"
                        :class="{
                          'mt-4 mb-4': $vuetify.breakpoint.smAndUp,
                          'mt-0 pt-1 mb-1': $vuetify.breakpoint.xs,
                          'input-box-container': true
                        }"
                        style="width: 100%; padding-right: 0px !important; padding-left: 10px !important;"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timeModal"
                      v-model="time"
                      full-width
                      :allowed-minutes="allowedMinutes"
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="timeModal = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.timeDialog.save(time)"
                        >OK</v-btn
                      >
                    </v-time-picker>
                  </v-dialog>
                </v-flex>
              </v-layout>
              <v-layout
                row
                justify-start
                :class="{
                  'pt-3': $vuetify.breakpoint.xs,
                  'pt-0': $vuetify.breakpoint.smAndUp
                }"
              >
                <router-link
                  :to="{
                    name: 'mortgageSearch'
                  }"
                  tag="span"
                >
                  <!--<v-btn
                    class="btn-control"
                    color="tertiary"
                    @click="$ga.event('ApplicationConsentForm', 'Click', 'CancelBtn')"
                    >Cancel</v-btn
                        >-->
                </router-link>
                <v-btn
                  color="primary"
                  class="btn-control-wide ma-0"
                  block
                  @click="onClickSave()"
                  >Contact advisor</v-btn
                >
              </v-layout>
            </v-form>
          </v-flex>
          <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
          <v-flex
            lg7
            md7
            sm12
            :class="[$vuetify.breakpoint.mdAndUp ? 'pl-4' : '']"
          >
            <!-- <img
            :src="search.currentProduct.brokerLogo"
            style="height:133px; padding-top:20px padding-right:12px"
            />-->
            <!--
          <h4>
            Please provide your contact number so {{ item.broker }} can contact
            you.
          </h4>
          <p>
            {{ siteName() }} will never contact you by phone. We only ask for
            your contact number so {{ item.broker }} can contact you.
          </p>
            -->
            <div
              class="application-consent-description-box"
              align="start"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              <!--<div class="white-pointer pt-4" align="start">
                <p id="signupAddressTitle" class="display-1 bold">
                  <b>Application consent</b>
                </p>
              </div>-->
              <div align="center">
                <img
                  src="/img/broker-logos/fluent-mortgages-logo.svg"
                  class="logo-size"
                />
              </div>

              <p style="padding-top: 0px;">
                {{ siteName() }} have partnered with
                {{ search.currentProduct.broker }}, who are one of the UK's
                leading mortgage brokers. They will ensure you get the best
                mortgage for you.
              </p>
              <p class="mb-0">
                {{ siteName() }} does not provide advice,
                {{ search.currentProduct.broker }} will provide advice.
              </p>
            </div>
            <div class="application-consent-inform-box" align="start">
              <p>
                By continuing, you are agreeing for this information to be sent
                to
                {{ search.currentProduct.broker }}.
                {{ search.currentProduct.broker }} can also be contacted on
                01204 899588.
              </p>

              <p class="mt-3 mb-0">
                Fluent Mortgages are authorised and regulated by the Financial
                Conduct Authority (FCA). Firm registration number 458914.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script src="./MortgageIntroduction.js"></script>
<style lang="scss">
.v-time-picker-title__ampm .v-picker__title__btn {
  text-transform: uppercase !important;
}
</style>
<style lang="scss" scoped src="./MortgageIntroduction.scss"></style>
