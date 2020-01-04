<template>
  <div class="bg-light">
    <div class="container pt-4 pb-3">
      <el-row type="flex" :gutter="0">
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
          <div class="font-songti bg-white shadow-2">
            <div>
              <div v-if="post.title" style="padding:25px">
                <div class="d-flex flex-column menu-button">
                  <el-button
                    class="hover-3"
                    type="plain"
                    circle
                    style="width:fit-content;"
                    @click="like"
                  >
                    <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  </el-button>
                  <i class="pl-1 mt-1">{{liked}}赞</i>
                  <el-button type="text" circle>
                    <font-awesome-icon :icon="['fas', 'bookmark']" />
                  </el-button>
                  <i></i>
                  <el-button style="margin-top:-15px" type="text" circle>
                    <font-awesome-icon :icon="['fab', 'rocketchat']" />
                  </el-button>
                  <i></i>
                  <el-button style="margin-top:-15px" type="text" circle>
                    <font-awesome-icon :icon="['fas', 'share-alt']" />
                  </el-button>
                </div>
                <h1 class="py-4">{{post.title}}</h1>
                <div class="d-flex py-3">
                  <router-link :to="`/u/${post.user.id}`">
                    <img
                      v-if="post.user.avator!=null"
                      :src="post.user.avator.url"
                      alt="无"
                      class="avator shadow-1 contain"
                    />
                    <img v-else src="../assets/avator.jpg" alt="无" class="avator shadow-1 contain" />
                  </router-link>
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
                <div class="text-primary mt-3">
                  阅读：{{post.views}}
                  <span>.</span>
                  {{$dayjs(Date.now()-(new Date(post.created)).getTime()).format("发布于DD天 HH小时 MM分钟前")}}
                </div>
                <div class="d-flex jc-center my-4">
                  <el-button class="hover-3" type="plain">
                    <font-awesome-icon class="pr-2" :icon="['far', 'thumbs-up']" />赞
                  </el-button>
                  <el-button class="hover-3" type="plain">
                    <font-awesome-icon class="pr-2" :icon="['far', 'bookmark']" />收藏
                  </el-button>
                  <el-button class="hover-3" type="plain">
                    <font-awesome-icon class="pr-2" :icon="['far', 'share-square']" />分享
                  </el-button>
                </div>
                <div class="text-center text-gray">本作品系 原创 ， 采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议</div>
                <el-divider></el-divider>
              </div>
            </div>
          </div>
          <div>
            <div class="fs-xl py-1 pt-4">0条评论</div>
            <div class="py-4 px-3 bg-white border-radius shadow-1" style="min-height:100px">
              <div class="d-flex jc-around">
                <el-avatar>user</el-avatar>
                <el-input style="width:85%" type="textarea" placeholder="撰写评论"></el-input>
              </div>
              <div class="text-right mt-4">
                <el-button type="primary">提交评论</el-button>
              </div>
            </div>
          </div>

          <div>
            <div class="fs-xl py-1 pt-4">推荐阅读</div>
            <div class="py-4 px-3 bg-white border-radius shadow-1" style="min-height:100px"></div>
          </div>
        </el-col>
        <el-col class="hidden-md-and-down pl-2" :xs="0" :sm="6" :md="8" :lg="6" :xl="6">
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
    max-width: 900px;
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
  object-fit: contain;
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
