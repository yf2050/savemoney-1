import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

//進入頁面就滾動
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 10000);
  }, 0);
};

if (document.documentElement.clientWidth > 500) {
  const img = document.createElement('img');
  img.src = '/qrcode.png';
  img.style.position = 'absolute';
  img.style.right = '0';
  img.style.top = '50%';
  img.style.transform = 'translate(0,-50%)';
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
  img.style.width = '200px';
  document.body.appendChild(img);
  // window.alert('请使用手机打开本页面，以保证浏览效果');
}
