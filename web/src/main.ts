import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./style.scss";
import './plugins/element.js'
import http from "./http.js"
import animated from "animate.css"
import "./directive"
import dayjs from "dayjs"
import mixin from "./mixin"

Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.prototype.$dayjs = dayjs
Vue.use(animated)


new Vue({
  mixins: [mixin],
  router,
  render: h => h(App)
}).$mount("#app");
