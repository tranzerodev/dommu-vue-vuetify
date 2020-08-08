<template>
  <div class="about">
    <h1>
      Domun is a FREE instant home valuation and remortgage comparison platform.
    </h1>

    <p>
      A mortgage is the biggest asset, liability, and monthly cost for most
      customers. The average homeowner can be overspending by up to
      <b>33%</b> every month. We believe nobody should overspend on their
      mortgage and want to help save you money.
    </p>

    <p>
      Many comparison sites have commercial relationships with lenders, don’t
      provide a whole of market search and therefore don’t necessarily show you
      the best mortgage deals. We offer an unbiased whole of market mortgage
      comparison (10,000+ mortgage products from over 95 lenders) so that we can
      find the best deal for you.
    </p>

    <p>
      This is only the beginning of our mission to transform and simplify the
      mortgage journey. Over the next few months, we will be working hard behind
      the scenes to launch our full product including lots of great new
      features.
    </p>

    <p>
      <b>Ready to <a href="/signup">sign up</a>?</b>
    </p>
  </div>
</template>
<script>
export default {
  name: "about",
  mounted() {},
  methods: {
    track() {}
  },
  head: {
    title: {
      inner: "About Us",
      separator: "|",
      complement: "Domun"
    },
    meta: [
      {
        name: "description",
        content:
          "Domun is a FREE home valuation and mortgage switching tool. We offer an unbiased mortgage comparison so we can find the best deal for you."
      },
      {
        name: "og:title",
        content: "About Us | Domun"
      },
      {
        name: "twitter:title",
        content: "About Us | Domun"
      },
      {
        name: "og:description",
        content:
          "Domun is a FREE home valuation and mortgage switching tool. We offer an unbiased mortgage comparison so we can find the best deal for you."
      },
      {
        name: "twitter:description",
        content:
          "Domun is a FREE home valuation and mortgage switching tool. We offer an unbiased mortgage comparison so we can find the best deal for you."
      }
    ]
  }
};
</script>
<style scoped lang="scss">
div.about {
  padding: 80px;
  height: 100%;
  text-align: left;
  background: #f5f5f5;
  @media screen and (max-width: 600px) {
    padding: 80px 10px;
    font-size: 10px;
  }
}
div.about p {
  margin-top: 15px;
}
</style>
