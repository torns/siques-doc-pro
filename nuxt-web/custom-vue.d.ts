import Vue from 'vue'
import { AxiosInstance } from 'axios'
import { Route } from 'vue-router'
import { Dayjs } from 'dayjs'
import { Notification } from 'element-ui/types'
import { ElNotification } from 'element-ui/types/notification'
import { ElMessageBoxShortcutMethod, ElMessageBox } from 'element-ui/types/message-box'

import $ from '@types/jquery'
import { ElMessage } from 'element-ui/types/message'
import hljs from 'highlight.js'
import { ElLoadingComponent, LoadingServiceOptions } from 'element-ui/types/loading'
import { Store } from 'vuex/types'
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance
    $route: Route
    $notify: ElNotification
    $store: Store<any>
    $msgbox: ElMessageBox
    $alert: ElMessageBoxShortcutMethod
    $confirm: ElMessageBoxShortcutMethod
    $prompt: ElMessageBoxShortcutMethod
    $: JQuery
    $message: ElMessage
    $auth: any
    $dayjs: any
    hljs: any
    $nuxt: any
    $loading: (options: LoadingServiceOptions) => ElLoadingComponent
  }
}
