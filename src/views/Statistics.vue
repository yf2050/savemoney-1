<template>
  <Layout>
    <Tabs class-pre-fix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-pre-fix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>
    <ol v-for="(group,index) in result" :key="index">
      <li>
        <h3 class="title">{{ beautify(group.title) }}</h3>
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


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constant/intervalList';
import recordTypeList from '@/constant/recordTypeList';
import dayjs from 'dayjs';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  beautify(string: string) { //这个string是ISO 8601转换后的
    const day=dayjs(string)
    const now=dayjs()
    if (day.isSame(now, 'day')) {
      return '今天'; //now是当天日期
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'; //subtract 前一天
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'; //subtract前两天
    } else if(day.isSame(now,'year')){
      return day.format('M月D日') //判断当年
    }
    else{
      return day.format('YYYY年M月D日'); //其余日期
    }
  }

  //   const x = new Date(Date.parse(string));
  //   console.log(x);
  //   const y = x.getFullYear();
  //   const m = x.getMonth();
  //   const d = x.getDay();
  //   const now = new Date();
  //   if (now.getFullYear() === y && now.getMonth() === m && now.getDay() === d) {
  //     return '今天';
  //   }
  //   return string;
  // }

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

