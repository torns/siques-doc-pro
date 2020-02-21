<template>
  <div>
    <div class="container h-100 pb-4">
      <el-row type="flex" class="pt-4">
        <el-col
          v-if="note != null"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="18"
          :xl="18"
        >
          <div>
            <div class="fs-xll d-flex ai-baseline mb-2">
              <div class="text-primary note-title mr-2">记</div>
              <div>{{ note.title }}</div>
            </div>
            <div class="d-flex ai-baseline text-gray">
              <div class="text-primary pr-2">
                <router-link
                  :to="`/u/${note.user.id}`"
                  tag="div"
                  class="point hoverlink"
                  >{{ note.user.name }}</router-link
                >
              </div>
              <div class="text-gray pr-2">
                {{ $dayjs(note.created).format('M月D日') }}发布
              </div>
              <div v-if="hasAccess" class="d-flex ai-baseline ">
                <el-button
                  @click="$router.push(`/record/${note.id}`)"
                  type="text"
                  >编辑</el-button
                >
                <el-button @click="delNote" type="text">删除</el-button>
              </div>
            </div>
            <div>
              <el-tag
                v-for="(tag, index) in note.tags"
                :key="index"
                class="mr-2 mb-2 point hover-2"
                type="plain"
                size="mini"
              >
                <router-link :to="`/t/${tag.id}`" tag="div">{{
                  tag.name
                }}</router-link>
              </el-tag>
            </div>
            <div
              v-highlight
              v-html="note.body"
              class="article lh-3 "
              style="min-height:300px;"
            ></div>
          </div>
          <div>
            <el-button type="text">链接</el-button>
            <el-button
              v-if="hasAccess"
              @click="$router.push(`/record/${note.id}`)"
              type="text"
              >编辑</el-button
            >
          </div>
          <div class="text-center">
            <el-button @click="showBookmark(note.id)" type="plain"
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
import { Vue, Component } from 'nuxt-property-decorator'
import md from '../../../plugins/markdown'
import { hljs } from '../../../plugins/utils.js'
@Component({
  components: {}
})
export default class Note extends Vue {
  async asyncData({ store, params }: any) {
    const http = Vue.prototype.$http

    const res = await http.get(`/posts/${params.id}`)
    res.data.body = md.render(res.data.body)

    return {
      note: res.data
    }
  }

  head() {
    return {
      title: `笔记_${this.note.title ? this.note.title : ''}`
    }
  }
  name: string = ''
  activeName = 'first'
  dialogFormVisible = false
  note: any = []

  mounted() {
    this.initNote()
  }

  get hasAccess(): any {
    return this.$store.state.auth
      ? this.$store.state.auth.user
        ? this.$store.state.auth.user.id
          ? this.note.user.id === this.$store.state.auth.user.id
          : false
        : false
      : false
  }

  get id(): any {
    try {
      return this.$route.params.id
    } catch {
      return null
    }
  }

  initNote() {
    this.$nextTick(() => {
      hljs()
    })
  }

  showBookmark(id: any) {
    const ref: any = this.$refs.reference
    ref.showBookmark(id)
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
