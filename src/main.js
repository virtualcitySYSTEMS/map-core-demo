import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import './main.sass';

Vue.config.productionTip = false;
window.CESIUM_BASE_URL = '/node_modules/@vcmap/cesium/Source/';

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
