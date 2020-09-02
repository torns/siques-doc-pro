<template>
  <div>
    <div class="noteMask" style="height:100vh;">
      <div class="text-white relative" style="left:50%;top:47%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">杂记</div>
        </h1>
        <div>点点滴滴记录生活美好</div>
      </div>
    </div>

    <el-image
      style="width: 100%;height:100vh;box-shadow: -19px -3px 60px 10px;"
      src="
https://shuxie.oss-accelerate.aliyuncs.com/public/notes/cover1.gif"
      fit="cover"
    ></el-image>
    <div class="note_container h-100 pt-4 px-3">
      <sq-pannel :data="notes"></sq-pannel>
    </div>

    <sq-pagination :href="`${$route.path}?page=1`" @current-change="handleCurrentChange" :currentPage="currentPage" :maxLen="maxLen"></sq-pagination>
    <sq-footer></sq-footer>
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
    // console.log(res.data[0])

    return {
      notes: res.data[0],
      maxLen: res.data[1],
      currentPage: parseInt(route.query.page ? route.query.page : 1)
    }
  }

  notes = ''
  maxLen = 0
  currentPage = 1

  async handleCurrentChange(val: any) {
    this.notes = ''
    this.currentPage = val
    const res = await this.$http.get(`/posts/all?limit=10&page=${val}&type=note&sort=created&avator=true`)

    setTimeout(() => {
      this.notes = res.data[0]
    }, 400)
    this.$router.push(`/n?page=${val}`)
  }

  head() {
    return {
      title: '笔记_思趣'
    }
  }
}
</script>

<style lang="scss"></style>
