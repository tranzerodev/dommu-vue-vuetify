<template>
  <div class="about">
    <p>Credit Report</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  }
};
</script>
