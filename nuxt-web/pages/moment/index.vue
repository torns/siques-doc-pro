<template>
  <div>
    <div class="moment_container pt-5">
      <v-row no-gutters type="flex">
        <v-col xs="12" sm="12" md="12" lg="12" xl="12">
          <div class="moment-data">今天</div>
          <div v-for="post in posts" :key="post.id" class="mb-5 moment-item-wrap moment-items relative">
            <div
              :style="`overflow: ${post.showMore ? 'auto' : 'hidden'};height:${post.showMore ? '100%' : '400px'};`"
              class="moment-item"
            >
              <div class="d-flex jc-between ai-baseline">
                <div class="moment-title" v-html="post.title"></div>
                <div style="white-space: nowrap" class="text-gray pl-1">{{ $dayjs(post.created).fromNow() }}</div>
              </div>
              <div v-if="!post.showMore" class="moment-img">
                <v-img
                  v-if="post.cover != null"
                  :src="post.cover[0]"
                  :preview-src-list="post.cover"
                  lazy
                  style="width: 200px"
                >
                </v-img>
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

      <div v-if="remain > 0" class="text-center point" @click="onload">点击查看更多热文</div>

      <div v-else class="text-center text-gray">我是有底线的</div>
    </div>

    <sq-footer class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import mediumZoom from 'medium-zoom'
import { getMomentList } from '@/api/moment.js'

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
    })
  }

  fetchDataSuccess(res: any) {
    res.datas.records.forEach((e) => {
      e.showMore = false
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

<style lang="scss">
.moment-title {
  font-size: 22px;

  font-weight: 600;
  padding: 10px 0 20px 0;
}

.moment-item-wrap:before {
  background: #f4f4f4;
  border-radius: 4px;
  content: ' ' !important;
  height: 100%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-transform: scale(0.96);
  -ms-transform: scale(0.96);
  transform: scale(0.96);
  width: 100%;
}

.moment-item-wrap:hover:before {
  -webkit-animation: tapAnimation 0.25s cubic-bezier(0.31, 1, 0.34, 1) forwards;
  animation: tapAnimation 0.25s cubic-bezier(0.31, 1, 0.34, 1) forwards;
}

@-webkit-keyframes tapAnimation {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.96);
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes tapAnimation {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.96);
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.moment-items {
  padding: 10px;
}

.plain-text-wrap {
  img {
    max-width: 100%;
    object-fit: cover;
  }

  pre code {
    white-space: break-spaces;
  }
}

.moment-data {
  font-size: 26px;
  line-height: 56px;
  font-weight: 600;
  letter-spacing: 4px;

  padding: 15px 10px 10px 10px;
}

.moment-img {
  padding-bottom: 10px;
}
.moment-item {
  position: relative;
  width: 100%;
  border-radius: 4px;
  padding: 24px 30px 0 30px;
  background-color: #fafafa;
}

.moment-item .plain-text-wrap {
  font-size: 16px;
  line-height: 28px;
  // cursor: pointer;
}

.plain-text-wrap {
  p {
    padding: 0 0 20px 0 !important;
  }
}

.open-btn {
  position: absolute;
  width: 100%;
  bottom: -2px;
  left: -4px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
  text-align: center;
}
.open-btn a {
  text-decoration: none;
  color: chocolate;
  display: inline-block;
  margin-top: 60px;
}
</style>
