<template>
  <div class="dashboard" id="dash">
    <v-form ref="mortgageSearchForm" v-model="valid">
      <v-layout row justify-center>
        <v-flex
          lg11
          xs11
          :class="{
            'mt-60': $vuetify.breakpoint.smAndUp,
            'mt-20': $vuetify.breakpoint.xs,
            'white-dashboard round-container': true
          }"
        >
          <v-layout row wrap class="pb-2">
            <v-flex sm12 class="text-sm-left">
              <p class="title font-weight-bold pl-1">Mortgage search</p>
              <p
                class="pa-2 inform--text "
                v-if="
                  search.filter.NewLoanAmount / search.filter.CurrentValue <
                    0.751 &&
                    search.filter.NewLoanAmount / search.filter.CurrentValue >
                      0.749
                "
              >
                As an example, LTV has been set to 75% below. Please change the
                'Borrowing amount' to get a suitable mortgage for you.
              </p>
            </v-flex>
            <v-flex sm12>
              <v-layout
                row
                wrap
                :class="{
                  'pt-4': $vuetify.breakpoint.smAndUp,
                  'pt-0': $vuetify.breakpoint.xs,
                  'px-1': true
                }"
              >
                <v-flex
                  lg2
                  md6
                  sm6
                  xs12
                  :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp, 'pa-1': true }"
                >
                  <v-text-field
                    name="mortgageAmount"
                    id="mortgageAmount"
                    label="Borrowing amount"
                    v-model="borrowingAmount"
                    type="text"
                    :prefix="currency"
                    required
                    :rules="borrowingAmountRules"
                    v-on:blur="
                      $ga.event(
                        'MortgageSearchForm',
                        'Fill',
                        'BorrowingAmountField',
                        search.filter.NewLoanAmount
                      )
                    "
                  ></v-text-field>
                </v-flex>
                <v-flex
                  lg2
                  md6
                  sm6
                  xs12
                  :class="{
                    'pr-2': $vuetify.breakpoint.mdAndUp,
                    'mt-0': $vuetify.breakpoint.xs,
                    'pa-1': true
                  }"
                >
                  <v-text-field
                    name="propertyValue"
                    id="propertyValue"
                    label="Property value"
                    v-model="propertyValue"
                    type="text"
                    :prefix="currency"
                    required
                    :rules="propertyValueRules"
                    v-on:blur="
                      $ga.event(
                        'MortgageSearchForm',
                        'Fill',
                        'PropertyValueField',
                        search.filter.CurrentValue
                      )
                    "
                  ></v-text-field>
                </v-flex>

                <v-flex
                  xs12
                  sm12
                  md12
                  :class="{
                    'pb-4': $vuetify.breakpoint.mdAndDown,
                    'text-xs-left': true
                  }"
                  v-if="$vuetify.breakpoint.mdAndDown"
                >
                  <p
                    class="mb-0"
                    v-if="
                      search.filter.NewLoanAmount / search.filter.CurrentValue >
                        0.01 &&
                        search.filter.NewLoanAmount /
                          search.filter.CurrentValue <
                          1.05
                    "
                  >
                    This makes your LTV (loan-to-value)
                    <b>
                      {{
                        Math.round(
                          ((search.filter.NewLoanAmount * 100) /
                            search.filter.CurrentValue) *
                            10
                        ) / 10
                      }}%
                    </b>
                    <v-dialog v-model="LTVDialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-icon color="dark" v-on="on" small>info</v-icon>
                      </template>

                      <v-card>
                        <v-card-title
                          class="title grey lighten-2 px-2 py-0"
                          primary-title
                        >
                          LTV (loan-to-value)
                          <v-btn
                            class="closeModalBtn"
                            icon
                            @click="LTVDialog = false"
                            light
                          >
                            <v-icon>close</v-icon>
                          </v-btn>
                        </v-card-title>

                        <v-card-text class="text-xs-left">
                          <p>
                            The loan to value (LTV) ratio is the size of the
                            borrowing amount in relation to the current value of
                            the property to be mortgaged. It is given as a
                            percentage.
                          </p>
                          <p>
                            For example, a property currently worth
                            &pound;200,000 with a deposit/equity ownership
                            amount of &pound;38,000 and a borrowing amount of
                            &pound;162,000 would have an LTV of 81%.
                          </p>
                          <p>
                            LTV be worked out by dividing the borrowing amount
                            by the property value and multiplying the answer by
                            100.
                          </p>
                          <ul class="ltv">
                            <li>&pound;162,000 / &pound;200,000 = 0.81</li>
                            <li>0.81 x 100 = 81%</li>
                          </ul>
                          <p>There are two variables that impact LTV:</p>
                          <ul class="ltv">
                            <li>Property value</li>
                            <li>Deposit/equity ownership amount</li>
                          </ul>
                          <p>
                            Let’s carry on from the example above. Two years
                            later, the property has increased in value and is
                            now worth &pound;210,000. Some of the loan capital
                            has been paid off, so the deposit/equity ownership
                            has increased to &pound;45,000 and the borrowing
                            amount has decreased to &pound;155,000. The LTV has
                            dropped from 81% to 74% and generally, the lower the
                            LTV, the cheaper the mortgage products available.
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </p>
                  <p
                    v-if="
                      search.filter.NewLoanAmount /
                        search.filter.CurrentValue <=
                        0.01 ||
                        search.filter.NewLoanAmount /
                          search.filter.CurrentValue >=
                          1.05
                    "
                  >
                    Enter values above for 'Borrowing amount' and 'Property
                    value' to see your LTV (loan-to-value)
                  </p>
                </v-flex>

                <v-flex
                  lg3
                  md6
                  sm6
                  xs12
                  :class="{
                    'mt-0': $vuetify.breakpoint.smAndDown,
                    'py-1 pr-1': true
                  }"
                >
                  <v-text-field
                    name="mortgageTerm"
                    id="mortgageTerm"
                    label="Mortgage term"
                    v-model="search.filter.LoanTerm"
                    required
                    class="mortgage-term"
                    append-outer-icon="add"
                    prepend-icon="remove"
                    @click:append-outer="incrementMortgageTerm()"
                    @click:prepend="decrementMortgageTerm()"
                    :rules="mortgageTermRules"
                    hint
                    persistent-hint
                    v-on:blur="
                      $ga.event(
                        'MortgageSearchForm',
                        'Fill',
                        'MortageTermField',
                        search.filter.LoanTerm
                      )
                    "
                  >
                    <template v-slot:label>
                      Term (years)
                      <v-dialog v-model="mortgageTermDialog" width="500">
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="mortageInfoIcon"
                            v-on="on"
                            @click="
                              $event.preventDefault();
                              $event.stopPropagation();
                            "
                            >info</v-icon
                          >
                        </template>
                        <v-card>
                          <v-card-title
                            class="title grey lighten-2 px-2 py-0"
                            primary-title
                          >
                            Mortgage term
                            <v-btn
                              class="closeModalBtn"
                              icon
                              @click="mortgageTermDialog = false"
                              light
                            >
                              <v-icon>close</v-icon>
                            </v-btn>
                          </v-card-title>

                          <v-card-text class="text-xs-left">
                            Mortgage term is the amount of time you need to make
                            payments for to pay off your mortgage. Please round
                            the remaining term on your mortgage to the nearest
                            year (average starting mortgage term is around 25
                            years).
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </template>
                  </v-text-field>
                  <!-- <v-icon color="red">home</v-icon> -->
                </v-flex>
                <v-flex
                  lg2
                  md6
                  sm6
                  xs12
                  :class="{
                    'mt-0': $vuetify.breakpoint.smAndDown,
                    'pa-1': true
                  }"
                >
                  <v-radio-group
                    v-model="search.filter.RepaymentBasis"
                    label="Payment option"
                    :mandatory="true"
                    class="payment-option mb-1 text-xs-center justify-sm-center justify-xs-left justify-md-left"
                    hide-details
                    :row="$vuetify.breakpoint.mdAndDown"
                    v-on:change="
                      $ga.event(
                        'MortgageSearchForm',
                        'Select',
                        'PaymentOptionField',
                        search.filter.RepaymentBasis
                      )
                    "
                  >
                    <template v-slot:label>
                      <div>Payment option&nbsp;</div>
                      <v-dialog v-model="paymentOptionDialog" width="500">
                        <template v-slot:activator="{ on }">
                          <v-icon style="vertical-align: middle" v-on="on"
                            >info</v-icon
                          >
                        </template>
                        <v-card>
                          <v-card-title
                            class="title grey lighten-2 px-2 py-0"
                            primary-title
                          >
                            Payment option
                            <v-btn
                              class="closeModalBtn"
                              icon
                              @click="paymentOptionDialog = false"
                              light
                            >
                              <v-icon>close</v-icon>
                            </v-btn>
                          </v-card-title>

                          <v-card-text class="text-xs-left">
                            <p>
                              Repayment means you pay off the amount of money
                              borrowed, and the interest charged for borrowing
                              the lender’s money each month (most common payment
                              option).
                            </p>
                            <p class="mb-0">
                              Interest only means you just pay the interest
                              charged for borrowing the lender's money each
                              month. This means you owe the lender the capital
                              you borrowed at the end of your mortgage term.
                            </p>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </template>
                    <v-radio
                      class="small-input"
                      v-on:change="onRepaymentBasisChange('REPAYMENT')"
                      label="Repayment"
                      value="REPAYMENT"
                    ></v-radio>
                    <v-radio
                      class="small-input"
                      v-on:change="onRepaymentBasisChange('INTEREST_ONLY')"
                      label="Interest only"
                      value="INTEREST_ONLY"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex
                  lg2
                  md6
                  sm6
                  xs12
                  :class="{
                    'mt-0': $vuetify.breakpoint.mdAndDown,
                    'mt-1': $vuetify.breakpoint.xs,
                    'pa-1': true
                  }"
                >
                  <v-select
                    v-model="defaultSortBySelected"
                    :items="sortByList"
                    item-value="value"
                    item-text="text"
                    label="Sort by"
                    @change="applySortBy($event)"
                  ></v-select>
                </v-flex>
                <v-flex
                  lg1
                  md6
                  sm6
                  xs12
                  :class="{
                    'mt-4': $vuetify.breakpoint.mdAndDown,
                    'pa-1': true
                  }"
                >
                  <v-layout row wrap class="search-control-group">
                    <v-flex lg12 md6 sm6 xs6>
                      <v-dialog
                        v-model="filterDialog"
                        persistent
                        max-width="900px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="#9e9ebd"
                            dark
                            v-on="on"
                            v-on:click="
                              filterDialogCancel();
                              $ga.event(
                                'MortgageSearchForm',
                                'Click',
                                'FilterBtn'
                              );
                            "
                            >Filter</v-btn
                          >
                        </template>
                        <v-card
                          :class="{
                            'pa-4': $vuetify.breakpoint.smAndUp,
                            'pa-1': $vuetify.breakpoint.xs
                          }"
                        >
                          <v-card-title class="pt-0 pr-1">
                            <!--
                            <div class="green-pointer text-xs-left">
                              <p
                                :class="{
                                  'display-2': $vuetify.breakpoint.smAndUp,
                                  'display-1': $vuetify.breakpoint.xs,
                                  'font-weight-bold signup-title mb-0 quaternary--text pt-1': true
                                }"
                              >
                                Filter
                              </p>
                            </div>-->
                            <v-spacer></v-spacer>
                            <v-btn
                              class="close-icon my-0 mr-0"
                              icon
                              @click="filterDialog = false"
                              light
                            >
                              <v-icon color="grey"
                                >mdi-close-circle-outline</v-icon
                              >
                            </v-btn>
                          </v-card-title>
                          <v-card-text>
                            <v-container grid-list-md class="pa-0">
                              <v-layout wrap>
                                <!-- ---------------------------------------------------------------------- -->
                                <v-flex xs12 class="mt-2">
                                  <h3
                                    :class="{
                                      tittle: $vuetify.breakpoint.smAndUp,
                                      'body-2': $vuetify.breakpoint.xs,
                                      'font-weight-bold text-xs-left black--text justify-center': true
                                    }"
                                  >
                                    Initial term
                                    <v-dialog
                                      v-model="initialTermDialog"
                                      width="500"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="dark" v-on="on"
                                          >info</v-icon
                                        >
                                      </template>

                                      <v-card>
                                        <v-card-title
                                          class="title grey lighten-2 px-2 py-0"
                                          primary-title
                                        >
                                          Initial term
                                          <v-btn
                                            class="closeModalBtn"
                                            icon
                                            @click="initialTermDialog = false"
                                            light
                                          >
                                            <v-icon>close</v-icon>
                                          </v-btn>
                                        </v-card-title>

                                        <v-card-text class="text-xs-left">
                                          The initial term (also known as the
                                          discount period) is the product
                                          introductory period (average is around
                                          3 years) where you normally pay a
                                          lower rate of interest.
                                        </v-card-text>
                                      </v-card>
                                    </v-dialog>
                                  </h3>
                                  <v-radio-group
                                    v-model="search.filter.Period"
                                    :mandatory="true"
                                    class="initial-term-rd-group"
                                    v-on:change="
                                      $ga.event(
                                        'MortgageSearchFilterForm',
                                        'Select',
                                        'InitialTermField',
                                        search.filter.Period
                                      )
                                    "
                                  >
                                    <!-- TODO add better suport for none -->
                                    <v-layout row wrap>
                                      <v-flex sm4>
                                        <v-radio
                                          @change="onInitialTermChange('0')"
                                          label="None"
                                          value="0"
                                          class="quaternary--text"
                                        ></v-radio>
                                        <v-radio
                                          @change="onInitialTermChange('2')"
                                          label="2 years"
                                          value="2"
                                        ></v-radio>
                                        <v-radio
                                          @change="onInitialTermChange('3')"
                                          label="3 years"
                                          value="3"
                                          v-if="$vuetify.breakpoint.xs"
                                        ></v-radio>
                                      </v-flex>
                                      <v-flex
                                        sm4
                                        v-if="$vuetify.breakpoint.smAndUp"
                                      >
                                        <v-radio
                                          @change="onInitialTermChange('3')"
                                          label="3 years"
                                          value="3"
                                        ></v-radio>
                                        <v-radio
                                          @change="onInitialTermChange('5')"
                                          label="5 years"
                                          value="5"
                                        ></v-radio>
                                      </v-flex>
                                      <v-flex sm4>
                                        <v-radio
                                          @change="onInitialTermChange('5')"
                                          label="5 years"
                                          value="5"
                                          v-if="$vuetify.breakpoint.xs"
                                        ></v-radio>
                                        <v-radio
                                          @change="onInitialTermChange('7')"
                                          label="7 years"
                                          value="7"
                                        ></v-radio>
                                        <v-radio
                                          @change="onInitialTermChange('10')"
                                          label="10 years"
                                          value="10"
                                        ></v-radio>
                                      </v-flex>
                                    </v-layout>
                                  </v-radio-group>
                                </v-flex>

                                <v-flex md4 xs6>
                                  <h3
                                    :class="{
                                      title: $vuetify.breakpoint.smAndUp,
                                      'body-2': $vuetify.breakpoint.xs,
                                      'font-weight-bold text-xs-left black--text': true
                                    }"
                                  >
                                    Rate type
                                    <v-dialog
                                      v-model="rateTypeDialog"
                                      width="500"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="dark" v-on="on"
                                          >info</v-icon
                                        >
                                      </template>

                                      <v-card>
                                        <v-card-title
                                          class="title grey lighten-2 px-2 py-0"
                                          primary-title
                                        >
                                          Rate type
                                          <v-btn
                                            class="closeModalBtn"
                                            icon
                                            @click="rateTypeDialog = false"
                                            light
                                          >
                                            <v-icon>close</v-icon>
                                          </v-btn>
                                        </v-card-title>

                                        <v-card-text class="text-xs-left">
                                          <p>
                                            A fixed rate is where the lender
                                            agrees to keep the interest rate the
                                            same for the duration of the initial
                                            term meaning your monthly payments
                                            stay the same.
                                          </p>
                                          <p>
                                            A variable rate is where the lender
                                            can change the interest rate at any
                                            time and consequently your monthly
                                            payments could fluctuate.
                                          </p>
                                          <p>
                                            A tracker rate is a type of variable
                                            rate which follows the movement of a
                                            fixed economic indicator – typically
                                            the Bank of England’s base interest
                                            rate. The tracker rate is generally
                                            set high than the fixed economic
                                            indicator it’s tracking.
                                          </p>
                                        </v-card-text>
                                      </v-card>
                                    </v-dialog>
                                  </h3>
                                  <v-layout row wrap class="justify-center">
                                    <v-flex xs12>
                                      <v-checkbox
                                        v-model="search.filter.Variable"
                                        label="Variable"
                                        class="pt-0 mb-0"
                                        dense
                                        hide-details
                                        v-on:change="
                                          $ga.event(
                                            'MortgageSearchFilterForm',
                                            'Select',
                                            'RateTypeVariableField',
                                            search.filter.Variable
                                          )
                                        "
                                      ></v-checkbox>
                                    </v-flex>

                                    <v-flex xs12>
                                      <v-checkbox
                                        v-model="search.filter.Fixed"
                                        label="Fixed"
                                        class="pt-0 mt-0"
                                        dense
                                        hide-details
                                        v-on:change="
                                          $ga.event(
                                            'MortgageSearchFilterForm',
                                            'Select',
                                            'RateTypeFixedField',
                                            search.filter.Fixed
                                          )
                                        "
                                      ></v-checkbox>
                                    </v-flex>

                                    <v-flex xs12>
                                      <v-checkbox
                                        v-model="search.filter.Tracker"
                                        label="Tracker"
                                        class="mt-0"
                                        dense
                                        hide-details
                                        v-on:change="
                                          $ga.event(
                                            'MortgageSearchFilterForm',
                                            'Select',
                                            'RateTypeTrackerField',
                                            search.filter.Tracker
                                          )
                                        "
                                      ></v-checkbox>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>

                                <v-flex md4 xs6>
                                  <h3
                                    :class="{
                                      title: $vuetify.breakpoint.smAndUp,
                                      'body-2': $vuetify.breakpoint.xs,
                                      'font-weight-bold text-xs-left black--text': true
                                    }"
                                  >
                                    Lender fees
                                    <v-dialog
                                      v-model="lenderFeesDialog"
                                      width="500"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="dark" v-on="on"
                                          >info</v-icon
                                        >
                                      </template>

                                      <v-card>
                                        <v-card-title
                                          class="title grey lighten-2 px-2 py-0"
                                          primary-title
                                        >
                                          Lender fees
                                          <v-btn
                                            class="closeModalBtn"
                                            icon
                                            @click="lenderFeesDialog = false"
                                            light
                                          >
                                            <v-icon>close</v-icon>
                                          </v-btn>
                                        </v-card-title>

                                        <v-card-text class="text-xs-left">
                                          <p>
                                            There are various types of fees you
                                            might need to pay to the lender when
                                            you take out a mortgage such as
                                            arrangement, valuation and legal
                                            fees. The fees can vary and not all
                                            mortgage products have them.
                                          </p>
                                          <p>
                                            Arrangement fee (also known as
                                            product or completion fee) is what
                                            you pay for the lender to administer
                                            / organise your mortgage.
                                          </p>
                                          <p>
                                            Valuation fees cover the cost of the
                                            survey that the lender carries out
                                            to confirm the property valuation.
                                          </p>
                                          <p>
                                            Legal fees (also known as a
                                            conveyancing fee) are paid to a
                                            solicitor to cover the cost of all
                                            the legal work associated with
                                            purchasing a home.
                                          </p>
                                        </v-card-text>
                                      </v-card>
                                    </v-dialog>
                                  </h3>
                                  <v-radio-group
                                    class="justify-start"
                                    v-model="search.filter.lenderFees"
                                    :mandatory="false"
                                  >
                                    <v-radio
                                      name="lender_feeds"
                                      label="Yes"
                                      value="Yes"
                                    ></v-radio>
                                    <v-radio
                                      name="lender_feeds"
                                      label="No"
                                      value="No"
                                    ></v-radio>
                                  </v-radio-group>
                                </v-flex>

                                <v-flex md4 xs12>
                                  <h3
                                    :class="{
                                      title: $vuetify.breakpoint.smAndUp,
                                      'body-2': $vuetify.breakpoint.xs,
                                      'font-weight-bold text-xs-left black--text': true
                                    }"
                                  >
                                    Early repayment fees
                                    <v-dialog
                                      v-model="earlyRepaymentFeesDialog"
                                      width="500"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-icon color="dark" v-on="on"
                                          >info</v-icon
                                        >
                                      </template>

                                      <v-card>
                                        <v-card-title
                                          class="title grey lighten-2 px-2 py-0"
                                          primary-title
                                        >
                                          Early repayment fees
                                          <v-btn
                                            class="closeModalBtn"
                                            icon
                                            @click="
                                              earlyRepaymentFeesDialog = false
                                            "
                                            light
                                          >
                                            <v-icon>close</v-icon>
                                          </v-btn>
                                        </v-card-title>

                                        <v-card-text class="text-xs-left">
                                          Early repayment charges are penalty
                                          fees the lender charges you if you
                                          decide to pay off your mortgage early.
                                          The charges can vary and not all
                                          mortgage products have them.
                                        </v-card-text>
                                      </v-card>
                                    </v-dialog>
                                  </h3>
                                  <v-radio-group
                                    class="justify-start"
                                    v-model="search.filter.earlyRepaymentFees"
                                    :mandatory="false"
                                  >
                                    <v-radio
                                      name="early_repayment_fees"
                                      label="Yes"
                                      value="Yes"
                                    ></v-radio>
                                    <v-radio
                                      name="early_repayment_fees"
                                      label="No"
                                      value="No"
                                    ></v-radio>
                                  </v-radio-group>
                                </v-flex>

                                <!-- ---------------------------------------------------------------------- -->
                              </v-layout>
                            </v-container>
                            <small>
                              * Leaving the lender fees and repayment fees in
                              and selecting all the rate types allows you to
                              compare the widest selection of products
                            </small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              @click="filterDialogReset"
                              class="btn-control btn-reset mr-4"
                              dark
                              >Reset</v-btn
                            >
                            <v-btn
                              color="primary"
                              class="btn-control"
                              dark
                              @click="filterDialogSave"
                              >Save</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex lg12 md6 sm6 xs6>
                      <v-btn color="primary" @click="searchMortgages"
                        >Search</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout row wrap class="pl-2" v-if="$vuetify.breakpoint.lgAndUp">
            <v-flex xs12 class="text-xs-left">
              <p
                class="mb-0"
                v-if="
                  search.filter.NewLoanAmount / search.filter.CurrentValue >
                    0.01 &&
                    search.filter.NewLoanAmount / search.filter.CurrentValue <
                      1.05
                "
              >
                This makes your LTV (loan-to-value)
                <b>
                  {{
                    Math.round(
                      ((search.filter.NewLoanAmount * 100) /
                        search.filter.CurrentValue) *
                        10
                    ) / 10
                  }}%
                </b>
                <v-dialog v-model="LTVDialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-icon color="dark" v-on="on" small>info</v-icon>
                  </template>

                  <v-card>
                    <v-card-title
                      class="title grey lighten-2 px-2 py-0"
                      primary-title
                    >
                      LTV (loan-to-value)
                      <v-btn
                        class="closeModalBtn"
                        icon
                        @click="LTVDialog = false"
                        light
                      >
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-card-text class="text-xs-left">
                      <p>
                        The loan to value (LTV) ratio is the size of the
                        borrowing amount in relation to the current value of the
                        property to be mortgaged. It is given as a percentage.
                      </p>
                      <p>
                        For example, a property currently worth &pound;200,000
                        with a deposit/equity ownership amount of &pound;38,000
                        and a borrowing amount of &pound;162,000 would have an
                        LTV of 81%.
                      </p>
                      <p>
                        LTV be worked out by dividing the borrowing amount by
                        the property value and multiplying the answer by 100.
                      </p>
                      <ul class="ltv">
                        <li>&pound;162,000 / &pound;200,000 = 0.81</li>
                        <li>0.81 x 100 = 81%</li>
                      </ul>
                      <p>There are two variables that impact LTV:</p>
                      <ul class="ltv">
                        <li>Property value</li>
                        <li>Deposit/equity ownership amount</li>
                      </ul>
                      <p>
                        Let’s carry on from the example above. Two years later,
                        the property has increased in value and is now worth
                        &pound;210,000. Some of the loan capital has been paid
                        off, so the deposit/equity ownership has increased to
                        &pound;45,000 and the borrowing amount has decreased to
                        &pound;155,000. The LTV has dropped from 81% to 74% and
                        generally, the lower the LTV, the cheaper the mortgage
                        products available.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </p>
              <p
                v-if="
                  search.filter.NewLoanAmount / search.filter.CurrentValue <=
                    0.01 ||
                    search.filter.NewLoanAmount / search.filter.CurrentValue >=
                      1.05
                "
              >
                Enter values above for 'Borrowing amount' and 'Property value'
                to see your LTV (loan-to-value)
              </p>
            </v-flex>
          </v-layout>
          <div
            v-if="show === 'showSpinner'"
            class="loader"
            align="center"
            style="min-height:500px; padding-top:150px;background-color:lightgrey"
          >
            <p>
              Please wait whilst we search the whole of the mortgage market.
            </p>
            <p>This may take up to 30 seconds.</p>
            <circle-loader color="#49D586" />
          </div>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex
          lg11
          xs11
          class="white-dashboard round-container mt-0"
          v-if="show != 'showSpinner'"
        >
          <v-data-table
            v-if="show == 'showMain'"
            :headers="headers"
            :items="mortgages"
            :loading="false"
            item-key="provider"
            :class="{
              mobile: $vuetify.breakpoint.xs,
              'elevation-0 product-table': true
            }"
            :search="filters"
            :custom-filter="customFilter"
            :pagination.sync="pagination"
          >
            <!--
              TODO add this in when loading from database
            -->
            <template v-slot:items="props">
              <tr
                class="md-table"
                @click="
                  $ga.event('MortgageSearchFormResult', 'Click', 'RowClick');
                  rowSelected(props.index);
                "
              >
                <td class="text-xs-left">
                  <v-layout align-center>
                    <img width="50px" :src="props.item.img" class="mr-4" />
                    <span>{{ props.item.provider }}</span>
                    <v-spacer></v-spacer>
                  </v-layout>
                </td>
                <td class="text-xs-left">{{ props.item.monthlyPayment }}</td>
                <td class="text-xs-left">{{ props.item.initialRate }}%</td>
                <td class="text-xs-left">{{ props.item.lenderFees }}</td>
                <td class="text-xs-left">{{ props.item.APRC }}%</td>
                <td class="text-xs-left">{{ props.item.initialTermCost }}</td>
                <td class="text-xs-left">
                  <v-btn
                    color="primary"
                    block
                    @click="showMortgageDetails(props)"
                    style="height: 30px;"
                    >More details</v-btn
                  >
                </td>
              </tr>
              <tr
                class="sm-table"
                @click="
                  $ga.event('MortgageSearchFormResult', 'Click', 'RowClick');
                  rowSelected(props.index);
                "
              >
                <td class="text-xs-left" style="width:30%; border: unset;">
                  <v-layout wrap justify-space-between style="height: 100%">
                    <v-flex class="text-xs-left" sm12>{{
                      props.item.provider
                    }}</v-flex>
                    <v-flex sm12 class="mt-auto align-self-end">
                      <img width="100px" :src="props.item.img" />
                    </v-flex>
                  </v-layout>
                </td>
                <td class="text-xs-left" style="width:70%; border: unset">
                  <v-layout row wrap>
                    <v-flex sm12>
                      <v-layout row>
                        <v-flex sm4>
                          <div class="caption">Monthly payment</div>
                          <p class="mb-0">{{ props.item.monthlyPayment }}</p>
                        </v-flex>
                        <v-flex sm4>
                          <div class="caption">Initial term cost</div>
                          {{ props.item.initialTermCost }}
                        </v-flex>
                        <v-flex sm4>
                          <div class="caption">APRC</div>
                          {{ props.item.APRC }}%
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex sm12>
                      <v-layout row>
                        <v-flex sm4>
                          <div class="caption">Lender fee</div>
                          {{ props.item.lenderFees }}
                        </v-flex>
                        <v-flex sm4>
                          <div class="caption">Initial rate</div>
                          {{ props.item.initialRate }}%
                        </v-flex>
                        <v-flex sm4>
                          <v-btn
                            color="primary ml-0 body-2"
                            @click="showMortgageDetails(props)"
                            style="height: 30px;"
                            >More details</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </td>
              </tr>
              <tr
                :class="
                  'mobile-table' +
                    (props.index === selectedRow && props.expanded
                      ? 'selected-row'
                      : '')
                "
                v-if="$vuetify.breakpoint.xs"
                @click="
                  $ga.event('MortgageSearchFormResult', 'Click', 'RowClick');
                  rowSelected(props.index);
                "
              >
                <td class="text-xs-left" style="width: 100%">
                  <v-layout justify-space-between align-center>
                    <v-flex xs12>
                      <img width="50px" :src="props.item.img" />
                    </v-flex>
                    <v-flex class="text-xs-left" xs12>{{
                      props.item.provider
                    }}</v-flex>
                  </v-layout>
                </td>
                <td class="text-xs-left">
                  <div class="caption">Monthly payment</div>
                  <p class="mb-0">{{ props.item.monthlyPayment }}</p>
                </td>
                <td class="text-xs-left">
                  <div class="caption">Initial rate</div>
                  {{ props.item.initialRate }}%
                </td>
                <td class="text-xs-left">
                  <div class="caption">Lender fee</div>
                  {{ props.item.lenderFees }}
                </td>
                <td class="text-xs-left">
                  <div class="caption">APRC</div>
                  {{ props.item.APRC }}%
                </td>
                <td class="text-xs-left">
                  <div class="caption">Initial term cost</div>
                  {{ props.item.initialTermCost }}
                </td>
                <td class="text-xs-left">
                  <v-btn
                    color="primary"
                    block
                    @click="showMortgageDetails(props)"
                    style="height: 30px;"
                    >More details</v-btn
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-form>

    <v-dialog
      v-model="dialog"
      transition="dialog-right-transition"
      max-width="900"
    >
      <v-card class="pa-1">
        <v-btn
          icon
          class="close-icon my-0 mr-0"
          @click.native="
            dialog = false;
            $ga.event(
              'ViewMortgageDetails',
              'Click',
              'ViewMortgageDetailsCloseBtn'
            );
          "
          light
        >
          <v-icon color="grey">mdi-close-circle-outline</v-icon>
        </v-btn>
        <!-- TODO: add support for saving a product to the clients
        -->
        <v-card-title primary-title class="pt-0">
          <div>
            <v-container grid-list-md class="pt-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout
                    row
                    wrap
                    align-center
                    justify-start
                    fill-height
                    class="mb-4 mt-3"
                  >
                    <v-flex sm4 xs12>
                      <img :src="selectedItem.img" />
                    </v-flex>
                    <v-flex sm8 xs12>
                      <p class="mb-0 display-1 font-weight-black">
                        {{ selectedItem.provider }}
                      </p>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-layout justify-center v-if="$vuetify.breakpoint.xs">
                    <router-link
                      :to="{
                        name: 'mortgageIntroduction',
                        params: { selectedItem },
                        query: { direct: 'false' }
                      }"
                      tag="span"
                    >
                      <v-btn
                        color="primary"
                        @click="
                          $ga.event(
                            'ViewMortgageDetails',
                            'Click',
                            'FindOutMoreBtn'
                          )
                        "
                        >Talk to mortgage advisor</v-btn
                      >
                    </router-link>
                  </v-layout>
                  <v-layout row wrap class="mt-4 mb-3">
                    <v-flex sm2 xs6>
                      <div class="rates-r">APRC</div>
                      <div class="rates-l">{{ selectedItem.APRC }}%</div>
                    </v-flex>
                    <v-flex sm2 xs6>
                      <div class="rates-r">Lender fees</div>
                      <div class="rates-l">{{ selectedItem.lenderFees }}</div>
                    </v-flex>
                    <v-flex sm2 xs6>
                      <div class="rates-r">Interest rate</div>
                      <div class="rates-l">{{ selectedItem.initialRate }}%</div>
                    </v-flex>
                    <v-flex sm2 xs6>
                      <div class="rates-r">Total cost</div>
                      <div class="rates-l">{{ selectedItem.totalCost }}</div>
                    </v-flex>
                    <v-flex sm2 xs6>
                      <div class="rates-r">Cost per month</div>
                      <div class="rates-l">
                        {{ selectedItem.monthlyPayment }}
                      </div>
                    </v-flex>
                    <v-flex sm2 xs6>
                      <div class="rates-r">Initial term cost</div>
                      <div class="rates-l">
                        {{ selectedItem.initialTermCost }}
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider class="px-4"></v-divider>
            <!-- TODO put in product type -->
            <div class="mt-4 text-xs-left">
              <strong>Representative example:</strong>
              {{ selectedItem.representativeExample }}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <router-link
            v-if="$vuetify.breakpoint.smAndUp"
            :to="{
              name: 'mortgageIntroduction',
              params: { selectedItem },
              query: { direct: 'false' }
            }"
            tag="span"
          >
            <v-btn
              color="primary"
              @click="
                $ga.event('ViewMortgageDetails', 'Click', 'FindOutMoreBtn')
              "
              >Talk to mortgage advisor</v-btn
            >
          </router-link>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./MortgageSearch.js"></script>
<style lang="scss" src="./MortgageSearch.scss"></style>
