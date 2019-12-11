import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

window.axios=axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app');
