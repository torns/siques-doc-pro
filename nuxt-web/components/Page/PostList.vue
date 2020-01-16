<template>
  <div style="margin-top:-10px">
    <div class="fs-lg pb-4">{{ id ? '他' : '我' }}的专栏</div>
    <div class="d-flex jc-between pb-3">
      <div class="fs-lg">{{ id ? '他' : '我' }}的文章</div>

      <div>
        <span class="text-gray fs-xm">排序：</span>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="时间"></el-radio-button>
          <el-radio-button label="得票"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-divider></el-divider>

    <list-panel :posts="posts"></list-panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ListPanel from '../ListPanel/ListPanel.vue'
@Component({
  components: { 'list-panel': ListPanel }
})
export default class PageComponent extends Vue {
  @Prop()
  id: string
  posts: string = null
  activeName: string = ''
  radio4: string = '时间'
  mypageActiveName: string = 'mypost'

  mounted() {
    this.fetch()
  }

  async fetch() {
    if (this.id) {
      const res = await this.$http.get(`/posts/${this.id}/user`)
      this.posts = res.data[0]
    } else {
      const res = await this.$http.get(
        `/posts/${this.$store.state.user.userId}/user`
      )
      this.posts = res.data[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 !important;
}
</style>
