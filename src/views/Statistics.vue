<template>
  <Layout>
    <!--    <Types :value.sync='yyy' class-pre-fix="zzz"/>-->
    <Tabs class-pre-fix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-pre-fix="interval" :data-source="intervalList" :value.sync="interval"/>
    {{ type }}{{ interval }}
  </Layout>
</template>

<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constant/intervalList';
import recordTypeList from '@/constant/recordTypeList';

@Component({
  components: {Tabs, Types},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;
  }

  &::after {
    display: none;
  }
}
</style>
