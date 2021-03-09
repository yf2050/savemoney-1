<template>
  <Layout>
    <p>Statistics内容部分</p>
    <Types :value.sync='yyy' class-pre-fix="xxx"/>
  </Layout>
</template>

<script lang="ts">

import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {Types},
})

export default class Statistics extends Vue {
  yyy = '-';
}
</script>

<style lang="scss" scoped>
::v-deep li {
  background: white;

  &.selected {
    background: #c4c4c4;
  }

  &::after {
    display: none;
  }
}
</style>
