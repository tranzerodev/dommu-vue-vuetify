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
      this.isMobile = window.innerWidth < 769;
    }
  },
  head: {
    title: {
      inner: "Domun",
      separator: "|",
      complement: "Home Valuation and Mortgage Switching"
    },
    // Meta tags
    meta: [
      {
        name: "description",
        content:
          "Find out your home value, and how it’s changed over the years – for free. Accurately calculate your loan to value (LTV) and see if you’re on the best mortgage deal."
      },
      {
        name: "og:title",
        content: "Domun | Home Valuation and Mortgage Switching"
      },
      {
        name: "twitter:title",
        content: "Domun | Home Valuation and Mortgage Switching"
      },
      {
        name: "og:description",
        content:
          "Find out your home value, and how it’s changed over the years – for free. Accurately calculate your loan to value (LTV) and see if you’re on the best mortgage deal."
      },
      {
        name: "twitter:description",
        content:
          "Find out your home value, and how it’s changed over the years – for free. Accurately calculate your loan to value (LTV) and see if you’re on the best mortgage deal."
      }
    ]
  }
};
