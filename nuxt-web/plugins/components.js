/* eslint-disable */
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import draggable from 'vuedraggable'

import wave from '~/components/Base/BaseWave/index.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.component('draggable', draggable)
Vue.component('sq-wave', wave)
