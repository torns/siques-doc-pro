<template>
  <div>
    <div v-if="this.name=='mypage'">
      <el-tabs
        stretch
        lazy
        style="width:500px"
        class="pt-4"
        v-model="mypageActiveName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="文章" name="mypost">
          <list-panel :posts="posts"></list-panel>
        </el-tab-pane>
        <el-tab-pane label="动态" name="second">动态</el-tab-pane>
        <el-tab-pane label="最新评论" name="third">最新评论</el-tab-pane>
        <el-tab-pane label="热门" name="fourth">热门</el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="this.name=='like'">
      <el-tabs
        stretch
        lazy
        style="width:500px"
        class="pt-4"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="关注的专题文集连载" name>关注的专题文集连载</el-tab-pane>
        <el-tab-pane label="喜欢的文章" name="liked_posts">
          <list-panel :posts="posts"></list-panel>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ListPanel from "../ListPanel/ListPanel.vue";
@Component({
  components: { "list-panel": ListPanel }
})
export default class PageComponent extends Vue {
  @Prop()
  name: string;
  posts: string = "";
  activeName: string = "";
  mypageActiveName: string = "mypost";

  mounted() {
    this.fetch();
  }

  async fetch() {
    if (this.name == "mypage") {
      const res = await this.$http.get("/posts");
      this.posts = res.data[0];
    }
  }

  async handleClick(tab) {
    if (tab.name == "liked_posts") {
      const res = await this.$http.get("users/1/liked");
      this.posts = res.data.likes;
    }
    if (tab.name == "mypost") {
      const res = await this.$http.get("/posts");
      this.posts = res.data[0];
    }
  }
}
</script>

<style lang="scss">
</style>
