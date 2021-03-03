<template>
  <div id="content">
    <section class="hero is-fullheight">
      <div class="hero-body">this is a test</div>
    </section>
  </div>
</template>
<script>
import { multipier, rotate } from "../components/Waves.vue";
export default {
  mounted() {
    multipier.value = 10;
    // rotate.value = Math.random() * 360;
  },
};
</script>
<style scoped></style>
