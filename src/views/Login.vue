<template>
  <v-form>
    <v-container class="login-container">
      <v-layout row wrap>
        <Login msg="Hello Vue.js World" />
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import Login from "@/components/Login/Login.vue";

export default {
  name: "login",
  components: {
    Login
  },
  mounted() {
    this.$store.dispatch("logout", null);
  },
  computed: {
    store: function() {
      return this.$store.state;
    }
  },
  head: {
    title: {
      inner: "Login"
    }
  }
};
</script>
<style scoped>
/* .login-container{
    background: url('https://res.cloudinary.com/firmview/image/upload/v1564585861/CasaFiAssets/sofa-no-color_cggnfj.jpg');
  } */
</style>
