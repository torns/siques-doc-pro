<template>
  <div>
    <ul>
      <li v-for="(post, index) in data" :key="index">
        <div class="d-flex">
          <div class="pr-3">
            <el-button
              @click="like(post.id, index)"
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
              <router-link :to="`/p/${post.id}`" tag="div" class="hoverlink">
                {{ post.title }}
              </router-link>
            </div>
            <div class="d-flex ai-baseline py-2 fs-xm">
              <div class="text-primary pr-2">
                <router-link
                  :to="`/u/${post.user.id}`"
                  class="hoverlink"
                  tag="div"
                  >{{ post.user.name }}</router-link
                >
              </div>
              <div class="pr-2 text-gray">发布于</div>
              <div class="pr-2">
                <router-link
                  :to="`/blogs/${post.collection.id}`"
                  class="text-primary hoverlink"
                >
                  {{ post.collection.name }}</router-link
                >
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

            <div>
              <div class="text-gray fs-xm">{{ post.alias }}...</div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
    <sq-bookmark ref="reference"></sq-bookmark>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class HomepageList extends Vue {
  @Prop()
  data: any

  async like(id: any, index: any) {
    if (this.$store.state.UserNotExist === false) {
      const res = await this.$http.get(`/users/${id}/like`)

      if (res.data) {
        this.data[index].liked = this.data[index].liked + 1
      } else {
        this.data[index].liked = this.data[index].liked - 1
      }
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }

  showBookmark(id: any) {
    const ref: any = this.$refs.reference
    ref.showBookmark(id)
  }
}
</script>

<style lang="scss"></style>
