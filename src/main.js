// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios/axios.js';
import qs from 'qs';
import echarts from 'echarts'
import VueGridLayout from "vue-grid-layout";
import $ from 'jquery'
import * as d3 from 'd3'
import VueDragZone from 'vue-drag-zone'


Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$d3 = d3;
// Vue.prototype.VueGridLayout = VueGridLayout;
Vue.use(ElementUI);
Vue.use(VueGridLayout);
Vue.use(VueDragZone)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
