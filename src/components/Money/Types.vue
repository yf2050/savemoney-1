<template>
  <div>
    <div>
      <ul class="types">
        <li :class="value === '-' && 'selected'" @click="selectType('-')">支出</li>
        <li :class="value === '+' && 'selected'" @click="selectType('+')">收入</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component //告诉下面是个vue组件，这样type自动处理成data
export default class Types extends Vue {

  // type = '-'; //赋值属性默认变成实例属性，成为data
  @Prop() readonly value!: string;//加上感叹号意思为不管有无初始值，子组件

  selectType(type: string) {
    if (type !== '-' && type !== '+') { //type只能是'+' '-'
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);

    // this.type = type;
    // this.$emit("update:value",this.type) 不建议这种，由于值在没变化时，重复点击还是会触发事件
    // @Watch('type')
    // onTypeChanged(value: string) {
    //   this.$emit('update:value', value);
    // }
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
