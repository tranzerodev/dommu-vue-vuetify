<template>
  <div class="dashboard text-xs-left" id="dash">
    <panel-card id="panelTitle" title="My Introductions" sizes="xs12 sm10 md12">
      <template v-slot>
        <v-layout column style="margin:12px;">
          <v-flex xs12>
            <h5>View and progress your introductions below</h5>
          </v-flex>

          <v-flex xs12>
            <p>Filter By:</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap style="margin:12px;">
          <v-flex xs3 style="padding:7px;">
            <v-select label="Lender"></v-select>
          </v-flex>

          <v-flex xs3 style="padding:7px;">
            <v-select label="Broker"></v-select>
          </v-flex>

          <v-flex xs3 style="padding:7px;">
            <v-select label="Property"></v-select>
          </v-flex>

          <v-flex xs3 style="padding:7px;">
            <v-select label="Status"></v-select>
          </v-flex>
        </v-layout>
        <div
          v-if="show == 'showSpinner'"
          class="loader"
          align="center"
          style="min-height:500px; padding-top:150px;background-color:lightgrey"
        >
          <circle-loader color="#49D586" />
        </div>

        <div v-if="show != 'showSpinner'" style="background-color:white">
          <v-layout column wrap>
            <v-flex xs12>
              <v-card style="margin:12px;">
                <v-layout row wrap style="">
                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Lender: HSBC</b></p>
                        <p>Product</p>
                        <p>Loan Amount</p>
                        <p>Cost per month</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Broker: Coreco</b></p>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Phone</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Rate Broker</b></p>
                        <p>Status: dip issued</p>
                        <p>Casa Fi Fact Find</p>
                        <p>Download</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-card style="margin:12px;">
                <v-layout row wrap style="">
                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Lender: HSBC</b></p>
                        <p>Product</p>
                        <p>Loan Amount</p>
                        <p>Cost per month</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Broker: John Charcole</b></p>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Phone</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm4>
                    <v-card flat>
                      <v-card-text class="ma-0 pa-1">
                        <p><b>Rate Broker</b></p>
                        <p>Status: In progress</p>
                        <p>Casa Fi Fact Find</p>
                        <p>Download</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </div>

        <!---
        <v-data-table
          v-if="show=='showMain'"
          :headers="headers"
          :items="mortgages"
          :loading="false"
          :expand="expand"
          item-key="provider"
          class="elevation-1"
          :search="filters"
          :custom-filter="customFilter"
          :pagination="pagination"
        >


        </v-data-table>
          -->
      </template>
    </panel-card>
  </div>
</template>

<script>
import {
  // TODO do a look up on these too
  //getLenderName,
  //getLenderUrl,
  getLenderImage
} from "@/lenderMapping.js";

import Vue from "vue";
import Panel from "@/components/Panel.vue";
import MultiFiltersPlugin from "../../plugins/MultiFilters";
import { CircleLoader } from "@saeris/vue-spinners";

Vue.use(MultiFiltersPlugin);

export default {
  name: "panel",
  components: {
    "panel-card": Panel,
    "circle-loader": CircleLoader
  },
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  }
};
</script>
