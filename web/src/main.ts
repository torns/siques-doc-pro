import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./style.scss";
import './plugins/element.js'
import http from "./http.js"
import animated from "animate.css"

Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.use(animated)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
