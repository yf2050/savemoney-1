<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="js">
import store from '@/store/index2'

export default {
  data() {
    return {
      store: store
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-hei;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f4f4f4;
}
</style>
