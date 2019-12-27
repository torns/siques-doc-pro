<template>
  <div class="contanier h-100 d-flex pt-5">
    <div class="leftside"></div>
    <div class="main">
      <div>
        <div>
          <img
            src="../assets/cover.png"
            style="object-fit:cover;max-width: -webkit-fill-available;
}"
            class="pb-3"
          />
          <div>为你推荐</div>
          <el-divider></el-divider>
          <div v-for="post in posts" :key="post.id" class="pt-2 pb-4">
            <router-link
              tag="div"
              class="hoverlink point visitlink pb-2 fs-lg"
              style="font-weight: 600;"
              :to="`/p/${post.id}`"
            >{{post.title}}</router-link>
            <div class="text-gray fs-xm lh-2">
              <div v-html="post.body"></div>
              <div class="d-flex">
                <div class="el-icon-success hoverlink lh-2"></div>
                <div class="pl-1 pr-3">×0 · 赞</div>
                <div class="pr-2 hoverlink">{{post.user.name}} ·</div>
                <div>{{$dayjs(post.created).format("MM月DD日")}}</div>
                <div>{{post.category}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar text-left pl-5">
      <div>
        <div>会员中心</div>
        <div>优选连载</div>
        <div>抒写版块</div>
        <div>抒写大学堂</div>
      </div>
      <div>推荐作者</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class MyPage extends Vue {
  posts: [] = null;
  mounted() {
    this.fetchPost();
  }
  async fetchPost() {
    const res = await this.$http.get("/posts/all");

    this.posts = res.data;
  }
}
</script>

<style lang="scss" scoped>
.el-divider--vertical {
  height: inherit;
}

.el-divider--horizontal {
  margin: 15px 0;
}
</style>