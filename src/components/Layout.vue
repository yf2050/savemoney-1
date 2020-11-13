<template>
  <div class="layout-wrapper" :class="classPrefix && `${ classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${ classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  props: ['classPrefix'] //定义一个属性contentClass动态绑定content
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
  flex-grow: 1
}
</style>
