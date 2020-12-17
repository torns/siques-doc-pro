import Vue from 'vue'
import { AxiosInstance } from 'axios'
import { Route } from 'vue-router'
import { Dayjs } from 'dayjs'
import $ from '@types/jquery'
import hljs from 'highlight.js'
import { Store } from 'vuex/types'
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance
    $route: Route
    $store: Store<any>
    $: JQuery
    $auth: any
    $dayjs: any
    hljs: any
    $nuxt: any
    $loading: any
    $notify: any
    $vuetify: any
    $confirm: any
  }
}
