<template>
  <div>
    <div class="d-flex jc-between pb-3">
      <div class="fs-lg">{{ id ? '他' : '我' }}的提问</div>

      <div>
        <span class="text-gray fs-xm">排序：</span>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="时间"></el-radio-button>
          <el-radio-button label="得票"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-divider></el-divider>

    <list-panel :collection="false" :posts="questions" question></list-panel>
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
  id: string
  questions = ''
  radio4 = []
  mounted() {
    this.fetchUserQue()
  }

  async fetchUserQue() {
    if (this.id) {
      const res = await this.$http.get(`/posts/${this.id}/user?type=question`)
      this.questions = res.data
    } else {
      const res = await this.$http.get(
        `/posts/${this.$store.state.auth.user.id}/user?type=question`
      )
      this.questions = res.data[0]
    }
  }
}
</script>

<style lang="scss"></style>
