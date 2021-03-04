import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // 把store绑定到vue。prototype.$store=store 初始化时

const store = new Vuex.Store({
  state: {  //data
    count: 0
  },
  mutations: { //methods
    increment(state, n: number) {
      state.count += n;
    }
  }
});

console.log(store.state.count); //0
store.commit('increment', 10);
console.log(store.state.count);//10
export default store;
