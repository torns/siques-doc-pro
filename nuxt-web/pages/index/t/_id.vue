<template>
  <div>
    <div class="container pt-5">
      <el-row :gutter="0" type="flex">
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/tags' }"
                >标签</el-breadcrumb-item
              >
              <el-breadcrumb-item
                ><a :href="`/t/${id}`">{{ id }}</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>标签动态</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="pt-3">
            <div
              class="description bg-3 w-100 px-3 py-3 "
              style="min-height:130px;"
            >
              <div class="d-flex ">
                <el-tag
                  class="hover-3 mr-3"
                  style="font-weight:800"
                  type="primary"
                >
                  <span class="fs-sm">{{ id }}</span></el-tag
                >
                <div style="margin-top:2px">
                  <el-button size="mini" type="primary"
                    >已关注 | 52730</el-button
                  >
                </div>
              </div>
              <div class="text-gray pt-3 fs-xm">
                超文本标记语言（英文：HyperText Markup
                Language，HTML）是为“网页创建和其它可在网页浏览器中看到的信息”设计的一种标记语言。
                <el-button type="text" class="hoverlink">[百科]</el-button>
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
        <el-col
          :xs="0"
          :sm="6"
          :md="8"
          :lg="6"
          :xl="6"
          class="hidden-sm-and-down pl-2"
        >
          <div class="pl-3">
            <div>相关标签</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-footer :show="true"></el-footer>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TagPannel from '~/components/ListPanel/TagPanel.vue'
@Component({
  components: { 'el-pannel': TagPannel }
})
export default class T extends Vue {
  activeName = 'first'
  posts = null
  get id(): any {
    return this.$route.params.id
  }

  mounted() {
    this.fetchPost()
  }

  async fetchPost() {
    const res = await this.$http.get(`/tags/post/${this.id}`)
    this.posts = res.data
  }

  handleClick(tab, event) {
    console.log(tab, event)
  }
}
</script>
<style lang="scss"></style>
