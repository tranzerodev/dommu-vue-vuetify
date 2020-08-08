<template>
  <v-container class="mt-4">
    <v-layout>
      <div v-if="!isMobile" class="ma-0, pa-0">
        <div class="desktopCarouselText">
          <h1 v-bind:style="{ fontSize: this.scaleFont() + 'em' }">
            Find out the value of your home
            <br />for free in moments.
          </h1>
          <GetStarted msg="landing page specific message?" />
          <h2 v-bind:style="{ fontSize: this.scaleStrapLine() + 'em' }">
            We never share your data with third parties without your permission.
          </h2>
        </div>

        <!-- put controls over the top so they dont move -->
        <!-- TODO need to make more fixes to text does not break down over time -->
        <div class="desktopCarouselControls"></div>
      </div>

      <div v-if="isMobile" class="ma-0, pa-0">
        <div
          :class="{
            'pa-2': $vuetify.breakpoint.smAndUp,
            'pa-0': $vuetify.breakpoint.xs,
            mobileCarouselText: true
          }"
        >
          <h1 v-bind:style="{ fontSize: this.scaleFont() + 'em' }">
            Find out the value of your home for free in moments.
          </h1>

          <GetStarted msg="landing page specific message?" />

          <h2 v-bind:style="{ fontSize: this.scaleStrapLine() + 'em' }">
            We never share your data with third parties without your permission.
          </h2>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
<style src="./Home.scss" lang="scss"></style>
<script src="./Home.js"></script>
