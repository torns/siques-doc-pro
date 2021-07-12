<template>
  <div>
    <IndexMenu></IndexMenu>
    <div class="moment_container pt-5">
      <v-row no-gutters type="flex">
        <v-col xs="12" sm="12" md="12" lg="12" xl="12">
          <div class="moment-data">今天</div>
          <div v-for="post in posts" :key="post.id" class="mb-5 moment-item-wrap moment-items relative">
            <div
              :style="`overflow: ${post.showMore ? 'auto' : 'hidden'};height:${post.showMore ? '100%' : '400px'};`"
              class="moment-item"
            >
              <div class="d-flex ai-center ">
                <v-avatar :size="55" class="note_avatar" style="background-color: white ;border: 1px solid #de7d7d;">
                  <img style="padding: 4px;" :src="post.avatar" />
                </v-avatar>
                <div class="pl-3">
                  <div class="text-subtitle-2 transition-swing" v-text="post.user.username"></div>

                  <div class="text-body-2 text--secondary">{{ post.user.description }}</div>
                </div>
              </div>

              <div class="d-flex jc-between ai-center pb-2">
                <div></div>

                <div style="white-space: nowrap" class="text-gray pl-1">{{ $dayjs(post.created).fromNow() }}</div>
              </div>

              <div class="plain-text-wrap" v-html="post.body"></div>
            </div>

            <div id="btncontain" class="open-btn pointer" @click="post.showMore = !post.showMore">
              <v-btn v-if="!post.showMore" icon color="deep-orange">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>

              <a v-else>收起</a>
            </div>
          </div>
        </v-col>
      </v-row>

      <div v-if="remain > 0" class="text-center pointer " @click="onload">点击查看更多热文</div>

      <div v-else class="text-center text-gray">我是有底线的</div>
    </div>

    <BaseFooter class="pt-5"></BaseFooter>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import mediumZoom from 'medium-zoom'
import { getMomentList } from '@/api/moment.js'
import { textToImg } from '@/plugins/utils'
const mediumzoom = () => {
  mediumZoom(document.querySelectorAll('.plain-text-wrap img'))
}

@Component({})
export default class Moment extends Vue {
  async asyncData() {
    const res = await getMomentList({ params: { type: 'tfNews' } })

    res.datas.records.forEach((e) => {
      e.showMore = false
      if (e.cover != null) {
        e.cover = e.cover.split(',')
      }
    })

    return {
      posts: res.datas.records,
      total: res.datas.total
    }
  }

  head() {
    return {
      title: '24小时-思趣网'
    }
  }

  posts
  total = 0
  limit: any = 20
  page: any = 1

  get remain() {
    return this.total - this.page * this.limit
  }

  mounted() {
    this.$nextTick(() => {
      mediumzoom()
      this.posts.forEach((e) => {
        this.$set(e, 'avatar', textToImg(e.user.username.substring(0, 1)))
      })
    })
  }

  fetchDataSuccess(res: any) {
    res.datas.records.forEach((e) => {
      e.showMore = false
      this.$set(e, 'avatar', textToImg(e.user.username.substring(0, 1)))
      if (e.cover != null) {
        e.cover = e.cover.split(',')
      }
    })

    this.posts = this.posts.concat(res.datas.records)
    this.total = res.datas.total
  }

  async onload() {
    const res = await getMomentList({
      pageNum: ++this.page,
      pageSize: this.limit,
      params: { type: 'tfNews' }
    })
    this.fetchDataSuccess(res)
  }
}
</script>

<style lang="scss"></style>
