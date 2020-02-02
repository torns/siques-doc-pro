<template>
  <div>
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

    <list-panel :posts="notes" note></list-panel>
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
  notes = ''
  radio4 = []
  mounted() {
    this.fetchUserNote()
  }

  async fetchUserNote() {
    if (this.id) {
      const res = await this.$http.get(`/posts/${this.id}/user?type=note`)
      this.notes = res.data[0]
    } else {
      const res = await this.$http.get(
        `/posts/${this.$store.state.auth.user.id}/user?type=note`
      )
      this.notes = res.data[0]
    }
  }
}
</script>

<style lang="scss"></style>
