import Vue from 'vue'
import dayjs from 'dayjs'
import VueMeta from 'vue-meta'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import SocialSharing from 'vue-social-sharing'
import markdown from '~/components/markdown/MarkDown.vue'
import footer from '~/components/footer/Footer.vue'
import createBookmark from '~/components/dialog/createBookmark.vue'
import leaderboard from '~/components/subgroup/leaderboard.vue'
import likebutton from '~/components/subgroup/likebutton.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('markdown', markdown)
Vue.component('sq-footer', footer)
Vue.component('sq-bookmark', createBookmark)
Vue.component('sq-leaderboard', leaderboard)
Vue.component('sq-likebtn', likebutton)
Vue.use(SocialSharing)
Vue.use(VueMeta)
