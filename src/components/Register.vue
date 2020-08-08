<template>
  <panel-card id="panelTitle" title="Register" sizes="xs12 sm8 md4">
    <template v-slot>
      <v-card-text>
        <v-form>
          <!-- rules="[rules.required, rules.min]" -->
          <v-text-field
            prepend-icon="person"
            name="email"
            id="email"
            label="Email"
            type="text"
            v-model="email"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            name="password"
            label="Password"
            id="password"
            v-model="password"
            hint="8+ characters long with at least one number and special character"
            v-bind="$attrs"
            v-on="$listeners"
            :append-icon="visible ? 'visibility_off' : 'visibility'"
            @click:append="() => (visible = !visible)"
            :type="visible ? 'text' : 'password'"
            autocomplete="new-password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-text>
        <div class="error" v-html="error"></div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" id="register" @click="register" dark
          >Register</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </template>
  </panel-card>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/Panel.vue";
import { uuid } from "@/utils";

export default {
  name: "register",
  components: {
    "panel-card": Panel
  },
  props: {
    msg: String
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      visible: false
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          //Apikey:"861c6163-f369-40e6-8585-b4d5190e57ee",
          withCredentials: true,
          User: {
            email: this.email,
            password: this.password,
            cuid: uuid()
          }
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setCuid", response.data.cuid);
        //this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "dashboard"
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>
<style scoped lang="scss"></style>
