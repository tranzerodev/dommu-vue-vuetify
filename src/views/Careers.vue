<template>
  <div class="about">
    <p>Careers</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", false);
  }
};
</script>
