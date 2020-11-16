<template>
  <div>
    <div>
      <ul class="types">
        <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
        <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component //告诉下面是个vue组件，这样type自动处理成data
export default class Types extends Vue {
  type = '-'; //赋值属性默认变成实例属性，成为data
  selectType(type: string) {
    if (type !== '-' && type !== '+') { //type只能是'+' '-'
      throw new Error('type is unknown');
    }
    this.type = type;
  }
}

</script>
<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
