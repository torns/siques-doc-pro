<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div class="d-flex jc-between">
          <div class="d-flex">
            <div>
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#212121" fill-rule="evenodd">
                  <path
                    d="M38.75 1.063c.583-.167 1.104-.073 1.563.28.458.355.687.824.687 1.407v24.313c0 .5-.167.963-.5 1.39-.333.427-.74.703-1.219.828l-13.218 3.594a3.319 3.319 0 0 1-.641.125c-.219.02-.412.031-.578.031-.23 0-.453-.015-.672-.047a5.775 5.775 0 0 1-.578-.109l-12.875-3.563a2.42 2.42 0 0 1-1.219-.859c-.333-.427-.5-.89-.5-1.39V2.75c0-.583.23-1.052.688-1.406.458-.354.979-.448 1.562-.282l12.875 3.563c.167.042.401.063.703.063.302 0 .537-.021.703-.063L38.75 1.062zM24 30.905V6.625a.742.742 0 0 1-.203-.031.742.742 0 0 0-.203-.032L11 3.063v24c0 .063.026.125.078.188a.482.482 0 0 0 .14.125L24 30.906zm15-3.843v-24l-12.938 3.5H26v24.25l12.75-3.438a.67.67 0 0 0 .156-.125c.063-.063.094-.125.094-.188zm-9.938-14.625c-.208 0-.406-.063-.593-.188a.9.9 0 0 1-.375-.531 1.033 1.033 0 0 1 .11-.766c.135-.24.327-.4.577-.484l7-1.969c.271-.063.526-.026.766.11.24.135.4.338.484.609a.968.968 0 0 1-.11.734c-.135.24-.327.401-.577.485l-7 1.968a.31.31 0 0 1-.14.031h-.142zm0 6c-.208 0-.406-.063-.593-.188a.9.9 0 0 1-.375-.531 1.033 1.033 0 0 1 .11-.766c.135-.24.327-.4.577-.484l7-1.969c.271-.063.526-.026.766.11.24.135.4.338.484.609a.968.968 0 0 1-.11.734c-.135.24-.327.401-.577.485l-7 1.968a.31.31 0 0 1-.14.032h-.142zm0 6c-.208 0-.406-.063-.593-.188a.9.9 0 0 1-.375-.531 1.033 1.033 0 0 1 .11-.766c.135-.24.327-.4.577-.484l7-1.969c.271-.063.526-.026.766.11.24.135.4.338.484.609a.968.968 0 0 1-.11.734c-.135.24-.327.401-.577.485l-7 1.968a.31.31 0 0 1-.14.032h-.142zm-7.718-13.97c.25.084.442.246.578.485.135.24.172.495.11.766a.9.9 0 0 1-.376.531 1.053 1.053 0 0 1-.593.188h-.141a.31.31 0 0 1-.14-.032l-7-1.969a1.017 1.017 0 0 1-.579-.484.968.968 0 0 1-.11-.734c.084-.271.246-.474.485-.61.24-.135.495-.172.766-.109l7 1.969zm0 6c.25.084.442.246.578.485.135.24.172.495.11.766a.9.9 0 0 1-.376.531 1.053 1.053 0 0 1-.593.188h-.141a.31.31 0 0 1-.14-.032l-7-1.968a1.017 1.017 0 0 1-.579-.485.968.968 0 0 1-.11-.734c.084-.271.246-.474.485-.61.24-.135.495-.172.766-.109l7 1.969zm0 6c.25.084.442.246.578.485.135.24.172.495.11.766a.9.9 0 0 1-.376.531 1.053 1.053 0 0 1-.593.188h-.141a.31.31 0 0 1-.14-.032l-7-1.968a1.017 1.017 0 0 1-.579-.485.968.968 0 0 1-.11-.734c.084-.271.246-.474.485-.61.24-.135.495-.172.766-.109l7 1.969zM19.012 41.096h-3.3c.192-.648.384-1.32.552-1.932h3.912c.168 0 .3-.06.336-.192-.576-.528-1.56-1.308-1.56-1.308l-.876 1.164H16.36l.372-1.332c.324.036.468-.108.528-.252l-2.256-.648c-.084.492-.276 1.32-.516 2.232h-3.336l.096.336h3.144c-.168.636-.36 1.308-.564 1.932h-3.372l.096.336h3.18a23.56 23.56 0 0 1-.528 1.512 3.178 3.178 0 0 0-.42.3l1.656.972.636-.768h2.64c-.276.636-.684 1.44-1.08 2.112-.9-.3-2.136-.444-3.792-.312l-.06.132c1.608.516 3.612 1.74 4.656 2.868 1.404.228 1.764-1.56-.312-2.508.936-.552 1.968-1.284 2.628-1.86.276-.024.396-.06.492-.18l-1.572-1.512-.972.924h-2.592c.144-.468.324-1.056.504-1.68h5.604c.18 0 .312-.06.348-.192-.6-.552-1.644-1.392-1.644-1.392l-.912 1.248zm13.44-.768h3.468c.264-.912.588-2.328.78-3.552l2.16.672c-.048.156-.216.252-.492.252-.6 1.008-1.356 1.944-2.112 2.628h.936l.816-1.08s.924.732 1.464 1.224c-.036.132-.168.192-.336.192h-6.588l-.096-.336zm.696 3.012h3.672l.816-1.08s.924.732 1.464 1.224c-.024.132-.156.192-.336.192h-5.52l-.096-.336zm-.3-6.3l.108-.06c3.696 1.032 2.172 3.876.732 2.64-.06-.9-.444-1.86-.84-2.58zm-1.452 3.036v.816c3.168 1.044 1.62 3.492.408 2.316.036-.672-.156-1.416-.408-2.004v6.432c0 .156-.672.504-1.272.504h-.312v-4.656a9.03 9.03 0 0 1-1.644 1.812l-.132-.12c.84-1.368 1.332-3.288 1.584-5.1h-1.248l-.096-.336h1.536v-3.024l2.028.192c-.024.18-.108.3-.444.348v2.484h.108l.66-1.02s.756.708 1.176 1.164c-.036.132-.156.192-.324.192h-1.62zm6.072 6.756l.888-1.164s.996.78 1.584 1.308c-.036.132-.168.192-.348.192h-7.716l-.096-.336h5.688z"
                  />
                </g>
              </svg>
            </div>
            <div class="fs-xll pl-2">{{ collections.name }}</div>
          </div>
          <div>
            <el-button
              @click="interestCollect(collections.id)"
              type="primary"
              size="mini"
              >关注 | {{ collections.interest }}</el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <ul>
            <li v-for="(post, index) in collections.posts" :key="index">
              <div class="d-flex">
                <div class="pr-3">
                  <el-button
                    @click="like(post.id, index)"
                    style="padding-left:18px;padding-right:18px;width:10px;height:45px"
                    type="plain"
                  >
                    <div
                      class="d-flex flex-column ai-center"
                      style="position: relative;top: -6px;"
                    >
                      <i class="el-icon-caret-top"></i>
                      <div>{{ post.liked }}</div>
                    </div></el-button
                  >
                </div>
                <div>
                  <div class="fs-lg">
                    <router-link
                      :to="`/p/${post.id}`"
                      tag="div"
                      class="hoverlink"
                    >
                      {{ post.title }}
                    </router-link>
                  </div>
                  <div class="d-flex ai-baseline py-2">
                    <div class="text-primary pr-2">
                      <router-link
                        :to="`/u/${collections.user.id}`"
                        tag="div"
                        >{{ collections.user.name }}</router-link
                      >
                    </div>
                    <div class="pr-2">
                      {{ $dayjs(post.created).fromNow() }}
                    </div>
                    <div
                      @click="showBookmark(post.id)"
                      class="text-gray hoverlink fs-xm "
                    >
                      <i class="iconfont icon-book-mark pr-1"></i>

                      <span>{{ post.bookmarked }}</span>
                      收藏
                    </div>
                  </div>

                  <div>
                    <div class="text-gray fs-xm">{{ post.alias }}...</div>
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        class="hidden-sm-and-down pl-2"
        ><div v-if="collections.posts">
          {{ collections.posts.length }}篇文章
        </div></el-col
      >
      <el-backtop></el-backtop>
      <bookmark-dialog ref="dialog" @refetch="refetch"></bookmark-dialog>
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="500px"
        title="收藏"
        class="border-radius"
      >
        <div>
          <div>添加到收藏夹:</div>
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(bookmark, index) in bookmarks"
                :key="index"
                :label="bookmark.id"
                :disabled="
                  list.find((value) => {
                    return value === bookmark.id
                  })
                    ? true
                    : false
                "
                >{{ bookmark.title }}</el-checkbox
              >
            </el-checkbox-group>
            <el-button @click="showCreatDialog" type="text"
              >创建收藏夹</el-button
            >
          </div>
          <div class="text-right pt-5">
            <el-button @click="dialogFormVisible = false" size="mini"
              >取 消</el-button
            >
            <el-button @click="bookmarkPost" size="mini" type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import bookmark from '~/components/dialog/bookmark.vue'

@Component({
  components: { 'bookmark-dialog': bookmark }
})
export default class collection extends Vue {
  collections: any = []
  bookmarks: any = null
  dialogFormVisible = false
  checkList = []
  postId = ''
  list = []
  get id() {
    if (this.$route.params.id) {
      return this.$route.params.id
    } else {
      return null
    }
  }

  mounted() {
    setTimeout(() => {
      this.fetchBookmark()
    }, 500)

    this.fetchCollect()
  }

  async fetchCollect() {
    const res = await this.$http.get(`/collections/${this.id}`)
    this.collections = res.data
  }

  async like(id: any, index: any) {
    const res = await this.$http.get(`/users/${id}/like`)
    if (res.data) {
      this.collections.posts[index].liked += 1
    } else {
      this.collections.posts[index].liked -= 1
    }
  }

  async fetchBookmark() {
    const res = await this.$http.get(
      `/bookmarks/${this.$store.state.auth.user.id}/user`
    )
    this.bookmarks = res.data
  }
  async bookmarkPost() {
    await this.$http.get(
      `/bookmarks?postId=${this.postId}&bookmarkId=${this.checkList}`
    )
    this.$notify({
      type: 'success',
      message: '收藏成功',
      title: '成功'
    })
    this.dialogFormVisible = false
    this.fetchCollect()
  }

  showCreatDialog() {
    const ref: any = this.$refs.dialog
    ref.dialogFormVisible = true
  }

  async showBookmark(id: any) {
    this.dialogFormVisible = true
    this.postId = id

    const list: any = []
    await this.bookmarks.map((el: any) => {
      el.posts.map((e: any) => {
        if (e.id === id) {
          list.push(el.id)
        }
      })
    })
    this.list = list
  }
  // 刷新数据
  refetch() {
    this.fetchBookmark()
  }
  // 关注专栏
  async interestCollect(id: any) {
    const res = await this.$http.get(`users/${id}/interest`)
    if (res.data) {
      this.$notify({
        type: 'success',
        message: '关注成功',
        title: '成功'
      })
      this.collections.interest += 1
    } else {
      this.$notify({
        type: 'info',
        message: '取消关注成功',
        title: '信息'
      })
      this.collections.interest -= 1
    }
  }
}
</script>

<style lang="scss">
.el-dialog__body {
  padding-bottom: 10px;
}
.el-form {
  width: 100% !important;
  margin: 0 auto;
}
</style>
