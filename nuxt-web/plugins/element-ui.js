import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import dayjs from 'dayjs'
import SocialSharing from 'vue-social-sharing'
// 自定义颜色
import '~/assets/scss/element-variables.scss'

Vue.prototype.$dayjs = dayjs
Vue.use(Element, { locale })
Vue.use(SocialSharing)
