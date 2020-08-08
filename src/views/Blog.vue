<template>
  <div class="about">
    <p>Blog</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", false);
  }
};
</script>
