<template>
  <div class="searchPage ">
    <div style="min-height:80px" class="bg-light px-2">
      <div class="container h-100 ">
        <el-row :gutter="20" type="flex" class="flex-wrap" style="padding-top: 85px;">
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="pt-3 ">
            <div>
              <div class="d-flex">
                <el-input v-model="search" @keyup.enter.native="changeRoute" placeholder="输入关键字搜索"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="py-3">
            <el-button @click="changeRoute" class="mt-3 w-100" type="primary">搜索</el-button>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <el-tabs v-model="searchType" stretch>
              <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.alias">
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container h-100 pt-2 px-3">
      <el-row type="flex">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="searcData" style="min-height:300px">
            <div v-if="data != ''">
              <div class="text-gray-1">找到约 {{ data[1] || 0 }} 条结果</div>

              <div>
                <div v-for="post in data[0]" :key="post.id" class="text-gray-1">
                  <div class="point pt-4">
                    <router-link :to="`${link(post)}`" tag="a" class="hoverlink text-primary ">{{
                      post.title
                    }}</router-link>
                  </div>
                  <div class="py-2 fs-xm ">{{ post.alias }}</div>
                  <div class="d-flex fs-xm ">
                    <div class="pr-2">{{ post.liked }} 投票</div>
                    <div>{{ post.concerned }} 关注</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class Index extends Vue {
  async asyncData({ params }: any) {
    const Search = params.key
    const http = Vue.prototype.$http
    let res
    if (Search) {
      res = await http.get(`/posts/${Search}/search`)
    } else {
      res = ''
    }

    return {
      data: res.data || '',
      search: Search
    }
  }

  head() {
    return {
      title: '来愉快的搜索吧-思趣网'
    }
  }

  activeName = 'first'
  questions = ''
  searchType = 'all'
  search: any = ''
  data: any = ''
  tabs = [
    {
      label: '全部',
      alias: 'all'
    },
    {
      label: '问答',
      alias: 'question'
    },
    {
      label: '文章',
      alias: 'post'
    },
    {
      label: '笔记',
      alias: 'note'
    },
    {
      label: '标签',
      alias: 'tags'
    }
  ]

  link(post: any) {
    if (post.type === 'post') {
      return `/p/${post.id}`
    }

    if (post.type === 'question') {
      return `/q/${post.id}`
    }
    if (post.type === 'note') {
      return `/n/${post.id}`
    }
    if (post.type === 'answer') {
      return `/q/${post.post.id}`
    }
  }

  handleClick() {}

  changeRoute() {
    this.$router.push(`/search/${this.search}`)
  }
}
</script>

<style lang="scss">
.searchPage .el-tabs__header {
  margin: 0 !important;
}
</style>
