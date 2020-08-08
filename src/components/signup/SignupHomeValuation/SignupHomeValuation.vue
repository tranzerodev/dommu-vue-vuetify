<template>
  <div>
    <v-layout align-center justify-center column>
      <v-card class="elevation-0 text-xs-left" v-if="show === 'showGraph'">
        <div class="green-pointer">
          <p id="signupAddressTitle" class="signup-title mb-0">
            Current valuation for
          </p>
        </div>
        <v-card-text
          sizes="xs12 sm10 md8"
          :class="{
            'mb-0': $vuetify.breakpoint.xs,
            'pa-0 input-label': true
          }"
        >
          <v-layout
            row
            wrap
            :class="{
              'mb-4': $vuetify.breakpoint.smAndUp,
              'mb-0': $vuetify.breakpoint.xs,
              'pa-0': true
            }"
          >
            <v-flex xs12 sm6 align-self-center>
              <div
                class="address-description"
                :class="{
                  'mb-2': $vuetify.breakpoint.xsOnly,
                  'mr-2': $vuetify.breakpoint.smAndUp
                }"
              >
                <span
                  v-html="
                    reg.addressDetails.addressOnOneLine
                      .split(',')
                      .join(',<br />')
                  "
                ></span>
                <!-- {{ reg.addressDetails.addressOnOneLine }}, -->
                <br />
                {{ reg.addressDetails.postcode }}
              </div>
            </v-flex>
            <v-flex
              xs12
              sm6
              align-self-center
              :class="{
                'mb-4': $vuetify.breakpoint.xs,
                'text-xs-center': true
              }"
            >
              <!--
              <div class="green-pointer pt-4" align="center">
                <p id="signupAddressTitle" class="pl-2 subheading bold mb-0">
                  Home value
                </p>
                </div>-->
              <span
                class="centerValue py-3 pl-3 pr-1"
                height="100%"
                :class="{
                  'mt-2': $vuetify.breakpoint.xsOnly,
                  'ml-2': $vuetify.breakpoint.smAndUp
                }"
              >
                <span>{{ valuationFormatted }}</span>
              </span>

              <v-dialog v-model="valuationInfoDialog" width="500">
                <template v-slot:activator="{ on }">
                  <span class="value-info-icon">
                    <v-icon color="dark" v-on="on" align-right
                      >mdi-information</v-icon
                    >
                  </span>
                </template>

                <v-card>
                  <v-card-title
                    class="title grey lighten-2 px-2 py-0"
                    primary-title
                  >
                    Home valuation
                    <v-btn
                      class="closeModalBtn"
                      icon
                      @click="valuationInfoDialog = false"
                      light
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text class="text-xs-left">
                    This value has been calculated using an automated valuation
                    model (AVM) which is a technology driven system used to
                    estimate the current value of a property instantaneously.
                    Essentially, a powerful algorithm calculates the value by
                    analysing nearby properties with similar characteristics,
                    and local and national trend data.
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex xs12 sm6 class="mt-4">
              <v-form ref="correctedValuationForm">
                <p align="start" class="mb-0">
                  Disagree?
                  <a href="javascript:void(0)" @click="correctValue = true"
                    >Refine your valuation</a
                  >
                </p>
                <div
                  v-if="correctValue"
                  :class="{
                    'mt-3': $vuetify.breakpoint.smAndUp,
                    'mt-1': $vuetify.breakpoint.xs
                  }"
                >
                  <v-card class="pt-1 elevation-0">
                    <v-layout row wrap align-end>
                      <v-flex
                        column
                        xs12
                        sm6
                        md5
                        lg6
                        :class="{
                          'pr-4': $vuetify.breakpoint.smAndUp,
                          'pr-1': $vuetify.breakpoint.xs
                        }"
                      >
                        <v-text-field
                          id="estimatedValuation"
                          label="Estimated value"
                          type="text"
                          :prefix="currency"
                          :rules="estimatedValueRules"
                          hide-details
                          v-model="correctedValuation"
                          v-on:blur="
                            $ga.event(
                              'SignupHomeValuationForm',
                              'Fill',
                              'EstimatedValueField'
                            )
                          "
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md5 lg6 column>
                        <v-select
                          :items="estimateChangeReasonList"
                          item-value="value"
                          item-text="name"
                          id="estimateChangeReason"
                          label="Reason for adjustment"
                          hide-details
                          :class="{
                            'pt-2 mt-4': $vuetify.breakpoint.smAndUp,
                            'mt-4': $vuetify.breakpoint.xs
                          }"
                          v-model="registration.addressDetails.correctionReason"
                          menu-props="auto"
                          v-on:change="
                            $ga.event(
                              'SignupHomeValuationForm',
                              'Select',
                              'ReasonForAdjustmentField',
                              testEstimateChangeReason
                            )
                          "
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="elevation-0 text-xs-left" v-if="show === 'showMoreData'">
        <div class="green-pointer">
          <p class="signup-title mb-0">
            We could not find a valuation for
          </p>
        </div>
        <v-card-text
          sizes="xs12 sm10 md8"
          :class="{
            'mb-0': $vuetify.breakpoint.xs,
            'pa-0 input-label': true
          }"
        >
          <v-layout
            row
            wrap
            :class="{
              'mb-4': $vuetify.breakpoint.smAndUp,
              'mb-0': $vuetify.breakpoint.xs,
              'pa-0': true
            }"
          >
            <v-flex xs12 sm6 align-self-center>
              <div
                class="address-description"
                :class="{
                  'mb-2': $vuetify.breakpoint.xsOnly,
                  'mr-2': $vuetify.breakpoint.smAndUp
                }"
              >
                <span
                  v-html="
                    reg.addressDetails.addressOnOneLine
                      .split(',')
                      .join(',<br />')
                  "
                ></span>
                <!-- {{ reg.addressDetails.addressOnOneLine }}, -->
                <br />
                {{ reg.addressDetails.postcode }}
              </div>
            </v-flex>
            <v-flex
              xs12
              sm6
              align-self-center
              :class="{
                'mb-4': $vuetify.breakpoint.xs,
                'text-xs-center': true
              }"
            >
              <v-layout align-center>
                <span
                  class="centerValue py-3 pl-3 pr-1"
                  height="100%"
                  :class="{
                    'mt-2': $vuetify.breakpoint.xsOnly,
                    'ml-2': $vuetify.breakpoint.smAndUp
                  }"
                >
                  <v-form ref="homeValuationForm">
                    <v-text-field
                      name="home_valuation"
                      label="home valuation"
                      type="text"
                      v-model="homeValuation"
                      :class="{
                        iconRightSpace: $vuetify.breakpoint.mdAndUp,
                        'px-1': $vuetify.breakpoint.smAndDown
                      }"
                      :prefix="currency"
                      :rules="homeValueRules"
                      v-on:blur="
                        $ga.event(
                          'SetHomeValuation',
                          'Fill',
                          'HomeValuationField',
                          homeValuation
                        )
                      "
                    ></v-text-field>
                  </v-form>
                </span>
                <v-dialog v-model="valuationInfoDialog" width="500">
                  <template v-slot:activator="{ on }">
                    <span class="value-info-icon">
                      <v-icon color="dark" v-on="on" align-right
                        >mdi-information</v-icon
                      >
                    </span>
                  </template>

                  <v-card>
                    <v-card-title
                      class="title grey lighten-2 px-2 py-0"
                      primary-title
                    >
                      Home valuation
                      <v-btn
                        class="closeModalBtn"
                        icon
                        @click="valuationInfoDialog = false"
                        light
                      >
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-card-text class="text-xs-left">
                      This value has been calculated using an automated
                      valuation model (AVM) which is a technology driven system
                      used to estimate the current value of a property
                      instantaneously. Essentially, a powerful algorithm
                      calculates the value by analysing nearby properties with
                      similar characteristics, and local and national trend
                      data.
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-layout row justify-space-between>
      <v-spacer></v-spacer>
      <v-btn
        :id="`3-continue`"
        color="primary white--text"
        @click="stepHomeValuation()"
        class="btn-control-wide"
        >Valuation breakdown</v-btn
      >
    </v-layout>
  </div>
</template>

<script src="./SignupHomeValuation.js"></script>
<style scoped lang="scss" src="./SignupHomeValuation.scss"></style>
