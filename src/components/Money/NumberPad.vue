<template>
  <div>
    <div class="numberPad">
      <div class="output">{{ output || 0 }}</div>
      <div class="buttons">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click='ok' class="ok">确定</button>
        <button @click="inputContent" class="zero">0</button>
        <button @click="inputContent">.</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number; //这里传入的是number,接收的需要时外部传入的string
  output = this.value.toString();

  // output = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string; //不会为空，感叹号
    if (this.output.length === 16) {return;}
    if (this.output === '0') { //当显示是0时，判断输入是其他数
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return; //必须要有return
    }
    if (this.output.indexOf('.') >= 0) { //对点的判断
      if (input === '.') {return;}
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1); //字符串切割最后一位
    }
  }

  clear() {
    this.output = '0'; //清空默认值还是0
  }

  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number); //再对点击ok加上点击事件
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 30px;
    font-family: Consolas, monospace;
    padding: 4px 16px;
    text-align: right;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 60px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 60*2px;
        float: right;
        font-weight: 550;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #F2F2F2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(12) {
        //background: darken($bg, 4*6%);
        background: #f9db60;
      }
    }
  }
}
</style>
