<template>
  <div>
    <div class="bg-light">
      <sq-bookmark ref="bookmark"></sq-bookmark>
      <div class="container pt-4 pb-3">
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
                      <sq-likebtn :status="isLike"></sq-likebtn>
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
                        <a
                          @click="showCommentPanel('comment')"
                          class="text-primary"
                          href="#comment"
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
                    <div class="text-gray fs-xm">
                      阅读约{{ Math.ceil(post.counts / 275) }}分钟
                    </div>
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
                    {{ '发布于 ' + $dayjs(post.created).fromNow() }}
                  </div>
                  <div class="d-flex jc-center my-4">
                    <el-button
                      size="small"
                      @click="like"
                      class="hover-2"
                      type="plain"
                    >
                      <i class="pr-2 iconfont icon-Thumbsup"></i>
                      {{ liked }} 赞
                    </el-button>

                    <el-button
                      size="small"
                      @click="showBookmarkDialog(post.id)"
                      class="hover-2"
                      type="plain"
                    >
                      <i class="pr-2 iconfont icon-bookmark"></i
                      ><span>收藏</span>
                    </el-button>

                    <share-dialog :description="post" class="px-2">
                      <el-button size="small" class="hover-2" type="plain">
                        <i class="pr-2  iconfont icon-share"></i>分享
                      </el-button>
                    </share-dialog>
                    <el-button
                      @click="showCommentPanel('comment')"
                      size="small"
                      class="hover-2"
                      type="primary"
                    >
                      <i class="pr-2 iconfont fs-xs icon-comments"></i>
                      回复
                    </el-button>
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
            <div v-if="fetchedComment.length !== 0" id="comment" class="pt-3">
              <div class="font-bold fs-xl py-1">
                {{ fetchedComment.length }}条评论
              </div>

              <div
                class="py-4 bg-white border-radius shadow-1"
                style="min-height:100px"
              >
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
                            <el-avatar class="shadow-1 bg-white">
                              <div v-if="!comment.user.avator[0]">user</div>
                              <img
                                v-else
                                :src="comment.user.avator[0].url"
                                alt
                              />
                            </el-avatar>
                          </router-link>
                        </div>
                        <div class="flex-1">
                          <div class="d-flex ai-center jc-between">
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
                            <div class="fs-xxs text-gray">
                              {{ $dayjs(comment.created).format('YYYY-MM-DD') }}
                            </div>
                          </div>
                          <div
                            class="py-2"
                            v-highlight
                            v-html="comment.body"
                          ></div>
                          <div
                            class="d-flex fs-sm ai-baseline"
                            style="justify-content: flex-end;"
                          >
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
                              class="d-flex ai-center"
                              v-if="comment.user.owner"
                            >
                              <el-tooltip content="编辑" effect="dark">
                                <div
                                  @click="
                                    showCommentPanel(
                                      'edit',
                                      comment.id,
                                      '',
                                      comment.user.name
                                    )
                                  "
                                  class="opacity40 px-2 point"
                                >
                                  <i class=" fa fa-pencil-square-o"></i>
                                </div>
                              </el-tooltip>

                              <el-tooltip content="删除" effect="dark">
                                <div
                                  @click="deleteComment('comment', comment.id)"
                                  class="opacity40 pr-2 point"
                                >
                                  <i class="fa fa-trash"></i>
                                </div>
                              </el-tooltip>
                            </div>
                            <div
                              @click="
                                showCommentPanel(
                                  'reply',
                                  comment.id,
                                  comment.user.id,
                                  comment.user.name
                                )
                              "
                              class="text-primary px-2 point"
                            >
                              回复
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 下面是回复展示模块 -->
                      <div
                        class="bg-light-1 border-radius px-3"
                        style="margin-left:3em;margin-right:0em;"
                      >
                        <div
                          v-for="reply in comment.reply"
                          :key="reply.id"
                          class="py-2"
                        >
                          <div class="d-flex ai-baseline jc-between">
                            <div
                              style="font-weight:600"
                              class="text-primary pr-1"
                            >
                              {{ reply.from_uid.name }}:
                              <span style="font-weight:400" class
                                >@{{ reply.to_uid.name }}</span
                              >
                            </div>
                            <div class="fs-xxs opacity40">
                              {{
                                $dayjs(reply.created).format('YYYY-MM-DD HH点')
                              }}
                            </div>
                          </div>
                          <div
                            v-highlight
                            v-html="reply.body"
                            class="fs-xm pt-3 "
                          ></div>
                          <div
                            class="d-flex ai-baseline fs-sm"
                            style="justify-content: flex-end;"
                          >
                            <el-button type="text">
                              <i class="text-gray iconfont icon-Thumbsup"></i>
                            </el-button>

                            <div class="d-flex" v-if="reply.owner">
                              <el-tooltip content="编辑" effect="dark">
                                <div
                                  @click="
                                    showCommentPanel(
                                      'editReply',
                                      reply.id,
                                      '',
                                      reply.from_uid.name
                                    )
                                  "
                                  class="opacity40 px-2 point"
                                >
                                  <i class=" fa fa-pencil-square-o"></i>
                                </div>
                              </el-tooltip>

                              <el-tooltip content="删除" effect="dark">
                                <div
                                  @click="deleteComment('reply', reply.id)"
                                  class="opacity40 pr-2 point"
                                >
                                  <i class="fa fa-trash"></i>
                                </div>
                              </el-tooltip>
                            </div>
                            <div
                              @click="
                                showCommentPanel(
                                  'reply',
                                  comment.id,
                                  reply.from_uid.id,
                                  reply.from_uid.name
                                )
                              "
                              class="text-primary px-2 point"
                            >
                              回复
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
    <sq-comment
      :to="name"
      :edit="edit"
      :type="type"
      :postId="post.id"
      :userId="post.user.id"
      :commentId="commentId"
      :toUid="toUid"
      @edit="edit = false"
      @showoff=";(show = false), (edit = false)"
      @refresh="fetchComment"
      :show="show"
    ></sq-comment>
    <sq-backbtn></sq-backbtn>
    <sq-footer></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import mediumZoom from 'medium-zoom'
import mdTable from '../../../plugins/markdownTable'
import copyRight from '../../../plugins/copyright'
import { hljs } from '../../../plugins/utils.js'
import md from '../../../plugins/markdown'
import { Browser, OS } from '../../../plugins/browserInfo.js'
import PostSideBar from '~/components/SideBar/PostSideBar.vue'
import share from '~/components/dialog/share.vue'
import card from '~/components/Card/card.vue'
import commentPanel from '~/components/commentPanel/commentPanel.vue'

const mediumzoom = () => {
  mediumZoom(document.querySelectorAll('p img'))
}

@Component({
  components: {
    'sq-postbar': PostSideBar,
    'share-dialog': share,
    'sq-card': card,
    'sq-comment': commentPanel
  }
})
export default class Post extends Vue {
  async asyncData({ params, store }: any) {
    // 在 @component 中不可以写 this.$http //

    const http = Vue.prototype.$http
    const res = await http.get(`posts/${params.id}?collection=true`)
    res.data.body = md.render(res.data.body)

    const link = `/posts/all?limit=8&sort=liked&type=post`
    const res1 = await http.get(link)

    const res2 = await http.get(`collections/1/recommend`)

    const res3 = await http.get(`posts/${params.id}/comments`)

    res3.data.map((item: any) => {
      if (!store.state.UserNotExist) {
        if (store.state.auth.user.id === item.user.id) {
          item.user.owner = true
        }
      }
      item.body = md.render(item.body)

      if (item.reply.length > 0) {
        item.reply.map((el: any) => {
          if (!store.state.UserNotExist) {
            if (store.state.auth.user.id === el.from_uid.id) {
              el.owner = true
            }
          }
          el.body = md.render(el.body)
        })
      }
    })

    return {
      post: res.data,
      recommendPost: res1.data[0],
      recommendCollection: res2.data,
      fetchedComment: res3.data
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
  edit = false
  fetchedComment = ''
  dialogFormVisible = false
  browser: any = Browser[0] || ''
  os = OS || ''
  show = false
  name = ''
  type = 'comment'
  commentId = ''
  toUid = ''

  mounted() {
    this.fetchpost(this.id)
    copyRight(this.post.user.name)
    mdTable()
  }

  beforeMount() {
    this.initPost()
  }
  // TS中的计算属性

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
      mediumzoom()
    })
  }

  showCommentPanel(type: any, commentId?: any, toUid?: any, username?: any) {
    if (!this.$store.state.UserNotExist) {
      this.edit = false
      if (type === 'edit' || type === 'editReply') {
        this.edit = true
        this.name = '编辑 ' + username + ' 的回复'
      } else if (username) {
        this.name = '回复 ' + username
      } else {
        this.name = this.post.title
      }
      this.show = true
      this.type = type
      this.commentId = commentId
      this.toUid = toUid
    } else {
      this.$store.commit('toggleLoginForm')
    }
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
    res.data.map((item: any) => {
      if (this.$store.state.auth.user.id === item.user.id) {
        item.user.owner = true
      }
      item.body = md.render(item.body)

      if (item.reply.length > 0) {
        item.reply.map((el: any) => {
          if (this.$store.state.auth.user.id === el.from_uid.id) {
            el.owner = true
          }
          el.body = md.render(el.body)
        })
      }
    })
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

  // 这里commentId就是父级的评论
  // 当前用户id
  // 被回复用户id:from_uid

  showBookmarkDialog(id: any) {
    if (this.isUser) {
      this.dialogFormVisible = true
      const ref: any = this.$refs.bookmark
      ref.showBookmark(id)
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  deleteComment(type: any, id: any) {
    let url: any
    switch (type) {
      case 'comment':
        url = `comments/${id}`
        break
      case 'reply':
        url = `reply/${id}`
        break
      default:
        break
    }

    this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(url)
        this.fetchComment()
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
