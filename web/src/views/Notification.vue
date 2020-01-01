<template>
  <div class="contanier h-100 d-flex">
    <div class="leftside"></div>
    <div class="main notification">
      <div>
        <div class="d-flex">
          <div class="pt-6">
            <ul>
              <li :class="model.alias==name?'bg':''" v-for="(model,index) in models" :key="index">
                <router-link tag="span" :to="`/notification/${model.alias}`">
                  <i :class="model.icon+` text-primary fs-xll`"></i>
                  {{model.name}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="flex-1 pl-4 pt-5">
            <div class="title">
              <strong>全部 {{name}}</strong>
            </div>
            <div v-if="this.name=='follow'" class="d-flex flex-column pt-4">
              <div class="py-3 d-flex ai-center" v-for="(follow,index) in follows" :key="index">
                <el-avatar :size="45" src="../assets/avator.jpg" class="shadow-1">
                  <img src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/avator.jpg" />
                </el-avatar>
                <div class="pl-3">{{follow.name}}</div>
              </div>
            </div>
            <div v-if="this.name=='message'">
              <comment-panel></comment-panel>
            </div>
            <div v-else class="h-100 text-center pt-6">
              <div class="d-flex flex-column">
                <div>
                  <img
                    src="https://cdn2.jianshu.io/assets/web/icon_nocontent-00c423de394b9184d467f2f2a7284b54.png"
                    style="width:120px;"
                  />
                </div>
                <div>暂时还没有内容</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CommentPanel from "../components/CommentPanel/CommentPanel.vue";
@Component({
  components: { "comment-panel": CommentPanel }
})
export default class Notification extends Vue {
  @Prop()
  name: string;
  follows = "";
  models = [
    { name: "评论", alias: "comments", icon: "el-icon-chat-square" },
    { name: "简信", alias: "message", icon: "el-icon-chat-square" },
    { name: "投稿请求", alias: "request", icon: "el-icon-chat-square" },
    { name: "喜欢和赞", alias: "like", icon: "el-icon-chat-square" },
    { name: "关注", alias: "follow", icon: "el-icon-chat-square" },
    { name: "赞赏和付费", alias: "pay", icon: "el-icon-chat-square" },
    { name: "其他提醒", alias: "notify", icon: "el-icon-chat-square" }
  ];
  mounted() {
    this.fetchliked();
    if (this.name == "follow") {
      this.fetchfollows();
    }
  }
  async fetchliked() {
    const res = await this.$http.get("users/1/like");
  }

  async fetchfollows() {
    const res = await this.$http.get("users/1/follows");
    this.follows = res.data;
  }
}
</script>

<style lang="scss" >
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
.main {
  min-width: 900px;
}
</style>
