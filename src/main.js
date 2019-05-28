import Vue from 'vue';
import './plugins/axios';
import './plugins/vuetify';
import './plugins/loading';
import './plugins/lodash';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import './helpers/filters';
import { createProvider } from './vue-apollo';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
