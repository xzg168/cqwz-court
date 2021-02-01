import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import "ant-design-vue/dist/antd.less";
import service from "./utils/request";
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$http = service;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
