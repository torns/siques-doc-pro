<template>
  <div>
    <el-tabs stretch v-model="mypageActiveName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="mypost">
        <div v-if="posts.length==0">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
        <list-panel :posts="posts"></list-panel>
      </el-tab-pane>
      <el-tab-pane label="动态" name="second">(ﾟ∀ﾟ ) 暂时没有任何数据</el-tab-pane>
      <el-tab-pane label="最新评论" name="third">(ﾟ∀ﾟ ) 暂时没有任何数据</el-tab-pane>
      <el-tab-pane label="热门" name="fourth">(ﾟ∀ﾟ ) 暂时没有任何数据</el-tab-pane>
    </el-tabs>
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
  id: string;
  posts: string = "";
  activeName: string = "";
  mypageActiveName: string = "mypost";

  mounted() {
    this.fetch();
  }

  async fetch() {
    if (this.id) {
      const res = await this.$http.get(`/posts/${this.id}/user`);
      this.posts = res.data[0];
    } else {
      const res = await this.$http.get(
        `/posts/${this.$store.state.userId}/user`
      );
      this.posts = res.data[0];
    }
  }

  async handleClick(tab) {}
}
</script>

<style lang="scss">
</style>
