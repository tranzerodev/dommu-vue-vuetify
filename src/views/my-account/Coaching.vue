<template>
  <div class="about">
    <p>Coaching</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  }
};
</script>
