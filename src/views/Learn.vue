<template>
  <div class="about">
    <h1>Glossary</h1>
    <h3>Agreement In Principle (AIP)</h3>

    <p>
      An Agreement In Principle (AIP) or a Decision In Principle (DIP) is a
      certificate or statement from a lender stating how much money they would
      be willing to loan you.
    </p>

    <h3>Annual Percentage Rate of Charge (APRC)</h3>

    <p>
      Annual Percentage Rate of Charge (APRC) or Annual Percentage Rate (APR)
      shows you the total cost of the whole mortgage term (average is 25 years)
      including the interest and fees.
    </p>

    <h3>Automated Valuation Model (AVM)</h3>

    <p>
      An Automated Valuation Model (AVM) is a technology driven system used to
      estimate the current value of a property instantaneously. Essentially, a
      powerful algorithm calculates the value by analysing nearby properties
      with similar characteristics, and local and national trend data.
    </p>

    <h3>Bank of England</h3>

    <p>
      The Bank of England is the UK’s central bank and they control the base
      rate.
    </p>

    <h3>Base rate</h3>

    <p>
      The base rate is the most important interest rate in the UK, and it
      influences the interest rates set by mortgage lenders.
    </p>

    <h3>Capped rate</h3>

    <p>
      Capped mortgages have an upper limit which protects the borrower against
      interest rates rising over a certain level. Therefore, they offer you a
      level of security that other types of variable rates don’t.
    </p>

    <h3>Collar</h3>

    <p>
      A mortgage collar is a lower limit that interest rates cannot fall below
      which protects the lender against interest rates falling below a certain
      level.
    </p>

    <h3>Credit report</h3>

    <p>
      A credit report is a detailed record of an individual’s credit history.
    </p>

    <h3>Early repayment charges</h3>

    <p>
      Early repayment charges are penalty fees the lender charges you if you
      decide to pay off your mortgage early. The charges can vary and not all
      mortgage products have them.
    </p>

    <h3>Equity ownership</h3>

    <p>
      Equity ownership is the proportion of your home that you own outright. If
      you have a mortgage, you will still have a mortgage balance to pay the
      lender before you own the property.
    </p>

    <h3>Fixed rate mortgage</h3>

    <p>
      A fixed rate mortgage is where the lender agrees to keep the interest rate
      the same for the duration of the initial term meaning your monthly
      payments stay the same.
    </p>

    <h3>Freehold</h3>

    <p>
      A freehold is a type of property tenure where you own the property and the
      land it stands on.
    </p>

    <h3>Initial term</h3>

    <p>
      The initial term (also known as the discount period) is the product
      introductory period (average is around 3 years) where you normally pay a
      lower rate of interest.
    </p>

    <h3>Interest only mortgage</h3>

    <p>
      An interest only mortgage is when you just pay the interest charged for
      borrowing the lender's money each month. This means you owe the lender the
      capital you borrowed at the end of your mortgage term.
    </p>

    <h3>Interest rate</h3>

    <p>
      An interest rate is the percentage of interest charged on the capital you
      borrow from the lender. The lender sets the percentage (%), but it is
      based on the base rate.
    </p>

    <h3>Leasehold</h3>

    <p>
      A leasehold is a type of property tenure where you only own the property
      for the duration of the lease.
    </p>

    <h3>Loan To Value (LTV)</h3>

    <p>
      The loan To Value (LTV) ratio is the size of the borrowing amount in
      relation to the current value of the property to be mortgaged. It is given
      as a percentage.
    </p>

    <h3>Monthly repayment</h3>

    <p>The amount the mortgage consumer pays the mortgage lender each month.</p>

    <h3>Mortgage</h3>

    <p>
      A mortgage is a loan that you use to purchase a property. Most mortgage
      loans require a small cash deposit (usually between 5% - 10% of the
      property price). The loan is then repaid on a monthly basis over the
      duration of your mortgage term.
    </p>

    <h3>Mortgage advisors/brokers</h3>

    <p>
      Mortgage advisors/brokers advise on regulated mortgage contracts and
      arrange mortgages by acting as an intermediate between you (the borrower)
      and the lender.
    </p>

    <h3>Mortgage balance</h3>

    <p>
      Mortgage balance is the amount of outstanding money you owe the lender
      excluding any interest charged.
    </p>

    <h3>Mortgage term</h3>

    <p>
      Mortgage term is the amount of time you need to make payments for to pay
      off your mortgage.
    </p>

    <h3>Reception room</h3>

    <p>
      A room where people can sit together such as a living or dining room. A
      kitchen or bedroom is not a reception room.
    </p>

    <h3>Remortgage</h3>

    <p>
      Remortgaging is the process of switching your existing mortgage on the
      same property to a new product, either with your current lender or a
      different one. Generally, it's to get a better deal when your initial term
      ends.
    </p>

    <h3>Repayment mortgage</h3>

    <p>
      A repayment mortgage is when you pay off the amount of money borrowed, and
      the interest charged for borrowing the lender’s money each month.
    </p>

    <h3>Shared equity</h3>

    <p>
      A shared equity scheme allows the homebuyers with small deposits a way of
      increasing their mortgage deposit by taking out a loan which forms part of
      the deposit.
    </p>

    <h3>Shared ownership</h3>

    <p>
      A shared ownership scheme allows you to buy a share of a property (usually
      between 25 – 75%) and pay rent on the remaining share.
    </p>

    <h3>Tracker rate mortgage</h3>

    <p>
      A tracker rate is a type of variable rate mortgage which follows the
      movement of a fixed economic indicator – typically the Bank of England’s
      base interest rate. The tracker rate is generally set high than the fixed
      economic indicator it’s tracking.
    </p>

    <h3>Variable rate mortgage</h3>

    <p>
      A variable rate mortgage is where the lender can change the interest rate
      at any time and consequently your monthly payments could fluctuate. A
      tracker rate is a type of variable rate mortgage.
    </p>
  </div>
</template>

<script>
export default {
  mounted() {
    // no need for pre render
    this.$store.dispatch("setInMyAccount", false);
  },
  head: {
    title: {
      inner: "Mortgage Jargon Explained",
      separator: "|",
      complement: "Domun"
    },
    meta: [
      {
        name: "description",
        content: "Mortgage terminology explained in a simple way."
      },
      {
        name: "og:title",
        content: "Mortgage Jargon Explained | Domun"
      },
      {
        name: "twitter:title",
        content: "Mortgage Jargon Explained | Domun"
      },
      {
        name: "og:description",
        content: "Mortgage terminology explained in a simple way."
      },
      {
        name: "twitter:description",
        content: "Mortgage terminology explained in a simple way."
      }
    ]
  }
};
</script>

<style scoped lang="scss">
div.about {
  padding: 80px;
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
