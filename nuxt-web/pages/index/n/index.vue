<template>
  <div>
    <div class="noteMask" style="height:70vh;">
      <div class="text-white relative" style="left:50%;top:46%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">杂记</div>
        </h1>
        <div>记录日程生活中一些点点滴滴记录</div>
      </div>
    </div>

    <el-image
      style="width: 100%;height:70vh;box-shadow: -19px -3px 60px 10px;"
      src="
https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/hello-world.jpg"
      fit="cover"
    ></el-image>
    <div class="note_container h-100 pt-4 px-3">
      <sq-pannel :data="notes"></sq-pannel>
    </div>
    <div class="container h-100">
      <el-row style="min-height:60vh" type="flex" class="pt-4">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="px-2">
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
                :current-page.sync="currentPage"
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
                :current-page.sync="currentPage"
                :total="maxLen"
                background
                layout="prev, pager, next"
                class="mt-4"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import notePannel from '~/components/NotePannel/NotePannel.vue'
@Component({
  components: {
    'sq-pannel': notePannel
  }
})
export default class NotesIndex extends Vue {
  async asyncData({ params, query, route }: any) {
    const http = Vue.prototype.$http

    const res = await http.get(`/posts/all?limit=10&page=${route.query.page ? route.query.page : 1}&type=note&sort=created&avator=true`)

    return {
      notes: res.data[0],
      maxLen: res.data[1],
      currentPage: parseInt(route.query.page ? route.query.page : 1)
    }
  }

  activeName = 'first'
  notes = ''
  maxLen = 0
  currentPage = 1
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
