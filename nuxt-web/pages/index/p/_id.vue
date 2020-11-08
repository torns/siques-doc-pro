<template>
  <div>
    <div>
      <div
        class="absolute d-flex jc-center flex-column ai-center "
        style="z-index:5!important; width: 80%;top: 8%;left:10%;"
      >
        <div class="fs-md">
          <!-- <div class="d-flex">
            <div class="pr-2" v-for="tag in post.tags" :key="tag.id">
              <router-link :to="`/t/${tag.id}`">
                <el-link type="primary">{{ tag.name }}</el-link>
              </router-link>
            </div>
          </div> -->
        </div>
        <h1 style="text-align: center;">
          <div class="text-white py-2 ellipsis-2 lh-5">{{ post.title }}</div>
        </h1>
        <div class="d-flex py-1 ai-center">
          <!-- <router-link :to="`/u/${post.user.id}`">
            <el-avatar :size="60" :src="post.user.avator[0] ? post.user.avator[0].url : ''" class="shadow-1" style="background-color: white ;border: 1px solid #de7d7d;padding: 3px;">
              <img src="~/static/avator.jpg" />
            </el-avatar>
          </router-link> -->

          <!-- <div style="height: 32px;" class="d-flex ">
              <router-link :to="`/u/${post.user.id}`">
                <div class="mr-2 font-bold text-primary hover-4 point">
                  {{ post.user.name }}
                </div>
              </router-link>
            </div> -->
          <div class="d-flex fs-xs ai-center pt-1 text-light-1">
            <div class="pr-2">
              <i class="el-icon-time"></i>
              {{ $dayjs(post.created).format('YYYY.MM.DD HH:MM:ss') }}
            </div>

            <div><i class="el-icon-view pr-1"></i>{{ post.views }}</div>
          </div>
        </div>
        <div class="tag d-flex ai-baseline mb-3">
          <div class="text-light-1 fs-xs">阅读约 {{ Math.ceil(post.counts / 275) }} 分钟</div>
        </div>
      </div>

      <div class="postMask" style="height:32vh;">
        <!-- <sq-down
          style=" position: absolute;bottom: 10%;
    left: 50%;"
        ></sq-down> -->
      </div>

      <div class="blur ">
        <div class=" relative ">
          <el-image :src="post.cover" fit="cover" style="height:32vh;" class="w-100"> </el-image>
        </div>
      </div>

      <div class="post_container  pb-3">
        <el-row :gutter="0" type="flex">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <article id="article" class=" bg-white ">
              <div>
                <div v-if="post.title" style="padding:25px">
                  <div
                    class="d-flex flex-column menu-button"
                    style="position:absolute;top: 0%;left: 0;
    "
                  >
                    <div @click="like">
                      <sq-likebtn :status="isLike"></sq-likebtn>
                    </div>
                  </div>

                  <!-- 滚动监听区域 -->
                  <div id="post-content" v-scroll-spy v-html="post.body" v-highlight class="article "></div>
                  <div class="text-primary mt-3 fs-xs">
                    阅读：{{ post.views > 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views }}
                    <span>.</span>
                    <span class="pr-2">字数：{{ post.counts }}</span>
                    {{ '发布于 ' + $dayjs(post.created).fromNow() }}
                  </div>
                  <!-- <div class="d-flex jc-center my-4">
                    <el-button @click="like" size="small" class="hover-2" type="plain">
                      <i class="pr-2 iconfont icon-Thumbsup"></i>
                      {{ liked }} 赞
                    </el-button>

                    <el-button @click="showBookmarkDialog(post.id)" size="small" class="hover-2" type="plain"> <i class="pr-2 iconfont icon-bookmark"></i><span>收藏</span> </el-button>

                    <share-dialog :description="post" class="px-2">
                      <el-button size="small" class="hover-2" type="plain"> <i class="pr-2  iconfont icon-share"></i>分享 </el-button>
                    </share-dialog>
                  
                  </div> -->

                  <div @click="showCommentPanel('comment')" class="d-flex jc-center pt-5">
                    <sq-replybtn :show="show"></sq-replybtn>
                  </div>
                </div>
              </div>
            </article>

            <div id="comment" v-if="fetchedComment.length !== 0" class="pt-3">
              <div class="font-bold fs-xl py-1">{{ fetchedComment.length }}条评论</div>

              <div class="py-4 bg-white border-radius " style="min-height:100px">
                <div v-if="fetchedComment" class="commentBody pt-3 px-4">
                  <div v-for="(comment, index) in fetchedComment" :key="index">
                    <div class="pb-4">
                      <div class="d-flex">
                        <div class="mr-3">
                          <router-link :to="`/u/${comment.user.id}`" tag="div" class="point">
                            <el-avatar class=" bg-white">
                              <div v-if="!comment.user.avator[0]">user</div>
                              <img v-else :src="comment.user.avator[0].url" alt />
                            </el-avatar>
                          </router-link>
                        </div>
                        <div class="flex-1">
                          <div class="d-flex ai-center jc-between">
                            <div style="font-weight:600" class="text-primary hover-4 ">
                              <router-link :to="`/u/${comment.user.id}`" tag="div" class="point fs-lg">{{
                                comment.user.name
                              }}</router-link>
                            </div>
                            <div class="fs-xxs text-gray">
                              {{ $dayjs(comment.created).format('YYYY-MM-DD') }}
                            </div>
                          </div>
                          <div v-highlight v-html="comment.body" class="py-2"></div>
                          <div class="d-flex fs-sm ai-baseline" style="justify-content: flex-end;">
                            <el-button @click="commentLike(comment.id)" type="text">
                              <i class="iconfont icon-thumbs-up text-gray"></i>
                              <span class="text-gray"> {{ comment.liked }}</span>
                            </el-button>

                            <div v-if="comment.user.owner" class="d-flex ai-center">
                              <el-tooltip content="编辑" effect="dark">
                                <div
                                  @click="showCommentPanel('edit', comment.id, '', comment.user.name)"
                                  class="opacity40 px-2 point"
                                >
                                  <i class=" fa fa-pencil-square-o"></i>
                                </div>
                              </el-tooltip>

                              <el-tooltip content="删除" effect="dark">
                                <div @click="deleteComment('comment', comment.id)" class="opacity40 pr-2 point">
                                  <i class="fa fa-trash"></i>
                                </div>
                              </el-tooltip>
                            </div>
                            <div
                              @click="showCommentPanel('reply', comment.id, comment.user.id, comment.user.name)"
                              class="text-primary px-2 point"
                            >
                              回复
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 下面是回复展示模块 -->
                      <div class="pl-4 pr-3 replyBody" style="margin-left:3em;margin-right:0em;border-radius:12px;">
                        <div v-for="reply in comment.reply" :key="reply.id" class="py-2 ">
                          <div class="d-flex ai-baseline jc-between">
                            <div style="font-weight:600" class="text-primary pr-1">
                              {{ reply.from_uid.name }}:
                              <span style="font-weight:400" class>@{{ reply.to_uid.name }}</span>
                            </div>
                            <div class="fs-xxs opacity40">
                              {{ $dayjs(reply.created).format('YYYY-MM-DD HH点') }}
                            </div>
                          </div>
                          <div v-highlight v-html="reply.body" class="fs-xm pt-3 "></div>
                          <div class="d-flex ai-baseline fs-sm" style="justify-content: flex-end;">
                            <el-button type="text">
                              <i class="text-gray iconfont icon-Thumbsup"></i>
                            </el-button>

                            <div v-if="reply.owner" class="d-flex">
                              <el-tooltip content="编辑" effect="dark">
                                <div
                                  @click="showCommentPanel('editReply', reply.id, '', reply.from_uid.name)"
                                  class="opacity40 px-2 point"
                                >
                                  <i class=" fa fa-pencil-square-o"></i>
                                </div>
                              </el-tooltip>

                              <el-tooltip content="删除" effect="dark">
                                <div @click="deleteComment('reply', reply.id)" class="opacity40 pr-2 point">
                                  <i class="fa fa-trash"></i>
                                </div>
                              </el-tooltip>
                            </div>
                            <div
                              @click="showCommentPanel('reply', comment.id, reply.from_uid.id, reply.from_uid.name)"
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

            <!-- <div class="hidden-md-and-down pl-2 fixed  text-right" style="top:40%!important;right:2%;">
              <sq-toc></sq-toc>
            </div> -->
          </el-col>
        </el-row>
      </div>
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

    <sq-navigation :data="recommendPost" class="my-4"></sq-navigation>
    <!-- <sq-searchbtn></sq-searchbtn> -->
    <sq-sidemenu>
      <sq-toc></sq-toc>
    </sq-sidemenu>
    <sq-footer></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import mediumZoom from 'medium-zoom'

import { hljs } from '../../../plugins/utils.js'
import md from '../../../plugins/markdown.js'
import tocjs from '~/plugins/toc.js'
import scrolldown from '~/components/Base/BaseScrollDown/index.vue'

import toc from '~/components/Toc/PostToc.vue'

import PostNavigation from '~/components/Page/Post/NaviToNextPost.vue'
import commentPanel from '~/components/Base/BaseCommentPanel/index.vue'
import sideMenu from '~/components/Page/Post/NaviSideMenu.vue'
// import SearchButton from '~/components/Page/Post/ButtonSearchAny.vue'
import replyButton from '~/components/Page/Post/ButtonReplyPost.vue'
import likeButton from '~/components/Page/Post/ButtonLikePost.vue'
const mediumzoom = () => {
  mediumZoom(document.querySelectorAll('p img'))
}

@Component({
  components: {
    'sq-sidemenu': sideMenu,
    'sq-toc': toc,
    'sq-down': scrolldown,
    'sq-comment': commentPanel,
    'sq-navigation': PostNavigation,
    'sq-replybtn': replyButton,
    'sq-likebtn': likeButton
  }
})
export default class Post extends Vue {
  async asyncData({ params, store, redirect }: any) {
    // 在 @component 中不可以写 this.$http //

    const http = Vue.prototype.$http

    const res = await http.get(`posts/${params.id}?collection=true`)

    // console.log(res.data)
    if (res.data.status === 404) {
      redirect('/error')
    }
    res.data.body = md.render(res.data.body)

    const res1 = await http.get(`/posts/all?random=true&limit=2&type=post`)

    // const res2 = await http.get(`collections/1/recommend`)

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
      // recommendCollection: res2.data,
      fetchedComment: res3.data
    }
  }

  head() {
    return {
      title: this.post.title + '-思趣网',
      meta: [
        {
          hid: 'og:description',
          name: 'description',
          content: this.post.alias
        },
        { hid: 'description', name: 'description', content: this.post.alias }
      ]
    }
  }

  post: any = ''
  recommendPost = []
  liked: number = 0
  edit = false
  fetchedComment = ''
  dialogFormVisible = false

  show = false
  name = ''
  type = 'comment'
  commentId = ''
  toUid = ''

  mounted() {
    this.fetchpost(this.id)
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
      tocjs()
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
