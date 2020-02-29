<template>
  <div class="bg-light h-100">
    <el-drawer
      :show-close="true"
      :visible.sync="drawer"
      :modal="false"
      title="所有笔记"
      size="350px"
    >
      <div class="px-3">
        <el-button @click="open" type="text">新建笔记本</el-button>
        <el-select v-model="selectCollection" filterable placeholder="请选择">
          <el-option
            v-for="(item, index) in noteCollections"
            :key="item.id"
            :label="item.name"
            :value="index"
          >
          </el-option>
        </el-select>
        <el-button @click="CreateNote" type="text">新建笔记</el-button>
      </div>
      <div v-for="(note, index) in noteList" :key="note.id">
        <div
          :class="
            `bg-2 d-flex ai-baseline jc-between hover-3 ${
              note.id == $route.params.id ? ' boder-x' : ''
            }`
          "
          style="line-height: 35px;"
        >
          <nuxt-link
            :to="`/record/${note.id}`"
            tag="li"
            class="ellipsis-1 px-3  py-2 "
          >
            {{ note.title }}
          </nuxt-link>
          <i
            @click="deleteNote(note.id, index)"
            class="el-icon-delete py-2 point pr-3"
          ></i>
        </div>
      </div>
    </el-drawer>
    <div class="container ">
      <el-row type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div>
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <div class="d-flex jc-between tags text-left my-3">
              <div class="d-flex">
                <el-tag
                  :key="tag.name"
                  v-for="tag in dynamicTags"
                  :disable-transitions="false"
                  @close="handleClose(tag.name, tag.id)"
                  class="mr-2"
                  effect="plain"
                  closable
                  >{{ tag.name }}</el-tag
                >

                <sq-tag ref="tag" :position="`bottom`" @add="addTag">
                  <el-button
                    @click="showtagDialog"
                    class="button-new-tag"
                    size="small"
                    >+ 添加标签</el-button
                  >
                </sq-tag>
              </div>
              <el-button
                @click="drawer = true"
                type="primary"
                size="small"
                style="margin-left: 16px;"
              >
                我的笔记本
              </el-button>
            </div>
            <markdown
              ref="markdown"
              @submit="submitNote"
              name="发布笔记"
              height="70vh"
            ></markdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

import Tag from '@/components/dialog/tag.vue'

@Component({
  components: { 'sq-tag': Tag }
})
export default class Index extends Vue {
  async asyncData({ store, params }: any) {
    const http = Vue.prototype.$http

    let res
    if (store.state.auth.user.id) {
      res = await http.get(`posts/${store.state.auth.user.id}/note`)
    }

    let SelectCollection = 0
    if (store.state.selectedNoteList) {
      SelectCollection = store.state.selectedNoteList
    }

    return {
      selectCollection: SelectCollection,
      noteList: res.data,
      // 默认所有的笔记(需要完善)
      noteCollections: [{ id: -1, name: '所有笔记', posts: res.data }]
    }
  }

  head() {
    return {
      title: '记笔记'
    }
  }
  drawer = false
  title = ''
  dynamicTags: Array<any> = []
  content = [{ development: '' }]

  tagLen: number = 5

  noteList = []
  visible: any
  noteCollections = []
  // 这是一个序号，不是id
  selectCollection = 0

  @Watch('selectCollection')
  doCollectChanged(newval: any, oldval: any) {
    const nodelist: any = this.noteCollections[this.selectCollection]
    this.$store.commit('setNoteList', this.selectCollection)
    this.noteList = nodelist.posts
  }

  @Watch('dynamicTags')
  dynamicTagsChanged(val: any, oldval: any) {
    this.tagLen = 5 - val.length
    const ref: any = this.$refs.tag
    ref.taglen = 5 - val.length
  }

  get id(): any {
    return this.$route.params.id
  }

  get isUser() {
    return !this.$store.state.UserNotExist
  }

  mounted() {
    this.fetchQue()
    this.fetchCollection()
  }

  async fetchCollection() {
    const res = await this.$http.get(
      `collections/${this.$store.state.auth.user.id}/user?type=note`
    )
    const r = this.noteCollections.concat(res.data)
    this.noteCollections = r

    if (this.selectCollection !== 0) {
      const nodelist: any = this.noteCollections[this.selectCollection]

      this.noteList = nodelist.posts
    }
  }

  async fetchQue() {
    if (!this.id && this.$store.state.selectedNote) {
      this.$router.push(`/record/${this.$store.state.selectedNote}`)
    }

    if (this.id) {
      const res = await this.$http.get(`posts/${this.id}?type=edit`)
      this.$store.commit('setNote', this.id)
      const ref: any = this.$refs.markdown
      ref.setContent(res.data.body)
      this.title = res.data.title
      this.dynamicTags = res.data.tags
    }
  }

  async handleClose(tag: any, id: any) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    if (this.id) {
      await this.$http.get(`/tags/${this.id}?tagId=${id}`)
    }
  }
  showtagDialog() {
    this.visible = true
  }

  async addTag(tagname: any, tagid: any) {
    if (this.tagLen > 0) {
      let includes = false
      this.dynamicTags.map((e) => {
        if (e.name === tagname) {
          includes = true
        }
      })

      if (!includes) {
        this.dynamicTags.push({ name: tagname, id: tagid })
        if (this.id) {
          await this.$http.get(`/tags/${this.id}?tagId=${tagid}`)
        }
      } else {
        this.$notify({
          type: 'error',
          title: '错误',
          message: '已添加该标签'
        })
      }
    } else {
      this.$notify({
        type: 'error',
        title: '错误',
        message: '已超出最大标签数'
      })
    }
  }

  async CreateNote() {
    const now = this.$dayjs(new Date()).format('YYYY-MM-DD')
    const collection: any = this.noteCollections[this.selectCollection]

    const body = {
      title: now,
      collection: collection.id === -1 ? null : collection.id,
      type: 'note',
      tags: this.dynamicTags
    }
    const res = await this.$http.post(`/posts/`, body)
    const { id } = res.data
    this.$notify({
      title: '成功',
      type: 'success',
      message: '发布成功,可以写啦'
    })

    this.$router.push(`/record/${id}`)
    this.$store.commit('increLen', 'note')
  }

  deleteNote(id: any, index: any) {
    this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(`/posts/${id}`)
        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除成功'
        })
        this.noteList.splice(index, 1)
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  async submitNote(data: any) {
    if (this.title) {
      // const word = wordcounts(data)

      if (this.id) {
        const body = {
          title: this.title,
          body: data,

          type: 'note'
        }
        await this.$http.put(`/posts/${this.id}`, body)
        this.$notify({
          title: '成功',
          type: 'success',
          message: '更新成功'
        })
      } else {
        const collection: any = this.noteCollections[this.selectCollection]
        const body = {
          title: this.title,
          body: data,
          collection: collection.id === -1 ? null : collection.id,
          type: 'note',
          tags: this.dynamicTags
        }
        const res = await this.$http.post(`/posts/`, body)
        const { id } = res.data
        this.$notify({
          title: '成功',
          type: 'success',
          message: '发布成功'
        })
        this.$router.push(`/record/${id}`)
        this.$store.commit('increLen', 'note')
      }
    } else {
      this.$notify({
        title: '失败',
        type: 'error',
        message: '标题不能为空'
      })
    }
  }

  open() {
    this.$prompt('请输入标题', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(async ({ value }: any) => {
        if (this.isUser) {
          if (value === '') {
            return this.$notify({
              title: '错误',
              type: 'error',
              message: '名字不能为空'
            })
          }
          await this.$http.post('/collections', { name: value, type: 'note' })
          this.$notify({
            title: '成功',
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$store.commit('toggleLoginForm')
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
  }
}
</script>

<style lang="scss"></style>
