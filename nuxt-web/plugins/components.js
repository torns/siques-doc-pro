import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import draggable from 'vuedraggable'
import footer from '~/components/Base/BaseFooter/index.vue'

import wave from '~/components/Base/BaseWave/index.vue'

// import mouseclick from '~/components/MouseClick/click.vue'
import indicator from '~/components/Base/BaseIndicator/index.vue'
import pagination from '~/components/Base/BasePagination/index.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('draggable', draggable)
Vue.component('sq-wave', wave)

Vue.component('sq-footer', footer)

Vue.component('sq-pagination', pagination)

Vue.component('sq-indicator', indicator)
