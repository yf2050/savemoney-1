<template>
  <nav>
    <router-link class="item" to="/money" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>

    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="labels"/>
      标签
    </router-link>

    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {name: 'Nav'}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  justify-content: space-around;
  font-size: 12px;

  > .item.selected {
    color: $color-highlight;
  }

  > .item {
    padding: 2px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    width: 32px;
    height: 32px;
  }


}
</style>