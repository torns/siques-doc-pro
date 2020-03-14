<template>
  <transition
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideOutDown"
  >
    <div v-show="$attrs.show" class="commentPanel">
      <div class="commentPanel__markdown">
        <div class="d-flex jc-between pb-2 text-green">
          <div class="fa fa-share point pr-2 col-33 ellipsis-2">
            {{ $attrs.to }}
          </div>
          <div v-if="edit" class="text-gray-1 ">
            编辑模式
          </div>
          <div
            @click="panelOff"
            class="fa fs-xl  fa-angle-double-down hover-1 point col-33"
            style="text-align:end"
          ></div>
        </div>
        <markdown
          ref="markdown"
          @submit="handleSend"
          @cancle="cancle"
          cancle
          name="回复"
          icon="iconfont icon-comments"
          height="40vh"
        ></markdown>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
@Component({})
export default class commentPanel extends Vue {
  @Prop() edit: any

  get isUser(): any {
    return !this.$store.state.UserNotExist
  }

  get ref(): any {
    return this.$refs.markdown
  }

  @Watch('edit')
  async isEdit() {
    if (this.edit === true) {
      if (this.$attrs.type === 'editReply') {
        const res = await this.$http.get(`reply/${this.$attrs.commentId}`)
        this.ref.setContent(res.data.body)
      } else {
        const res = await this.$http.get(`comment/${this.$attrs.commentId}`)
        this.ref.setContent(res.data.body)
      }
    }
  }

  panelOff() {
    this.ref.setContent('')
    this.$emit('showoff')
  }

  cancle() {
    this.$confirm('确定要放弃编辑?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        this.ref.setContent('')
        this.$emit('showoff')
      })
      .catch(() => {})
  }

  handleSend(value: any) {
    switch (this.$attrs.type) {
      case 'comment':
        this.sendComment(value)
        break
      case 'reply':
        this.sendReply(value)
        break
      case 'edit':
        this.sendEditComment(value)
        break
      case 'editReply':
        this.sendEditReply(value)
        break
      default:
        break
    }
  }

  sendComment(value: any) {
    const data = {
      body: value,
      owner_uid: this.$attrs.userId // 这个资源的用户id
    }

    this.handle(data, 'post', `/posts/${this.$attrs.postId}/comments`)
  }

  sendReply(value: any) {
    const data = {
      parent_id: this.$attrs.commentId,
      body: value,
      from_uid: this.$store.state.auth.user.id,
      to_uid: this.$attrs.toUid
    }

    this.handle(data, 'post', 'posts/1/reply')
  }

  sendEditComment(value: any) {
    const data = {
      body: value
    }

    this.handle(data, 'put', `comments/${this.$attrs.commentId}`)
  }
  sendEditReply(value: any) {
    const data = {
      body: value
    }

    this.handle(data, 'put', `reply/${this.$attrs.commentId}`)
  }

  async handle(data: any, Method: any, Url: any) {
    if (this.isUser) {
      if (data.body) {
        await this.$http({
          method: Method,
          url: Url,
          data
        })

        this.ref.setContent('')
        this.$emit('showoff')
        this.$emit('refresh')
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
}
</script>

<style lang="scss" scoped></style>
