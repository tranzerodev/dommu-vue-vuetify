<template>
  <v-content
    :class="{ 'pa-0': $vuetify.breakpoint.smAndUp, ' content-container': true }"
  >
    <v-container
      fluid
      fill-height
      style="margin:0px;padding:0px;"
      :class="{ 'pa-0': $vuetify.breakpoint.xsOnly }"
    >
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <router-view />

          <v-snackbar
            dark
            :color="color"
            :timeout="timeout"
            v-model="refreshSnackbar"
            :bottom="true"
            :right="true"
            v-if="appEnablePopup"
          >
            <v-icon color="white" class="snackIcon" @click="doRefresh()"
              >refresh</v-icon
            >
            <div>A new update is avaliable. Please refresh your browser.</div>
            <v-icon color="white" size="16" @click="dismissRefresh()"
              >cancel</v-icon
            >
          </v-snackbar>

          <v-snackbar
            dark
            :color="color"
            :timeout="timeout"
            v-model="alertSnackbar"
            :bottom="true"
            :right="true"
            v-if="appEnablePopup"
          >
            <!-- TODO: add support for choosnig alert icons
           notifications_none report_problem add_alert error and warning
            -->
            <v-icon color="white" class="snackIcon shake"
              >notifications_active</v-icon
            >
            <div>{{ this.alertText }}</div>
            <v-icon color="white" size="16" @click="dismissAlert()"
              >cancel</v-icon
            >
          </v-snackbar>

          <v-snackbar
            dark
            :color="errorColor"
            :timeout="timeout"
            v-model="errorAlertSnackbar"
            :bottom="true"
            :right="true"
            v-if="appEnablePopup"
          >
            <!-- TODO: add support for choosnig alert icons
           notifications_none report_problem add_alert error and warning
            -->
            <v-icon color="white" class="snackIcon errorShake">error</v-icon>
            <div>{{ this.errorAlertText }}</div>
            <v-icon color="white" size="16" @click="dismissErrorAlert()"
              >cancel</v-icon
            >
          </v-snackbar>

          <!-- TODO HACK move this div into a test component for testing -->
          <div v-if="this.$router.currentRoute.name == 'coaching'">
            <h2>Test Error Alert</h2>
            <v-btn flat @click="addErrorAlert()">
              <v-icon color="red" size="20" class="snackIcon">warning</v-icon
              >Pop Error Alert
            </v-btn>

            <h2>Test Alerts</h2>
            <v-btn flat @click="addAlert()">
              <v-icon color="red" size="20" class="snackIcon">warning</v-icon
              >Pop Alert
            </v-btn>

            <v-btn flat @click="addRefresh()">
              <v-icon color="blue" size="20" class="snackIcon">refresh</v-icon
              >Pop Refresh
            </v-btn>
          </div>
          <!-- TODO HACK remove this div its only for testing -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
export default {
  data: () => ({
    vueWindow: window,
    color: "green",
    errorColor: "red",
    timeout: 10000,
    refreshSnackbar: false,
    alertSnackbar: false,
    alertText: "",
    errorAlertSnackbar: false,
    errorAlertText: ""
  }),

  methods: {
    addErrorAlert() {
      this.$store.dispatch("setErrorAlert", "We have failed you");
    },
    dismissErrorAlert() {
      this.errorAlertSnackbar = false;
      this.$store.dispatch("setErrorAlert", null);
    },
    addAlert() {
      this.$store.dispatch("setAlert", "You got to do something now!");
    },
    dismissAlert() {
      this.alertSnackbar = false;
      this.$store.dispatch("setAlert", null);
    },
    addRefresh() {
      this.$store.dispatch("setAlert", "Refresh now");
    },

    dismissRefresh() {
      this.refreshSnackbar = false;
      this.$store.dispatch("setAlert", null);
    },
    doRefresh() {
      this.refreshSnackbar = false;
      this.$store.dispatch("setAlert", null);
      this.vueWindow.location.reload(true);
    }
  },
  computed: {
    appEnablePopup() {
      if (process.env.VUE_APP_ENABLE_POPUPS) {
        return process.env.VUE_APP_ENABLE_POPUPS === "true";
      }
      return true;
    },
    alert() {
      return this.$store.state.alert;
    },
    errorAlert() {
      return this.$store.state.errorAlert;
    }
  },
  watch: {
    errorAlert(newAlert, oldAlert) {
      // Our fancy notification (2).
      if (newAlert) {
        this.errorAlertSnackbar = true;
        this.errorAlertText = newAlert;
      }
    },
    alert(newAlert, oldAlert) {
      // Our fancy notification (2).
      if (newAlert) {
        if (newAlert.startsWith("Refresh")) {
          this.refreshSnackbar = true;
        } else {
          this.alertSnackbar = true;
          this.alertText = newAlert;
        }
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.snackIcon {
  padding-right: 10px;
}
.shake {
  // TODO make it shake faster but for same amount of time
  animation: shake 1.2s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.errorShake {
  // TODO make it shake faster but for same amount of time
  animation: shake 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.content-container {
  background: url("https://res.cloudinary.com/firmview/image/upload/v1564585861/CasaFiAssets/sofa-no-color_cggnfj.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
