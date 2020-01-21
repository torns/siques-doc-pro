<template>
  <div>
    <div class="container h-100">
      <el-row type="flex" class="pt-4 px-2">
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
          style="min-height:60vh"
        >
          <div class="fs-xll pb-2">标签</div>
          <div>
            标签不仅能组织和归类你的内容，还能关联相似的内容。正确的使用标签将让你的问题被更多人发现和解决。
          </div>

          <div class="py-2">
            <div class="bg-3 py-3 px-3" style="height:90px;">
              <div class="d-flex  ">
                <div><el-search ref="search" :data="tags"></el-search></div>
                <el-button
                  class="h-100"
                  size="mini"
                  type="plain"
                  @click="storeUserTag"
                  >加关注</el-button
                >
              </div>
              <div v-if="userTags" class="pt-2 d-flex">
                <div v-for="tag in userTags" :key="tag.id">
                  <router-link tag="div" :to="`/t/${tag.id}`">
                    <el-tag
                      size="small"
                      type="plain"
                      class="mr-1 hover-3 point"
                    >
                      {{ tag.name }}
                    </el-tag>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-4">
            <ul class="d-flex flex-wrap">
              <div
                v-for="(title, index) in taglist"
                :key="index"
                class="tag-list__itemWraper fs-sm pb-4 w-100"
              >
                {{ title.name }}
                <div>
                  <el-divider></el-divider>
                </div>

                <ul class="d-flex flex-wrap" style="width:95%">
                  <li
                    v-for="(tag, index) in title.tags"
                    :key="index"
                    style="padding:2px 5px; "
                    class="bg-3 mr-1 my-1 hover-3 fs-xm"
                  >
                    <!-- 会报错暂时先不用 -->
                    <!-- <font-awesome-icon   :icon="['fab', tag]" class="fs-xm" /> -->
                    <el-popover
                      placement="top"
                      width="300"
                      :open-delay="500"
                      trigger="hover"
                      @show="show(tag.id)"
                    >
                      <div v-if="taginfo" class="px-2 py-1">
                        <div>
                          <div style="font-weight:700" class="fs-md">
                            {{ taginfo.info.name }}
                          </div>
                          <div style="min-height:80px;">
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
                              size="mini"
                              :type="isTagFollowed ? 'plain' : 'primary'"
                              @click="
                                !isTagFollowed
                                  ? storeUserTag(taginfo.info.id)
                                  : ''
                              "
                              >{{
                                isTagFollowed ? '已关注' : '关注'
                              }}</el-button
                            >
                          </div>
                        </div>
                      </div>
                      <slot slot="reference"
                        ><router-link :to="`/t/${tag.id}`" tag="div">{{
                          tag.name
                        }}</router-link></slot
                      >
                    </el-popover>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-footer :show="true"></el-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import search from '~/components/searchPanel/search.vue'
@Component({
  components: { 'el-search': search }
})
export default class Tags extends Vue {
  taglist = null
  taginfo = null
  tags = null
  userTags = null
  isTagFollowed = false

  mounted() {
    this.fetchAllTags()
    setTimeout(() => {
      this.fetchUserTag()
    }, 300)
  }
  async fetchAllTags() {
    const result = await this.$http.get('/tags')
    this.taglist = result.data
    let tags = []
    this.taglist.map((e) => {
      tags = tags.concat(e.tags)
    })
    this.tags = tags
  }

  async storeUserTag(tagId) {
    let data = this.$refs.search.tagSearch
    if (typeof tagId === 'number') {
      data = [{ id: tagId }]
    }

    if (data.length !== 0) {
      await this.$http.post(`/tags/user/${this.$store.state.user.userId}`, data)
      this.$store.commit('storeUserTag', data)
      this.fetchUserTag()
      this.$refs.search.tagSearch = []
      this.$notify({
        type: 'success',
        message: '关注成功',
        title: '成功'
      })
    }
  }

  async fetchUserTag() {
    const res = await this.$http.get(
      `/tags/user/${this.$store.state.user.userId}`
    )
    this.userTags = res.data
  }

  show(id) {
    this.fetchTagDescription(id)
  }

  async fetchTagDescription(id) {
    const res = await this.$http.get(`/tags/info/${id}`)
    this.taginfo = res.data

    let isTagFollowed = false
    this.$store.state.user.userTag.map((e) => {
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

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 10px 0;
  width: 90%;
}
</style>
