<template>
  <div class="px-2 follow">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :name="item.alias"
      >
        <div v-if="item.alias === 'tags'">
          <div v-if="userTags !== ''">
            <div v-for="tag in userTags" :key="tag.id">
              <div class="d-flex ai-between jc-between">
                <div class="ellipsis-1">
                  <el-tag
                    size="mini"
                    type="primary"
                    effect="light"
                    class="hover-3 point mb-2"
                  >
                    <router-link :to="`/t/${tag.id}`" tag="div"
                      >{{ tag.name }}
                    </router-link>
                  </el-tag>

                  <div class="pr-6  fs-xm">
                    {{ tag.description }}
                  </div>
                </div>

                <div>
                  <div class="d-flex ai-baseline">
                    <div class="mr-3 text-gray fs-xm">
                      {{ tag.interest }}关注
                    </div>
                    <el-button
                      @click="deleteUserTag(tag.id)"
                      size="mini"
                      type="plain"
                      >取消关注</el-button
                    >
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </div>
        <div v-if="item.alias === 'follow'">
          <div v-if="follows.length !== 0">
            <div v-for="(follow, index) in follows" :key="follow.id">
              <div class="d-flex  jc-between">
                <div class="d-flex ai-center">
                  <el-avatar
                    :size="35"
                    :src="follow.avator[0].url"
                    class="mr-3 "
                    ><img src="~/static/avator.jpg" alt=""
                  /></el-avatar>
                  <div class="text-primary point hoverlink">
                    <router-link tag="li" :to="`/u/${follow.id}`">
                      {{ follow.name }}</router-link
                    >
                  </div>
                </div>

                <div class="d-flex ai-baseline">
                  <div class="text-gray pr-3 fs-xm">
                    {{ follow.followedBy }}关注
                  </div>
                  <el-button
                    @click="deleteUserfollow(follow.id, index)"
                    size="mini"
                    type="plain"
                    >取消关注</el-button
                  >
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <div v-else class="text-center">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
        </div>
        <div v-if="item.alias === 'questions'">
          <div v-if="questions.length !== 0"></div>
          <div v-else class="text-center">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
        </div>
        <div v-if="item.alias === 'collection'">
          <div v-if="collections.length !== 0">
            <div v-for="collection in collections" :key="collection.id">
              <div class="d-flex jc-between">
                <div>
                  <li class="fs-xm text-primary hoverlink">
                    <router-link :to="`/blogs/${collection.id}`" tag="div">{{
                      collection.name
                    }}</router-link>
                  </li>
                  <div class="text-gray fs-sm">
                    {{ collection.amount }}篇文章
                  </div>
                </div>
                <div class="d-flex ai-center">
                  <div class="text-gray mr-3 fs-sm">
                    {{ collection.interest }}关注
                  </div>
                  <div>
                    <el-button size="mini" type="plain">取消关注</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class Follows extends Vue {
  @Prop()
  id: any
  activeName = 'tags'
  follows = []
  questions = []
  collections = []
  userTags = ''
  items: any = [
    { label: '关注的标签', alias: 'tags' },
    { label: '关注的人', alias: 'follow' },
    { label: '关注的专栏', alias: 'collection' },
    { label: '关注的收藏夹', alias: 'bookmark' },
    { label: '关注的问题', alias: 'questions' }
  ]
  mounted() {
    this.fetchUserTag()
  }

  @Watch('activeName')
  isNameChange(newval: any, oldval: any) {
    switch (newval) {
      case 'tags':
        this.fetchUserTag()
        break
      case 'follow':
        this.fetchfollows()
        break

      case 'questions':
        this.fetchConcernedQue()
        break
      case 'collection':
        this.fetchInterestColletion()
        break
      default:
        break
    }
  }

  async fetchUserTag() {
    if (this.id) {
      const res = await this.$http.get(`tags/user/${this.id}`)
      this.userTags = res.data
    } else {
      const res = await this.$http.get(
        `tags/user/${this.$store.state.auth.user.id}`
      )
      this.userTags = res.data
    }
  }
  async deleteUserTag(tagId: any) {
    this.$store.commit('deleteUserTag', tagId)
    await this.$http.delete(`/tags/user/${tagId}`)
    this.$notify({
      type: 'success',
      title: '成功',
      message: '取消关注成功'
    })
    this.fetchUserTag()
  }

  async deleteUserfollow(id: any, index: any) {
    await this.$http.get(`/users/${id}/follow`)
    this.$notify({
      type: 'success',
      message: '取关成功',
      title: '成功'
    })

    this.follows.splice(index, 1)
  }

  async fetchfollows() {
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/follows`)
      this.follows = res.data[0].follows
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.auth.user.id}/follows`
      )
      this.follows = res.data[0].follows
    }
  }

  async fetchConcernedQue() {
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/concerned`)
      this.questions = res.data
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.auth.user.id}/concerned`
      )
      this.questions = res.data
    }
  }

  async fetchInterestColletion() {
    let res
    this.id
      ? (res = await this.$http.get(`users/${this.id}/collection`))
      : (res = await this.$http.get(
          `users/${this.$store.state.auth.user.id}/collection`
        ))
    this.collections = res.data
  }
}
</script>

<style lang="scss">
.follow .el-divider--horizontal {
  margin: 12px 0;
}
</style>
