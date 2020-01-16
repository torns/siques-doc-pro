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
import myMixin from "./mixin"
import store from './store'
import './plugins/fontawesome.js';
import 'element-ui/lib/theme-chalk/display.css';
import "./filter"


Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.prototype.$dayjs = dayjs
Vue.use(animated)


new Vue({
  mixins: [myMixin],
  router,
  store,
  render: h => h(App)
}).$mount("#app");