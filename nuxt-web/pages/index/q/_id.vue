<template>
  <div class="bg-light">
    <div class="container pt-4 pb-3">
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
            <el-button @click="bookmarkQuestion" size="mini" type="primary"
              >确 定</el-button
            >
          </div>
        </div>
      </el-dialog>
      <bookmark-dialog ref="dialog" @refetch="refetch"></bookmark-dialog>
      <el-row :gutter="0" type="flex">
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
          <div class="font-songti bg-white shadow-1 border-radius">
            <div>
              <div v-if="question.title" style="padding:25px">
                <div class="d-flex flex-column menu-button">
                  <div class="mb-2 text-center">{{ liked }}</div>
                  <el-button
                    @click="like"
                    class="hover-3"
                    type="plain"
                    circle
                    style="width:fit-content;"
                  >
                    <i class="iconfont icon-thumbs-up"></i>
                  </el-button>
                  <i></i>
                  <el-button @click="showBookmarkDialog" type="text" circle>
                    <i class="iconfont icon-book-mark"></i>
                  </el-button>

                  <i></i>

                  <el-button style="margin-top:-15px" type="text" circle>
                    <i class="iconfont fs-xs icon-comments"></i>
                  </el-button>

                  <i></i>
                  <share-dialog :description="question" class>
                    <el-button style="margin-top:-25px" type="text" circle>
                      <i class="iconfont icon-share1"></i>
                    </el-button>
                  </share-dialog>
                </div>
                <h1 class="py-4">{{ question.title }}</h1>
                <div class="d-flex py-3">
                  <router-link :to="`/u/${question.user.id}`">
                    <div v-if="question.user.avator[0].url !== null">
                      <img
                        :src="question.user.avator[0].url"
                        class="avator shadow-1 contain"
                      />
                    </div>
                    <img
                      v-else
                      src="~/static/avator.jpg"
                      class="avator shadow-1 contain"
                    />
                  </router-link>
                  <div class="pl-2">
                    <div class="d-flex ai-baseline">
                      <div class="pr-2">{{ question.user.name }}</div>
                      <el-button
                        @click="follow(question.user.id)"
                        type="text"
                        class="btn"
                        >关注</el-button
                      >
                      <el-button
                        v-if="
                          this.$store.state.auth
                            ? this.$store.state.auth.user
                              ? this.$store.state.auth.user.id ===
                                question.user.id
                                ? true
                                : false
                              : false
                            : false
                        "
                        @click="$router.push(`/ask/${question.id}`)"
                        type="text"
                        >编辑</el-button
                      >
                    </div>
                    <div class="d-flex fs-xm">
                      <div class="pr-2">
                        {{
                          $dayjs(question.created).format('YYYY.MM.DD HH:MM:ss')
                        }}
                      </div>
                      <div class="pr-2">字数：{{ question.counts }}</div>
                      <div>阅读：{{ question.views }}</div>
                    </div>
                  </div>
                </div>
                <div class="tag d-flex ai-baseline">
                  <ul class="d-flex">
                    <li v-for="tag in question.tags" :key="tag.id">
                      <router-link :to="`/t/${tag.id}`"
                        ><el-tag
                          class="bg-2 hover-3 mr-2"
                          effect="light"
                          size="small"
                        >
                          <span class="fs-sm">{{ tag.name }}</span>
                        </el-tag>
                      </router-link>
                    </li>
                  </ul>
                  <div class="text-gray fs-xm">阅读约2分钟</div>
                </div>

                <div
                  v-if="question.body"
                  v-html="question.body"
                  v-highlight
                  class="article lh-3 pt-3"
                ></div>
                <div class="text-primary mt-3 text-gray-1 fs-xm">
                  阅读：{{ question.views }}
                </div>
                <div class="d-flex ai-baseline jc-left my-4">
                  <el-button @click="like" class="hover-3" type="plain">
                    <i class="pr-2 iconfont icon-Thumbsup"></i>
                    {{ liked }} 赞
                  </el-button>

                  <el-button
                    @click="showBookmarkDialog"
                    class="hover-3"
                    type="plain"
                  >
                    <i class="pr-2 iconfont icon-bookmark"></i>收藏
                  </el-button>

                  <el-button @click="followQue" class="hover-3" type="plain">
                    <i class="pr-2  iconfont icon-note"></i
                    >{{ question.concerned }}关注
                  </el-button>
                  <el-button
                    @click="showCommentPanel = !showCommentPanel"
                    type="text"
                    >评论</el-button
                  >
                  <span class="px-2">·</span>

                  <div class="fs-sm text-primary mt-3">
                    {{
                      $dayjs(
                        Date.now() - new Date(question.created).getTime()
                      ).format('发布于DD天 HH小时 MM分钟前')
                    }}
                  </div>
                </div>

                <el-divider></el-divider>
              </div>
            </div>
          </div>

          <div v-if="fetchedComment" class="answerPanel pt-5">
            <div class="font-bold fs-xl py-1">
              {{ fetchedComment.length }}条回答
            </div>
            <div
              v-for="answer in fetchedComment"
              :key="answer.id"
              style="min-height:200px"
              class="bg-white"
            >
              <div class="px-4 py-3">
                <div class="d-flex ai-center">
                  <el-avatar :size="35" class="mr-2" src="https://empty">
                    <img
                      v-if="answer.user.avator[0].url"
                      :src="answer.user.avator[0].url"
                    />
                    <img v-else src="/static/avator" />
                  </el-avatar>
                  <div
                    style="font-weight:600"
                    class="hover-3 text-primary fs-lg"
                  >
                    {{ answer.user.name }}
                  </div>
                </div>
                <div class="pt-3">
                  {{ answer.body }}
                </div>
                <div class="d-flex ai-baseline pt-3">
                  <el-button
                    @click="commentLike(answer.id)"
                    size="small"
                    type="plain"
                  >
                    <i class="fa fa-thumbs-o-up  pr-2"> </i>
                    {{ answer.liked }} 赞
                  </el-button>
                  <el-button @click="adoptAnswer" size="small" type="plain">
                    <i class="fa fa-check-square-o pr-2"> </i
                    >采纳回答</el-button
                  >
                  <el-button
                    @click="
                      showComment == answer.id
                        ? (showComment = '')
                        : (showComment = answer.id)
                      showReply = ''
                      replyData = ''
                    "
                    type="text"
                    >评论</el-button
                  >
                  <div class="fs-xm pl-2">
                    {{ $dayjs(answer.created).format('M月D号') }}
                  </div>
                </div>
                <div
                  v-if="showComment == answer.id"
                  class="pt-3 mt-2 bg-light-1"
                >
                  <div class="mx-3" style="min-width:0;">
                    <el-input
                      v-model="replyData"
                      size="mini"
                      placeholder="撰写评论"
                    ></el-input>
                    <div class="text-right mt-2">
                      <el-button
                        @click="sendReply(answer.id, answer.user.id)"
                        size="mini"
                        type="primary"
                        >提交评论</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="mt-3  bg-light-1">
                  <div class="mx-3 pt-3 ">
                    <div v-for="reply in answer.reply" :key="reply.id">
                      <span class="text-primary font-bold">
                        <router-link
                          :to="`/u/${reply.from_uid.id}`"
                          tag="span"
                          class="point hoverlink"
                          >{{ reply.from_uid.name }}</router-link
                        >
                        :
                      </span>
                      <span> {{ reply.body }}</span>
                      <div class="py-1">
                        <el-link @click="replyLike" type="text"
                          ><i class="fa fa-thumbs-o-up"></i> {{ reply.liked }}
                        </el-link>
                        <span>·</span>
                        <el-button
                          @click="
                            showReply == reply.id
                              ? (showReply = '')
                              : (showReply = reply.id)
                            replyData = ''
                            showComment = ''
                          "
                          type="text"
                          >回复</el-button
                        >
                        <span class="fs-xm text-gray">{{
                          $dayjs(reply.created).format('M月D日 H:MM')
                        }}</span>
                      </div>
                      <div v-if="showReply == reply.id">
                        <el-input
                          v-model="replyData"
                          size="mini"
                          placeholder="回复内容"
                        ></el-input>
                        <div class="text-right mt-3">
                          <el-button
                            @click="sendReply(answer.id, reply.from_uid.id)"
                            size="mini"
                            type="primary"
                            >提交评论</el-button
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="font-bold pt-5 fs-xl">撰写回答</div>
          <div class="pt-1">
            <div>
              <markdown
                ref="markdown"
                @submit="sendAnswer"
                name="提交回答"
                height="400px"
              ></markdown>
            </div>
          </div>
        </el-col>
        <el-col
          :xs="0"
          :sm="6"
          :md="8"
          :lg="6"
          :xl="6"
          class="hidden-md-and-down pl-2"
        >
          <div class="pl-3"></div>
        </el-col>
      </el-row>
    </div>

    <sq-footer class="mt-2"></sq-footer>
    <el-backtop></el-backtop>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// import hljs from 'highlight.js'
import md from '../../../plugins/markdown'
import footer from '~/components/footer/Footer.vue'
import PostSideBar from '~/components/SideBar/PostSideBar.vue'

import bookmark from '~/components/dialog/bookmark.vue'
import share from '~/components/dialog/share.vue'

// const highlightCode = () => {
//   const preEl = document.querySelectorAll('pre code')

//   preEl.forEach((el) => {
//     hljs.highlightBlock(el)
//   })
// }

@Component({
  components: {
    'el-footer': footer,
    'sq-postbar': PostSideBar,
    'bookmark-dialog': bookmark,
    'share-dialog': share
  }
})
export default class Question extends Vue {
  // async asyncData({ params, $api }) {
  //   const id = await params.id // When calling /abc the slug will be "abc"
  //   console.log(id)
  // }
  showCommentPanel = false
  question: any = ''
  recommendPost = []
  liked: number = 0
  followLen: number = 0
  comment = ''
  replyData: string = ''
  fetchedComment = ''
  showReply = ''
  showComment = ''
  bookmarks = []
  list = []
  dialogFormVisible = false
  checkList = []
  mounted() {
    this.fetchQuestion(this.id)
    this.fetchAnswer()
  }
  updated() {
    // highlightCode()
  }
  // TS中的计算属性
  get id(): any {
    return this.$route.params.id
  }

  get isUser(): any {
    return !this.$store.state.UserNotExist
  }

  async fetchQuestion(id: any) {
    if (!this.question) {
      const res = await this.$http.get(`posts/${id}`)
      this.question = res.data
      this.liked = res.data.liked
      // if (!res.data.editor) {
      res.data.body = md.render('[[toc]] \n' + res.data.body)
      // }
    } else {
      // 如果文章已经载入就请求轻量级的方法
      const res = await this.$http.get(`/users/${this.id}/liked/count`)
      this.liked = res.data
    }
  }

  // 获取文章评论
  async fetchAnswer() {
    const res = await this.$http.get(`posts/${this.id}/comments`)
    this.fetchedComment = res.data
  }

  async like() {
    if (this.isUser) {
      await this.$http.get(`/users/${this.id}/like`)
      this.fetchQuestion(this.id)
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async commentLike(id: any) {
    await this.$http.get(`posts/${id}/comments/like`)
    this.fetchAnswer()
  }

  async replyLike() {}

  // 关注
  async follow(id: any) {
    // 提供用户id
    await this.$http.get(`/users/${id}/follow`)
  }

  // 关注问题
  async followQue() {
    if (this.isUser) {
      const res = await this.$http.get(`/users/${this.id}/concern`)
      if (res.data) {
        this.question.concerned += 1
        this.$notify({
          title: '成功',
          type: 'success',
          message: '关注成功'
        })
      } else {
        this.$notify({
          title: '消息',
          type: 'info',
          message: '已关注该问题'
        })
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }
  adoptAnswer() {}

  async sendAnswer() {
    if (this.isUser) {
      const ref: any = this.$refs.markdown
      const answer = ref.getContent()
      if (answer) {
        const data = {
          body: answer,
          title: this.question.title,
          owner_uid: this.question.user.id, // 这个资源的用户id
          type: 'answer'
        }
        await this.$http.post(`/posts/${this.id}/comments`, data)
        this.$notify({
          type: 'success',
          message: '回答成功',
          title: '成功'
        })
        ref.setContent('')
        this.fetchQuestion(this.id)
      } else {
        this.$notify({
          type: 'error',
          message: '内容不能为空',
          title: '回答失败'
        })
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  // 这里commentId就是父级的评论
  // 当前用户id
  // 被回复用户id:from_uid
  async sendReply(commentId: any, fromUid: any) {
    if (this.isUser) {
      if (this.replyData) {
        const data = {
          parent_id: commentId,
          body: this.replyData,
          from_uid: this.$store.state.auth.user.id,
          to_uid: fromUid
        }

        await this.$http.post('posts/1/reply', data)
        this.$notify({
          type: 'success',
          message: '回复成功',
          title: '成功'
        })
        this.replyData = ''
        this.showReply = ''
        this.showComment = ''
      } else {
        this.$notify({
          type: 'info',
          message: '回复内容不能为空',
          title: '提示'
        })
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  showCreatDialog() {
    const ref: any = this.$refs.dialog
    ref.dialogFormVisible = true
  }
  showBookmarkDialog() {
    this.dialogFormVisible = true
    this.fetchBookmark()
  }

  async fetchBookmark() {
    const res = await this.$http.get(
      `/bookmarks/${this.$store.state.auth.user.id}/user`
    )
    this.bookmarks = res.data

    const list: any = []
    await this.bookmarks.map((el: any) => {
      el.posts.map((e: any) => {
        if (e.id === parseInt(this.id)) {
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
  updatePost() {}

  async bookmarkQuestion() {
    await this.$http.get(
      `/bookmarks?postId=${this.id}&bookmarkId=${this.checkList}`
    )
    this.$notify({
      type: 'success',
      message: '收藏成功',
      title: '成功'
    })
    this.dialogFormVisible = false
  }
}
</script>

<style lang="scss">
.menu-button {
  @media (max-width: 1200px) {
    display: none;
  }
}

.menu-button {
  position: fixed;
  margin-left: -6em;
  margin-top: 10em;
}

.avator {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  object-fit: contain;
}
</style>
