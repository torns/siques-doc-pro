<template>
  <div v-infinite-scroll="load" class="infinite-list " infinite-scroll-disabled="disabled" infinite-scroll-distance="0">
    <!-- <div style="height:460px;box-shadow: inset 0px -32px 38px -36px;" class="cover "> -->
    <div>
      <sq-banner
        ><div class="container" style="height:0">
          <el-row :gutter="0" class="d-flex jc-center">
            <el-col :xs="0" :sm="3" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down "> </el-col>
            <el-col :xs="20" :sm="24" :md="14" :lg="14" :xl="14">
              <div class=" d-flex jc-around header reTop" style="position: relative;">
                <div>
                  <div class="text-white pb-3 text-center" style="font-family: cursive;font-size:40px">
                    思趣，发现思考的深度
                  </div>
                  <div @click.stop>
                    <el-input v-model="search" @keyup.enter.native="dataSearch" size="medium" placeholder="搜索你喜欢的">
                      <el-button slot="append" @click="dataSearch">
                        <i class="fa fa-search"></i>
                      </el-button>
                    </el-input>

                    <div class="text-white text-center pt-3 fs-md ">
                      热门搜索：<span @click="$router.push(`/search/vue`)" class="point hoverlink">Vue </span>
                      <span @click="$router.push(`/search/nuxtjs`)" class="point hoverlink">nuxtjs</span>
                      <span @click="$router.push(`/search/nestjs`)" class="point hoverlink">nestjs</span>
                    </div>
                  </div>
                  <div>
                    <sq-down></sq-down>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="0" :sm="3" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
              <div style="position: relative;top: 60%;" class="fs-xm hover-1 text-right text-white pt-2"></div>
            </el-col>
          </el-row></div
      ></sq-banner>
    </div>
    <div class="container" style="min-height: 100vh;">
      <el-row :gutter="0" class="d-flex xm-flex-wrap  pt-4">
        <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class=" ">
          <div class="d-flex " style="flex-direction: row-reverse;">
            <ul
              class="text-left fs-xm  sq-leftside-link text-gray-1 flex-wrap"
              style="
    display: flex;"
            >
              <li @click="handleCategory(link)" v-for="link in links" :key="link.alias" :class="(link.alias == category ? 'bg-1 ' : 'hover-2 ') + `w-100  pl-3 py-2`">
                <i :class="(link.alias == category ? `text-white ` : `text-${link.color} `) + `fa pr-1  fa-${link.icon}`"></i>

                {{ link.name }}
              </li>
              <div class="pl-3 py-2 xm ">技术频道</div>
              <li @click="handleCategory(link)" v-for="link in techChanel" :key="link.alias" :class="(link.alias == category ? `bg-1 ` : 'hover-2 ') + `w-100  pl-3 py-2 `">
                <i :class="(link.alias == category ? `text-white ` : `text-${link.color} `) + `fs-md pr-1 iconfont   icon-${link.icon}`"></i>
                {{ link.name }}
              </li>
              <router-link :to="`/tags`" class="w-100 " tag="li">
                <div class="pl-3   py-2 hover-2">
                  <i class="fa fa-tag pr-1"></i>
                  更多标签
                </div>
              </router-link>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15" class="px-2 mx-1">
          <sq-typer></sq-typer>
          <div>
            <div>
              <div class="pt-3">{{ name }}</div>

              <el-divider></el-divider>

              <ul style="overflow: auto;">
                <div v-for="(post, $index) in posts" :key="$index" class="infinite-list-item pb-3">
                  <div class="d-flex ai-center jc-between">
                    <div class=" ">
                      <div>
                        <router-link :to="`/p/${post.id}`" target="_blank" tag="a" class="text-dark-1 hoverlink point   fs-lg">{{ post.title }}</router-link>
                      </div>
                      <div>
                        <el-tag v-for="tag in post.tags" :key="tag.id" effect="plain" size="mini" type="primary" class="mt-2 mr-2 hover-4 hover-2 point ">
                          <router-link :to="`/t/${tag.id}`" tag="a">{{ tag.name }}</router-link>
                        </el-tag>
                      </div>
                      <div>
                        <div class="text-gray fs-xm lh-2 pt-2">
                          <!-- 过滤 -->
                          <span>{{ post.alias }}...</span>
                        </div>
                      </div>

                      <div class="d-flex mb-4 pt-2 ai-center fs-xm">
                        <div class="d-flex point ai-center">
                          <i class="fs-xl el-icon-success hover-1  text-primary"></i>

                          <div class="pl-1 pr-3 ">
                            <div>
                              <span class="text-primary hoverlink font-bold">× {{ post.liked }} </span>
                              <span>· 赞</span>
                            </div>
                          </div>
                        </div>
                        <nuxt-link :to="`u/${post.user.id}`" tag="div"
                          ><div class="pr-2 point hoverlink text-gray-1">{{ post.user.name }} ·</div>
                        </nuxt-link>

                        <div>
                          <i class="fa fa-calendar-check-o text-blue"></i>
                          {{ $dayjs(post.created).format('YYYY年MM月DD日 HH:MM:ss') }}
                        </div>
                      </div>
                    </div>
                    <div v-if="post.cover" class="xs pl-3 pr-2 my-1 point">
                      <router-link :to="`/p/${post.id}`">
                        <el-image :src="post.cover" style="width: 140px; height: 90px" class="border-radius shadow-1 border-dash" fit="cover"></el-image>
                      </router-link>
                    </div>
                  </div>
                </div>

                <div v-if="loading" class="my-3 text-primary fs-xl">
                  <sq-holder :count="8" :show="true"></sq-holder>
                </div>
                <div v-if="noMore" class="my-3 text-primary fs-sm">
                  (ﾟ∀ﾟ )没有更多内容了
                </div>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col :xs="0" :sm="6" :md="5" :lg="5" :xl="5" class="hidden-sm-and-down">
          <sq-indexBar :hotTags="hotTags" :hotComments="hotComments" :hotNotebooks="hotNotebooks"></sq-indexBar>
        </el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component } from 'nuxt-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
import fetchdata from '../../plugins/fetchdata'
import homeSideBar from '~/components/SideBar/homeSideBar.vue'
import scrolldown from '~/components/miniComponents/scrolldown.vue'
import banner from '~/components/miniComponents/banner.vue'
import typer from '~/components/miniComponents/typer.vue'
@Component({
  components: {
    'sq-indexBar': homeSideBar,
    'sq-down': scrolldown,
    'sq-banner': banner,
    'sq-typer': typer
  }
})
export default class MyPage extends Vue {
  async asyncData() {
    // 在 @component 中不可以写 this.$http //
    const http = Vue.prototype.$http
    const res = await http.get('/posts/all?limit=20&page=1&type=post&sort=created')
    const res1 = await http.get('tags/1/hot')
    const res2 = await http.get('comments')
    const res3 = await http.get('collections/1/note?type=note&limit=3')
    return {
      posts: res.data[0],
      total: res.data[1],
      hotTags: res1.data,
      hotComments: res2.data,
      hotNotebooks: res3.data
    }
  }
  page = 1
  count = 20
  total: number = 0
  loading = false
  sort = 'created'
  tag = null
  taglist = null
  posts = []
  search = ''
  // carousel = [
  //   {
  //     img: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/%E6%B7%B1%E5%A4%9C%E3%81%AE%E4%BB%A3%E7%A0%81.png',
  //     link: '/blogs'
  //   },
  //   {
  //     img: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/%E9%BB%91%E8%89%B2%E5%9C%B0%E7%90%83LinkedIn%20Banner.png',
  //     link: '/blogs'
  //   }
  // ]
  category: string = 'new'
  name: string = '最近更新'
  // 轮播图跳转
  // linkTo() {
  //   const ref: any = this.$refs.carousel
  //   const activeIndex = ref.activeIndex
  //   this.$router.push(this.carousel[activeIndex].link)
  // }

  get noMore(): any {
    return this.count >= this.total
  }

  get disabled(): any {
    return this.loading || this.noMore
  }

  get taglists(): any {
    try {
      return this.$store.state.auth.user.tags || ''
    } catch {
      return null
    }
  }

  links = [
    {
      name: '最近更新',
      alias: 'new',
      sort: 'created',
      icon: 'compass',
      color: 'dark'
    },
    {
      name: '我的订阅',
      taglist: this.taglists,
      listId: true,
      sort: 'liked',
      icon: 'address-card',
      color: 'dark'
    },
    {
      name: '近期热门',
      alias: 'hot',
      sort: 'liked',
      icon: 'thumbs-up',
      color: 'dark'
    }
  ]

  techChanel = [
    {
      name: '前端',
      alias: 'frontEnd',
      taglist: ['frontEnd'],
      sort: 'created',
      icon: 'js',
      color: 'yellow-1'
    },
    {
      name: '后端',
      alias: 'backEnd',
      taglist: ['cloudcomputing', 'database', 'server', 'JavaDev', 'backEnd'],
      sort: 'created',
      icon: 'storage',
      color: 'blue-1'
    },
    {
      name: '工具',
      alias: 'tools',
      taglist: ['tools'],
      sort: 'created',
      icon: 'tools',
      color: 'blue'
    },
    {
      name: 'Node',
      alias: 'node',
      tag: 'node.js',
      sort: 'created',
      icon: 'node-js',
      color: 'blue'
    },
    {
      name: 'Vue',
      alias: 'vue',
      tag: 'vue.js',
      sort: 'created',
      icon: 'vuejs',
      color: 'green'
    },
    {
      name: '小程序',
      alias: 'miniProgram',
      taglist: ['miniProgram'],
      sort: 'created',
      icon: 'xiaochengxu',
      color: 'green'
    },
    {
      name: 'Nuxt',
      alias: 'nuxt.js',
      tag: 'nuxt.js',
      sort: 'created',
      icon: 'nuxt-dot-js',
      color: 'green'
    },
    {
      name: 'Nest',
      alias: 'nest.js',
      tag: 'nest.js',
      sort: 'created',
      icon: 'file_type_nestjs',
      color: 'red'
    },
    {
      name: '行业',
      alias: 'info',
      tag: 'info',
      sort: 'created',
      icon: 'hangye',
      color: 'yellow'
    }
  ]

  dataSearch() {
    this.$router.push(`/search/${this.search}`)
    this.search = ''
  }

  fetchDataSuccess(res: any) {
    setTimeout(async () => {
      this.posts = this.posts.concat(res.data[0])
      this.count += res.data[0].length
      this.loading = false
    }, 500)
  }

  load() {
    this.loading = true
    this.page += 1
    let list = ''
    list = listIntercep(this.taglist)

    fetchdata({
      resource: `/posts/all`,
      page: this.page,
      pageSize: '20',
      sort: this.sort,
      tags: this.tag,
      taglist: list,
      type: 'post',
      success: this.fetchDataSuccess
    })
  }

  async handleCategory(links: any) {
    const { alias, name, listId, tag, taglist, sort } = links
    this.category = alias
    this.name = name
    this.tag = tag
    this.taglist = taglist
    this.sort = sort
    this.page = 1
    this.count = 20
    let list = ''
    list = listIntercep(this.taglist)

    // console.log(list)
    const link =
      `/posts/all?limit=20&page=${this.page}` + (sort ? `&sort=${sort}` : '') + (tag ? `&tags=${tag}` : '') + (taglist ? `&taglist=${list}` : '') + (listId ? `&listId=${listId}` : '') + `&type=post`
    const res = await this.$http.get(link)
    this.total = res.data[1]
    this.posts = res.data[0]
  }
}
</script>

<style lang="scss">
.el-divider--vertical {
  height: inherit;
}

.el-divider--horizontal {
  margin: 15px 0;
}

.mask {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.7));
  border-radius: 4px;
}
.tech-square-title::after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #eee;
  width: 95px;
  margin-left: 5px;
  margin-top: 8px;
}
.header .el-input__inner {
  color: white;
}
</style>
