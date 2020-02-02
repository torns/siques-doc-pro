import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import SocialSharing from 'vue-social-sharing'
import footer from '~/components/footer/Footer.vue'
import createBookmark from '~/components/dialog/createBookmark.vue'
import leaderboard from '~/components/subgroup/leaderboard.vue'
import likebutton from '~/components/subgroup/likebutton.vue'
import '~/assets/scss/element-variables.scss'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 自定义颜色

Vue.prototype.$dayjs = dayjs
Vue.use(Element, { locale })
Vue.component('sq-footer', footer)
Vue.component('sq-bookmark', createBookmark)
Vue.component('sq-leaderboard', leaderboard)
Vue.component('sq-likebtn', likebutton)
Vue.use(SocialSharing)
