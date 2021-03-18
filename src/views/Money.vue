<template>
  <Layout class-prefix="layout" :style="{height:h+'px'}">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <FormItem fileName="备注" placeholder="请输入备注" :value.sync="record.notes"/>
    <Tags @update:value="record.tags=$event"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/Notes.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import recordTypeList from '@/constant/recordTypeList';
import Tabs from '@/components/Tabs.vue';

window.localStorage.version = '0.0.1';

@Component({
  components: {Tabs, NumberPad, FormItem, Tags},
  //先读取
  created() {
    this.$store.commit('fetchRecords');
  }
}) //components不能写在下面，不然相当于data了
export default class Money extends Vue {
  record: RecordItem = {tags: [], notes: '', type: '+', amount: 10};
  recordTypeList = recordTypeList;
  h = document.body.clientHeight;

  get recordList() {
    return this.$store.state.recordList;
  }


  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes = ''; //此时更新也需要绑定
    }
    this.$store.commit('fetchTags');
  }

  //深拷贝 由于是对象，直接push会覆盖，生成一个完全一样的不同对象
  // const record2: RecordItem = JSON.parse(JSON.stringify(this.record));
  //localStorage.set('recordList',JSON.stringify(this.recordList)) //把recordList放在localStorage中，然后要进行JSON.stringify序列化，这种方法不是全局不好


  // @Watch('recordList') 无需watch
  // window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  // onRecordListChange() {
  //   recordListModel.saveRecords();
  // }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
