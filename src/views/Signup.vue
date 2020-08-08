<template>
  <div class="signup">
    <Signup />
  </div>
</template>

<script>
import Signup from "@/components/signup/SignupDefault/SignupDefault.vue";
import AuthService from "../services/AuthService";

export default {
  name: "signup",
  components: {
    Signup
  },
  created() {
    if (AuthService.isLoggedIn) {
      AuthService.logout();
    }
  },
  head: {
    title: {
      inner: "Sign Up"
    }
  }
};
</script>
