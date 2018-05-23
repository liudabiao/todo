// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import storage from './util/localStorage'
import infiniteScroll from  'vue-infinite-scroll'
import './fonts/style.css'

Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.prototype.$http = axios;
Vue.prototype.$storage = storage;
Vue.prototype.$format = function (fmt) {
  const date = new Date();
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    loginStatus: {
      nickname: '',
      username: ''
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state,info) {
      state.loginStatus = info;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted() {
    this.checklogin();
  },
  methods: {
    checklogin() {
      this.$http.get('/users/checklogin', (res) => {
        if(res.data.status === '0') {
          this.$store.commit('updateUserInfo', res.data.result);
        } else {
          this.$router.push('/');
        }
      })
    }
  },
  components: { App },
  template: '<App/>'
})
