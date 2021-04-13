<template>
  <Layout>
    <Tabs class-pre-fix="type" :data-source="recordTypeList" :value.sync="type"/>
    <!--    <Tabs class-pre-fix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>-->
   <div v-if="groupList.length>0">
    <ol  v-for="(group,index) in groupList" :key="index">
      <li>
        <h3 class="title">{{ beautify(group.title) }}
          <span> ￥{{ group.total }}</span>
        </h3>
        <ol v-for="item in group.items" :key="item.id">
          <li class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
   </div>
    <div v-else class="noResult">目前没有添加任何记录</div>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constant/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  // intervalList = intervalList;
  recordTypeList = recordTypeList;

  beautify(string: string) { //这个string是ISO 8601转换后的
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天'; //now是当天日期
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'; //subtract 前一天
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'; //subtract前两天
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日'); //判断当年
    } else {
      return day.format('YYYY年M月D日'); //其余日期
    }
  }

  tagString(tags: Tag[]) { //tag是数组 要显示数据
    return tags.length === 0 ? '空' : tags.map(item => item.name).join('，');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(x => x.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    type Result = { title: string; total?: number; items: RecordItem[] }[]
    if (newList.length === 0) {return [] as Result;} //为空直接返回空
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];  //当前元素
      const last = result[result.length - 1]; //结果的最后一个对像
      if (dayjs(current.createdAt).isSame(last.title, 'day')) {
        last.items.push(current);  //判断当前的时间是否和最后一个一致，一致就push到items中
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]}); //否则就在x后面加上新的title
      }
    }
    result.map(x => {x.total = x.items.reduce((sum, item) => sum + item.amount, 0);});
    return result;
  }

  created() {
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
    background: #c4c4c4;

    &.selected {
      background: #f9db60;
    }

    &::after {
      display: none;
    }
  }

  .interval-tabs-item {
    //height: 48px;
  }
}
.noResult{
  padding: 16px;
  text-align: center;
}
</style>

