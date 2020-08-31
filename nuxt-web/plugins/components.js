import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import markdown from '~/components/markdown/MarkDown.vue'
import footer from '~/components/footer/Footer.vue'
import createBookmark from '~/components/dialog/createBookmark.vue'

import likebutton from '~/components/miniComponents/likebutton.vue'

import placeholder from '~/components/placeholder/placeholder.vue'
import mouseclick from '~/components/MouseClick/click.vue'
import indicator from '~/components/miniComponents/indicator.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('markdown', markdown)
Vue.component('sq-footer', footer)
Vue.component('sq-bookmark', createBookmark)

Vue.component('sq-likebtn', likebutton)

Vue.component('sq-holder', placeholder)
Vue.component('sq-click', mouseclick)
Vue.component('sq-indicator', indicator)
