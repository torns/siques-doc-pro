<template>
  <div style="margin-top:-5px">
    <div class="d-flex jc-between">
      <div class="fs-lg">{{ id ? '他' : '我' }}的收藏夹</div>
      <el-button v-if="!id" @click="$router.push('/u/bookmark')" type="text">访问收藏架专栏</el-button>
    </div>
    <el-divider></el-divider>
    <list-bookmark :bookmarks="bookmarks"></list-bookmark>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ListBookmark from '../ListPanel/ListBookmark.vue'
@Component({
  components: { 'list-bookmark': ListBookmark }
})
export default class Bookmark extends Vue {
  @Prop()
  id: any
  bookmarks: any = null
  activeName: string = ''
  mypageActiveName: string = 'mypost'

  mounted() {
    this.fetch()
  }

  async fetch() {
    if (this.id) {
      const res = await this.$http.get(`/bookmarks/${this.id}/user`)
      this.bookmarks = res.data
    } else {
      const res = await this.$http.get(`/bookmarks/${this.$store.state.auth.user.id}/user`)
      this.bookmarks = res.data
    }
  }
}
</script>

<style lang="scss"></style>
