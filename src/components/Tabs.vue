<template>
  <div>
    <ul class="tabs">
      <li v-for="item in dataSource"
          :key="item.value"
          @click="select(item)"
          :class="liClass(item)"
          class="tabs-item"
          :style="{height:height}"
      >{{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;//加上感叹号意思为不管有无初始值，子组件
  @Prop(String) classPreFix?: string;
  @Prop({type: String, default: '64px'}) height!: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPreFix + '-tabs-item']: this.classPreFix,
      selected: item.value === this.value
    };
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #f9db60;
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
    width: 50%;
    //height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      transform: translate(50%,0);
      bottom: 2px;
      left: 0;
      width: 50%;
      height: 3px;
      background: #333;
    }
  }
}
</style>
