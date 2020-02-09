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
                  class="hoverlink mr-3 point"
                >
                  {{ post.title }}
                </router-link>
                <div>
                  <el-tag
                    v-for="tag in post.tags"
                    :key="tag.id"
                    size="mini"
                    class="hover-3 point"
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
                  class="text-primary hoverlink point"
                  tag="div"
                >
                  {{ post.user.name }}</router-link
                >
              </div>
              <div class="pr-2">
                {{ $dayjs(post.created).format('M月DD号') }}
              </div>

              <el-link @click="showBookmark(post.id)">
                <div class="text-gray ">
                  <i class="iconfont icon-book-mark "></i>
                  <span>{{ post.bookmarked }}</span>
                  收藏
                </div>
              </el-link>

              <div v-if="post.type === 'post'" class="pl-2">
                <el-link type="primary"
                  ><router-link :to="`/p/${post.id}`" tag="div"
                    >评论</router-link
                  ></el-link
                >
                <el-link
                  ><router-link :to="`/blogs/`" class="text-blue"
                    >专栏</router-link
                  ></el-link
                >
              </div>
              <div v-else class="pl-2">
                <el-link type="danger"
                  ><router-link :to="`/q/${post.id}`" tag="div"
                    >回答</router-link
                  ></el-link
                >
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

  // type(type:any){
  //   if(type==="post"){
  //     return
  //   }
  // }

  async like(id: any) {
    await this.$http.get(`/users/${id}/like`)
    this.$emit('refetch')
  }

  showBookmark(id: any) {
    const ref: any = this.$refs.bookmark
    ref.showBookmark(id)
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 8px 0 !important;
}
</style>
