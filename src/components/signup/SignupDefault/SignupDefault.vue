<template>
  <v-layout align-center justify-center>
    <v-flex>
      <v-stepper
        v-model="e1"
        :class="{
          'pt-4': $vuetify.breakpoint.smAndUp,
          'pt-0': $vuetify.breakpoint.xs,
          'sign-up-stepper-container': true
        }"
      >
        <v-stepper-header
          :class="{
            'mt-2 mb-4': $vuetify.breakpoint.smAndUp,
            ' mt-3 mb-3': $vuetify.breakpoint.xs,
            'sign-up-stepper-header': true
          }"
        >
          <v-stepper-step :complete="e1 > 1" :step="1">
            <span>Address details</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" :step="2">
            <span>Personal details</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" :step="3">
            <span>Home valuation</span>
          </v-stepper-step>
        </v-stepper-header>

        <v-layout row wrap align-center justify-center>
          <v-flex lg11 md11 sm11 xs11 class="stepper__wrapper">
            <v-stepper-items class="sign-up-stepper-section">
              <v-stepper-content :step="1">
                <SignupAddress
                  ref="signupAddressStep"
                  :msgObject="registration"
                  v-on:stepBack="backStep(1)"
                  v-on:stepNext="e1 = 2"
                ></SignupAddress>
              </v-stepper-content>
              <v-stepper-content :step="2">
                <SignupPersonal
                  :totalSteps="`${steps}`"
                  :msgObject="registration"
                  :errorString="error"
                  v-on:stepBack="backStep(2)"
                  v-on:stepNext="stepPersonal()"
                ></SignupPersonal>
              </v-stepper-content>
              <v-stepper-content :step="3" v-if="e1 === 3">
                <SignupHomeValuation
                  firstname="registration.firstname"
                  :msgObject="registration"
                  v-on:stepBack="backStep(3)"
                  v-on:stepNext="stepHomeValuation"
                ></SignupHomeValuation>
              </v-stepper-content>
              <div class="app-spinner" v-if="showSpinner">
                <div>
                  <CircleLoader color="#49D586" class="mx-auto"></CircleLoader>
                  <div class="spinner__txt mt-2" v-if="avmProcessing">
                    Our AI is calculating your current property value...
                  </div>
                </div>
              </div>
            </v-stepper-items>
          </v-flex>
        </v-layout>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script src="./SignupDefault.js"></script>
<style scoped lang="scss" src="./SignupDefault.scss"></style>
