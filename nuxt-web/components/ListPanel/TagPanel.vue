<template>
  <div>
    <ul>
      <!-- 依赖这个data -->
      <li v-for="(post, index) in data" :key="index">
        <div class="d-flex">
          <div class="pr-3">
            <el-button
              @click="like(post.id)"
              style="padding-left:18px;padding-right:18px;width:10px;height:45px"
              type="plain"
            >
              <div
                class="d-flex flex-column ai-center"
                style="position: relative;top: -6px;"
              >
                <i class="el-icon-caret-top"></i>
                <div>{{ post.liked }}</div>
              </div></el-button
            >
          </div>
          <div>
            <div class="fs-lg">
              <div class="d-flex ">
                <router-link
                  :to="post.type === 'post' ? `/p/${post.id}` : `/q/${post.id}`"
                  tag="div"
                  class="hoverlink mr-3"
                >
                  {{ post.title }}
                </router-link>
                <div>
                  <el-tag
                    v-for="tag in post.tags"
                    :key="tag.id"
                    size="mini"
                    class="hover-3 "
                    type="primary"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </div>
            </div>
            <div class="d-flex  py-2 fs-xm">
              <div class="pr-1">
                <el-avatar :size="17">
                  <img
                    v-if="post.user.avator[0].url !== null"
                    :src="post.user.avator[0].url"
                    style="background-color:white;"
                  />
                  <img v-else src="~/static/avator.jpg" />
                </el-avatar>
              </div>
              <div class="pr-2">
                <router-link
                  :to="`/u/${post.user.id}`"
                  class="text-primary hoverlink"
                  tag="div"
                >
                  {{ post.user.name }}</router-link
                >
              </div>
              <div class="pr-2">
                {{ $dayjs(post.created).format('M月DD号') }}
              </div>
              <div
                @click="showBookmark(post.id)"
                class="text-gray hoverlink fs-xm "
              >
                <font-awesome-icon :icon="['fas', 'bookmark']" class="pr-1" />
                <span>{{ post.bookmarked }}</span>
                收藏
              </div>
            </div>

            <div></div>
          </div>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
    <el-bookmark ref="bookmark"></el-bookmark>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import createBookmark from '~/components/dialog/createBookmark.vue'
@Component({
  components: { 'el-bookmark': createBookmark }
})
export default class TagPanel extends Vue {
  @Prop()
  data: any

  async like(id) {
    await this.$http.get(`/users/${id}/like`)
    this.$emit('refetch')
  }

  showBookmark(id) {
    this.$refs.bookmark.showBookmark(id)
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 8px 0 !important;
}
</style>
