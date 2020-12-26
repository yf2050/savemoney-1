<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync='record.type'/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';

// var record = {
//   tags: ['衣', '食'],
//   notes: '备注',
//   type: '+',
//   number: '255'
// };

const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]'); //是record的集合
window.localStorage.version = '0.0.1';
type Record = { //先声明Recode类型
  tags: string[];
  notes: string;
  type: string;
  amount: number;  //数据类型 string | object
  createdAt?: Date; //类 是object的划分 这里也叫构造函数
}
@Component({
  components: {NumberPad, Types, Notes, Tags}
}) //components不能写在下面，不然相当于data了
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '用'];
  recordList: Record[] = recordList; //是record的集合
  record: Record = {tags: [], notes: '', type: '+', amount: 10};

  // onUpdateAmount(value: string) {
  //   this.record.amount = parseFloat(value);
  // }

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // onUpdateType(value: string) {
  //   this.record.type = value;
  // }

  saveRecord() {
    //深拷贝 由于是对象，直接push会覆盖，生成一个完全一样的不同对象
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
    //localStorage.set('recordList',JSON.stringify(this.recordList)) //把recordList放在localStorage中，然后要进行JSON.stringify序列化，这种方法不是全局不好
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
