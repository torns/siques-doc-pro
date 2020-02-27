import dotenv from 'dotenv'
dotenv.config()
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
        content:
          'width=device-width,maximum-scale=1,user-scalable=no, initial-scale=1'
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
          '思趣,开发者社区,技术新闻资讯,技术问答社区,技术博客专栏,技术笔记,技术号,技术圈,技术直播,在线编程,开源社区,开源项目,程序员,云计算,AI,区块链,前端,后端,小程序,安全,运维,软件开发,编程,cto,javascript,php,python,java,ios,android'
      }
    ],

    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
      },
      {
        src: 'https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/languages/typescript.min.js'
      },

      {
        src:
          'https://uicdn.toast.com/tui-editor/latest/tui-editor-Editor-full.min.js',
        async: 'async'
      },
      {
        src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/icon/iconfont.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.bootcss.com/animate.css/3.7.2/animate.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-light.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Cinzel+Decorative:700|EB+Garamond&display=swap'
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.bootcss.com/element-ui/2.4.11/theme-chalk/index.css'
      // },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://uicdn.toast.com/tui-editor/latest/tui-editor.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://uicdn.toast.com/tui-editor/latest/tui-editor-contents.css'
      }

      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css'
      // }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '~/css/global.scss',
    '~/css/post.scss',
    '~/css/tag.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    '@/plugins/fontawesome',
    '@/plugins/directive',
    '@/plugins/http',
    '@/plugins/global.ts',
    '@/plugins/filter',
    '@/plugins/nuxt-client-init.client.js',
    { src: '@/plugins/components.js', ssr: true },
    '@/plugins/nullSSRComponents.js',
    '@/plugins/axios',
    { src: '@plugins/router', ssr: false },
    { src: '@/plugins/mixin.js', ssr: false },
    { src: '@plugins/localStorage', ssr: false }
    // { src: '@plugins/markdown', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  render: {
    resourceHints: false
  },

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },

          user: { url: '/users', method: 'get', propertyName: false }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: { allChunks: true },
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    // 开启打包分析
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ]
      ]
    },

    // analyze: true,
    // assetFilter(assetFilename) {
    //   return assetFilename.endsWith('.js')
    // },
    extend(config, ctx) {}
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001/api'
  }
}
