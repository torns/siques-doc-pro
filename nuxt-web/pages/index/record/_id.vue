<template>
  <div :class="`record bg-light h-100 ${showTips ? '_mask' : ''}`">
    <el-drawer style="overflow-x: hidden;" :show-close="true" :visible.sync="drawer" :modal="false" title="所有笔记本" size="550px">
      <div class="px-4 d-flex jc-between">
        <div><el-button @click="createNoteBook" type="text">新建笔记本</el-button></div>
        <div></div>
      </div>
      <div class="d-flex jc-between ">
        <div class="relative" v-if="selectedNotebook != 0 && noteBooks.length != 0">
          <a class="newer-posts arrow-left point" @click="changeNote('pre')">
            <span class="screen-reader-text"></span>
          </a>
        </div>
        <el-popover placement="left" title="快速切换" width="250" trigger="click">
          <div v-for="(noteBook, index) in noteBooks" :key="noteBook.id" class="point py-1">
            <div class="d-flex jc-between ai-baseline">
              <div @click="selectedNotebook = index" :class="`${selectedNotebook == index ? 'text-primary' : ''} ellipsis-1`">
                {{ noteBook.name }}
              </div>
              <el-dropdown @command="handleNotebook" trigger="click">
                <span>
                  <i :class="`el-icon-s-tools el-icon--right ${selectedNotebook == index ? 'text-primary' : ''}`"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{ type: 'changeTitle', id: noteBook.id, name: noteBook.name }" icon="el-icon-edit-outline">修改文集名称</el-dropdown-item>

                  <el-dropdown-item :command="{ type: 'delNotebook', id: noteBook.id }" icon="el-icon-delete">删除笔记本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <!-- class="d-flex jc-between flex-wrap flex-column" -->
          <div slot="reference" class="d-flex jc-between flex-wrap flex-column" style="height:300px">
            <div style="padding: 0px 10em;" v-for="(noteBook, index) in noteBooks" :key="noteBook.id" @click="showAllNotebook">
              <transition :duration="{ enter: 500, leave: 200 }" enter-active-class="animated fadeIn " leave-active-class="animated fadeOut ">
                <sq-notebook class="point " v-show="selectedNotebook == index" :title="noteBook.name" :index="index"> </sq-notebook>
              </transition>
            </div>
          </div>
        </el-popover>
        <div v-if="selectedNotebook < noteBooks.length - 1" class="relative" style="right: 14%;">
          <a class="newer-posts arrow-right point" @click="changeNote('pro')">
            <span class="screen-reader-text"></span>
          </a>
        </div>
      </div>
      <div v-if="noteBooks.length != 0" class="pl-4 pt-3">
        <el-button @click="CreateNote" type="text">新建笔记</el-button>
      </div>
      <div class="pt-3">
        <transition-group name="list-complete" tag="span">
          <div class="list-complete-item" v-for="(note, index) in noteList" :key="note.id">
            <div :class="`bg-2 d-flex ai-baseline jc-between hover-3 ${note.id == $route.params.id ? ' border-l' : ''}`" style="line-height: 35px;">
              <nuxt-link :to="`/record/${note.id}`" tag="li" class="ellipsis-1 px-3  py-2 flex-1 ">
                {{ note.title }}
              </nuxt-link>
              <el-dropdown class="pr-3 point " @command="handleNotePost" trigger="click">
                <span>
                  <i class="el-icon-s-tools el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{ type: 'changeTitle', id: note.id, name: note.title }" icon="el-icon-edit-outline">修改文章名称</el-dropdown-item>

                  <el-popover placement="left" width="200" :offset="200" trigger="click">
                    <div class="pb-2">移动到(点击框外可取消)</div>
                    <el-select v-model="movedNotebook" placeholder="请选择">
                      <el-option :disabled="selectedNotebook == index" v-for="(book, index) in noteBooks" :key="book.id" :label="book.name" :value="book.id"> </el-option>
                    </el-select>

                    <div class="pt-3" style="text-align: right; margin: 0">
                      <!-- <el-button size="mini" type="text" >取消</el-button> -->
                      <el-button type="primary" size="mini" @click="handlePostMove(note.id)">确定</el-button>
                    </div>
                    <el-dropdown-item slot="reference" :command="{ type: 'movePost', id: note.id, name: note.title }" icon="el-icon-edit-outline">移动文章</el-dropdown-item>
                  </el-popover>

                  <el-dropdown-item :command="{ type: 'delPost', id: note.id, index: index }" icon="el-icon-delete">删除文章</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <i @click="deleteNote(note.id, index)" class="el-icon-delete py-2 point pr-3"></i> -->
            </div>
          </div>
        </transition-group>
      </div>
    </el-drawer>
    <a class="newer-posts arrow-left point" @click="$router.push('/')">
      <span class="screen-reader-text"></span>
    </a>
    <div class="container pt-6">
      <el-row type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div>
            <el-input v-model="title" placeholder="请输入标题"></el-input>
            <div class="d-flex jc-between tags text-left my-3">
              <div class="d-flex">
                <el-tag :key="tag.name" v-for="tag in dynamicTags" :disable-transitions="false" @close="handleClose(tag.name, tag.id)" class="mr-2" effect="plain" closable>{{ tag.name }}</el-tag>

                <sq-tag ref="tag" :position="`bottom`" @add="addTag">
                  <el-button @click="showtagDialog" class="button-new-tag" size="small">+ 添加标签</el-button>
                </sq-tag>
              </div>

              <el-popover
                :popper-class="`${showTips ? 'twinkle' : ''}`"
                placement="left"
                title="提示"
                width="200"
                trigger="manual"
                content="点击立即新建笔记本,创建属于你的专属笔记"
                v-model="showTips"
              >
                <el-button slot="reference" @click="drawer = true" type="primary" size="small" style="margin-left: 16px;">
                  我的笔记本
                </el-button>
              </el-popover>
            </div>
            <markdown ref="markdown" @submit="submitNote" name="发布笔记" height="60vh"></markdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import Tag from '@/components/dialog/tag.vue'
import noteBook from '@/components/miniComponents/notebook.vue'
@Component({
  components: { 'sq-tag': Tag, 'sq-notebook': noteBook }
})
/* eslint-disable */
export default class Index extends Vue {
  async asyncData({ store, params }: any) {
    const http = Vue.prototype.$http

    const res = await http.get(`posts/${store.state.auth.user.id}/note`)

    let selectedNotebook = 0
    if (store.state.selectedNoteBookId) {
      selectedNotebook = store.state.selectedNoteBookId
    }

    return {
      selectedNotebook: selectedNotebook
      // 默认所有的笔记(需要完善)
    }
  }

  head() {
    return {
      title: '记笔记'
    }
  }

  middleware({ store, redirect, route }) {
    // If the user is not authenticated

    if (store.state.UserNotExist) {
      store.commit('toggleLoginForm')
      return redirect('/')
    }
  }

  showTips = false
  drawer = false
  showNote = true
  title = ''
  dynamicTags: Array<any> = []
  movedNotebook: any = ''
  tagLen: number = 5
  timer = null

  @Watch('title')
  isTitleChanged(newval: any, oldval: any) {
    const ref: any = this.$refs.markdown

    if (typeof this.timer === 'number') {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (oldval !== '') {
        if (newval !== oldval) {
          this.submitNote(ref.value)
        }
      }
    }, 2000)
  }

  noteList = []
  visible: any
  noteBooks = []
  // 这是一个序号，不是id
  selectedNotebook = 0

  @Watch('selectedNotebook')
  doCollectChanged(newval: any, oldval: any) {
    const nodelist: any = this.noteBooks[newval]
    this.$store.commit('setNoteBookId', newval)
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

  changeNote(type: any) {
    switch (type) {
      case 'pre':
        this.selectedNotebook == 0 ? '' : (this.selectedNotebook = this.selectedNotebook - 1)
        break
      case 'pro':
        this.selectedNotebook == this.noteBooks.length - 1 ? '' : (this.selectedNotebook = this.selectedNotebook + 1)
        break
      default:
        break
    }
  }

  showAllNotebook() {}

  mounted() {
    this.fetchQue()
    this.fetchNoteBooks()
  }

  async fetchNoteBooks(fun?: Function) {
    const res = await this.$http.get(`collections/${this.$store.state.auth.user.id}/user?type=note`)

    this.noteBooks = res.data

    if (this.noteBooks.length != 0) {
      const nodelist: any = this.noteBooks[this.selectedNotebook]

      this.noteList = nodelist.posts
    }

    if (fun) {
      fun()
    }
  }

  async fetchQue() {
    if (!this.id && this.$store.state.selectedNoteId !== '') {
      this.$router.push(`/record/${this.$store.state.selectedNoteId}`)
    }

    if (this.id) {
      const res = await this.$http.get(`posts/${this.id}?type=edit`)
      if (res.data.status === 404) {
        this.$store.commit('delSelectedNote')
        this.$router.push(`/record`)
      } else {
        this.$store.commit('setNote', this.id)
        const ref: any = this.$refs.markdown
        ref.setContent(res.data.body)
        this.title = res.data.title
        this.dynamicTags = res.data.tags
      }
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
    const collection: any = this.noteBooks[this.selectedNotebook]
    if (collection && collection.id !== -1) {
      this.dynamicTags = []
      const body = {
        title: now,
        collection: collection.id,
        type: 'note'
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
    } else {
      this.$notify({
        title: '提示',
        type: 'info',
        message: '请先创建笔记本'
      })
    }
  }

  async handleNotebook(command: any) {
    switch (command.type) {
      case 'changeTitle':
        this.$prompt('请输入标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: command.name
        })
          .then(async ({ value }: any) => {
            await this.$http.put(`/collections/${command.id}`, {
              name: value
            })
            this.fetchNoteBooks()
            this.$notify({
              title: '成功',
              type: 'success',
              message: '修改成功 '
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        break

      case 'delNotebook':
        this.$confirm('此操作将永久删除该文集，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            await this.$http.delete(`/collections/${command.id}`)
            this.fetchNoteBooks()
          })
          .catch(() => {})
      default:
        break
    }
  }

  async handleNotePost(command: any) {
    switch (command.type) {
      case 'movePost':
        this.movedNotebook = ''
        break
      case 'changeTitle':
        this.$prompt('请输入标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: command.name
        })
          .then(async ({ value }: any) => {
            await this.$http.put(`/posts/${command.id}`, { title: value })

            this.fetchNoteBooks()

            this.$notify({
              title: '成功',
              type: 'success',
              message: '修改成功 '
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        break

      case 'delPost':
        await this.$http.delete(`/posts/${command.id}`)

        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除成功'
        })

        this.$store.commit('delSelectedNote')
        this.$router.push('/record')
        this.noteList.splice(command.index, 1)
        break
      default:
        break
    }
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
        const collection: any = this.noteBooks[this.selectedNotebook]
        if (!collection) {
          this.showTips = true
          setTimeout(() => {
            this.showTips = false
          }, 5000)
          return
        }
        const body = {
          title: this.title,
          body: data,
          collection: collection.id,
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
        title: '提示',
        type: 'info',
        message: '标题不能为空'
      })
    }
  }

  createNoteBook() {
    this.$prompt('请输入标题', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(async ({ value }: any) => {
        if (value === '') {
          return this.$notify({
            title: '错误',
            type: 'error',
            message: '名字不能为空'
          })
        }
        const res = await this.$http.post('/collections', { name: value, type: 'note' })
        this.$notify({
          title: '成功',
          type: 'success',
          message: '添加成功'
        })

        this.fetchNoteBooks(() => {
          this.selectedNotebook = this.noteBooks.length - 1
          this.$store.commit('setNoteBookId', this.selectedNotebook)
        })
      })
      .catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
  }

  async handlePostMove(noteId: any) {
    if (noteId !== this.movedNotebook && this.movedNotebook !== '') {
      await this.$http.put(`/posts/move/${noteId}?collectionId=${this.movedNotebook}`)
      this.$notify({
        title: '成功',
        type: 'success',
        message: '移动成功 '
      })
      this.fetchNoteBooks()
    }
  }
}
</script>

<style lang="scss">
.el-drawer__body {
  overflow-y: overlay;
}

.list-complete-item {
  transition: all 1s;
  // display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(300px);
}
.list-complete-leave-active {
  position: absolute;
}

.record {
  &._mask::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #00000045;
  }
}

.twinkle {
  -webkit-animation: twinkleTip 2.1s infinite ease-in-out;
  animation: twinkleTip 2.1s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes twinkleTip {
  0% {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  50% {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  100% {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}
</style>
