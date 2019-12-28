<template>
  <div class="contanier h-100 d-flex">
    <div class="leftside"></div>
    <div class="main">
      <div class="pt-5">
        <div class="title d-flex">
          <!-- <el-avatar
            :size="75"
            v-show="message.avator.url"
            :src="message.avator.url"
            class="shadow-1"
          ></el-avatar>-->
          <el-avatar :size="75" src="../assets/avator.jpg" class="shadow-1">
            <img src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/avator.jpg" />
          </el-avatar>

          <div class="pl-4 pt-2">
            <strong v-if="message">{{message.name}}</strong>
            <div class="d-flex pt-2 fs-xs">
              <div>
                <div v-if="posts">{{posts.length}}</div>
                <div>文章></div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div>
                <div>0</div>
                <div>字数></div>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div>
                <div>0</div>
                <div>获赞></div>
              </div>
              <el-divider direction="vertical"></el-divider>
            </div>
          </div>
        </div>

        <ul class="d-flex mt-4">
          <li class="border-bottom">文章</li>
          <li class="pl-2">动态</li>
          <li class="pl-2">最新评论</li>
        </ul>
        <div>
          <ul class="pt-3">
            <li v-for="post in posts" :key="post.id" class="text-gray">
              <router-link tag="div" class="fs-m" :to="`/p/${post.id}`">{{post.title}}</router-link>
              <div class="d-flex fs-xs pt-2">
                <div>
                  <i class="el-icon-view pr-2">
                    <span class="pl-1">0</span>
                  </i>
                </div>
                <div>
                  <i class="el-icon-chat-square pr-2">
                    <span class="pl-1">0</span>
                  </i>
                </div>
                <div>
                  <i class="el-icon-star-off pr-2">
                    <span class="pl-1">0</span>
                  </i>
                </div>

                <div>{{$dayjs(post.created).format("MM.DD HH:MM")}}</div>
              </div>
              <el-divider></el-divider>
            </li>
          </ul>
          <div v-if="posts&&posts.length==0" class="pt-3">还没有写文章o</div>
        </div>
      </div>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import dayjs from "dayjs";
@Component({})
export default class MyPage extends Vue {
  posts: [] = null;
  message = [];
  mounted() {
    this.fetchData();
  }

  async fetchData() {
    const res = await this.$http.get("/posts");

    const message = await this.$http.get("/users");

    this.message = message.data;
    this.posts = res.data[0];
  }
}
</script>

<style lang="scss" scoped>
.contanier {
  text-align: left;
}
.main {
  min-width: 36em;

  height: 100%;
}
.leftside {
  width: 53%;
  height: 100%;
}
.sidebar {
  width: 100%;
  height: 100%;
}
.el-divider--vertical {
  height: inherit;
}
.el-divider--horizontal {
  margin: 12px 0;
}
.el-avatar {
  background: white;
}
</style>