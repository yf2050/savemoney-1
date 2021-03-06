import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex); // 把store绑定到vue。prototype.$store=store 初始化时

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  },
  mutations: {
    //读数据
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]; //是record的集合
    },
    //创数据
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      // this.recordList && this.recordList.push(record2);
      state.recordList?.push(record2);
      store.commit('saveRecords');
    },
    //存数据
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    //读数据
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    //创建标签
    createTag(state, name: string) {
      //由于this.data=[{id:'1',name:'1'},{id:'2',name:'2'}] 使用map得到tag[]中的name集合
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签重复了');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({id: id, name: name});
      store.commit('saveTags');
      window.alert('添加成功');
      return 'success';
    },
    //写数据
    saveTags(state) {window.localStorage.setItem('tagList', JSON.stringify(state.tagList));},
  }
});
export default store;
