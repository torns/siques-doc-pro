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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
@Component({})
export default class SideBar extends Vue {
  @Prop()
  data: any
  collection = []
  isInterest = false
  relaPost = null

  @Watch('data')
  idDataChanged() {
    this.initfetchCollection()
  }

  get isUser() {
    return this.$store.state.UserNotExist
  }

  // get isInterest() {
  //   return this.data.user.interest.map((e) => {
  //     let valid = false
  //     if (this.data.collection.id === e.id) {
  //       valid = true
  //     }
  //     return valid
  //   })[0]
  // }

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
