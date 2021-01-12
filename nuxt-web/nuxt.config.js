import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
const mode = process.env.NODE_ENV === 'production'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,maximum-scale=1,user-scalable=no, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          '思趣,开发者社区,技术新闻资讯,技术笔记,技术号,技术圈,开源社区,程序员,云计算,AI,区块链,前端,后端,小程序,软件开发,编程,nuxtjs,flutter,nestjs,javascript,php,python,java,ios,android'
      }
    ],

    script: [
      { src: 'https://cdn.siques.cn/libs/js/katex.min.js' },
      { src: 'https://cdn.siques.cn/libs/js/Sortable.min.js', ssr: true },
      { src: 'https://cdn.siques.cn/libs/js/vuedraggable.umd.min.js', ssr: true },
      {
        src: 'https://cdn.siques.cn/libs/js/highlight.min.js'
      },
      { src: 'https://cdn.siques.cn/libs/js/ckeditor.js', defer: true },

      { src: 'https://cdn.siques.cn/libs/js/diff.min.js', defer: true },
      ,
      { src: 'https://cdn.bootcdn.net/ajax/libs/ali-oss/6.12.0/aliyun-oss-sdk.min.js', defer: true },
      // {
      //   src: 'https://cdn.siques.cn/libs/js/typescript.min.js',
      //   defer: true
      // },
      // {
      //   src: 'https://cdn.siques.cn/libs/js/dart.min.js',
      //   defer: true
      // },

      {
        src: 'https://cdn.siques.cn/libs/js/jquery.min.js'
      },
      {
        // src: '//cdn.siques.cn/libs/js/vue.min.js'
        src: mode ? 'https://cdn.siques.cn/libs/js/vue.min.js' : 'https://cdn.siques.cn/libs/js/vue.js'
      },
      { src: 'https://cdn.siques.cn/libs/js/ossfinder.umd.min.js', defer: true },
      {
        src: 'https://cdn.siques.cn/libs/js/lodash.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vue-router.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vuex.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vue-meta.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/riddler-sdk-0.2.2.js',
        defer: true
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: '/icon/iconfont.css' },
      // { rel: 'stylesheet', href: 'https://cdn.siques.cn/libs/css/_font.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.siques.cn/libs/css/katex.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.siques.cn/libs/css/github.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#4CAF50' },
  /*
   ** Global CSS
   */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '~/css/global.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/directive',
    '@/plugins/global.ts',
    // '@/plugins/route.js',

    { src: '@/plugins/scrollAnimate', ssr: false },
    { src: '@/plugins/components.js', ssr: true },
    { src: '@/plugins/tips/loading.js', ssr: true },
    { src: '@/plugins/tips/snackbar.js', ssr: true },
    { src: '@/plugins/tips/confirm.js', ssr: true },
    { src: '@/plugins/nullSSRComponents.js', ssr: false },
    { src: '@/plugins/axios', ssr: true },

    { src: '@/plugins/mixin.js', ssr: false },
    { src: '@plugins/persistedState.client.js', ssr: false }
  ],

  vuetify: {
    customVariables: ['@/css/vuetify/variable.scss']
  },

  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  render: {
    resourceHints: true
  },

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',

    // '@nuxtjs/auth',
    '@nuxtjs/sitemap',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  sitemap: {
    hostname: mode ? 'https://www.siques.cn' : 'http://localhost:3002',
    gzip: true,
    exclude: ['/docs'],
    routes: async () => {
      const res = await axios.get(`${mode ? 'https://www.siques.cn/api' : 'http://localhost:3002'}/doc/seo/sitemap`)
      return res.data.datas.map((list) => `/doc/${list.id}`)
    }
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  // router: {
  //   middleware: ['scrollTop']
  // },

  /*
   ** Build configuration
   */

  build: {
    extractCSS: { allChunks: true },

    /*
     ** You can extend webpack config here
     */
    // 开启打包分析
    babel: {
      plugins: []
    },

    // analyze: true,
    // assetFilter(assetFilename) {
    //   return assetFilename.endsWith('.js')
    // },
    extend(config, ctx) {
      if (ctx.isClient) {
        // 添加 alias 配置
        // Object.assign(config.resolve.alias, {
        //   '@components': path.resolve(__dirname, 'components')
        // })

        config.externals = config.externals || {}
        Object.assign(config.externals, {
          vue: 'Vue',
          // 'element-ui': 'ELEMENT',
          lodash: '_',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          'vue-meta': 'VueMeta',
          // transliteration: 'SlugifyFunction',
          // 'vue-lazyload': 'VueLazyload',
          katex: 'katex',
          highlightjs: 'highlightjs',
          vuedraggable: 'vuedraggable',
          '@siques/vue-ossfinder': 'ossfinder'
        })
      }
    }
  }
  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost:3001/api'
  // }
}
