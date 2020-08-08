<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <Register msg="Hello Vue.js World" />
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import Register from "@/components/Register.vue";

export default {
  name: "register",
  components: {
    Register
  }
};
</script>
