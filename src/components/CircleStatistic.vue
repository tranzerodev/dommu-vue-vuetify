<template>
  <v-card>
    <v-card-title class="text-center justify-center">
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <div class="justify-center row layout ma-0">
        <v-progress-circular
          :size="150"
          :width="15"
          :rotate="-180"
          :value="percent"
          :color="color"
          >{{ value }}</v-progress-circular
        >
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="text-center justify-center">
      <h3>{{ subTitle }} {{ caption }}</h3>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    caption: String,
    value: Number,
    percent: Number,
    color: String
  }
};
</script>

<style></style>
