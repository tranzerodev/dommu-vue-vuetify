<template>
  <div class="about">
    <p>My Searches</p>

    <a href="/my-account/mortgage-search">Mortgages Searches</a>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("setInMyAccount", true);
  }
};
</script>
