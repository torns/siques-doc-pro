<template>
  <div>
    <div class="moment_container pt-4">
      <el-row :gutter="0" type="flex">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="moment-data">今天</div>
          <div v-for="post in posts" :key="post.id" class="mb-5 moment-item-wrap moment-items relative">
            <div
              :style="`overflow: ${post.showMore ? 'auto' : 'hidden'};height:${post.showMore ? '100%' : '400px'};`"
              class="moment-item"
            >
              <div class="d-flex jc-between ai-baseline">
                <div v-html="post.title" class="moment-title"></div>
                <div style="white-space: nowrap" class="text-gray pl-1">{{ $dayjs(post.created).fromNow() }}</div>
              </div>
              <div class="moment-img">
                <el-image
                  v-if="post.cover != null"
                  :src="post.cover[0]"
                  :preview-src-list="post.cover"
                  style="width: 200px"
                >
                </el-image>
              </div>

              <div v-html="post.body" class="plain-text-wrap"></div>
            </div>

            <div id="btncontain" @click="post.showMore = !post.showMore" class="open-btn point">
              <a v-if="!post.showMore">
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
              </a>
              <a v-else>收起</a>
            </div>
          </div>
        </el-col>
      </el-row>

      <div v-if="remain > 0" @click="onload" class="text-center point">点击查看更多热文</div>

      <div v-else class="text-center text-gray">我是有底线的</div>
    </div>

    <sq-footer class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import fetchdata from '~/plugins/fetchdata'
@Component({})
export default class Moment extends Vue {
  async asyncData() {
    const http = Vue.prototype.$http
    const res = await http.get(`/posts/all?limit=20&page=1&type=tfNews&sort=created&body=true&avator=true`)

    res.data[0].forEach((e) => {
      e.showMore = false
      if (e.cover != null) {
        e.cover = e.cover.split(',')
      }
    })

    return {
      posts: res.data[0],
      total: res.data[1]
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

  fetchDataSuccess(res: any) {
    res.data[0].forEach((e) => {
      e.showMore = false
      if (e.cover != null) {
        e.cover = e.cover.split(',')
      }
    })
    this.posts = this.posts.concat(res.data[0])
    this.total = res.data[1]
  }

  onload() {
    this.page++
    fetchdata({
      resource: `/posts/all`,
      page: this.page,
      pageSize: this.limit,
      sort: 'created',
      type: 'tfNews',
      body: true,
      success: this.fetchDataSuccess
    })
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

.moment-data {
  font-size: 26px;
  line-height: 56px;
  font-weight: 600;
  letter-spacing: 4px;

  padding: 10px;
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
