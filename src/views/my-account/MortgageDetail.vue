<template>
  <div class="dashboard">
    <panel-card id="panelTitle" title="Mortgage details" sizes="xs12 sm10 md8">
      <template v-slot>
        <v-btn color="primary" to="/my-account/mortgage-introduction"
          >Mortgage Introduction</v-btn
        >
      </template>
    </panel-card>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  },
  data() {
    return {};
  },
  mounted() {
    //this.fillData();
  },
  created() {
    this.$store.dispatch("setInMyAccount", true);
  },
  methods: {}
};
</script>
<style>
.small {
  max-width: 450px;
  margin: 10px auto;
}
</style>
