<template>
  <v-container fluid :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }">
    <v-layout align-center justify-center column>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-6 text-xs-left">
          <v-toolbar>
            <p id="signupPersonalTitle" class="pt-3">
              You're just {{ totalSteps }} simple steps away from creating your
              CasaFi account
            </p>
          </v-toolbar>
          <v-card-text :class="{ 'px-0': $vuetify.breakpoint.xsOnly }">
            <v-form>
              <!-- rules="[rules.required, rules.min]" -->
              <v-alert
                color="warning"
                icon="priority_high"
                value="false"
                v-if="errorString"
                >{{ errorString }}</v-alert
              >

              <v-text-field
                v-if="!$route.params.email || errorString"
                prepend-icon="email"
                name="email"
                id="email"
                label="Email Address"
                type="text"
                v-model="registration.email"
                @change="onChange($event)"
              ></v-text-field>

              <v-text-field
                prepend-icon="person"
                name="fullname"
                id="fullname"
                label="Full name including middle names"
                type="text"
                v-model="registration.fullname"
                @change="onChange($event)"
              ></v-text-field>

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

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                v-model="registration.password"
                @change="onChange($event)"
                hint="12-32 characters long with at least one number and special character"
                v-bind="$attrs"
                v-on="$listeners"
                :append-icon="visible ? 'visibility_off' : 'visibility'"
                @click:append="() => (visible = !visible)"
                :type="visible ? 'text' : 'password'"
                autocomplete="new-password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signupPersonel",
  props: {
    totalSteps: String,
    msgObject: Object,
    errorString: String
  },
  data() {
    return {
      visible: false,
      menu: false,
      registration: {
        email: null,
        password: null,
        dateOfBirth: null,
        firstname: null,
        fullname: null,
        phone: null
      }
    };
  },
  mounted() {
    this.registration.email = this.$route.params.email;
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    errorString(val) {
      if (val) {
      }
    }
  },
  methods: {
    onChange: function(event) {
      if (this.registration.fullname) {
        var nameArray = this.registration.fullname.split(" ");
        this.registration.firstname = nameArray[0].trim();
        this.syncDataToObj();
      }
    },
    syncDataToObj: function() {
      this.msgObject.personalDetails = this.registration;
      this.$emit("childUpdated", this.msgObject);
    },
    saveDateOnChange(dateEvent) {
      this.$refs.menu.save(dateEvent);
      this.onChange(dateEvent);
    },
    triggerEvent(event) {
      this.$emit("input", event.target.value);
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
