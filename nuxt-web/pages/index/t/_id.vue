<template>
  <div>
    <div class="tagMask" style="height:115vh;">
      <div class="text-white relative" style="left:50%;top:44%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">{{ tagInfo.info.name }}</div>
        </h1>
        <div>{{ tagInfo.info.description }}</div>
      </div>
      <sq-wave class="absolute" style="margin-top:-9em;width:100%;bottom:0;" :background="`#00000000`"></sq-wave>
    </div>

    <div>
      <video style="height:115vh;object-fit: cover;width:100%;" autoplay loop muted playsinline src="https://shuxie.oss-accelerate.aliyuncs.com/public/t/cover1.mp4"></video>
    </div>

    <div style="margin-top:-6em" class="note_container h-100 pt-4 px-3">
      <sq-pannel :data="posts"></sq-pannel>
    </div>

    <sq-pagination :href="`${$route.path}?page=1`" @current-change="handleChange" :currentPage="currentPage" :maxLen="maxLen"></sq-pagination>
    <sq-footer></sq-footer>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import notePannel from '~/components/NotePannel/NotePannel.vue'
@Component({
  components: {
    'sq-pannel': notePannel
  }
})
export default class T extends Vue {
  head() {
    return {
      title: this.tagInfo.info.name || ''
    }
  }

  maxLen = 0
  currentPage = 1

  posts = []
  tagInfo = { info: { name: '' } }
  get id(): any {
    return this.$route.params.id
  }

  mounted() {
    this.fetchPost()
    this.fetchTag()
  }

  handleChange(value: any) {
    this.currentPage = value
    this.fetchPost(value)
  }

  async fetchPost(page?: any) {
    let res = null
    if (page) {
      res = await this.$http.get(`/tags/post/${this.id}?page=${page}`)
      this.$router.push(`${this.$route.path}?page=${page}&sort=views`)
    } else {
      res = await this.$http.get(`/tags/post/${this.id}`)
    }

    this.posts = res.data[0]
    this.maxLen = res.data[1]
  }

  async fetchTag() {
    const res = await this.$http.get(`/tags/info/${this.id}`)
    this.tagInfo = res.data
  }
}
</script>
<style lang="scss"></style>
