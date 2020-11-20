<template>
  <div class="about">
    <h1>This is an about page</h1>
    <simplebar class="scroll-bar" data-simplebar-auto-hide="false">
      <div v-for="n in 10" :key="n">Example content</div>
    </simplebar>
  </div>
</template>
<script>
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  name: "About",
  components: {
    simplebar
  }
};
</script>
<style lang="scss" scoped>
.scroll-bar {
  width: 300px;
  height: 100px;
}
</style>
