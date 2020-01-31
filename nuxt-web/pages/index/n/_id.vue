<template>
  <div>
    <div class="container h-100 pb-4">
      <el-row type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div v-if="notes != null">
            <div class="fs-xll d-flex ai-baseline mb-2">
              <div class="text-primary note-title mr-2">记</div>
              <div>{{ notes.title }}</div>
            </div>
            <div class="d-flex ai-baseline text-gray">
              <div class="text-primary pr-2">
                <router-link
                  :to="`/u/${notes.user.id}`"
                  tag="div"
                  class="point hoverlink"
                  >{{ notes.user.name }}</router-link
                >
              </div>
              <div class="text-gray pr-2">
                {{ $dayjs(notes.created).format('M月D日') }}发布
              </div>
              <div class="d-flex ai-baseline ">
                <el-button
                  @click="$router.push(`/record/${notes.id}`)"
                  type="text"
                  >编辑</el-button
                >
                <el-button @click="delNote" type="text">删除</el-button>
              </div>
            </div>
            <div v-html="notes.body" style="min-height:300px;"></div>
          </div>
          <div>
            <el-button type="text">链接</el-button>
            <el-button @click="$router.push(`/record/${notes.id}`)" type="text"
              >编辑</el-button
            >
          </div>
          <div class="text-center">
            <el-button @click="showBookmark(notes.id)" type="plain"
              >收藏</el-button
            >
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="6"
          :lg="6"
          :xl="6"
          class="hidden-sm-and-down pl-2"
        >
        </el-col>
      </el-row>
      <sq-bookmark ref="reference"></sq-bookmark>
    </div>
    <sq-footer top-border="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Notes extends Vue {
  name: string
  activeName = 'first'
  dialogFormVisible = false
  notes: any = null

  mounted() {
    this.fetchNote()
  }

  get id(): any {
    try {
      return this.$route.params.id
    } catch {
      return null
    }
  }

  async fetchNote() {
    const res = await this.$http.get(`/posts/${this.id}`)
    this.notes = res.data
  }

  showBookmark(id) {
    this.$refs.reference.showBookmark(id)
  }

  delNote() {
    this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(`/posts/${this.id}`)
        this.$notify({
          title: '成功',
          message: '删除笔记成功',
          type: 'success'
        })
        this.$router.push('/u/bookmark')
      })
      .catch(() => {})
  }
}
</script>

<style lang="scss">
.note-title {
  border-radius: 50%;
  border: 1px solid;
  width: 36px;
  height: 36px;
  text-align: center;
}
</style>
