<template>
  <div class="dashboard">
    <panel-card
      id="panelTitle"
      title="My Profile Property Details"
      sizes="xs12 sm12 md12"
    >
      <template v-slot>
        <v-container fluid grid-list-sm class="std-table">
          <v-layout wrap>
            <v-flex d-flex xs12>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card flat class="sub-header">
                    <v-card-text class="ma-0 pa-0" justify-center align-center>
                      <h3>Property Details</h3>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="addressOnOneLine"
                    label="Address"
                    type="text"
                    v-model="registration.addressDetails.addressOnOneLine"
                    @change="onChange($event)"
                  />
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="postcode"
                    label="Postcode"
                    type="text"
                    v-model="registration.addressDetails.postcode"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="estimatedValuation"
                    label="Estimated valuation"
                    type="text"
                    v-model="registration.addressDetails.valuation"
                    @change="onChange($event)"
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.estimateChangeReason"
                    :items="estimateChangeReasonList"
                    item-value="value"
                    item-text="name"
                    id="estimateChangeReason"
                    label="Reason for Adjustment"
                    menu-props="auto"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="purchasePrice"
                    label="Purchase Price"
                    type="text"
                    v-model="registration.addressDetails.purchasePrice"
                    @change="onChange($event)"
                  ></v-text-field>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="purchaseDate"
                    label="Purchase Date"
                    type="text"
                    v-model="registration.addressDetails.dateMovedIn"
                    @change="onChange($event)"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.propertyType"
                    :items="propertyTypesList"
                    item-value="value"
                    item-text="name"
                    id="propertyType"
                    label="Property type"
                  ></v-select>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.flatFloor"
                    :items="flatFloorList"
                    item-value="value"
                    item-text="name"
                    id="flatFloor"
                    label="Flat Floor"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    :items="bedroomsList"
                    item-value="value"
                    item-text="name"
                    id="numberOfBedrooms"
                    label="Number of bedrooms"
                    v-model="registration.addressDetails.bedrooms"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    :items="receptionsList"
                    item-value="value"
                    item-text="name"
                    id="numberOfReceptions"
                    label="Number of reception rooms"
                    v-model="registration.addressDetails.receptions"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.tenure"
                    :items="tenureList"
                    item-value="value"
                    item-text="name"
                    id="tenure"
                    label="Tenure"
                  ></v-select>
                </v-flex>

                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    v-model="
                      registration.addressDetails.leaseholdYearsRemaining
                    "
                    id="leaseholdYearsRemaining"
                    label="Years remaining on lease"
                    type="text"
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.construction"
                    :items="constructionList"
                    item-value="value"
                    item-text="name"
                    id="construction"
                    label="Construction"
                  ></v-select>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="yearBuilt"
                    label="Year built"
                    type="text"
                    v-model="
                      registration.avmReportDetails[
                        'property-valuation-report-v2'
                      ]['year-built'][0]
                    "
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-select
                    v-model="registration.addressDetails.residency"
                    :items="residencyList"
                    item-value="value"
                    item-text="name"
                    id="residency"
                    label="Residency"
                  ></v-select>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4>
                  <v-text-field
                    id="floorArea"
                    label="Floor Area"
                    type="text"
                    v-model="
                      registration.avmReportDetails[
                        'property-valuation-report-v2'
                      ]['floor-area'][0]
                    "
                    @change="onChange($event)"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12 lg12 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md5 lg4></v-flex>
                <v-flex d-flex xs12 sm6 md5 lg4></v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex d-flex xs6 sm6 md6 lg6 xl6>
              <v-layout row wrap>
                <v-flex d-flex xs6 sm5 md3 lg2>
                  <v-btn class="std-btn" color="primary" @click="onClickSave()"
                    >Save Changes</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </panel-card>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/Panel.vue";
const clonedeep = require("lodash.clonedeep");
import {
  bedroomsList,
  receptionsList,
  propertyTypesList,
  estimateChangeReasonList,
  flatFloorList,
  tenureList,
  constructionList,
  residencyList
} from "@/data/propertyTypeLists.json";

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  },
  data() {
    return {
      registration: {
        // Note: have one object per screen and search
        personalDetails: {},
        addressDetails: {},
        mortgageDetails: {},
        jointDetails: {},
        employmentDetails: {},
        avmDetails: {},
        avmReportDetails: {}
      },
      search: null,
      bedroomsList,
      receptionsList,
      propertyTypesList,
      estimateChangeReasonList,
      flatFloorList,
      tenureList,
      constructionList,
      residencyList
    };
  },
  created() {
    this.fillData();
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {
    async onClickSave() {
      // save to vueState

      // overide filter selections and call a new search
      if (
        this.registration.addressDetails.valuation &&
        this.registration.addressDetails.valuation > 0 &&
        this.search.filter.CurrentValue !=
          this.registration.addressDetails.valuation
      ) {
        this.search.filter.CurrentValue = this.registration.addressDetails.valuation;
        this.$store.dispatch("setSearch", this.search);
      }

      this.$store.dispatch("setRegistration", this.registration);

      // save to DB
      try {
        const response = await AuthenticationService.registerPut({
          withCredentials: true,
          Signup: {
            cuid: this.$store.state.cuid,
            registration: JSON.stringify(this.$store.state.registration)
            // TODO: leave in for a bit as its a quick way to force the testing of a DB error
            //registration: this.$store.state.registration
          }
        });

        if (response.status == 200) {
          // alert the user
          this.$store.dispatch("setAlert", "Property Details saved");
        } else {
          this.$store.dispatch(
            "setErrorAlert",
            "There was a problem saving your changes to the database"
          );
        }
      } catch (error) {
        this.$store.dispatch(
          "setErrorAlert",
          "There was a problem saving your changes to the database"
        );
      }
    },
    fillData() {
      if (this.$store.state.registration) {
        this.registration = clonedeep(this.$store.state.registration);
      }
      if (this.$store.state.search) {
        this.search = clonedeep(this.$store.state.search);
      }
    }
  }
};
</script>
<style>
.text-xs-center {
  text-align: left !important;
}

.small {
  max-width: 450px;
  margin: 10px auto;
}
.dashboard {
  margin-top: 65px;
}
@media only screen and (max-width: 959px) {
  .dashboard {
    margin-top: 50px;
  }
}
.std-table input {
  width: 200px !important;
  min-width: 200px !important;
  padding: 5px;
}

.std-table .sub-header {
  background-color: transparent;
}

.std-table .sub-header h4 {
  padding-top: 1.5em;
}

.std-table .std-btn {
  margin: 0px;
  padding: 0px;
  padding-right: 3px;
  padding-left: 3px;
}
.std-divider-spacing {
  margin-top: 1.8em;
  padding-top: 0.8em;
}
</style>
