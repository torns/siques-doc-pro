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
          >123</el-col
        >
      </el-row>
    </div>
    <sq-footer top-border="true" class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Meta } from '@sophosoft/vue-meta-decorator'
import { listIntercep } from '../../../plugins/utils.js'
import BlogPanel from '~/components/ListPanel/BlogPanel.vue'

@Component({
  components: { 'sq-panel': BlogPanel }
})
export default class index extends Vue {
  @Meta
  getMetaInfo() {
    return {
      title: '专栏'
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

  taglist = this.$store.state.auth
    ? this.$store.state.auth.user
      ? this.$store.state.auth.user.tags
      : ''
    : ''

  mounted() {
    setTimeout(() => {
      this.fetchPost()
    }, 0)

    this.listInit()
  }

  listInit() {
    if (this.taglist !== '') {
      const list = listIntercep(this.taglist)

      this.list = list
    }
  }

  handleCurrentChange(val: any) {
    // currentPage =val
    this.page = val
    this.fetchPost()
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
