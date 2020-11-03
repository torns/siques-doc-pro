<template>
  <div v-if="isHomepage" v-infinite-scroll="load" class="infinite-list " infinite-scroll-disabled="disabled" infinite-scroll-distance="0">
    <!-- <div style="height:460px;box-shadow: inset 0px -32px 38px -36px;" class="cover "> -->
    <div>
      <sq-banner
        ><div class="container" style="height:0">
          <el-row :gutter="0" class="d-flex jc-center">
            <el-col :xs="0" :sm="3" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down "> </el-col>
            <el-col :xs="20" :sm="24" :md="14" :lg="14" :xl="14">
              <div class=" d-flex jc-around header reTop" style="position: relative;">
                <div style="width: 100%;max-width: 380px;">
                  <div class="text-white pb-3 text-center" style="font-size:32px">从思考, 到创造</div>
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
          <div class=" xs d-flex " style="flex-direction: row-reverse;">
            <a href="#top">
              <!-- 首页左侧边栏 -->
              <sq-leftBar :category="category" :taglists="taglists" @handleclick="handleCategory"></sq-leftBar>
            </a>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="px-2 mx-1">
          <sq-typer id="top"></sq-typer>
          <div>
            <div>
              <div class="pt-3">{{ name }}</div>

              <el-divider></el-divider>

              <ul style="overflow: auto;">
                <div v-for="(post, $index) in posts" :key="$index" class="infinite-list-item pb-3">
                  <div class="d-flex ai-center jc-between">
                    <div>
                      <div class="title">
                        <router-link :to="`/p/${post.id}`" tag="a" class="text-dark-1 hoverlink point   fs-lg">{{ post.title }}</router-link>
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
                        <el-image :src="post.cover" style="width: 140px; height: 90px" class="border-radius shadow-1 border-dash" fit="cover" lazy></el-image>
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
          <!-- 首页右-侧边栏 -->
          <sq-rightBar></sq-rightBar>
        </el-col>
      </el-row>
    </div>

    <!-- 首页的导航栏 -->
    <sq-extendBar extension="top: 55px;" @handleClose="$emit('changestatu', false)" :statu="$attrs.isMoreClick">
      <a href="#top">
        <!-- 首页左侧边栏 -->

        <sq-leftBar textColor="white" color="text-white" :category="category" :taglists="taglists" @handleclick="handleCategory"></sq-leftBar>
      </a>
    </sq-extendBar>

    <sq-footer :topBorder="true"> </sq-footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component } from 'nuxt-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
import fetchdata from '../../plugins/fetchdata'
import leftBar from '~/components/Page/Index/SideBar/leftWay.vue'
import rightBar from '~/components/Page/Index/SideBar/rightWay.vue'
import scrolldown from '~/components/Base/BaseScrollDown/index.vue'
import banner from '~/components/Page/Index/IndexBanner.vue'
import typer from '~/components/Page/Index/IndexTyper.vue'
import placeholder from '~/components/Singlton/ThePlaceholder.vue'
import extendBar from '~/components/Page/Index/ExtendBar/index.vue'

@Component({
  components: {
    'sq-leftBar': leftBar,
    'sq-rightBar': rightBar,
    'sq-down': scrolldown,
    'sq-banner': banner,
    'sq-typer': typer,
    'sq-holder': placeholder,
    'sq-extendBar': extendBar
  }
})
export default class AppPage extends Vue {
  async asyncData() {
    // 在 @component 中不可以写 this.$http //
    // var type = {
    //   post: 'post',
    //   video: 'video'
    // }

    // var jsonObj = JSON.stringify(type)

    const http = Vue.prototype.$http
    const res = await http.get(`/posts/all?limit=20&page=1&type=post&sort=created`)
    // const res1 = await http.get('tags/1/hot')
    // const res2 = await http.get('comments')
    // const res3 = await http.get('collections/1/note?type=note&limit=3')
    return {
      posts: res.data[0],
      total: res.data[1]
      // hotTags: res1.data,
      // hotComments: res2.data,
      // hotNotebooks: res3.data
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
  type = 'post'

  category: string = 'new'
  name: string = '最近更新'

  get isHomepage() {
    return this.$route.path === '/'
  }

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
      type: this.type,
      success: this.fetchDataSuccess
    })
  }

  async handleCategory(links: any) {
    // 改变父组件状态
    this.$emit('changestatu', false)

    const { alias, name, listId, tag, taglist, sort, type } = links
    this.category = alias
    this.name = name
    this.tag = tag
    this.taglist = taglist
    this.sort = sort
    this.page = 1
    this.type = type
    this.count = 20
    let list = ''
    list = listIntercep(this.taglist)
    const link =
      `/posts/all?limit=20&page=${this.page}` +
      (sort ? `&sort=${sort}` : '') +
      (tag ? `&tags=${tag}` : '') +
      (taglist ? `&taglist=${list}` : '') +
      (listId ? `&listId=${listId}` : '') +
      (type ? `&type=${type}` : '&type=post')
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
