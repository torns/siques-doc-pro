<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div v-if="bookmark != null">
          <div class="fs-xll d-flex ai-baseline mb-2">
            <div class="text-primary bookmark-title mr-2">藏</div>
            <div>{{ bookmark.title }}</div>
          </div>
          <div class="text-gray">
            <div>{{ bookmark.description }}</div>
            <div class="d-flex ai-baseline ">
              <div class="fs-xm pr-3">{{ bookmark.posts.length }}个条目</div>
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="deleteBookmark">删除</el-button>
            </div>
            <div>
              <ul>
                <li v-for="(post, index) in bookmark.posts" :key="index">
                  <div class="d-flex jc-between">
                    <div>
                      <div class="hoverlink">{{ post.user.name }}</div>
                      <router-link
                        class="hover-2"
                        tag="div"
                        :to="`/p/${post.id}`"
                      >
                        {{ post.title }}</router-link
                      >
                    </div>
                    <div class="pr-3">
                      <el-button size="mini" type="primary" @click="del"
                        >删除条目</el-button
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        class="hidden-sm-and-down pl-2"
      >
        <div v-if="bookmark != null">
          <div class="d-flex jc-left ai-baseline mb-6">
            <el-button size="mini" type="primary">关注</el-button>
            <div class="fs-xm pl-3 text-gray">0关注</div>
          </div>
          <div class="border-solid borde-radius">
            <div
              style="height:39px;line-height:39px "
              class="w-100 bg-light  fs-xm "
            >
              <div class="ml-2">收藏夹作者</div>
            </div>
            <div
              style="height:120px"
              class="w-100 d-flex flex-column ai-center jc-center"
            >
              <div class="text-primary fs-xll">{{ bookmark.users.name }}</div>
              <el-button
                style="width:100px"
                size="mini"
                class="hover-1"
                type="plain"
                >关注作者</el-button
              >
            </div>
          </div>
          <div class="pt-3">
            <div>分享扩散：</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Bookmark extends Vue {
  name: string
  activeName = 'first'
  dialogFormVisible = false
  bookmark: any = null

  mounted() {
    this.fetchBookmark()
  }

  get id(): any {
    try {
      return this.$route.params.id
    } catch {
      return null
    }
  }

  async fetchBookmark() {
    const res = await this.$http.get(`/bookmarks/${this.id}`)
    this.bookmark = res.data
  }

  deleteBookmark() {
    this.$confirm('此操作将永久删除该收藏夹, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(`/bookmarks/${this.id}`)
        this.$notify({
          title: '成功',
          message: '删除收藏夹成功',
          type: 'success'
        })
        this.$router.push('/u/bookmark')
      })
      .catch(() => {})
  }
}
</script>

<style lang="scss">
.bookmark-title {
  border-radius: 50%;
  border: 1px solid;
  width: 36px;
  height: 36px;
  text-align: center;
}
</style>
