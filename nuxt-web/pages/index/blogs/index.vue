<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="推荐文章" name="first">
            <div v-if="posts !== null">
              <sq-panel :data="posts"></sq-panel>
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门文章" name="second">私信消息</el-tab-pane>
          <el-tab-pane label="最新文章" name="third">私信消息</el-tab-pane>
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BlogPanel from '~/components/ListPanel/BlogPanel.vue'

@Component({
  components: { 'sq-panel': BlogPanel }
})
export default class index extends Vue {
  @Prop()
  name: string
  activeName = 'first'
  sort = 'created'
  listId = true
  page = 1
  posts = null

  taglist = this.$store.state.auth ? this.$store.state.auth.user.tags || '' : ''
  mounted() {
    this.fetchPost()
  }

  async fetchPost() {
    let list = ''
    this.taglist.map((e, index) => {
      if (index === this.taglist.length - 1) {
        list = list + e.id
      } else {
        list = list + e.id + '-'
      }
    })

    const link =
      `/posts/all?limit=10&page=${this.page}` +
      (this.sort ? `&sort=${this.sort}` : '') +
      (this.taglist ? `&taglist=${list}` : '') +
      (this.listId ? `&listId=${this.listId}` : '') +
      `&collection=true`
    const res = await this.$http.get(link)

    this.posts = res.data[0]
  }

  handleClick(e: any) {}
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
