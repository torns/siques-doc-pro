import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import SocialSharing from 'vue-social-sharing'

import markdown from '~/components/markdown/MarkDown.vue'
import footer from '~/components/footer/Footer.vue'
import createBookmark from '~/components/dialog/createBookmark.vue'
import leaderboard from '~/components/miniComponents/leaderboard.vue'
import likebutton from '~/components/miniComponents/likebutton.vue'
import backbutton from '~/components/BackToTop/Back2Top.vue'
import placeholder from '~/components/placeholder/placeholder.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('markdown', markdown)
Vue.component('sq-footer', footer)
Vue.component('sq-bookmark', createBookmark)
Vue.component('sq-leaderboard', leaderboard)
Vue.component('sq-likebtn', likebutton)
Vue.component('sq-backbtn', backbutton)
Vue.component('sq-holder', placeholder)
Vue.use(SocialSharing)
