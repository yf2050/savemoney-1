<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
  background-color: white;
}
#app{
  max-width: 500px;
  margin: 0 auto;
}
</style>
