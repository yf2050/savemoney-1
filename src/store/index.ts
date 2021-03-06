import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex); // 把store绑定到vue。prototype.$store=store 初始化时

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
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
  }
});
export default store;
