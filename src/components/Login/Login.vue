<template>
  <v-layout row justify-center>
    <v-flex
      lg12
      xs12
      class="white-dashboard round-container left-radius mt-120"
    >
      <v-card class="elevation-0 text-xs-left">
        <div class="green-pointer pb-2" align="start">
          <p
            id="signupAddressTitle"
            class="pt-3 signup-title mb-0 text-xs-left"
          >
            Sign in
          </p>
        </div>
        <v-card-text
          :class="{
            'pt-4': $vuetify.breakpoint.smAndUp,
            'pt-0': $vuetify.breakpoint.xs,
            'px-0': true
          }"
        >
          <v-form ref="form">
            <v-alert
              color="warning"
              icon="mdi-information"
              value="false"
              dismissible
              v-if="errorString"
              :class="{
                'mb-4': $vuetify.breakpoint.smAndUp,
                'mb-2 mt-2': $vuetify.breakpoint.xs,
                'rotate-icon': true
              }"
              >{{ errorString }}</v-alert
            >
            <v-layout
              row
              wrap
              :class="{
                'pt-4 pb-2': $vuetify.breakpoint.smAndUp,
                'pt-2': $vuetify.breakpoint.xs
              }"
            >
              <v-flex
                lg6
                md6
                sm6
                xs12
                :class="{
                  'pr-4': $vuetify.breakpoint.smAndUp,
                  'mb-2': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <v-text-field
                  name="email"
                  id="email"
                  label="Email"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  :class="{ 'pr-0': $vuetify.breakpoint.xs }"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex lg6 md6 sm6 xs12>
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :append-icon="visible ? 'visibility_off' : 'visibility'"
                  @click:append="() => (visible = !visible)"
                  :type="visible ? 'text' : 'password'"
                  :rules="[v => !!v || 'Password is required']"
                  class="pr-0"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-layout align-center justify-space-between wrap class="pr-4">
            <div class="d-block text-xs-center body-1" align="center">
              <router-link to="forgot-password" class="my-2"
                >Forgot password?</router-link
              >
            </div>
          </v-layout>
        </v-card-text>

        <v-layout row justify-space-between>
          <v-card-actions class="pa-0">
            <router-link :to="{ name: 'signup' }">
              <v-btn color="primary" class="btn-control">Sign up</v-btn>
            </router-link>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-actions class="pr-0">
            <v-btn
              color="primary"
              class="btn-control"
              name="login"
              id="login"
              @click="login"
              >Login</v-btn
            >
            <!--<p class="ml-2">100% secure and FCA Authorised</p>-->
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="./Login.js"></script>
<style scoped lang="scss"></style>
