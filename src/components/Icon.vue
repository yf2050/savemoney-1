<template>
  <svg class="icon" @click="$emit('click',$event)">
    <use v-bind:xlink:href="'#'+name"/>
    //其中v-bind可省略，直接用冒号
  </svg>
</template>

<script lang="ts">
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ['name'], //添加外部属性 给Icon加上name
  name: 'Icon'
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
