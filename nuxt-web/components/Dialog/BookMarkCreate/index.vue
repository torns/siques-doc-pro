<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" width="500px" title="收藏" class="border-radius">
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
          <el-button @click="showCreatDialog" type="text">创建收藏夹</el-button>
        </div>
        <div class="text-right pt-5">
          <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
          <el-button @click="bookmarkPost" size="mini" type="primary">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <bookmark-dialog ref="dialog" @refetch="refetch"></bookmark-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import bookmark from './BookMark/bookmark.vue'

@Component({
  components: { 'bookmark-dialog': bookmark }
})
export default class createBookmark extends Vue {
  checkList: any = []
  dialogFormVisible = false
  bookmarks = []
  postId = ''
  list = []

  get isUser() {
    return !this.$store.state.UserNotExist || false
  }

  // @Watch('isUser')
  // isUserChange

  mounted() {
    this.fetchBookmark()
  }
  updated() {
    // this.fetchBookmark()
  }

  showCreatDialog() {
    const ref: any = this.$refs.dialog
    ref.dialogFormVisible = true
  }
  async fetchBookmark() {
    // 依赖用户id
    if (this.isUser) {
      const res = await this.$http.get(`/bookmarks/${this.$store.state.auth.user.id}/user`)
      this.bookmarks = res.data
    }
  }
  async bookmarkPost() {
    await this.$http.get(`/bookmarks/${this.postId}/post?bookmarkId=${this.checkList}`)
    this.$notify({
      type: 'success',
      message: '收藏成功',
      title: '成功'
    })
    this.fetchBookmark()
    this.dialogFormVisible = false
  }

  async showBookmark(id: any) {
    if (this.$store.state.UserNotExist === false) {
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
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }
  // 刷新数据
  refetch() {
    this.fetchBookmark()
  }
}
</script>

<style lang="scss"></style>
