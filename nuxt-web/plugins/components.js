import Vue from 'vue'
import dayjs from 'dayjs'
import 'default-passive-events'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import markdown from '~/components/markdown/MarkDown.vue'
import footer from '~/components/Base/BaseFooter/index.vue'
// import createBookmark from '~/components/dialog/createBookmark.vue'
import tagSelect from '~/components/Dialog/TagSelect.vue'
import wave from '~/components/Base/BaseWave/index.vue'

// import mouseclick from '~/components/MouseClick/click.vue'
import indicator from '~/components/Base/BaseIndicator/index.vue'
import pagination from '~/components/Base/BasePagination/index.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('markdown', markdown)
Vue.component('sq-wave', wave)
Vue.component('sq-tag', tagSelect)
Vue.component('sq-footer', footer)
// Vue.component('sq-bookmark', createBookmark)
Vue.component('sq-pagination', pagination)

// Vue.component('sq-click', mouseclick)
Vue.component('sq-indicator', indicator)
