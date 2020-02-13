<template>
  <div class="bg-light">
    <div class="container ">
      <el-row type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div>
            <el-input
              v-model="title"
              placeholder="请输入标题，用号码结尾"
            ></el-input>
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
              <el-select
                v-model="model"
                size="mini"
                placeholder="提问模板(可选)"
              >
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </div>
            <markdown
              ref="markdown"
              @submit="submitQues"
              name="发布笔记"
              height="600px"
            ></markdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Tag from '@/components/dialog/tag.vue'

@Component({
  components: { 'sq-tag': Tag }
})
export default class Index extends Vue {
  title = ''
  dynamicTags: Array<any> = []
  content = [{ development: '' }]
  model = ''
  tagLen: number = 5
  questions: any
  visible: any

  @Watch('model')
  doModelChanged() {
    if (this.model === 'development') {
      const ref: any = this.$refs.markdown
      ref.setContent()
    }
  }

  get id(): any {
    return this.$route.params.id
  }
  mounted() {
    this.fetchQue()
  }

  options = [
    {
      label: '提问模板(可选)',
      options: [
        {
          value: 'development',
          label: '开发相关'
        },
        {
          value: 'program',
          label: '编程相关'
        },
        {
          value: 'tools',
          label: '工具软件相关'
        }
      ]
    }
  ]

  async fetchQue() {
    if (this.id) {
      const res = await this.$http.get(`posts/${this.id}`)
      this.questions = res.data
      const ref: any = this.$refs.markdown
      ref.setContent(res.data.body)
      this.title = res.data.title
      this.dynamicTags = res.data.tags
    }
  }

  @Watch('dynamicTags')
  dynamicTagsChanged(val: any, oldval: any) {
    this.tagLen = 5 - val.length
    const ref: any = this.$refs.tag
    ref.taglen = 5 - val.length
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

  async submitQues(data: any) {
    if (this.title) {
      // const word = wordcounts(data)

      if (this.id) {
        const body = {
          title: this.title,
          body: data,

          type: 'question'
        }
        await this.$http.put(`/posts/${this.id}`, body)
        this.$notify({
          title: '成功',
          type: 'success',
          message: '更新成功'
        })
        this.$router.push(`/q`)
      } else {
        const body = {
          title: this.title,
          body: data,

          type: 'note',
          tags: this.dynamicTags
        }
        await this.$http.post(`/posts/`, body)
        this.$notify({
          title: '成功',
          type: 'success',
          message: '发布成功'
        })
        this.$store.commit('increLen', 'note')
        this.$router.push(`/n`)
      }
    } else {
      this.$notify({
        title: '失败',
        type: 'error',
        message: '标题不能为空'
      })
    }
  }
}
</script>

<style lang="scss"></style>
