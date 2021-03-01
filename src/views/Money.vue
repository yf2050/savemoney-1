<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync='record.type'/>
    <FormItem fileName="备注" placeholder="请输入备注" @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/Notes.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import store from '@/store/index2';

window.localStorage.version = '0.0.1';

@Component({
  components: {NumberPad, Types, FormItem, Tags}
}) //components不能写在下面，不然相当于data了
export default class Money extends Vue {
  tags = store.tagList;
  recordList = store.recordList; //是record的集合
  record: RecordItem = {tags: [], notes: '', type: '+', amount: 10};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    store.createRecord(this.record);
    //深拷贝 由于是对象，直接push会覆盖，生成一个完全一样的不同对象
    // const record2: RecordItem = JSON.parse(JSON.stringify(this.record));
    //localStorage.set('recordList',JSON.stringify(this.recordList)) //把recordList放在localStorage中，然后要进行JSON.stringify序列化，这种方法不是全局不好
  }

  // @Watch('recordList') 无需watch
  // window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  // onRecordListChange() {
  //   recordListModel.save();
  // }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
