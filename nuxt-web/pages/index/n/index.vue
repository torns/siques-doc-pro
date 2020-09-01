<template>
  <div>
    <div class="noteMask" style="height:70vh;">
      <div class="text-white relative" style="left:50%;top:46%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">杂记</div>
        </h1>
        <div>记录代码中一些点点滴滴记录</div>
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

    <nav class="pagination" id="pagination">
      <h2 class="screen-reader-text">Posts Navigation</h2>
      <div class="inner relative ">
        <a v-if="currentPage != 1" class="newer-posts arrow-left point" @click="handleCurrentChange(currentPage - 1)">
          <span class="screen-reader-text"></span>
        </a>
        <span class="page-number">
          <a href="/n?page=1" data-scroll="" data-ajax="" data-pjax-state="">PAGE {{ currentPage }} OF {{ maxPage }} </a>
        </span>
        <a v-if="currentPage != maxPage" class="older-posts arrow-right point" @click="handleCurrentChange(currentPage + 1)">
          <span class="screen-reader-text"></span>
        </a>
      </div>
    </nav>

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
      maxPage: Math.ceil(res.data[1] / 10),
      currentPage: parseInt(route.query.page ? route.query.page : 1)
    }
  }

  notes = ''
  maxPage = 0
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
