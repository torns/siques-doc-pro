<template>
  <div class="sidebar">
    <div
      v-if="data"
      class="shadow-1"
      style="height:204px;background-color:white;"
    >
      <div class="px-4 py-4">
        <div class="d-flex">
          <div class="pr-3">
            <div
              class="d-flex bg-light border-radius jc-center ai-center"
              style="height:65px;width:65px;"
            >
              <i class="opacity80 fs-ll iconfont icon-zhuanlan"></i>
            </div>
          </div>
          <div class="d-flex flex-column jc-between">
            <h3>
              {{ collection.name }}
            </h3>
            <div
              style="width: fit-content;"
              class="fs-xm bg-blue text-white border-radius px-1 "
            >
              用户专栏
            </div>
          </div>
        </div>
        <div class="pt-3 d-flex">
          <div class="pr-5">
            <span class="font-bold">{{ collection.interest }}</span> 人关注
          </div>

          <div>
            <span class="font-bold">{{ collection.amount }}</span> 篇文章
          </div>
        </div>
        <div class="pt-4">
          <el-button @click="followCollection" size="small" type="primary">{{
            isInterest ? '已关注' : '关注专栏'
          }}</el-button>
          <el-button
            @click="$router.push(`/blogs/${collection.id}`)"
            size="small"
            type="plain"
            >专栏主页</el-button
          >
        </div>
      </div>
    </div>
    <sq-leaderboard
      v-if="relaPost != null"
      :postId="data.id"
      :data="relaPost"
    ></sq-leaderboard>
    <div id="toc">
      <div
        class="d-none d-lg-block  bg-white py-3 shadow-2"
        style="margin-top:2.7em;max-height: calc(100vh - 120px); min-height:200px;width:300px"
      >
        <div class="title fs-xl pl-2 pb-3" style="font-weight:600">目录</div>
        <div style="overflow: hidden; overflow-y: auto;">
          <nav
            id="post-toc"
            v-scroll-spy-active
            class="nav d-flex flex-column"
          ></nav>
        </div>
      </div>
      <div
        class="d-none d-lg-block  bg-white mt-3 px-2 shadow-2"
        style="max-height: calc(100vh - 120px); min-height:200px;width:300px"
      >
        <div class="py-2 text-center">
          <div class="text-left">关于我</div>
          <el-avatar
            :size="100"
            :src="data.user.avator[0] ? data.user.avator[0].url : ''"
            class="shadow-1"
            style="background-color: white ;border: 1px solid #de7d7d;padding: 3px;"
          >
            <img src="~/static/avator.jpg" />
          </el-avatar>
          <div class="py-2">{{ data.user.name }}</div>
          <div class="pb-2">
            {{
              data.user.description
                ? data.user.description
                : '也许将来作者会在这里留下一点痕迹'
            }}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
@Component({})
export default class SideBar extends Vue {
  @Prop()
  data: any
  collection = []
  isInterest = false
  relaPost = null

  mounted() {
    this.initfetchCollection()
  }

  get isUser() {
    return this.$store.state.UserNotExist
  }

  changeStatu() {
    if (!this.isUser) {
      this.$store.state.auth.user.interest.map((e: any) => {
        if (this.data.collection.id === e.id) {
          this.isInterest = true
        }
      })
    }
  }

  async fetchRelaPost() {
    const tags = await listIntercep(this.data.tags)

    const link =
      `/posts/all?limit=5&page=1&sort=liked` +
      `&taglist=${tags}` +
      `&type=post&listId=true`
    const res = await this.$http.get(link)
    this.relaPost = res.data
  }

  async followCollection() {
    if (!this.isUser) {
      await this.$http.get(`/users/${this.data.collection.id}/interest`)
      this.fetchCollection()
      this.isInterest = !this.isInterest
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async fetchCollection() {
    const res = await this.$http.get(
      `/collections/${this.data.collection.id}/post`
    )

    this.collection = res.data
  }

  async initfetchCollection() {
    const res = await this.$http.get(
      `/collections/${this.data.collection.id}/post`
    )
    this.fetchRelaPost()
    this.collection = res.data
    this.changeStatu()
  }
}
</script>

<style lang="scss">
.sidebar {
  width: 300px;
  height: auto;
}
</style>
