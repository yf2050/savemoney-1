<template>
  <Layout>
    <Tabs class-pre-fix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-pre-fix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <ol v-for="(group,index) in result" :key="index">
      <li>
        <h3 class="title">{{ group.title }}</h3>
        <ol v-for="item in group.items" :key="item.id">
          <li class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>

  </Layout>
</template>

<style lang="scss" scoped>
%item {
  min-height: 40px;
  padding: 6px 17px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
  background: #E5E5E5;
}

.record {
  @extend %item;
  background: #FFFFFF;


  .notes {
    margin-right: auto;
    margin-left: 13px;
    color: #999999;
  }
}

::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;
    }

    &::after {
      display: none;
    }
  }

  .interval-tabs-item {
    //height: 48px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constant/intervalList';
import recordTypeList from '@/constant/recordTypeList';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) { //tag是数组 要显示数据
    return tags.length === 0 ? '空' : tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string; items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};//定义空对象 key:value

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};//左边是key 右边value
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;
    }

    &::after {
      display: none;
    }
  }

  .interval-tabs-item {
    //height: 48px;
  }
}
</style>
