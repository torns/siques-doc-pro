<template>
  <div>
    <div class="container h-100">
      <el-row style="min-height:60vh" type="flex" class="pt-4">
        <el-col class="px-2" :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="最新问答" name="first">
              <div>
                <ul>
                  <li
                    v-for="(question, index) in questions"
                    :key="index"
                    class="d-flex ai-center bg-light-1 "
                    style="height:70px"
                  >
                    <div class="d-flex ai-center px-2 ">
                      <div class="pr-3 text-gray">
                        <div class="px-2 fs-xs">{{ question.liked }}</div>
                        点赞
                      </div>
                      <div class="pr-3">
                        <div class="px-2 fs-xs">{{ question.views }}</div>
                        浏览
                      </div>
                      <div class="pr-3">
                        <div class="px-2 fs-xs">{{ question.concerned }}</div>
                        关注
                      </div>
                      <div>
                        <div class="fs-xm text-gray hoverlink">
                          {{ question.user.name }}
                        </div>
                        <div>
                          <div class="pt-1 hoverlink">
                            <router-link :to="`/q/${question.id}`">{{
                              question.title
                            }}</router-link>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
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
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class Index extends Vue {
  head() {
    return {
      title: '问答_思趣'
    }
  }

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
