<template>
  <div>
    <div class="container h-100">
      <el-row type="flex" class="pt-4 px-3">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <el-tabs
            v-if="posts !== null"
            v-model="activeName"
            @tab-click="handleClick"
            type="card"
          >
            <el-tab-pane label="推荐文章" name="first">
              <div style="min-height:70vh">
                <sq-panel :data="posts"></sq-panel>
              </div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :total="total"
                background
                layout="prev, pager, next"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="热门文章" name="second">
              <div style="min-height:70vh">
                <sq-panel :data="posts"></sq-panel>
              </div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :total="total"
                background
                layout="prev, pager, next"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="最新文章" name="third">
              <div style="min-height:70vh">
                <sq-panel :data="posts"></sq-panel>
              </div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :total="total"
                background
                layout="prev, pager, next"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="6"
          :lg="6"
          :xl="6"
          class="hidden-sm-and-down pl-2"
          >还没修改的侧边栏</el-col
        >
      </el-row>
    </div>
    <sq-footer top-border="true" class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { listIntercep } from '../../../plugins/utils.js'
import BlogPanel from '~/components/ListPanel/BlogPanel.vue'

@Component({
  components: { 'sq-panel': BlogPanel }
})
export default class index extends Vue {
  async asyncData({ params, store }: any) {
    const Taglist = store.state.auth
      ? store.state.auth.user
        ? store.state.auth.user.tags
          ? store.state.auth.user.tags
          : null
        : null
      : null
    const List = listIntercep(Taglist)
    const http = Vue.prototype.$http

    const link =
      `/posts/all?limit=10&page=1&sort=views` +
      (Taglist ? `&taglist=${List}` : '') +
      `&listId=true&collection=true&type=post`
    const res = await http.get(link)

    return {
      list: List,
      taglist: Taglist,
      posts: res.data[0],
      total: res.data[1]
    }
  }

  head() {
    return {
      title: '专栏_思趣'
    }
  }
  @Prop()
  name: any
  activeName = 'first'
  sort = 'views'
  listId = true
  page = 1
  total: any
  posts = null
  list: any
  taglist = []

  mounted() {}

  handleCurrentChange(val: any) {
    // currentPage =val
    this.page = val

    window.scrollTo(0, 0)
  }

  async fetchPost() {
    const link =
      `/posts/all?limit=10&page=${this.page}` +
      (this.sort ? `&sort=${this.sort}` : '') +
      (this.taglist ? `&taglist=${this.list}` : '') +
      (this.listId ? `&listId=${this.listId}` : '') +
      `&collection=true`
    const res = await this.$http.get(link)
    this.total = res.data[1]

    this.posts = res.data[0]
  }

  handleClick(tab: any, event: any) {
    if (tab.name === 'second') {
      this.sort = 'liked'
      this.fetchPost()
    }

    if (tab.name === 'first') {
      this.sort = 'views'
      this.fetchPost()
    }

    if (tab.name === 'third') {
      this.sort = 'created'
      this.fetchPost()
    }
  }
}
</script>

<style lang="scss">
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
</style>
