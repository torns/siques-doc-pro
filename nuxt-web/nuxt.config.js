import dotenv from 'dotenv'

dotenv.config()
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },
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
      { src: 'https://cdn.siques.cn/libs/js/editormd.min.js', defer: true },
      // { src: 'https://cdn.siques.cn/libs/js/codemirror/codemirror.min.js' },
      // { src: 'https://cdn.siques.cn/libs/js/codemirror/modes.min.js' },
      // { src: 'https://cdn.siques.cn/libs/js/codemirror/addons.min.js' },
      // { src: 'https://cdn.siques.cn/libs/js/marked.min.js' },
      // { src: 'https://cdn.siques.cn/libs/js/prettify.min.js' },
      { src: 'https://cdn.siques.cn/libs/js/katex.min.js' },
      {
        src: 'https://cdn.siques.cn/libs/js/highlight.min.js',
        defer: true
      },
      {
        src: 'https://cdn.siques.cn/libs/js/typescript.min.js',
        defer: true
      },
      {
        src: 'https://cdn.siques.cn/libs/js/dart.min.js',
        defer: true
      },

      {
        src: 'https://cdn.siques.cn/libs/js/jquery.min.js'
      },
      {
        // src: '//cdn.siques.cn/libs/js/vue.min.js'
        src:
          process.env.NODE_ENV === 'production'
            ? 'https://cdn.siques.cn/libs/js/vue.min.js'
            : 'https://cdn.siques.cn/libs/js/vue.js'
      },
      // {
      //   src: 'https://cdn.siques.cn/libs/js/element-ui@2.13.2/index.js',
      //   ssr: true
      // },
      {
        src: 'https://cdn.siques.cn/libs/js/lodash.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vue-router.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vuex.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/vue-meta.min.js'
      },
      {
        src: 'https://cdn.siques.cn/libs/js/markdown-it.min.js',
        defer: true
      },
      {
        src: 'https://cdn.siques.cn/libs/js/riddler-sdk-0.2.2.js',
        defer: true
      },

      {
        src: 'https://cdn.siques.cn/libs/js/vue-lazyload.js'
      }

      // {
      //   src: '//cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.umd.min.js',
      //   ssr: true
      // }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/icon/iconfont.css' },
      // { rel: 'stylesheet', href: 'https://cdn.siques.cn/libs/css/_font.css' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css'
      // },
      {
        rel: 'stylesheet',
        href: 'https://cdn.siques.cn/libs/css/katex.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.siques.cn/libs/css/github.min.css'
      },

      {
        rel: 'stylesheet',
        href: 'https://cdn.siques.cn/libs/css/editormd.css'
      }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
      // }
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
    'element-ui/lib/theme-chalk/display.css',
    '~/css/global.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/directive',
    '@/plugins/global.ts',
    // '@/plugins/route.js',
    { src: '@/plugins/markdown', ssr: true },

    { src: '@/plugins/scrollAnimate', ssr: false },
    { src: '@/plugins/components.js', ssr: true },
    { src: '@/plugins/tips/loading.js', ssr: true },
    { src: '@/plugins/tips/snackbar.js', ssr: true },
    { src: '@/plugins/tips/confirm.js', ssr: true },
    '@/plugins/nullSSRComponents.js',
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
    hostname: 'https://www.siques.cn',
    gzip: true,
    exclude: ['/ask', '/post', 'record']
    // routes: async () => {
    //   const res = await axios.get('http://www.siques.cn/api/posts/seo/sitemap')

    //   return res.data.map((list) => `/${list.type}/${list.id}`)
    // }
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
          transliteration: 'SlugifyFunction',
          'markdown-it': 'markdownit',
          'vue-lazyload': 'VueLazyload',
          katex: 'katex'
        })
      }
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001/api'
  }
}
