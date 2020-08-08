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

<script>
import GetStarted from "@/components/GetStarted.vue";

export default {
  name: "home",
  components: {
    GetStarted
  },
  data() {
    return {
      width: 1200,
      isMobile: false,
      bannerItems: [
        //{
        // src:
        //"https://res.cloudinary.com/firmview/image/upload/v1564416480/CasaFiAssets/attic-living-room_by2ui0.jpg"
        //"https://res.cloudinary.com/firmview/image/upload/v1564419747/CasaFiAssets/attic-living-room_lighten60_jpsvpk.jpg"
        //  "https://res.cloudinary.com/firmview/image/upload/v1564574737/CasaFiAssets/attic-living-room_lighten70_evpqi5.jpg"
        //},
        {
          // src:
          //   "https://res.cloudinary.com/firmview/image/upload/v1564585861/CasaFiAssets/sofa-no-color_cggnfj.jpg"
        }
      ],
      mobileBannerItems: [
        //{
        //  src:
        //"https://res.cloudinary.com/firmview/image/upload/v1564418415/CasaFiAssets/attic-living-room_320_440_dnij7i.jpg"
        //"https://res.cloudinary.com/firmview/image/upload/v1564419746/CasaFiAssets/attic-living-room_320_440_lighen60_lhjoiw.jpg"
        //    "https://res.cloudinary.com/firmview/image/upload/v1564574736/CasaFiAssets/attic-living-room_320_440_lighen70_aapeuy.jpg"
        //},
        // {
        //   src:
        //     "https://res.cloudinary.com/firmview/image/upload/v1564585861/CasaFiAssets/sofa-no-color_320_440_dmmfpu.jpg"
        // }
      ]
    };
  },
  mounted() {
    this.onResize();
    this.$store.dispatch("setInMyAccount", false);
    window.addEventListener("resize", this.onResize, { passive: true });
    window.scrollTo(0, 0);
    logger.log(
      "I am test logger that can be disable by setting VUE_APP_ENABLE_CONSOLE_LOGGING as false at env"
    );
  },
  methods: {
    track() {
      this.$ga.page("/");
      this.$ga.screenview("/");
    },
    //window.innerWidth
    scaleFont() {
      if (this.width >= 1000) {
        return 3.4;
      } else {
        return (this.width + (1200 - this.width) / 5) / 350;
      }
    },
    scaleStrapLine() {
      return this.width >= 900
        ? 1.08
        : (this.width + (1200 - this.width) / 1.6) / 850;
    },
    onResize() {
      this.width = window.innerWidth;
      this.isMobile = window.innerWidth < 769 ? true : false;
    }
  }
};
</script>
<style lang="scss">
.errorShake {
  animation: shake 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.errorMessageBox {
  color: darkred;
  background-color: pink;
  padding: 12px;
  font-size: 1.2em;
  position: absolute;
  /*top: 65px;
  right: 25%;*/
  z-index: 300;
}

.desktopHomepageCarousel {
  height: 90vh !important;
  box-shadow: unset !important;
}

.desktopHomepageCarousel .v-carousel__item {
  height: 90vh !important;
  box-shadow: unset !important;
}

.desktopCarouselText {
  text-align: left;
  /*top: 154px;*/
  /*top: 313px;*/
  /*top: 30%;*/

  left: 158px;
  z-index: 10;
  bottom: 28%;
}

.desktopCarouselText h1 {
  color: black;
  text-align: left;
  font-weight: bold;
  line-height: 1.17;
  margin-bottom: 50px;
}
.desktopCarouselText h2 {
  text-align: left;
  font-weight: 500;
  line-height: 2.22em;
  letter-spacing: normal;
  color: #222222;
}

.desktopLogo {
  position: absolute;
  top: 24px;
  left: 37px;
}

.v-navigation-drawer {
  z-index: 100;
}
/*
.mobileCarouselText {
  position: absolute;
  top: 154px;
  left: 20px;
  z-index: 10;
}
*/
.mobileCarouselText {
  /*position: relative;*/
  width: 100%;
  /*bottom: 270px;*/
  top: 20%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.mobileCarouselText h1 {
  font-size: 2em;
  color: black;
  text-align: left;
  z-index: 10;
  margin-bottom: 20px;
}

.mobileCarouselText h2 {
  text-align: left;
  font-weight: 500;
  line-height: 1.22em;
  letter-spacing: normal;
  color: #222222;
}
.mobileLogo {
  position: absolute;
  top: 7px;
  left: 7px;
}

/*
.mobileCarouselControls {
  position: absolute;
  width: 320px;
  padding: 5px;
  top: 330px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.desktopCarouselControls {
  position: absolute;
  width: 680px;
  padding: 5px;
  top: 730px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
*/

.mobileCarouselControls {
  position: relative;
  width: 100%;
  padding: 0px;
  bottom: 210px;
  left: 0;
  right: 0;
  margin-left: 5px;
  margin-right: 5px;
}

.desktopCarouselControls {
  position: relative;
  width: 680px;
  padding: 5px;
  bottom: 70px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.v-carousel__controls {
  min-height: 80px;
  padding-top: 20px;
  /*background: rgba(2, 45, 63, 0.7) !important;*/
  /*background: rgba(0, 0, 0, 0.8) !important; */
  background: rgba(0, 0, 0, 0) !important;
}

.carouselMainText {
  color: white;
  font-size: 24px;
  padding-right: 10px;
}
.carouselSelect {
  max-height: 65px;
  /*
 background-color: #00f;
  color: #f00;
  */
  font-size: 12px;
}

.v-text-field {
  min-height: 20px;
}

.v-text-field.v-text-field--solo {
  min-height: 20px;
}

.v-text-field.v-text-field--solo .v-input__control {
  min-height: 20px;
}

#mobileProcedure {
  width: 70%;
  padding: 0px;
  margin: 0px;
}

select {
  -webkit-appearance: menulist-button;
  color: red;
}
select {
  width: 150px;
  height: 30px;
  padding: 5px;
  color: green;
}
select option {
  color: black;
}
select option:first-child {
  color: green;
}

.desktopCarouselButton {
  background-color: red;
  color: #035478 !important;
  margin: 0px !important;
  margin-left: -30px !important;
  margin-top: 2px !important;
  padding-right: 16px !important;
  margin-bottom: 26px !important;
  height: 36px;
}

.mobileCarouselButton {
  background-color: red;
  color: #035478 !important;
  width: 50px;
  min-width: 50px !important;
  max-width: 50px;
  margin: 0px !important;
  padding: 0px !important;
  margin-top: 2px !important;
  margin-bottom: 26px !important;
  margin-left: -52px !important;
  margin-right: 16px !important;

  height: 36px;
}

.carouselText {
  color: white;
  font-size: 12px;
  padding-left: 10px;
}

.v-select__selections {
  /*max-height: 30px;
  margin-bottom: 10px !important;*/
}
</style>
