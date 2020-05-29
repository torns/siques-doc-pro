<template>
  <div>
    <div class="container pt-5">
      <el-row :gutter="0" type="flex">
        <el-col v-if="tagInfo" :xs="24" :sm="24" :md="24" :lg="17" :xl="17" style="min-height:80vh">
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/tags' }">标签</el-breadcrumb-item>
              <el-breadcrumb-item
                ><a :href="`/t/${id}`">{{ tagInfo.info.name }}</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>标签动态</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="pt-3">
            <div class="description bg-3 w-100 px-3 py-3 " style="min-height:130px;">
              <div class="d-flex ">
                <el-tag class="hover-3 mr-3" style="font-weight:800" type="primary">
                  <span class="fs-sm">{{ tagInfo.info.name }}</span></el-tag
                >
                <div style="margin-top:2px">
                  <el-button size="mini" type="primary">已关注 | {{ tagInfo.count }}</el-button>
                </div>
              </div>
              <div class="text-gray  pt-3 fs-xm">
                <div class="lh-2">
                  {{ tagInfo.info.description }}
                  <el-link type="text">[百科]</el-link>
                </div>
              </div>
            </div>
          </div>

          <div v-if="posts" class="body pt-3">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="标签动态" name="first">
                <el-pannel @refetch="fetchPost" :data="posts"></el-pannel>
              </el-tab-pane>

              <el-tab-pane label="技术问答" name="third">技术问答</el-tab-pane>
              <el-tab-pane label="标签百科" name="fourth">标签百科</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :xs="0" :sm="6" :md="8" :lg="6" :xl="6" class="hidden-sm-and-down pl-2">
          <div class="pl-3">
            <div>相关标签</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <sq-footer top-border="true"></sq-footer>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import TagPannel from '~/components/ListPanel/TagPanel.vue'
@Component({
  components: { 'el-pannel': TagPannel }
})
export default class T extends Vue {
  head() {
    return {
      title: this.tagInfo.info.name || ''
    }
  }
  activeName = 'first'
  posts = null
  tagInfo = { info: { name: '' } }
  get id(): any {
    return this.$route.params.id
  }

  mounted() {
    this.fetchPost()
    this.fetchTag()
  }

  async fetchPost() {
    const res = await this.$http.get(`/tags/post/${this.id}`)
    this.posts = res.data
  }

  async fetchTag() {
    const res = await this.$http.get(`/tags/info/${this.id}`)
    this.tagInfo = res.data
  }

  handleClick(tab: any, event: any) {}
}
</script>
<style lang="scss"></style>
