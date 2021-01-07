<template>
<!--  用$emit('click',$event),大Bbutton被点击触发小button的click事件-->
  <button class="button" @click="$emit('click',$event)">
    <slot/>
<!--    用插槽 提供插槽内容-->
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>

.button {
  color: white;
  background-color: #ff0000;
  border: none;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 4px;

  &-wrapper {
    text-align: center;
    margin-top: 44-16px;
    padding: 16px;
  }
}
</style>
