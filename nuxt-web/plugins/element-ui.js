import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import dayjs from 'dayjs'
import SocialSharing from 'vue-social-sharing'
import footer from '~/components/footer/Footer.vue'
import createBookmark from '~/components/dialog/createBookmark.vue'
// 自定义颜色
import '~/assets/scss/element-variables.scss'

Vue.prototype.$dayjs = dayjs
Vue.use(Element, { locale })
Vue.component('sq-footer', footer)
Vue.component('sq-bookmark', createBookmark)
Vue.use(SocialSharing)
