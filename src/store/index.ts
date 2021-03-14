import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex); // 把store绑定到vue。prototype.$store=store 初始化时
const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    //读数据
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]; //是record的集合
    },
    //创数据
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      // this.recordList && this.recordList.push(record2);
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    //存数据
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    //读数据
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    }
    ,
    //创建标签
    createTag(state, name: string) {
      //由于this.data=[{id:'1',name:'1'},{id:'2',name:'2'}] 使用map得到tag[]中的name集合
      state.createTagError = null;  //置空，防止下次还会用
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        // window.alert('标签重复了');
        state.createTagError = new Error('tag name duplicated');
        return;
      } else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        store.commit('saveTags');
      }
    },
    //保存标签
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    //查 标签
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];//不用find太新，用filter
    },
    //删除标签
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);//删除找到的数据
        store.commit('saveTags');//保存一下
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    //更新修改标签
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id); //得到所有id
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {//判断标签名是否重复
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
  }
});
export default store;
