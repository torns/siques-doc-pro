<template>
  <div>
    <div class="tagMask" style="height:115vh;">
      <div class="text-white relative" style="left:50%;top:44%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">专栏</div>
        </h1>
        <div>点点滴滴记录代码日常</div>
      </div>
      <sq-wave class="absolute" style="margin-top:-9em;width:100%;bottom:0;" :background="`#00000000`"></sq-wave>
    </div>

    <div>
      <video style="height:115vh;object-fit: cover;width:100%;" autoplay loop muted playsinline src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/collection/cover3.mp4"></video>
    </div>
    <div style="margin-top:-10em" class="collection_container h-100 pt-4 ">
      <sq-panel :data="posts"></sq-panel>
    </div>

    <sq-pagination :href="`${$route.path}?page=1`" @current-change="handleCurrentChange" :currentPage="currentPage" :maxLen="maxLen"></sq-pagination>
    <sq-footer class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { listIntercep } from '../../../plugins/utils.js'
// import BlogPanel from '~/components/ListPanel/BlogPanel.vue'
import CollectionPannel from '~/components/collectionPanel/index.vue'

import config from '~/plugins/config/website.js'

@Component({
  components: { 'sq-panel': CollectionPannel }
})
export default class CollectionIndex extends Vue {
  async asyncData({ params, store, route }: any) {
    const Taglist = store.state.auth ? (store.state.auth.user ? (store.state.auth.user.tags ? store.state.auth.user.tags : null) : null) : null
    const List = listIntercep(Taglist)
    const http = Vue.prototype.$http

    const link =
      `/posts/all?limit=10&page=${route.query.page ? route.query.page : 1}&sort=${route.query.sort ? route.query.sort : 'created'}` +
      (Taglist ? `&taglist=${List}` : '') +
      `&listId=true&collection=true&type=post&avator=true`
    const res = await http.get(link)

    return {
      list: List,
      taglist: Taglist,
      posts: res.data[0],
      maxLen: res.data[1],
      currentPage: parseInt(route.query.page ? route.query.page : 1),
      sort: route.query.sort ? route.query.sort : 'created'
    }
  }

  config = config

  head() {
    return {
      title: '专栏_思趣'
    }
  }

  sort = 'views'
  listId = true
  maxLen = 0
  posts = []
  list: any
  taglist = []

  currentPage = 1

  mounted() {}

  async handleCurrentChange(val: any) {
    // currentPage =val
    this.currentPage = val
    this.posts = []

    const link =
      `/posts/all?limit=10&page=${this.currentPage}` +
      (this.sort ? `&sort=${this.sort}` : '') +
      (this.taglist ? `&taglist=${this.list}` : '') +
      (this.listId ? `&listId=${this.listId}` : '') +
      `&collection=true&type=post&avator=true`

    const res = await this.$http.get(link)

    setTimeout(() => {
      this.posts = res.data[0]
    }, 400)

    this.$router.push(`/collection?page=${this.currentPage}&sort=${this.sort}`)
    // window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
</style>
