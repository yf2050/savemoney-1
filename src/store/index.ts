import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // 把store绑定到vue。prototype.$store=store 初始化时

const store = new Vuex.Store({});
export default store;
