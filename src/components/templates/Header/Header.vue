<template>
  <span>
    <nav class="mobileNav hidden-md-and-up">
      <v-navigation-drawer
        id="mobileNav"
        fixed
        v-model="drawer"
        app
        dark
        class="primary"
        :width="205"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <v-list dense>
          <v-list-tile
            to="/"
            @click="$ga.event('Navgation', 'Click', 'HomeBtn')"
          >
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!--
          <v-list-tile
            id="dashboardLoggedInMobileNav"
            to="/my-account/dashboard"
            v-if="!$store.state.isInMyAccount && $store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'DashboardBtn')"
          >
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="searchLoggedInMobileNav"
            to="/my-account/mortgage-search"
            v-if="!$store.state.isInMyAccount && $store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'SearchdBtn')"
          >
            <v-list-tile-action>
              <v-icon>search</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Mortgage search</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>-->
          <v-list-tile id="aboutMobileNav" to="/about">
            <v-list-tile-action>
              <v-icon>supervisor_account</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About us</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile id="learnMobileNav" to="/glossary">
            <v-list-tile-action>
              <v-icon>local_library</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Glossary</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            id="dashboardMobileNav"
            to="/my-account/dashboard"
            v-if="$store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'DashboardBtn')"
          >
            <v-list-tile-action>
              <div class="dash-icon"></div>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="searchesMobileNav"
            to="/my-account/mortgage-search"
            v-if="$store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'SearchBtn')"
          >
            <v-list-tile-action>
              <v-icon class="flip-icon">mdi-magnify</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Mortgage search</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <!--
          <v-list-tile
            id="aboutMobileNav"
            to="/about"
            v-if="!$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>supervisor_account</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About Us</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
          <v-list-tile
            id="blogMobileNav"
            to="/blog"
            v-if="!$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>record_voice_over</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Blog</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="learnMobileNav"
            to="/learn"
            v-if="!$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>local_library</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Learn</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="careersMobileNav"
            to="/careers"
            v-if="!$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>face</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Careers</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          -->

          <!--
          <v-list-tile
            id="searchesMobileNav"
            to="/my-account/searches"
            v-if="$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>search</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Searches</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="introductionsMobileNav"
            to="/my-account/introductions"
            v-if="$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>how_to_reg</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Introductions</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          -->
          <!--
          <v-list-tile id="offersMobileNav" to="/my-account/offers" v-if="$store.state.isInMyAccount">
            <v-list-tile-action>
              <v-icon>local_offer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Offers</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile id="timelineMobileNav" to="/my-account/timeline" v-if="$store.state.isInMyAccount">
            <v-list-tile-action>
              <v-icon>timeline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Timeline</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
         
          <v-list-tile
            id="reportMobileNav"
            to="/my-account/report"
            v-if="$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Report</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
         
          <v-list-tile
            id="coachingMobileNav"
            to="/my-account/coaching"
            v-if="$store.state.isInMyAccount"
          >
            <v-list-tile-action>
              <v-icon>local_library</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Coaching</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile id="contactMobileNav" to="/contact">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          -->
          <v-list-tile
            id="signupMobileNav"
            to="/signup"
            v-if="!$store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'SignupBtn')"
          >
            <v-list-tile-action>
              <v-icon>meeting_room</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="loginMobileNav"
            to="/login"
            v-if="!$store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'LoginBtn')"
          >
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="logoutMobileNav"
            @click="logout"
            v-if="$store.state.isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>cancel_presentation</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="profileMobileNav"
            to="/my-account/profile"
            v-if="$store.state.isUserLoggedIn"
            @click="$ga.event('Navgation', 'Click', 'ProfileBtn')"
          >
            <v-list-tile-action>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <!-- <v-list-tile
            id="profilePropertyMobileNav"
            to="/my-account/profile/property"
            v-if="$store.state.isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>location_city</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Property Details</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            id="profileMortgageMobileNav"
            to="/my-account/profile/mortgage"
            v-if="$store.state.isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>account_balance</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Mortgage Details</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>-->
        </v-list>
      </v-navigation-drawer>
    </nav>

    <nav class="desktopNav">
      <v-toolbar
        fixed
        style="color:black;"
        flat
        v-bind:class="[$route.path == '/' ? 'transparent' : 'navBar']"
      >
        <v-menu class="hidden-md-and-up">
          <v-toolbar-side-icon
            id="mobileNavIcon"
            slot="activator"
            @click="drawer = !drawer"
          ></v-toolbar-side-icon>
        </v-menu>

        <v-toolbar-title class="mt-0 pr-4">
          <router-link to="/" class="toolbar-title">
            <img src="/img/logo.svg" style="height:30px; padding-top:12px;" />
          </router-link>
        </v-toolbar-title>

        <v-toolbar-items
          id="desktopNav"
          class="hidden-sm-and-down ml-4 pl-4 main-navs with-green-pointer"
        >
          <!-- <v-btn
            id="dashboardLoggedInDesktopNav"
            v-if="!$store.state.isInMyAccount && $store.state.isUserLoggedIn"
            to="/my-account/dashboard"
            flat
            @click="$ga.event('Navgation', 'Click', 'DashboardBtn')"
            >Dashboard</v-btn
          >
          <v-btn
            id="searchLoggedInDesktopNav"
            v-if="!$store.state.isInMyAccount && $store.state.isUserLoggedIn"
            to="/my-account/mortgage-search"
            flat
            @click="$ga.event('Navgation', 'Click', 'SearchBtn')"
            >Mortgage search</v-btn
          >-->

          <!--
          <v-btn
            id="aboutDesktopNav"
            v-if="!$store.state.isInMyAccount"
            to="/about"
            flat
            >About us</v-btn
          >
          <v-btn
            id="blogDesktopNav"
            v-if="!$store.state.isInMyAccount"
            to="/blog"
            flat
            >Blog</v-btn
          >
          <v-btn
            id="learnDesktopNav"
            v-if="!$store.state.isInMyAccount"
            to="/learn"
            flat
            >Learn</v-btn
          >
          <v-btn
            id="careersDesktopNav"
            v-if="!$store.state.isInMyAccount"
            to="/careers"
            flat
            >Careers</v-btn
          >
          -->
          <v-btn id="aboutDesktopNav" to="/about" flat class="pl-0">
            <v-icon size="22" class="mr-1">supervisor_account</v-icon>About us
          </v-btn>
          <v-btn id="learnDesktopNav" to="/glossary" flat class="pl-0">
            <v-icon size="20" class="mr-1">local_library</v-icon>Glossary
          </v-btn>
          <v-btn
            id="loginDesktopNav"
            v-if="$store.state.isUserLoggedIn"
            to="/my-account/dashboard"
            flat
            class="nav-desktop-dash pl-3"
            @click="$ga.event('Navgation', 'Click', 'DashboardBtn')"
            >&nbsp;Dashboard</v-btn
          >
          <v-btn
            id="searchesDesktopNav"
            v-if="$store.state.isUserLoggedIn"
            to="/my-account/mortgage-search"
            flat
            class="nav-desktop-search"
            @click="$ga.event('Navgation', 'Click', 'SearchBtn')"
            >&nbsp;Mortgage search</v-btn
          >

          <!--
          <v-btn id="offersDesktopNav" v-if="$store.state.isInMyAccount" to="/offers" flat dark>Offers</v-btn>
          <v-btn id="timelineDesktopNav" v-if="$store.state.isInMyAccount" to="/timeline" flat dark>Timeline</v-btn>
          -->
          <!--
          <v-btn
            id="searchesDesktopNav"
            v-if="$store.state.isInMyAccount"
            to="/my-account/searches"
            flat
          >
            <v-icon>search</v-icon>&nbsp;My Searches
          </v-btn>
          <v-btn
            id="introductionsDesktopNav"
            v-if="$store.state.isInMyAccount"
            to="/my-account/introductions"
            flat
          >
            <v-icon>how_to_reg</v-icon>&nbsp;My Introductions
          </v-btn>

          <v-btn
            id="reportDesktopNav"
            v-if="$store.state.isInMyAccount"
            to="/my-account/report"
            flat
          >
            <v-icon>library_books</v-icon>&nbsp;Report
          </v-btn>
          <v-btn
            id="coachingDesktopNav"
            v-if="$store.state.isInMyAccount"
            to="/my-account/coaching"
            flat
          >
            <v-icon>local_library</v-icon>&nbsp;Coaching
          </v-btn>
          -->

          <!--  <v-menu offset-y v-if="$store.state.isUserLoggedIn">
            <template v-slot:activator="{ on }">
              <v-btn id="profileDesktopNav" v-on="on" class="ma-0 pa-0" flat>
                <v-icon class="ma-0 pa-0">person</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile key="profile1" to="/my-account/profile">
                <v-list-tile-title>Personal Details</v-list-tile-title>
              </v-list-tile>
              <v-list-tile key="profile2" to="/my-account/profile/property">
                <v-list-tile-title>Property Details</v-list-tile-title>
              </v-list-tile>
              <v-list-tile key="profile3" to="/my-account/profile/mortgage">
                <v-list-tile-title>Mortgage Details</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>-->
          <!--
            <v-dialog v-model="userProfileDialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn v-if="$store.state.isUserLoggedIn" id="userProfileDesktopNav" flat dark>Profile</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Legal first name*" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          label="Legal middle name"
                          hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          label="Legal last name*"
                          hint="example of persistent helper text"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Email*" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Password*" type="password" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-autocomplete
                          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          label="Interests"
                          multiple
                        ></v-autocomplete>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="userProfileDialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="userProfileDialogSave">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          -->
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <span
            style="margin-top:15px;margin-right:20px;"
            v-if="!$store.state.isUserLoggedIn"
          >
            <v-btn
              style="padding-top:5px;padding-bottom:5px;"
              v-if="!$store.state.isUserLoggedIn"
              id="signupDesktopNav"
              to="/signup"
              class="primary"
              @click="$ga.event('Navgation', 'Click', 'SignupBtn')"
              >Sign up</v-btn
            >
          </span>
          <span style="margin-top:15px;" v-if="!$store.state.isUserLoggedIn">
            <v-btn
              style="padding-top:5px;padding-bottom:5px;"
              id="loginDesktopNav"
              v-if="!$store.state.isUserLoggedIn"
              to="/login"
              outline
              type="text"
              @click="$ga.event('Navgation', 'Click', 'LoginBtn')"
              >Login</v-btn
            >
          </span>
          <span style="margin-top:15px;" v-if="$store.state.isUserLoggedIn">
            <v-btn
              style="padding-top:5px;padding-bottom:5px;"
              v-if="$store.state.isUserLoggedIn"
              id="logoutDesktopNav"
              @click="logout"
              outline
              >Log out</v-btn
            >
          </span>

          <v-btn
            v-if="$store.state.isUserLoggedIn"
            id="profileDesktopNav"
            to="/my-account/profile"
            class="my-0 mx-2"
            flat
            icon
            @click="$ga.event('Navgation', 'Click', 'ProfileBtn')"
          >
            <img class="footer-logo" src="/img/icons/Group.svg" width="30px" />
            <!-- <v-icon class="ma-0 pa-0">person</v-icon> -->
          </v-btn>
        </div>
      </v-toolbar>
    </nav>
  </span>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  methods: {
    logout() {
      // tell the server
      AuthService.logout();
      // TODO: consider clearing the whole local store
      // TODO: stop using local storage at all
      this.$ga.event("Navgation", "Click", "LogoutBtn");
      this.$router.push({
        name: "home"
      });
    },
    userProfileDialogSave() {
      this.userProfileDialog = false;
    }
  },
  data() {
    return {
      drawer: false,
      userProfileDialog: false
    };
  },
  computed: {
    store: function() {
      return this.$store.state;
    }
  }
};
</script>

<style lang="scss">
.toolbar-title {
  color: black;
  /*text-decoration: inherit;*/
}

#signupDesktopNav {
  border-radius: 5px;
  border-color: rgb(200, 200, 200);
}
#loginDesktopNav {
  border-radius: 5px;
  border-color: rgb(200, 200, 200);
}
#logoutDesktopNav {
  border-radius: 5px;
  border-color: rgb(200, 200, 200);
}

#mobileNav {
  z-index: 200;
  #dashboardMobileNav {
    .dash-icon {
      &::after {
        z-index: 1;
        position: absolute;
        background: url("/img/icons/mobile-dash.svg");
        top: 12px;
        left: 20px;
        visibility: visible;
        content: "";
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        opacity: 1;
      }
    }

    &.v-list__tile--active {
      .dash-icon {
        &::after {
          background: url("/img/icons/mobile-dash-active.svg");
          z-index: 1;
          position: absolute;
          top: 12px;
          left: 20px;
          visibility: visible;
          content: "";
          background-repeat: no-repeat;
          width: 30px;
          height: 30px;
          opacity: 1;
        }
      }
    }
  }
}

.desktopNav {
  z-index: 50;
  .nav-desktop-dash {
    &::after {
      z-index: 1;
      position: absolute;
      background: url("/img/icons/dash.svg");
      top: 25px;
      left: 0px;
      visibility: visible;
      content: "";
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      opacity: 1;
    }
    &.v-btn--active {
      &::after {
        background: url("/img/icons/dash active.svg");
        z-index: 1;
        position: absolute;
        top: 25px;
        visibility: visible;
        content: "";
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        opacity: 1;
      }
    }
  }

  .nav-desktop-search {
    &::after {
      z-index: 1;
      position: absolute;
      background: url("/img/icons/searches.svg");
      top: 25px;
      left: 0px;
      visibility: visible;
      content: "";
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      opacity: 1;
    }
    &.v-btn--active {
      &::after {
        background: url("/img/icons/searches active.svg");
        z-index: 1;
        position: absolute;
        top: 25px;
        visibility: visible;
        content: "";
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        opacity: 1;
      }
    }
  }

  .v-btn {
    i {
      color: #6c6c86 !important;
    }
  }

  .v-btn--active {
    div {
      color: #49d586;
      background-color: transparent !important;
    }
    i {
      color: #49d586 !important;
    }
  }
}
.theme--light {
  .v-toolbar {
    &.navBar {
      background-color: white !important;
      box-shadow: 0 2px 28px 0 rgba(223, 223, 239, 0.5) !important;
    }
  }
}
/*
v-btn--active v-btn v-btn--flat v-btn--router theme--light
*/

.with-green-pointer .v-btn--active div::after {
  z-index: 1;
  position: absolute;
  background: url("/img/icons/active tab.svg");
  top: 25px;
  visibility: visible;
  content: "";
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}
.desktopNav a.primary.v-btn--active div {
  color: #fff;
}
.desktopNav a.v-btn--active {
  color: transparent !important;
}

.activator-icon {
  background: transparent;
}

.desktopNav .v-btn--active .theme--light.v-btn {
  background-color: white !important;
}
/*v-btn--active v-btn v-btn--flat v-btn--router theme--light */

nav {
  /* height: 64px;*/
}

/*
primary--text
v-list__tile--active
v-list__tile v-list__tile--link theme--dark
*/
.mobileNav a.v-list__tile--active {
  color: black !important;
  font-weight: bold;
}
</style>
