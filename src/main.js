// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import storage from './util/localStorage'
import './fonts/style.css'

Vue.use(Vuex);

Vue.prototype.$http = axios;
Vue.prototype.$storage = storage;

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
