<template>
  <div>
    <div class="container h-100">
      <el-row style="min-height:60vh" type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="最新笔记" name="first">
              <div
                v-for="(note, index) in notes"
                :key="index"
                :class="`d-flex ai-center bg-${color(note.views)} hover-2`"
                style="height:70px"
              >
                <div class="d-flex ai-center px-2 ">
                  <div class="pr-3 text-gray">
                    <div class="px-2 fs-xs">{{ note.liked }}</div>
                    得票
                  </div>
                  <div class="pr-3">
                    <div class="px-2 fs-xs">{{ note.views }}</div>
                    浏览
                  </div>
                  <div>
                    <div class="fs-xm text-gray hoverlink">
                      {{ note.user.name }}
                    </div>
                    <div>
                      <div class="pt-1 hoverlink">
                        <router-link :to="`/n/${note.id}`">{{
                          note.title
                        }}</router-link>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-pagination
              :hide-on-single-page="maxLen < 10 ? true : false"
              @current-change="handleCurrentChange"
              :total="maxLen"
              background
              layout="prev, pager, next"
              class="mt-4"
            ></el-pagination>
            <el-tab-pane label="热门笔记" name="second"></el-tab-pane>
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
export default class NotesIndex extends Vue {
  async asyncData({ params, query }: any) {
    const http = Vue.prototype.$http
    console.log(query)
    const res = await http.get('/posts/all?limit=10&page=1&type=note')

    return {
      notes: res.data[0],
      maxLen: res.data[1]
    }
  }

  activeName = 'first'
  notes = ''
  maxLen = 0

  async handleCurrentChange(val: any) {
    const res = await this.$http.get(
      `/posts/all?limit=10&page=${val}&type=note`
    )
    this.notes = res.data[0]
    this.$router.push(`/n?page=${val}`)
  }

  head() {
    return {
      title: '笔记_思趣'
    }
  }

  color(view: any) {
    if (view === 0) {
      return 'light-1'
    }

    if (view > 0 && view < 10) {
      return 'info'
    }

    if (view > 10 && view < 100) {
      return 'border'
    }

    if (view > 100) {
      return 'light-green'
    }
  }

  handleClick() {}
}
</script>

<style lang="scss"></style>
