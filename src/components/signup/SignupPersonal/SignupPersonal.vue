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
            Please provide your personal details
          </p>
        </div>
        <v-card-text
          :class="{ 'pt-0 pb-0': $vuetify.breakpoint.xs, 'px-0': true }"
        >
          <v-form ref="personalDetailsForm" v-model="valid">
            <!-- rules="[rules.required, rules.min]" -->
            <v-alert
              color="warning"
              icon="mdi-information"
              value="false"
              dismissible
              :style="{ 'margin-bottom: 40px': $vuetify.breakpoint.smAndUp }"
              :class="{
                'mb-4': $vuetify.breakpoint.smAndUp,
                'mb-2 mt-3': $vuetify.breakpoint.xs,
                'rotate-icon': true
              }"
              v-if="errorString"
              >{{ errorString }}</v-alert
            >
            <v-layout row wrap class="pt-2 pb-2">
              <v-flex
                lg6
                md6
                sm6
                xs12
                :class="{
                  'mb-4': $vuetify.breakpoint.smAndUp,
                  'mb-0': $vuetify.breakpoint.xs,
                  'input-box-container': true
                }"
              >
                <v-text-field
                  v-if="!$route.params.email || errorString"
                  name="email"
                  id="email"
                  label="Email address"
                  type="text"
                  v-model="registration.email"
                  @change="onChange($event)"
                  :class="{
                    iconRightSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown
                  }"
                  :rules="emailRules"
                  required
                  v-on:blur="
                    $ga.event(
                      'SignupPersonalDetailsForm',
                      'Fill',
                      'EmailAddressField',
                      registration.email
                    )
                  "
                ></v-text-field>
              </v-flex>
              <v-flex lg6 md6 sm6 xs12>
                <v-text-field
                  name="fullname"
                  id="fullname"
                  type="text"
                  label="Full name"
                  v-model="registration.fullname"
                  @change="onChange($event)"
                  :rules="fullnameRules"
                  :class="{
                    iconLeftSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown,
                    'pr-0': true
                  }"
                  required
                  v-on:blur="
                    $ga.event(
                      'SignupPersonalDetailsForm',
                      'Fill',
                      'FullNameField',
                      registration.fullname
                    )
                  "
                ></v-text-field>
              </v-flex>

              <v-flex
                lg6
                md6
                sm6
                xs12
                justify-start
                :class="{
                  'pt-2 mt-4': $vuetify.breakpoint.smAndUp,
                  'pt-0 mt-0': $vuetify.breakpoint.xs
                }"
              >
                <v-text-field
                  name="password"
                  id="password"
                  label="Password"
                  v-model="registration.password"
                  @change="onChange($event)"
                  hint="12-32 characters at least one uppercase, lowercase, number and special"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :append-icon="visible ? 'visibility_off' : 'visibility'"
                  @click:append="() => (visible = !visible)"
                  :type="visible ? 'text' : 'password'"
                  autocomplete="new-password"
                  :rules="passwordRules"
                  :class="{
                    iconRightSpace: $vuetify.breakpoint.mdAndUp,
                    'px-1': $vuetify.breakpoint.smAndDown
                  }"
                  :counter="32"
                  required
                  v-on:blur="
                    $ga.event(
                      'SignupPersonalDetailsForm',
                      'Fill',
                      'PasswordField'
                    )
                  "
                ></v-text-field>
              </v-flex>
              <v-flex lg6 md6 sm6 xs12>
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
                  <template v-if="dateOfBirthVisible" v-slot:activator="{ on }">
                    <v-text-field
                      v-model="registration.dateOfBirth"
                      @change="onChange($event)"
                      label="Date of Birth"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="registration.dateOfBirth"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1940-01-01"
                    @change="saveDateOnChange($event)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <!--<p>We never share your data with third parties without your permission.</p>-->
              <v-flex lg12 md12 sm12 xs12>
                <p class="mt-4 mb-1 text-sm-center caption">
                  <!--
                      <v-checkbox v-model="registration.tandc">
                        <span slot="label">
                          By ticking this box, you agree to {{siteName()}}'s
                          <tanc-popup />-->
                  <!--<a
                            href="/terms-and-conditions"
                            target="_blank"
                          >Terms and Conditions</a>
                          -->
                  <!--</span>
                      </v-checkbox>
                    </p>
                    <p>
                      <v-checkbox v-model="registration.privacy">
                        <span slot="label">
                          By ticking this box, you agree to {{siteName()}}'s
                          <a
                            href="/privacy-policy"
                            target="_blank"
                          >Privacy and Cookie Policy</a>
                        </span>
                      </v-checkbox>-->
                  By clicking 'Continue', you are agreeing to our
                  <br v-if="$vuetify.breakpoint.smAndDown" />
                  <a href="/terms-and-conditions" target="_blank"
                    >Terms and Conditions</a
                  >
                  and
                  <a href="/privacy-policy" target="_blank"
                    >Privacy and Cookie Policy</a
                  >.
                </p>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
    <v-layout row justify-space-between>
      <v-spacer></v-spacer>
      <v-btn
        :id="`2-continue`"
        color="primary white--text"
        @click="stepPersonal()"
        class="btn-control"
        >Continue</v-btn
      >
    </v-layout>
  </div>
</template>

<script src="./SignUpPersonal.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./SignUpPersonal.scss"></style>
