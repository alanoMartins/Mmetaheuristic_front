// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueKonva from 'vue-konva'
import VueResource from 'vue-resource'

Vue.config.productionTip = false


Vue.use(VueKonva)
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:9000/';
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
