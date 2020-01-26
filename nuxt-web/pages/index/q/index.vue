<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="最新问答" name="first">
            <div>
              <ul>
                <li v-for="(question, index) in questions" :key="index">
                  <div>{{ question.liked }}</div>
                  <div>{{ question.views }}</div>
                  <div>{{ question.user.name }}</div>
                  {{ question.title }}
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="等待回答" name="second">等待回答</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        class="hidden-sm-and-down pl-2"
        >123</el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Index extends Vue {
  activeName = 'first'
  questions = ''

  mounted() {
    this.fetchQuestion()
  }
  async fetchQuestion() {
    const res = await this.$http.get('/posts/all?limit=10&page=1&type=question')
    this.questions = res.data[0]
  }
  handleClick() {}
}
</script>

<style lang="scss"></style>
