<template>
  <div>
    <div class="noteMask" style="height:115vh;">
      <div class="text-white relative" style="left:50%;top:40%;left: -1%;z-index:5;text-align: center;">
        <h1>
          <div class=" py-2 ">所有标签</div>
        </h1>
        <div class="lh-2" style="width:300px;margin:0 auto">标签不仅能组织和归类你的内容，还能关联相似的内容</div>
      </div>
      <sq-wave :background="`#00000000`" class="absolute" style="margin-top:-9em;width:100%;bottom:0;"></sq-wave>
    </div>

    <div>
      <video
        style="height:115vh;object-fit: cover;width:100%;"
        autoplay
        loop
        muted
        playsinline
        src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/tags/cover2.mp4"
      ></video>
    </div>

    <div class="pt-5">
      <div class="container h-100 pb-5 tagIndex">
        <el-row type="flex" class="pt-4 px-2">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="min-height:60vh">
            <div class="py-2">
              <div class="bg-3 py-3 px-3" style="height:90px;">
                <div class="d-flex">
                  <div>
                    <sq-search ref="search" :data="tags"></sq-search>
                  </div>
                  <el-button @click="storeUserTag" class="h-100" size="mini" type="plain">加关注</el-button>
                </div>
                <div v-if="userTags" class="pt-2 d-flex">
                  <div v-for="tag in userTags" :key="tag.id">
                    <nuxt-link :to="`/t/${tag.id}`" tag="div">
                      <div size="small" type="plain" class="mr-1  point">{{ tag.name }}</div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-4">
              <ul class="d-flex flex-wrap">
                <div v-for="(title, index) in taglist" :key="index" class="tag-list__itemWraper fs-sm pb-4 w-100">
                  {{ title.name }}
                  <div>
                    <el-divider></el-divider>
                  </div>
                  <ul class="d-flex flex-wrap" style="width:95%">
                    <li v-for="tag in title.tags" :key="tag.id" class="bg-3 mr-1 my-1  fs-xm point">
                      <el-popover
                        :open-delay="500"
                        :close-delay="1000"
                        @show="show(tag.id)"
                        popper-class="tag"
                        placement="top"
                        width="250"
                        trigger="hover"
                      >
                        <div v-if="taginfo" class="px-3 py-2">
                          <div>
                            <div style="font-weight:700" class="fs-md">
                              {{ taginfo.info.name }}
                            </div>
                            <div class="ellipsis fs-xm pt-2" style="min-height:60px;">
                              {{ taginfo.info.description }}
                            </div>
                          </div>
                          <el-divider></el-divider>
                          <div class="d-flex jc-between ai-baseline">
                            <div>
                              <el-button type="text">查看</el-button>
                            </div>
                            <div>
                              {{ taginfo.count }}人
                              <el-button
                                :type="isTagFollowed ? 'plain' : 'primary'"
                                @click="!isTagFollowed ? storeUserTag(taginfo.info.id) : deleteUserTag(taginfo.info.id)"
                                size="mini"
                                >{{ isTagFollowed ? '已关注' : '关注' }}</el-button
                              >
                            </div>
                          </div>
                        </div>

                        <slot slot="reference">
                          <nuxt-link
                            :to="`/t/${tag.id}`"
                            style="display: -webkit-inline-box;-webkit-box-align: baseline;"
                            tag="a"
                            class="text-primary hover-3"
                          >
                            <i :class="` fs-xm fa fa-${tag.name} px-1`"></i>
                            <div style="padding:2px 8px 2px 0;">
                              {{ tag.name }}
                            </div>
                          </nuxt-link>
                        </slot>
                      </el-popover>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <sq-footer :topBorder="true"></sq-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import search from '~/components/Page/Tags/SearchTag.vue'
@Component({
  components: { 'sq-search': search }
})
export default class TagsIndex extends Vue {
  async asyncData() {
    // 在 @component 中不可以写 this.$http //
    const http = Vue.prototype.$http
    const res = await http.get('/tags')

    return {
      taglist: res.data
    }
  }

  head() {
    return {
      title: '标签-思趣网'
    }
  }
  taglist = []
  taginfo = ''
  tags = ''
  userTags = ''
  isTagFollowed = false

  mounted() {
    this.fetchAllTags()
    setTimeout(() => {
      this.fetchUserTag()
    }, 300)
  }

  get isUser() {
    return !this.$store.state.UserNotExist
  }

  fetchAllTags() {
    this.$store.commit('storeTags', this.taglist)
    let tags: any = []
    this.taglist.map((e: any) => {
      tags = tags.concat(e.tags)
    })
    this.tags = tags
  }

  async storeUserTag(tagId: any) {
    if (this.isUser) {
      const ref: any = this.$refs.search
      let data = ref.tagSearch
      if (typeof tagId === 'number') {
        data = [tagId]
      }

      if (data.length !== 0) {
        await this.$http.post(`/tags/user/${this.$store.state.auth.user.id}`, data)
        this.$store.commit('storeUserTag', data)
        this.fetchUserTag()
        this.isTagFollowed = true
        const ref: any = this.$refs.search
        ref.tagSearch = []
        this.$notify({
          type: 'success',
          message: '关注成功',
          title: '成功'
        })
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  async deleteUserTag(tagId: any) {
    this.$store.commit('deleteUserTag', tagId)
    await this.$http.delete(`/tags/user/${tagId}`)
    this.fetchUserTag()

    this.isTagFollowed = false
  }

  async fetchUserTag() {
    if (this.isUser) {
      const res = await this.$http.get(`/tags/user/${this.$store.state.auth.user.id}`)
      this.userTags = res.data
    }
  }

  show(id: any) {
    this.fetchTagDescription(id)
  }

  async fetchTagDescription(id: any) {
    const res = await this.$http.get(`/tags/info/${id}`)
    this.taginfo = res.data

    let isTagFollowed = false
    this.$store.state.auth.user.tags.map((e: any) => {
      if (e.id === res.data.info.id) {
        isTagFollowed = true
      }
    })

    if (isTagFollowed) {
      this.isTagFollowed = true
    } else {
      this.isTagFollowed = false
    }
  }
}
</script>

<style lang="scss">
.tagIndex .el-divider--horizontal {
  margin: 10px 0;
  width: 90%;
}
.tag {
  padding: 0px !important;
}
</style>
