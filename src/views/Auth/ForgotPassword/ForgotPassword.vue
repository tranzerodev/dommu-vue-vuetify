<template>
  <v-layout row justify-center>
    <v-flex lg8 xs11 class="white-dashboard round-container left-radius mt-120">
      <v-card class="elevation-0 text-xs-left">
        <div class="green-pointer pb-2" align="start">
          <p
            id="signupAddressTitle"
            class="pt-3 signup-title mb-0 text-xs-left"
          >
            Forgot password
          </p>
        </div>
        <v-card-text class="px-0 pt-2">
          <v-form ref="form">
            <v-alert
              color="warning"
              align="left"
              icon="mdi-information"
              dismissible
              value="false"
              class="rotate-icon"
              v-if="errorMessage"
              >{{ errorMessage }}
            </v-alert>
            <v-alert
              color="#49d586"
              align="left"
              icon="mdi-check-circle"
              dismissible
              value="false"
              v-if="successMessage"
              >Email sent. You'll receive an email to set a new password.
            </v-alert>
            <v-text-field
              class="pt-5"
              name="email"
              id="email"
              label="Email"
              type="text"
              :class="{
                'pr-0': true
              }"
              v-model="email"
              :rules="emailRules"
              @input="errorMessage = false"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-0">
          <router-link :to="{ name: 'login' }">Back to login</router-link>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="btn-control" @click="sendEmail"
            >Send</v-btn
          >
        </v-card-actions>
        <div class="app-spinner" v-if="showSpinner">
          <CircleLoader color="#49D586" />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="./ForgotPassword.js"></script>
<style lang="scss" scoped src="./ForgotPassword.scss"></style>
