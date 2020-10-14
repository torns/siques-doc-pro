<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="我创建的收藏夹" name="first">
            <el-button @click="showDialog" type="info" size="mini">创建收藏夹</el-button>
            <el-divider></el-divider>
            <div>
              <ul>
                <li v-for="(book, index) in bookmarks" :key="index" class="text-primary  ">
                  <div class="d-flex jc-between">
                    <router-link
                      :to="{
                        path: `/bookmark/${book.id}`
                      }"
                      class="hoverlink"
                      tag="div"
                    >
                      {{ book.title }}
                    </router-link>
                    <div>{{ book.posts.length }} 条目</div>
                  </div>

                  <el-divider></el-divider>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我关注的收藏夹" name="second">关注的收藏夹</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down pl-2">123</el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import bookmark from '~/components/dialog/bookmark.vue'
@Component({})
export default class Bookmark extends Vue {
  name: any
  activeName = 'first'

  bookmarks = ''

  mounted() {
    setTimeout(() => {
      this.fetchBookmark()
    }, 500)
  }

  async fetchBookmark() {
    const res = await this.$http.get(`/bookmarks/${this.$store.state.auth.user.id}/user`)
    this.bookmarks = res.data
  }
  showDialog() {
    const ref: any = this.$refs.dialog
    ref.dialogFormVisible = true
  }

  handleClick(e: any) {}
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
