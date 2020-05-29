<template>
  <div>
    <div class="fs-lg ">{{ id ? '他' : '我' }}的笔记本</div>
    <div class="py-3">
      <el-divider></el-divider>
    </div>
    <div>
      <ul class="pb-2 d-flex flex-wrap">
        <div v-for="(collection, index) in collections" :key="index" class="py-2 pr-2">
          <nuxt-link :to="`/blogs/${collection.id}`" tag="a">
            <div class="text-primary point pb-2 hoverlink">
              {{ collection.name }}
            </div></nuxt-link
          >

          <div class="d-flex fs-xm ">
            <div class="pr-2">{{ collection.interest }} 人关注</div>
          </div>
        </div>
      </ul>
    </div>
    <div class="d-flex jc-between pb-3">
      <div class="fs-lg">{{ id ? '他' : '我' }}的笔记</div>

      <div>
        <span class="text-gray fs-xm">排序：</span>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="时间"></el-radio-button>
          <el-radio-button label="得票"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-divider></el-divider>

    <list-panel @pageChange="fetchUserNote" :len="len" :posts="notes" collection="true" note></list-panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ListPanel from '../ListPanel/ListPanel.vue'
@Component({
  components: { 'list-panel': ListPanel }
})
export default class QuestionList extends Vue {
  @Prop()
  id: any
  len: any = 0
  notes = ''
  radio4 = []
  page: any = 1
  collections = []
  mounted() {
    this.fetchUserNote()
    this.fetchCollect()
  }

  async fetchUserNote(page?: any) {
    this.page = page
    if (this.id) {
      const res = await this.$http.get(`/posts/${this.id}/user?type=note`)
      this.notes = res.data[0]
    } else {
      const res = await this.$http.get(`/posts/${this.$store.state.auth.user.id}/user?type=note&page=${page || ''}`)
      this.len = res.data[1]
      this.notes = res.data[0]
    }
  }

  async fetchCollect() {
    if (this.id) {
      const res = await this.$http.get(`/collections/${this.id}/user?type=note`)
      this.collections = res.data
    } else {
      const res = await this.$http.get(`/collections/${this.$store.state.auth.user.id}/user?type=note`)
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
