<template>
  <div>
    <transition
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <div
        v-if="!direction"
        class="bg-white w-100 d-flex ai-center jc-center shadow-1"
        style="position: fixed;top: 0;height:60px;z-index:1"
      >
        <div class="font-bold ">{{ post.title }}</div>
      </div>
    </transition>
    <div class="bg-light">
      <sq-bookmark ref="bookmark"></sq-bookmark>
      <div class="container pt-4 pb-3 animated fadeIn">
        <el-row :gutter="0" type="flex">
          <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
            <article class="bg-white shadow-1 border-radius">
              <div class="pt-5 ">
                <h1
                  class="bg-light-green boder-x"
                  style="padding-left:25px;padding-right:25px;"
                >
                  <div class="text-dark py-2 ">{{ post.title }}</div>
                </h1>
              </div>
              <div>
                <div v-if="post.title" style="padding:25px">
                  <div
                    class="d-flex flex-column menu-button"
                    style="margin-top:3.4em"
                  >
                    <div class="mb-2 text-center">{{ liked }}</div>
                    <div @click="like">
                      <sq-likebutton :status="isLike"></sq-likebutton>
                    </div>

                    <i></i>
                    <el-tooltip content="收藏" placement="right" effect="dark">
                      <el-button
                        @click="showBookmarkDialog(post.id)"
                        type="text"
                        circle
                      >
                        <i class="iconfont icon-book-mark"></i>
                      </el-button>
                    </el-tooltip>

                    <i></i>
                    <el-tooltip content="评论" placement="right" effect="dark">
                      <el-button style="margin-top:-15px" type="text" circle>
                        <a class="text-primary" href="#comment"
                          ><i class="iconfont fs-xs icon-comments"> </i
                        ></a>
                      </el-button>
                    </el-tooltip>
                  </div>

                  <div class="d-flex py-3 ">
                    <router-link :to="`/u/${post.user.id}`">
                      <el-avatar
                        :size="60"
                        :src="
                          post.user.avator[0] ? post.user.avator[0].url : ''
                        "
                        class="shadow-1"
                        style="background-color: white ;border: 1px solid #de7d7d;padding: 3px;"
                      >
                        <img src="~/static/avator.jpg" />
                      </el-avatar>
                    </router-link>
                    <div class="pl-2 ">
                      <div style="height: 32px;" class="d-flex ai-baseline">
                        <router-link :to="`/u/${post.user.id}`">
                          <div
                            class="mr-2 font-bold text-primary hover-4 point"
                          >
                            {{ post.user.name }}
                          </div>
                        </router-link>
                        <el-button
                          v-if="!isowner"
                          @click="follow(post.user.id)"
                          type="text"
                          class="btn"
                          >关注</el-button
                        >
                        <el-button v-else type="text">作者</el-button>
                      </div>
                      <div class="d-flex fs-xm ai-center pt-1 text-gray-1">
                        <div class="pr-2">
                          <i class="el-icon-time"></i>
                          {{
                            $dayjs(post.created).format('YYYY.MM.DD HH:MM:ss')
                          }}
                        </div>

                        <div>
                          <i class="el-icon-view pr-1"></i>{{ post.views }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tag d-flex ai-baseline mb-3">
                    <ul class="d-flex">
                      <li v-for="tag in post.tags" :key="tag.id">
                        <router-link :to="`/t/${tag.id}`">
                          <el-tag
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
                    id="post-content"
                    v-scroll-spy
                    v-if="post.body"
                    v-html="post.body"
                    v-highlight
                    class="article lh-3 "
                  ></div>
                  <div class="text-primary mt-3 fs-xm">
                    阅读：{{
                      post.views > 1000
                        ? (post.views / 1000).toFixed(1) + 'k'
                        : post.views
                    }}
                    <span>.</span>
                    <span class="pr-2">字数：{{ post.counts }}</span>
                    {{
                      $dayjs(
                        Date.now() - new Date(post.created).getTime()
                      ).format('发布于DD天 HH小时 MM分钟前')
                    }}
                  </div>
                  <div class="d-flex jc-center my-4">
                    <el-button @click="like" class="hover-3" type="plain">
                      <i class="pr-2 iconfont icon-Thumbsup"></i>
                      {{ liked }} 赞
                    </el-button>

                    <el-button
                      @click="showBookmarkDialog(post.id)"
                      class="hover-3"
                      type="plain"
                    >
                      <i class="pr-2 iconfont icon-bookmark"></i
                      ><span>收藏</span>
                    </el-button>

                    <share-dialog :description="post" class="pl-2">
                      <el-button class="hover-3" type="plain">
                        <i class="pr-2  iconfont icon-share"></i>分享
                      </el-button>
                    </share-dialog>
                  </div>
                  <div class="fs-xm text-center text-gray hover-1">
                    本作品系 原创 ， 采用
                    <a
                      class="text-gray"
                      href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                      >《署名-非商业性使用-禁止演绎 4.0 国际》</a
                    >许可协议
                  </div>
                  <el-divider></el-divider>
                </div>
              </div>
            </article>
            <div id="card">
              <sq-card :data="recommendCollection"></sq-card>
            </div>
            <div id="comment">
              <div v-if="fetchedComment" class="font-bold fs-xl py-1">
                {{ fetchedComment.length }}条评论
              </div>
              <div v-else class="font-bold fs-xl py-1">0条评论</div>
              <div
                class="py-4 bg-white border-radius shadow-1"
                style="min-height:100px"
              >
                <div class="px-4">
                  <div class="d-flex">
                    <div>
                      <el-avatar class="mr-3">user</el-avatar>
                    </div>
                    <el-input
                      v-model="comment"
                      placeholder="撰写评论"
                    ></el-input>
                  </div>
                  <div class="text-right mt-4">
                    <el-button @click="sendComment" type="primary"
                      >提交评论</el-button
                    >
                  </div>
                </div>

                <div v-if="fetchedComment" class="commentBody pt-3 px-4">
                  <div v-for="(comment, index) in fetchedComment" :key="index">
                    <div class="pb-4">
                      <div class="d-flex">
                        <div class="mr-3">
                          <router-link
                            :to="`/u/${comment.user.id}`"
                            tag="div"
                            class="point"
                          >
                            <el-avatar class="shadow-1">
                              <div v-if="!comment.user.avator[0]">user</div>
                              <img
                                v-else
                                :src="comment.user.avator[0].url"
                                alt
                              />
                            </el-avatar>
                          </router-link>
                        </div>
                        <div>
                          <div class="d-flex flex-wrap ai-center">
                            <div
                              style="font-weight:600"
                              class="text-primary hover-4 "
                            >
                              <router-link
                                :to="`/u/${comment.user.id}`"
                                tag="div"
                                class="point fs-lg"
                                >{{ comment.user.name }}</router-link
                              >
                            </div>
                            ：
                            <div>{{ comment.body }}</div>
                          </div>
                          <div class="d-flex fs-sm ai-baseline">
                            <el-button
                              @click="commentLike(comment.id)"
                              type="text"
                            >
                              <i class="iconfont icon-thumbs-up text-gray"></i>
                              <span class="text-gray">
                                {{ comment.liked }}</span
                              >
                            </el-button>

                            <div
                              @click="
                                showComment == comment.id
                                  ? (showComment = '')
                                  : (showComment = comment.id)
                                showReply = ''
                                replyData = ''
                              "
                              class="text-primary px-2 point"
                            >
                              回复
                            </div>

                            <div class="fs-xxs text-gray">
                              {{ $dayjs(comment.created).format('YYYY-MM-DD') }}
                            </div>
                            <div
                              class="xs fs-xxs ml-2 text-gray bg-2 border-radius px-1 ellipsis-1"
                            >
                              {{ comment.browser }}
                            </div>
                            <div
                              class="xs fs-xxs  ml-2 text-gray bg-2 border-radius px-1 ellipsis-1"
                            >
                              {{ comment.os }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="showComment == comment.id"
                        style="min-width:0;margin-left:3em;margin-right:0em;"
                      >
                        <el-input
                          v-model="replyData"
                          size="mini"
                          placeholder="回复内容"
                        ></el-input>
                        <div class="text-right">
                          <el-button
                            @click="sendReply(comment.id, comment.user.id)"
                            class="mt-3"
                            size="mini"
                            type="primary"
                            >提交评论</el-button
                          >
                        </div>
                      </div>
                      <div
                        class="bg-light-1 border-radius px-3"
                        style="margin-left:3em;margin-right:0em;"
                      >
                        <div
                          v-for="reply in comment.reply"
                          :key="reply.id"
                          class="py-2"
                        >
                          <div class="d-flex ai-baseline">
                            <div
                              style="font-weight:600"
                              class="text-primary pr-1"
                            >
                              {{ reply.from_uid.name }}：
                              <span style="font-weight:400" class
                                >@{{ reply.to_uid.name }}</span
                              >
                            </div>
                            <div class="fs-xm">{{ reply.body }}</div>
                          </div>
                          <div class="d-flex ai-baseline fs-sm">
                            <el-button @click="replyLike" type="text">
                              <i class="text-gray iconfont icon-Thumbsup"></i>
                            </el-button>
                            <div
                              @click="
                                showReply == reply.id
                                  ? (showReply = '')
                                  : (showReply = reply.id)
                                replyData = ''
                                showComment = ''
                              "
                              class="text-primary px-2 point"
                            >
                              回复
                            </div>
                            <div></div>
                            <div class="fs-xxs">
                              {{
                                $dayjs(reply.created).format('YYYY-MM-DD HH点')
                              }}
                            </div>
                          </div>
                          <div v-if="showReply == reply.id">
                            <el-input
                              v-model="replyData"
                              size="mini"
                              placeholder="回复内容"
                            ></el-input>
                            <div class="text-right">
                              <el-button
                                @click="
                                  sendReply(comment.id, reply.from_uid.id)
                                "
                                class="mt-3"
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
            </div>

            <div>
              <div class="font-bold fs-xl py-1 pt-4">推荐阅读</div>
              <div
                v-for="post in recommendPost"
                :key="post.id"
                class="point hover-1 py-4 px-3 bg-white border-radius shadow-1"
                style="min-height:100px"
              >
                <router-link :to="`/p/${post.id}`" tag="a">
                  <h3>{{ post.title }}</h3>
                  <div class="text-gray py-2">{{ post.alias }}</div>
                  <div class="d-flex fs-xm ai-baseline">
                    <div class="text-primary pr-3">{{ post.user.name }}</div>
                    <div class="text-gray">阅读{{ post.views }}</div>
                  </div>
                </router-link>
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
            <div class="pl-3 ">
              <sq-postbar :data="post"></sq-postbar>
            </div>
          </el-col>
        </el-row>
      </div>
      <div></div>
    </div>
    <sq-backbtn :direction="direction"></sq-backbtn>
    <sq-footer></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import mediumZoom from 'medium-zoom'
import mdTable from '../../../plugins/markdownTable'
import { clock, getDirection, hljs } from '../../../plugins/utils.js'

import md from '../../../plugins/markdown'
import { Browser, OS } from '../../../plugins/browserInfo.js'
import PostSideBar from '~/components/SideBar/PostSideBar.vue'
import likebutton from '~/components/subgroup/likebutton.vue'
import share from '~/components/dialog/share.vue'
import card from '~/components/Card/card.vue'

const mediumzoom = () => {
  mediumZoom(document.querySelectorAll('p img'))
}

@Component({
  components: {
    'sq-postbar': PostSideBar,
    'sq-likebutton': likebutton,
    'share-dialog': share,
    'sq-card': card
  }
})
export default class Post extends Vue {
  async asyncData({ params }: any) {
    // 在 @component 中不可以写 this.$http //

    const http = Vue.prototype.$http
    const res = await http.get(`posts/${params.id}?collection=true`)
    res.data.body = md.render(res.data.body)

    const link = `/posts/all?limit=8&sort=liked&type=post`
    const res1 = await http.get(link)

    const res2 = await http.get(`collections/1/recommend`)

    return {
      post: res.data,
      recommendPost: res1.data[0],
      recommendCollection: res2.data
    }
  }

  head() {
    return {
      title: this.post.title + '_文章_思趣'
    }
  }

  post: any = ''
  recommendPost = []
  liked: number = 0
  comment = ''
  replyData: string = ''
  fetchedComment = ''
  showReply = ''
  showComment = ''
  bookmarks = []
  list = []
  dialogFormVisible = false
  checkList = []
  browser: any = Browser[0] || ''
  os = OS || ''
  timer: any
  timer2: any
  direction = ''

  mounted() {
    this.fetchpost(this.id)
    mdTable()
    this.fetchComment()
    this.scrollDirection()
    this.getDierction()
  }

  beforeMount() {
    this.initPost()
  }
  // TS中的计算属性
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timer2) {
      clearInterval(this.timer2)
    }
  }

  scrollDirection() {
    this.timer = clock(800)

    // eslint-disable-next-line
  }

  getDierction() {
    this.timer2 = setInterval(() => {
      this.direction = getDirection()
    }, 800)
  }

  get id(): any {
    return this.$route.params.id
  }

  get isUser(): any {
    return !this.$store.state.UserNotExist
  }

  get isowner() {
    try {
      return this.$store.state.auth.user.id === this.post.user.id
    } catch {
      return false
    }
  }

  get isLike() {
    let status = false
    try {
      this.$store.state.auth.user.likes.map((e: any) => {
        if (e.id === this.post.id) {
          status = true
        }
      })
    } catch {
      return false
    }
    return status
  }

  initPost() {
    this.$nextTick(() => {
      hljs()
    })
    setTimeout(() => {
      mediumzoom()
    }, 500)
  }

  async fetchpost(id: any) {
    if (this.post) {
      const res = await this.$http.get(`/users/${this.id}/liked/count`)
      this.liked = res.data
    }
  }

  // 获取文章评论
  async fetchComment() {
    const res = await this.$http.get(`posts/${this.id}/comments`)
    this.fetchedComment = res.data
  }

  async like() {
    if (this.isUser) {
      const res = await this.$http.get(`/users/${this.id}/like`)
      if (res.data) {
        const data = { id: this.post.id }
        this.$store.commit('toggleUserLiked', data)
      } else {
        this.$store.commit('deleteUserLiked', this.post.id)
      }
      this.fetchpost(this.id)
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async commentLike(id: any) {
    if (this.isUser) {
      await this.$http.get(`posts/${id}/comments/like`)
      this.fetchComment()
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async replyLike() {}

  // 关注
  async follow(id: any) {
    // 提供用户id
    if (this.isUser) {
      const res = await this.$http.get(`/users/${id}/follow`)
      if (res.data) {
        this.$notify({
          type: 'success',
          message: '关注成功',
          title: '成功'
        })
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async sendComment() {
    if (this.isUser) {
      if (this.comment) {
        const data = {
          body: this.comment,
          owner_uid: this.post.user.id, // 这个资源的用户id
          browser: this.browser,
          os: this.os
        }
        await this.$http.post(`/posts/${this.id}/comments`, data)
        this.$notify({
          type: 'success',
          message: '评论成功',
          title: '成功'
        })
        this.comment = ''
        this.fetchComment()
      } else {
        this.$notify({
          type: 'error',
          message: '内容不能为空',
          title: '评论失败'
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
    // console.log(commentId);
    // console.log(this.$store.state.auth.user.id);
    // console.log(from_uid);
    if (this.isUser) {
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
      this.fetchComment()
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  showBookmarkDialog(id: any) {
    if (this.isUser) {
      this.dialogFormVisible = true
      const ref: any = this.$refs.bookmark
      ref.showBookmark(id)
    } else {
      this.$store.commit('toggleLoginForm')
    }
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

.el-avatar > img {
  border-radius: 50%;
}
</style>
