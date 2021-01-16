<template>
  <div>
    <div>
      <label class="notes">
        <span class="name">{{ fileName }}</span>
        <input type="text" :placeholder=placeholder v-model="value"/>
        <!--@input="x = $event.target.value" :value="x"-->
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value!: string;
  @Prop({required: true}) fileName!: string; //必须存在，感叹号意思不会为空
  @Prop() placeholder?: string; //?问号表示可以为空

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 16px;
  display: flex;
  align-items: center;

  > .name {
    padding: 0 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
