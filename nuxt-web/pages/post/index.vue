<template>
  <div>
    <el-container>
      <el-aside class="collections" width="18%">
        <div class="d-flex flex-column mt-4">
          <div class="lh-2 point backBtn fs-xs">
            <router-link tag="div" to="/">回首页</router-link>
          </div>

          <div class="text-left lh-3 mt-2 fs-sm">
            <div @click="show = !show" type="plain" class="point">
              <i class="el-icon-folder-add pl-3"></i> 新建文集
            </div>
            <transition
              enter-active-class="animated slideInLeft"
              leave-active-class="animated slideOutLeft"
            >
              <div v-if="show">
                <el-input
                  v-focus="show"
                  v-model="newCollection"
                  placeholder="请输入文集名..."
                ></el-input>
                <div class="d-flex jc-around">
                  <el-button
                    @click="createCollect"
                    class="btn my-2"
                    style="border:1px solid #009a61;color:#009a61;line-height:6px;border-radius:16px"
                    type="info"
                    >提交</el-button
                  >
                  <el-button
                    @click="
                      show = !show
                      newCollection = ''
                    "
                    type="text"
                    >取消</el-button
                  >
                </div>
              </div>
            </transition>
            <ul
              :class="
                selectedCollection == collect.id
                  ? 'lh-3 pr-3 bd-left'
                  : 'lh-3 pr-3'
              "
              v-for="collect in collections"
              :key="collect.id"
            >
              <li @click="selectCollect(collect.id)" class="d-flex jc-between">
                <div class="text-ellipsis">{{ collect.name }}</div>

                <el-dropdown
                  @command="handleCollection"
                  class="text-white"
                  trigger="click"
                >
                  <span>
                    <i class="el-icon-s-tools el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline"
                      >修改文集</el-dropdown-item
                    >

                    <el-dropdown-item
                      :command="collect.id"
                      icon="el-icon-delete"
                      >删除文集</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
            <div>
              <el-dropdown
                @command="handleEditor"
                class="footer-left fs-sm"
                trigger="click"
              >
                <span> <i class="el-icon-s-operation pr-2"></i>设置 </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-toilet-paper" command="a">
                    默认编辑器
                    <span class="text-blue"
                      >({{
                        defaultEditor ? '富文本编辑器' : 'markdown编辑器'
                      }})</span
                    >
                  </el-dropdown-item>

                  <el-dropdown-item icon="el-icon-set-up"
                    >设置显示模式</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="footer-right fs-sm">
              遇到问题
              <i class="el-icon-question"></i>
            </div>
          </div>
        </div>
      </el-aside>
      <el-aside
        id="post"
        class="postlist"
        width="23%"
        style="background-color:white;color:#333"
      >
        <div @click="creatPost" type="primary" class="creatpost point pl-4">
          <i class="el-icon-circle-plus pr-2"></i>新建文章
        </div>
        <ul
          v-for="post in posts"
          :key="post.id"
          :class="selectedPost == post.id ? 'post-bd-left' : ''"
        >
          <li
            @click="selectPost(post.id)"
            class="d-flex jc-between"
            type="primary"
          >
            <i class="el-icon-document fs-ll pt-4 pl-3"></i>
            <div class="text-ellipsis">
              <span>{{ post.title }}</span>
            </div>

            <!-- <i class="el-icon-s-tools pt-4 pr-2"> -->
            <el-dropdown
              @command="handlePost"
              placement="bottom-start"
              class="pr-3"
              trigger="click"
            >
              <span>
                <i class="el-icon-s-tools el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="'a.' + post.id + '.' + post.title"
                  icon="el-icon-chat-dot-round"
                  >修改文章标题</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-edit-outline"
                  >移动文章</el-dropdown-item
                >
                <el-dropdown-item
                  :command="'c.' + post.id"
                  icon="el-icon-delete"
                  >删除文章</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- </i> -->
          </li>
        </ul>
      </el-aside>
      <el-main
        :style="
          !selectedPost
            ? 'display:flex;flex-direction:row;justify-content:center;align-items:center;'
            : ''
        "
      >
        <div v-if="selectedPost">
          <div class="my-3">
            <el-input v-model="title" size="medium" placeholder></el-input>
          </div>
          <tinymce
            ref="tinymce"
            v-show="selectEditor"
            @submit="updatePost"
          ></tinymce>

          <markdown
            ref="markdown"
            v-show="!selectEditor"
            @submit="updatePost"
          ></markdown>
        </div>
        <div v-else class="bg" style="flex:1">抒写</div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import dayjs from 'dayjs'
import tinymce from '~/components/Tinymce/Tinymce.vue'
import markdown from '~/components/markdown/MarkDown.vue'
@Component({
  components: { tinymce, markdown }
})
export default class Post extends Vue {
  head() {
    return {
      meta: [{ hid: 'description', name: 'description', content: 'hi-Sen' }]
    }
  }
  collections: any = []
  newCollection: any = ''
  show: boolean = false
  selectedCollection: any = null
  selectedPost: any = ''
  posts: any = ''
  defaultEditor: boolean = true
  selectEditor: boolean = true
  title: string = ''
  // true是tinymce

  mounted() {
    this.fetchCollect()
    this.fetchEditor()
  }
  async createCollect() {
    if (this.newCollection === '') {
      return this.$notify({
        title: '错误',
        type: 'error',
        message: '文集不能为空'
      })
    }
    await this.$http.post('/collections', { name: this.newCollection })
    this.$notify({
      title: '成功',
      type: 'success',
      message: '添加成功'
    })
    this.fetchCollect()
    this.show = false
    this.newCollection = ''
  }

  selectCollect(id: any) {
    this.fetchPost(id)
  }

  async selectPost(id: any) {
    this.selectedPost = id
    const res = await this.$http.get(`/posts/${id}`)
    this.selectEditor = res.data.editor

    this.title = res.data.title
    if (res.data.editor) {
      this.$nextTick(() => {
        this.$refs.tinymce.setContent(res.data.body)
      })
    } else {
      this.$nextTick(() => {
        this.$refs.markdown.setContent(res.data.body)
      })
    }
  }

  creatPost() {
    if (this.selectedCollection != null) {
      const now = dayjs(new Date()).format('YYYY-MM-DD')

      const data = {
        title: now,
        body: '',
        collection: this.selectedCollection,
        editor: this.defaultEditor
      }

      const loading = this.$loading({
        target: '#post',
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(async () => {
        await this.$http.post('/posts', data)
        this.selectCollect(this.selectedCollection)
        loading.close()
        this.$notify({
          title: '成功',
          type: 'success',
          message: '添加成功'
        })
      }, 2000)
    } else {
      this.$notify({
        title: '错误',
        type: 'error',
        message: '请先创建文集'
      })
    }
  }

  async updatePost() {
    // 不同的编辑器方式不同
    let body
    if (this.selectEditor) {
      body = this.$refs.tinymce.body
    } else {
      body = this.$refs.markdown.body
    }

    const data = {
      title: this.title,
      body
    }
    await this.$http.put(`/posts/${this.selectedPost}`, data)
    this.$notify({
      title: '成功',
      type: 'success',
      message: '更新成功'
    })
  }

  async fetchCollect() {
    const res = await this.$http.get('/collections')
    if (res.data.length !== 0) {
      this.collections = res.data
      this.selectedCollection = res.data[0].id
      // 根据集合id拿到post的id
      this.fetchPost(this.selectedCollection)
    }
  }

  async fetchPost(id: any) {
    const res = await this.$http.get(`/posts/collections/${id}`)
    this.selectedCollection = id
    this.posts = res.data
  }

  handleCollection(command: number) {
    this.$confirm('此操作将永久删除该文集，是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(`/collections/${command}`)
        this.fetchCollect()
      })
      .catch(() => {})
  }
  async handlePost(command: any) {
    const id = command.split('.')[1]

    if (command.split('.')[0] === 'a') {
      this.$prompt('请输入标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async ({ value }) => {
          await this.$http.put(`/posts/${id}`, { title: value })
          this.fetchPost(this.selectedCollection)
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
    }
    if (command.split('.')[0] === 'c') {
      await this.$http.delete(`/posts/${id}`)
      this.$notify({
        title: '成功',
        type: 'success',
        message: '删除成功'
      })
      this.fetchPost(this.selectedCollection)
    }
  }

  handleEditor(command: any) {
    if (command === 'a') {
      this.defaultEditor = !this.defaultEditor
      const body = {
        editor: this.defaultEditor
      }
      this.$http.put('users/editor', body)
      this.$notify({
        title: '成功',
        type: 'success',
        message: '设置成功'
      })
    }
  }

  async fetchEditor() {
    const res = await this.$http.get('users')
    this.defaultEditor = res.data.editor === 1
  }
}
</script>

<style lang="scss" scoped>
.backBtn {
  margin-top: 100px;
  border: 1px solid #009a61;
  width: 80%;
  margin: 0 auto;
  border-radius: 20px;
  color: #009a61;
}
.postlist ul {
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  border-top: 1px solid #d9d9d9;

  li {
    height: 80px;
    line-height: 80px;
    list-style-type: none;
  }

  &:hover {
    background-color: #e6e6e6;
  }
}
.bd-left {
  border-left: 3px solid #009a61;

  background-color: #666;
}
.post-bd-left {
  border-left: 5px solid #009a61;
  background-color: #e6e6e6;
}

.collections ul {
  position: relative;
  cursor: pointer;

  li {
    list-style-type: none;
    padding-left: 13px;
  }

  &:hover {
    background-color: #666;
  }
}
.creatpost {
  height: 60px;
  line-height: 60px;
  text-align: left;
}

.el-aside {
  background-color: #404040;
  color: white;
  text-align: center;
  position: relative;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0 !important;
}

.bg {
  font-size: 64px;
  color: #e6e6e6;
  text-shadow: 0 1px 0 #fff;
}

.footer-left {
  position: absolute;
  bottom: 1%;
  left: 5%;
  cursor: pointer;
  color: #999;
  &:hover {
    color: white;
  }
}

.footer-right {
  position: absolute;
  bottom: 1%;
  right: 5%;
  cursor: pointer;
  color: #999;
  &:hover {
    color: white;
  }
}
</style>
