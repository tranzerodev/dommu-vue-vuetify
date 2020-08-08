<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex :class="sizes">
        <v-card class="elevation-0">
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
    sizes: String
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
