<template>
  <div style="margin-top:-5px">
    <div class="d-flex jc-between">
      <div class="fs-lg">{{ id ? '他' : '我' }}的收藏夹</div>
      <el-button type="text" @click="$router.push('/bookmark')"
        >访问收藏架专栏</el-button
      >
    </div>
    <el-divider></el-divider>
    <div v-if="!bookmarks">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ListPanel from '../ListPanel/ListPanel.vue'
@Component({
  components: { 'list-panel': ListPanel }
})
export default class Bookmark extends Vue {
  @Prop()
  id: string
  bookmarks: string = ''
  activeName: string = ''
  mypageActiveName: string = 'mypost'

  mounted() {
    this.fetch()
  }

  async fetch() {
    if (this.id) {
      const res = await this.$http.get(`/bookmarks/${this.id}`)
      this.bookmarks = res.data[0]
    } else {
      const res = await this.$http.get(
        `/bookmarks/${this.$store.state.user.userId}`
      )
      this.bookmarks = res.data[0]
    }
  }
}
</script>

<style lang="scss"></style>
