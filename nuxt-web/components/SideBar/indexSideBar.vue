<template>
  <div class="sidebar pl-2">
    <div class="bg-info border-1">
      <div
        style="margin:0 auto;"
        class="notice d-flex ai-center text-black fs-sm"
      >
        <div class="fs-xxs px-2 py-2 lh-2">
          欢迎您访问本站点！ 如果本站解决了您的问题，请给个赞！
        </div>
      </div>
    </div>

    <div class="hotTag">
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-tags text-blue pr-2 "></i>热门标签</div>
        <div class="text-primary">
          <router-link :to="`/tags`" tag="li">更多</router-link>
        </div>
      </div>
      <div class="d-flex flex-wrap ">
        <div v-for="tag in hotTags" :key="tag.id" class="col-33">
          <router-link :to="`/t/${tag.id}`" tag="li">
            <div
              class="bg-light-1 py-1 mr-2 mb-2 text-gray text-center fs-xm hover-3 point ellipsis-1"
            >
              {{ tag.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-fire text-orange pr-2 fs-lg"></i> 精彩评论</div>
        <div class="text-primary">更多</div>
      </div>
      <div>
        <div v-for="comment in hotComments" :key="comment.id" class="py-2">
          <div class="d-flex">
            <div>
              <el-avatar
                :src="comment.user.avator[0] ? comment.user.avator[0].url : ''"
                shape="square"
              >
                <img src="~/static/avator.jpg" alt="" />
              </el-avatar>
            </div>
            <div class="pl-2 text-gray-1 fs-xs">
              <div>
                <el-popover placement="top-start" width="200" trigger="hover">
                  <el-avatar
                    :src="
                      comment.user.avator[0] ? comment.user.avator[0].url : ''
                    "
                    style="position:absolute;bottom:81%"
                    class="shadow-1"
                    shape="circle"
                  >
                    <img src="~/static/avator.jpg" alt="" />
                  </el-avatar>
                  <div class="pt-3 text-primary">{{ comment.user.name }}</div>
                  <div class="fs-xm py-2 ellipsis-1">
                    {{
                      comment.user.introduction === null
                        ? '这个用户很懒没有留下足迹'
                        : comment.user.introduction
                    }}
                  </div>
                  <div class="fs-xs">
                    <span class="text-blue-1">加入于</span>
                    {{ $dayjs(comment.user.created).format('YYYY年M月D日') }}
                  </div>

                  <span slot="reference" class="text-blue-1">
                    {{ comment.user.name }}</span
                  >
                </el-popover>

                <span>
                  {{
                    $dayjs(comment.created).fromNow() +
                      $dayjs(comment.created).format('(M月D号)')
                  }}</span
                >
              </div>
              <div class="ellipsis-1 my-1">
                {{ comment.body }}
              </div>
              <div class="ellipsis-1 text-primary">
                评:
                <router-link
                  :to="`/p/${comment.post.id}`"
                  tag="span"
                  class="hoverlink point"
                  >{{ comment.post.title }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="d-flex jc-between py-3">
        <div><i class="fa fa-bar-chart text-blue-1 pr-2 "></i>站点统计</div>
      </div>
      <div class="d-flex flex-wrap jc-between">
        <div
          v-for="(data, index) in siteDatas"
          :key="index"
          class="fs-xm col-50 text-darkblue py-1 "
        >
          {{ data.title }} {{ allSiteData[data.alias] }} {{ data.classifier }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class SideBar extends Vue {
  hotComments: any = this.$attrs.hotComments
  hotTags: any = this.$attrs.hotTags
  allSiteData: any = {}
  siteDatas = [
    { title: '文章总数:', alias: 'post', classifier: '篇' },
    { title: '提问总数:', alias: 'question', classifier: '条' },
    { title: '笔记总数:', alias: 'note', classifier: '个' },
    { title: '专栏总数:', alias: 'collection', classifier: '个' },
    { title: '评论总数:', alias: 'comment', classifier: '条' },
    { title: '回答总数:', alias: 'answer', classifier: '条' },
    { title: '标签总数:', alias: 'tag', classifier: '个' },
    { title: '注册用户:', alias: 'user', classifier: '人' }
  ]

  mounted() {
    this.fetchHotComment()
    // this.fetchHotTags()
    this.fetchAll()
  }
  async fetchHotComment() {
    const res = await this.$http.get('comments')
    this.hotComments = res.data
  }

  async fetchAll() {
    const res = await this.$http.get('users/1/all')
    this.allSiteData = res.data
  }
}
</script>

<style lang="scss"></style>
