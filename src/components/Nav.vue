<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money"/>记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="labels"/>标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>统计
    </router-link>
  </div>
</template>

<script lang="ts">
// import x from '@/assets/icons/labels.svg'
// import y from '@/assets/icons/money.svg'
// console.log(x)
// console.log(y)

export default {name: 'Nav'}
</script>

<style lang="scss" scoped>
.nav {border: 1px solid red}
</style>