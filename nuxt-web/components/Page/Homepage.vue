<template>
  <div class="border-radius">
    <div class="d-flex jc-between header bg-light-1 border-solid py-1 px-3">
      <div style="line-height:28px">高分内容</div>
      <div>
        <el-radio-group v-model="sort" size="mini">
          <el-radio-button label="概览"></el-radio-button>
          <el-radio-button label="提问"></el-radio-button>
          <el-radio-button label="回答"></el-radio-button>
          <el-radio-button label="文章"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div style="min-height:200px" class="body border-solid">
      <div v-if="posts !== '' && posts.length !== 0" class="px-3 pb-3">
        <list-panel
          :collection="false"
          :posts="posts"
          :pagination="false"
          type
        ></list-panel>
        <div class="text-right fs-xm">
          查看全部<span class="text-primary point hoverlink">文章</span>
          、提问、回答
        </div>
      </div>

      <div v-else style="height:200px" class="d-flex ai-center">
        <div
          class="d-flex bg-light-1 ai-center jc-center border-dash border-radius"
          style="height:80%;width:80%;margin:0 auto;"
        >
          (ﾟ∀ﾟ ) 暂时没有任何数据
        </div>
      </div>
    </div>

    <div
      class="mt-4 d-flex jc-between header bg-light-1 border-solid py-1 px-3"
    >
      <div style="line-height:28px">个人动态</div>
    </div>
    <div class="body border-solid">
      <div style="min-height:200px">
        <div
          v-for="action in actions"
          :key="action.id"
          style="width: -webkit-fill-available;"
          class="d-flex jc-center flex-column border-bottom mx-3 my-2 py-2"
        >
          <div
            v-if="action.type != 'followuser' && action.type != 'privateletter'"
            class="d-flex jc-between"
          >
            <div>
              <div class="text-gray fs-xm ">
                <span class="text-primary">
                  {{ action.from_uid.name }}
                </span>
                {{ actionTransFomer(action) }}
                {{ $dayjs(action.created).format('M月D日 H:mm') }}
              </div>
              <div class="text-primary py-1 hoverlink point">
                <router-link
                  :to="`${link(action) + action.to_Post.id}`"
                  tag="div"
                >
                  {{ action.to_Post.title }}</router-link
                >
              </div>
              <div class="d-flex ">
                <div class="fs-xm text-gray pr-3">
                  关注 {{ action.to_Post.concerned }}
                </div>
                <div class="fs-xm text-gray">
                  收藏 {{ action.to_Post.bookmarked }}
                </div>
              </div>
            </div>
            <div v-if="action.to_Post.cover !== null" class="xs pr-3">
              <el-image
                :src="action.to_Post.cover"
                style="width: 80px; height: 60px"
                fit="cover"
              ></el-image>
            </div>
          </div>
          <div v-else>
            <div class="text-gray fs-xm  ">
              <span class="text-primary">
                {{ action.from_uid.name }}
              </span>
              {{ actionTransFomer(action) }}
              {{ $dayjs(action.created).format('M月D日 H:mm') }}
            </div>
            <div class="d-flex text-primary py-1 ">
              <div class="pr-3">
                <el-avatar
                  :size="40"
                  :src="
                    `${
                      action.to_uid.avator[0] ? action.to_uid.avator[0].url : ''
                    }`
                  "
                >
                  <img src="~/static/avator.jpg" />
                </el-avatar>
              </div>

              <div>
                <router-link
                  :to="`/u/${action.to_uid.id}`"
                  class="point hoverlink"
                  tag="div"
                >
                  {{ action.to_uid.name }}</router-link
                >
                <div class="fs-xs text-gray py-1">
                  {{
                    action.to_uid.introduction || '这个用户太懒,什么都没有留下'
                  }}
                </div>
                <div v-if="action.content && !id" class="fs-xs">
                  消息内容：{{ action.content }}
                </div>
              </div>
            </div>
            <div class="d-flex ">
              <div class="fs-xm text-gray pr-3 ">
                粉丝 {{ action.to_uid.followedBy }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ListPanel from '../ListPanel/ListPanel.vue'
@Component({
  components: { 'list-panel': ListPanel }
})
export default class MyHomepage extends Vue {
  @Prop()
  id: any
  sort = '概览'
  posts: any = ''
  data: any = ''

  actions: any = ''

  mounted() {
    this.fetchUserAction()
    this.fetchUserPost()
  }

  @Watch('sort')
  isSortChanged(newValue: any, oldValue: any) {
    switch (newValue) {
      case '概览':
        this.fetchUserPost('')
        break
      case '提问':
        this.fetchUserPost('question')
        break
      case '回答':
        this.fetchUserAnswer()
        break
      case '文章':
        this.fetchUserPost('post')
        break
      default:
        break
    }
  }

  actionTransFomer(action: any) {
    if (
      action.to_Post !== null &&
      action.to_Post.type === 'question' &&
      action.type === 'commentpost'
    ) {
      return '评论了问题'
    } else if (action.to_Post !== null && action.to_Post.type === 'note') {
      return '发布了笔记'
    } else {
      switch (action.type) {
        case 'likepost':
          return '点赞了文章'
        case 'followque':
          return '关注了问题'

        case 'followuser':
          return '关注了用户'
        case 'commentpost':
          return '评论了文章'

        case 'createpost':
          return '发布了文章'

        case 'adoptanswer':
          return '采纳了答案'
        case 'bookmarkpost':
          return '收藏了文章'
        case 'privateletter':
          return '私信了'
        default:
          break
      }
    }
  }

  link(action: any) {
    if (action.to_Post.type === 'question') {
      return '/q/'
    } else if (action.to_Post.type === 'note') {
      return '/n/'
    } else {
      switch (action.type) {
        case 'likepost':
          return '/p/'
        case 'followque':
          return '/q/'
        case 'followuser':
          return '关注了用户'
        case 'privateletter':
          return '私信了用户'
        case 'commentpost':
          return '/p/'
        case 'createpost':
          return '/p/'
        case 'adoptanswer':
          return '/q/'
        case 'bookmarkpost':
          return '/p/'
        default:
          break
      }
    }
  }

  async fetchUserPost(type?: any) {
    if (this.id) {
      const res = await this.$http.get(
        `/posts/${this.id}/user?type=${type || ''}`
      )
      this.posts = res.data[0]
    } else {
      const res = await this.$http.get(
        `/posts/${this.$store.state.auth.user.id}/user?type=${type || ''}`
      )
      this.posts = res.data[0]
    }
  }

  async fetchUserAnswer() {
    if (this.id) {
      const res = await this.$http.get(`/users/${this.id}/answer`)
      this.posts = res.data
    } else {
      const res = await this.$http.get(
        `/users/${this.$store.state.auth.user.id}/answer`
      )
      this.posts = res.data
    }
  }

  async fetchUserAction() {
    if (this.id) {
      const res = await this.$http.get(`/actions/${this.id}`)
      this.actions = res.data
    } else {
      const res = await this.$http.get(
        `/actions/${this.$store.state.auth.user.id}`
      )
      this.actions = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-avatar--circle {
  background-color: white !important;
}
</style>
