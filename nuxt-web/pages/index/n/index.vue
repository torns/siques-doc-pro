<template>
  <div>
    <div class="container h-100">
      <el-row style="min-height:60vh" type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="px-2">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="最新笔记" name="first">
              <div v-for="(note, index) in notes" :key="index" :class="`d-flex ai-center bg-${color(note.views)} hover-2`" style="height:70px">
                <div class="d-flex ai-center px-2 " style="white-space: nowrap;">
                  <div class="pr-3 text-gray">
                    <div class="px-2 fs-xs">{{ note.liked }}</div>
                    <div>得票</div>
                  </div>
                  <div class="pr-3">
                    <div class="px-2 fs-xs">{{ note.views }}</div>
                    <div>浏览</div>
                  </div>
                  <div>
                    <div class="fs-xm text-gray hoverlink">
                      {{ note.user.name }}
                    </div>
                    <div>
                      <div class="pt-1 hoverlink">
                        <router-link :to="`/n/${note.id}`" class="ellipsis-1">{{ note.title }}</router-link>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <sq-holder :count="10" :show="show"></sq-holder>
              <el-pagination
                ref="reference1"
                :hide-on-single-page="maxLen < 10 ? true : false"
                @current-change="handleCurrentChange"
                :total="maxLen"
                background
                layout="prev, pager, next"
                class="mt-4"
              ></el-pagination>
            </el-tab-pane>

            <el-tab-pane label="热门笔记" name="second">
              <div v-for="(note, index) in notes" :key="index" :class="`d-flex ai-center bg-${color(note.views)} hover-2`" style="height:70px">
                <div class="d-flex ai-center px-2 " style="white-space: nowrap;">
                  <div class="pr-3 text-gray">
                    <div class="px-2 fs-xs">{{ note.liked }}</div>
                    <div>得票</div>
                  </div>
                  <div class="pr-3">
                    <div class="px-2 fs-xs">{{ note.views }}</div>
                    <div>浏览</div>
                  </div>
                  <div>
                    <div class="fs-xm text-gray hoverlink">
                      {{ note.user.name }}
                    </div>
                    <div>
                      <div class="pt-1 hoverlink">
                        <router-link :to="`/n/${note.id}`" class="ellipsis-1">{{ note.title }}</router-link>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <sq-holder :count="10" :show="show"></sq-holder>
              <el-pagination
                ref="reference2"
                :hide-on-single-page="maxLen < 10 ? true : false"
                @current-change="handleCurrentChange"
                :total="maxLen"
                background
                layout="prev, pager, next"
                class="mt-4"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down pl-2">侧边栏</el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
@Component({
  components: {}
})
export default class NotesIndex extends Vue {
  async asyncData({ params, query }: any) {
    const http = Vue.prototype.$http

    const res = await http.get('/posts/all?limit=10&page=1&type=note&sort=created')

    return {
      notes: res.data[0],
      maxLen: res.data[1]
    }
  }

  activeName = 'first'
  notes = ''
  maxLen = 0
  show = false

  @Watch('activeName')
  isActiveNameChanged(newVal: any, oldVal: any) {
    this.handleCurrentChange(1)
    const ref1: any = this.$refs.reference1
    const ref2: any = this.$refs.reference2
    ref1.internalCurrentPage = 1
    ref2.internalCurrentPage = 1
  }

  async handleCurrentChange(val: any) {
    this.notes = ''
    this.show = true
    let res: any
    if (this.activeName === 'first') {
      res = await this.$http.get(`/posts/all?limit=10&page=${val}&type=note&sort=created`)
    } else {
      res = await this.$http.get(`/posts/all?limit=10&page=${val}&type=note&sort=views`)
    }

    setTimeout(() => {
      this.notes = res.data[0]
      this.show = false
    }, 400)
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
