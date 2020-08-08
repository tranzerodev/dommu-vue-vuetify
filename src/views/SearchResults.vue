<template>
  <div class="dashboard">
    <panel-card id="panelTitle" title="Results">
      <template v-slot></template>
    </panel-card>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  name: "panel",
  components: {
    "panel-card": Panel
  }
};
</script>
