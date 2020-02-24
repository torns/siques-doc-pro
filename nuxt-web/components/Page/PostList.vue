<template>
  <div style="margin-top:-10px">
    <div class="fs-lg ">{{ id ? '他' : '我' }}的专栏</div>
    <div class="py-3">
      <el-divider></el-divider>
    </div>
    <div>
      <ul class="pb-2">
        <div
          v-for="(collection, index) in collections"
          :key="index"
          class="py-2"
        >
          <nuxt-link :to="`/blogs/${collection.id}`" tag="div">
            <div class="text-primary point pb-2 hoverlink">
              {{ collection.name }}
            </div></nuxt-link
          >

          <div class="d-flex fs-xm ">
            <div class="pr-2">{{ collection.interest }} 人关注</div>
            <div>{{ collection.amount }}篇文章</div>
          </div>
        </div>
      </ul>
    </div>
    <div class="d-flex jc-between pb-3">
      <div class="fs-lg">{{ id ? '他' : '我' }}的文章</div>

      <div>
        <span class="text-gray fs-xm">排序：</span>
        <el-radio-group v-model="sort" size="mini">
          <el-radio-button label="时间" value="created"></el-radio-button>
          <el-radio-button label="得票" value="liked"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-divider></el-divider>

    <list-panel
      @pageChange="fetch"
      :posts="posts"
      :len="len"
      post
      collection="true"
    ></list-panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import ListPanel from '../ListPanel/ListPanel.vue'
@Component({
  components: { 'list-panel': ListPanel }
})
export default class PageComponent extends Vue {
  @Prop()
  id: any
  posts: any = null
  collections: any = null
  len: any = 0
  page: any = 1
  activeName: string = ''
  sort: string = '时间'
  mypageActiveName: string = 'mypost'

  mounted() {
    this.fetch()
    this.fetchCollect()
  }

  @Watch('sort')
  isSortChange() {
    this.fetch(this.page)
  }

  get sorts() {
    return this.sort === '时间' ? 'created' : 'liked'
  }

  async fetch(page?: any, limit?: any) {
    this.page = page
    if (this.id) {
      const res = await this.$http.get(
        `/posts/${this.id}/user?type=post&page=${page || ''}`
      )
      this.len = res.data[1]
      this.posts = res.data[0]
    } else {
      const link = `/posts/${
        this.$store.state.auth.user.id
      }/user?type=post&page=${page || ''}&sort=${this.sorts}`

      const res = await this.$http.get(link)
      this.len = res.data[1]
      this.posts = res.data[0]
    }
  }

  async fetchCollect() {
    if (this.id) {
      const res = await this.$http.get(`/collections/${this.id}/user?type=post`)
      this.collections = res.data
    } else {
      const res = await this.$http.get(
        `/collections/${this.$store.state.auth.user.id}/user?type=post`
      )
      this.collections = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 !important;
}
</style>
