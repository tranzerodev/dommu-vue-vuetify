<template>
  <div id="app">
    <v-app id="inspire">
      <page-header name="page-header" />
      <page-content />
      <page-footer />
    </v-app>
  </div>
</template>
<script>
import PageHeader from "@/components/templates/Header/Header";
import PageContent from "@/components/templates/Content/Content";
import PageFooter from "@/components/templates/Footer/Footer";

export default {
  name: "app",
  components: {
    PageHeader,
    PageContent,
    PageFooter
  }
};
</script>
<style lang="scss">
#app {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #49d586;
  // TODO
  //green scrollbar for mozilla
  // scrollbar-color: green white;
  // scrollbar-width: thin !important;

  .v-menu__content {
    scrollbar-color: green white;
    scrollbar-width: thin !important;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    // display: none
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  // TODO
  //green scrollbar for chrome
  // ::-webkit-scrollbar {
  //   width: 20px;
  // }

  // ::-webkit-scrollbar-track {
  //   box-sizing: border-box;
  //   -moz-box-sizing: border-box;
  //   -webkit-box-sizing: border-box;
  //   -webkit-appearance: none;
  //   box-shadow: inset 0 0 10px 10px #ddd;
  //   -moz-box-shadow: inset 0 0 10px 10px #ddd;
  //   -webkit-box-shadow: inset 0 0 10px 10px #ddd;
  //   border-right: solid 15px white;
  // }

  // ::-webkit-scrollbar-thumb {
  //   box-sizing: border-box;
  //   -moz-box-sizing: border-box;
  //   -webkit-box-sizing: border-box;
  //   -webkit-appearance: none;
  //   box-shadow: inset 0 0 10px 10px #49d586;
  //   -moz-box-shadow: inset 0 0 10px 10px #49d586;
  //   -webkit-box-shadow: inset 0 0 10px 10px #49d586;
  //   border-right: solid 15px transparent;
  // }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #49d586;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.search,
.about,
.my-account,
.contact,
.signup,
.content {
  padding-top: 56px;
}
h1,
h2,
h3,
h4,
h5 {
  color: #49d586;
}

h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.8em;
}
h3 {
  font-size: 1.6em;
}
h4 {
  font-size: 1.4em;
}
h5 {
  font-size: 1.2em;
}
h6 {
  font-size: 1em;
}
p {
  font-size: 1em;
}
a {
  text-decoration: none;
}
/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.application--wrap {
  min-width: 320px !important;
  max-width: none !important;
}

* {
  text-transform: none !important;
}

.dashboard {
  margin-top: 65px;
  /*
  padding-top: 12px;
  */
}

.flip-icon {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
@media only screen and (max-width: 959px) {
  .dashboard {
    margin-top: 50px;
  }
}
.Cookie--dark-lime {
  div {
    &.Cookie__buttons {
      .Cookie__button {
        background-color: #49d586 !important;
        border: #49d586 !important;
      }
    }
  }
}

.sign-up-stepper-container {
  .v-stepper__step__step {
    display: none !important;
  }

  .v-stepper__content {
    padding: 0px !important;
  }
}

.v-stepper__header {
  .v-divider {
    border: unset !important;
  }
}

.theme--light {
  &.v-stepper {
    .v-stepper__label {
      span {
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 400;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #000000;
      }
    }
  }
}

.elevation-0 {
  width: 100%;
}

.green-pointer {
  &::after {
    position: absolute;
    background: url("/img/icons/active tab.svg");
    visibility: visible;
    content: "";
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
  }
}

.white-pointer {
  &::after {
    position: absolute;
    background: url("/img/icons/pointer-white-icon-20x20.png");
    visibility: visible;
    content: "";
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
  }
}

.periwinkle-pointer {
  &::after {
    position: absolute;
    background: url("/img/icons/pointer-periwinkle.svg");
    visibility: visible;
    content: "";
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
  }
}

.input-label {
  margin-top: 30.3px;
  margin-bottom: 19.3px;

  font-weight: bold;
  text-align: left;
}

.v-input {
  &.iconRightSpace {
    padding-right: 90px;
  }

  &.iconLeftSpace {
    padding-left: 90px;
  }
  & .v-label {
    height: 24px;
  }
}

.signup-title {
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
}

.btn-control {
  width: 250px;
  height: 50px !important;
  font-size: 14px !important;
  border-radius: 5px !important;
  color: #fff !important;
}

.btn-control-wide {
  width: 250px;
  height: 50px !important;
  font-size: 14px !important;
  border-radius: 5px !important;
  color: #fff !important;
}

.white-dashboard {
  background-color: #fff;
}

.mt-120 {
  margin-top: 120px;
}

.mt-100 {
  margin-top: 100px;
}

.mt-80 {
  margin-top: 80px;
}

.mt-60 {
  margin-top: 60px;
}

.mt-40 {
  margin-top: 40px !important;
}

.mt-20 {
  margin-top: 20px !important;
}

.round-container {
  margin-bottom: 40px;
  border-radius: 20px;
  padding: 20px 50px;

  &.left-radius {
    max-width: 100% !important;
    border-radius: 57.6px 19.2px 19.2px 19.2px;
    background-color: #ffffff;
    padding: 75px 80px 30px;
  }
}

.theme--light {
  .v-label {
    color: rgba(0, 0, 0, 1) !important;
    .error--text {
      color: #ff5252 !important;
    }
  }
}
.inform--text {
  color: #fff !important;
  background-color: #ffa300;
  font-weight: 500;
}
.v-text-field {
  padding-right: 24px !important;
  .v-label--active {
    max-width: 133%;
    -webkit-transform: translateY(-48px) scale(0.8) !important;
    transform: translateY(-48px) scale(0.8) !important;
  }
}

@media only screen and (max-width: 1250px) {
  // .v-input.iconRightSpace {
  //   padding-right: 20px !important;
  // }
  // .v-input.iconLeftSpace {
  //   padding-left: 20px !important;
  // }
}
@media only screen and (max-width: 959px) {
  .v-stepper {
    &:not(.v-stepper--vertical) {
      .v-stepper__label {
        display: inline-block !important;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .sign-up-stepper-container {
    .sign-up-stepper-header {
      flex-wrap: nowrap !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      height: 50px;
      border-radius: 10px;
    }
  }

  .sign-up-stepper-header {
    .v-stepper__step {
      padding: 10px !important;
    }
  }
  .theme--light {
    .v-stepper {
      .v-stepper__label span {
        font-size: 10px !important;
      }
    }
  }

  .sign-up-stepper-section {
    margin: auto;
    width: 94%;
    border-radius: 16px 9.6px 9.6px 9.6px !important;
    box-shadow: 0 30px 25px 0 rgba(223, 223, 239, 0.5);
    padding: 10px 20px 15px !important;
  }

  .btn-control {
    width: 120px;
    height: 40px;
    font-size: 12px !important;
    border-radius: 2px !important;
    color: #fff !important;
  }

  .btn-control-wide {
    width: 160px;
    height: 40px;
    font-size: 12px !important;
    border-radius: 2px !important;
    color: #fff !important;
  }

  .signup-title {
    font-size: 18px !important;
  }

  .v-text-field {
    .v-label--active {
      max-width: 133%;
      -webkit-transform: translateY(-24px) scale(0.8) !important;
      transform: translateY(-24px) scale(0.8) !important;
    }
  }

  .round-container {
    padding: 10px 20px 15px !important;
    &.left-radius {
      border-radius: 16px 9.6px 9.6px 9.6px !important;
    }
  }

  .theme--light {
    .v-label {
      font-size: 18px !important;
    }
  }

  .v-input.iconRightSpace {
    padding-right: 0px !important;
  }
  .v-input.iconLeftSpace {
    padding-left: 0px !important;
  }
}

/* width */
// ::-webkit-scrollbar {
//   width: 5px;

// }

// /* Track */
// ::-webkit-scrollbar-track {
//   background: #dfdfef;
//   box-shadow: inset 0 0 5px grey;
//   border-radius: 2px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: #49d586;

//   border-radius: 2px;
// }

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover {
//   background: #49d586;
// }

@media only screen and (max-width: 600px) {
  .input-box-container {
    margin-bottom: 48px;
  }
  .btn-control {
    width: 100px;
    height: 40px;
    font-size: 12px !important;
    border-radius: 2px !important;
    color: #fff !important;
  }
  .theme--light {
    .v-stepper {
      .v-stepper__label span {
        font-size: 9px !important;
      }
    }
  }
}

@media only screen and (max-width: 376px) {
  .theme--light {
    .v-label {
      font-size: 12px !important;
    }
  }
  .v-text-field {
    .v-label--active {
      max-width: 133%;
      -webkit-transform: translateY(-18px) scale(0.8) !important;
      transform: translateY(-18px) scale(0.8) !important;
    }
  }
}
.app-spinner {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.v-alert {
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  border: unset !important;
  &.rotate-icon {
    i {
      transform: rotate(180deg);
    }
  }
  i {
    color: white !important;
  }
}
</style>
