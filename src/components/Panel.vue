<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex :class="sizes">
        <v-card class="elevation-6">
          <v-toolbar dark color="primary">
            <v-toolbar-title dark>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <slot>No slot content defined</slot>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "panel",
  props: {
    title: String,
    sizes: String,
    msg: String
  },
  data() {
    return {
      error: null
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss"></style>
