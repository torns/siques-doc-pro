<template>
  <div class="bg-light">
    <div class="container pt-4 pb-3">
      <el-row type="flex" :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="font-songti bg-white shadow-2">
            <div>
              <div v-if="post.title" style="padding:25px">
                <div class="d-flex flex-column menu-button">
                  <el-button
                    type="success"
                    circle
                    icon="el-icon-check"
                    style="width:fit-content;"
                    @click="like"
                  ></el-button>
                  <i class="pl-1 my-1">{{liked}}赞</i>
                  <el-button type="info" icon="el-icon-check" circle style="width:fit-content;"></el-button>
                  <i class="mt-1">赞赏</i>
                </div>
                <h1 class="py-4">{{post.title}}</h1>
                <div class="d-flex py-3">
                  <img
                    v-if="post.user.avator!=null"
                    :src="post.user.avator.url"
                    alt="无"
                    class="avator shadow-1 contain"
                  />
                  <img v-else src="../assets/avator.jpg" alt="无" class="avator shadow-1 contain" />

                  <div class="pl-2">
                    <div class="d-flex ai-baseline">
                      <div class="pr-2">{{post.user.name}}</div>
                      <el-button type="text" class="btn" @click="follow(post.user.id)">关注</el-button>
                    </div>
                    <div class="d-flex fs-xm">
                      <div class="pr-2">{{$dayjs(post.created).format("YYYY.MM.DD HH:MM:ss")}}</div>
                      <div class="pr-2">字数：0</div>
                      <div>阅读：{{post.views}}</div>
                    </div>
                  </div>
                </div>

                <div v-if="post.body" v-html="post.body" class="article lh-3"></div>
                <div></div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="hidden-md-and-down" :xs="0" :sm="6" :md="8" :lg="4" :xl="4">
          <div>
            <side-bar></side-bar>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-footer class="mt-2"></el-footer>
  </div>
</template>

<script lang="ts">
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre code");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

import { Vue, Component, Prop } from "vue-property-decorator";
import footer from "../components/footer/Footer.vue";
import sidebar from "../components/SideBar/SideBar.vue";
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
@Component({
  components: { "el-footer": footer, "side-bar": sidebar }
})
export default class Post extends Vue {
  @Prop()
  id: number;
  post: any = "";
  liked: number = 0;
  mounted() {
    this.fetchpost(this.id);
    this.fetchliked();
  }
  updated() {
    highlightCode();
  }
  async fetchpost(id) {
    const res = await this.$http.get(`posts/${id}`);

    if (!res.data.editor) {
      res.data.body = md.render(res.data.body);
    }
    this.post = res.data;
  }

  async fetchliked() {
    const res = await this.$http.get(`/users/${this.id}/liked/count`);
    this.liked = res.data;
  }
  async like() {
    await this.$http.get(`/users/${this.id}/like`);
    this.fetchliked();
  }

  async follow(id) {
    // 提供用户id
    await this.$http.get(`/users/${id}/follow`);
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 36em) {
    width: auto;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}

.menu-button {
  @media (max-width: 1200px) {
    display: none;
  }
}

.menu-button {
  position: fixed;
  margin-left: -6em;
  margin-top: 10em;
}

.avator {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
}

h1 {
  font-size: 30px;
  font-weight: 700;
  word-break: break-word;
}

.hljs {
  // display: grid !important;
  border-radius: 5px;

  margin-right: 0;

  color: whitesmoke !important;

  padding: 0.5em 2em !important;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.7);
}

.article h2,
h3,
h4,
h5,
h6 {
  padding: 2em 0;
}
</style>
