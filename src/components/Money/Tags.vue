<template>
  <div>
    <div class="tags">
      <div class="new">
        <button @click="createTag">新增标签</button>
      </div>
      <ul class="current">
        <li v-for="tag in dataSource" :key="tag" @click="toggle(tag)"
            :class="{selected:selectedTags.indexOf(tag)>=0}">{{ tag.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  // @Prop(Array)tags: string[]=[];//字符串数组,只有冒号后面是ts能识别的，前面的都是js
  @Prop() readonly dataSource: string[] | undefined;//不用赋值 给外部数据
  selectedTags: string[] = [];//被选中的

  toggle(tag: string) { //开关toggle
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else { this.selectedTags.push(tag);}
    this.$emit('update:value', this.selectedTags);
  }

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) {
      this.$emit('update:dataSource', [...this.dataSource, name]);
      //this.selectedTags.push(name as string) //不建议这样写，修改了内部属性,用readonly
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;

  .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #D9D9D9;
      background-color: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      //border-radius:$h/2;
      border-radius: $h/2;
      padding: 0 17px 0 18px;
      margin-right: 16px;
      margin-top: 4px;

      &.selected {
        background-color: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>
