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
            <div v-if="fetchedComment" class="fs-xl py-1 pt-4">{{fetchedComment.length}}条评论</div>
            <div class="py-4 bg-white border-radius shadow-1" style="min-height:100px">
              <div class="px-4">
                <div class="d-flex">
                  <div>
                    <el-avatar class="mr-3">user</el-avatar>
                  </div>
                  <el-input v-model="comment" placeholder="撰写评论"></el-input>
                </div>
                <div class="text-right mt-4">
                  <el-button type="primary" @click="sendComment">提交评论</el-button>
                </div>
              </div>

              <div v-if="fetchedComment" class="commentBody pt-3 px-4">
                <div v-for="(comment,index) in fetchedComment" :key="index">
                  <div class="pb-4">
                    <div class="d-flex">
                      <div class="mr-3">
                        <el-avatar>user</el-avatar>
                      </div>
                      <div>
                        <div class="d-flex">
                          <div style="font-weight:600" class="text-primary hover-4">
                            <router-link
                              tag="div"
                              class="point"
                              :to="`/u/${comment.user.id}`"
                            >{{comment.user.name}}：</router-link>
                          </div>
                          <span>{{comment.body}}</span>
                        </div>
                        <div class="d-flex fs-sm ai-baseline">
                          <el-button type="text" @click="commentLike(comment.id)">
                            <font-awesome-icon class="text-gray" :icon="['far', 'thumbs-up']" />
                            {{comment.liked}}
                          </el-button>

                          <div
                            class="text-primary px-2 point"
                            @click="showComment==comment.id?showComment='':showComment=comment.id;showReply='';replyData=''"
                          >回复</div>

                          <div class="fs-xxs">{{$dayjs(comment.created).format("MM月DD号 HH点")}}</div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="min-width:0;margin-left:3em;margin-right:0em;"
                      v-if="showComment==comment.id"
                    >
                      <el-input size="mini" v-model="replyData" placeholder="回复内容"></el-input>
                      <div class="text-right">
                        <el-button
                          class="mt-3"
                          size="mini"
                          type="primary"
                          @click="sendReply(comment.id,comment.user.id)"
                        >提交评论</el-button>
                      </div>
                    </div>
                    <div
                      class="bg-light-1 border-radius px-3"
                      style="margin-left:3em;margin-right:0em;"
                    >
                      <div class="py-3" v-for="(reply) in comment.reply" :key="reply.id">
                        <div class="d-flex ai-baseline">
                          <div style="font-weight:600" class="text-primary pr-1">
                            {{reply.from_uid.name}}：
                            <span
                              style="font-weight:400"
                              class
                            >@{{reply.to_uid.name}}</span>
                          </div>
                          <div class="fs-xm">{{reply.body}}</div>
                        </div>
                        <div class="d-flex ai-baseline fs-sm">
                          <el-button type="text" @click="replyLike">
                            <font-awesome-icon class="text-gray" :icon="['far', 'thumbs-up']" />
                          </el-button>
                          <div
                            class="text-primary px-2 point"
                            @click="showReply==reply.id?showReply='':showReply=reply.id;replyData='';showComment=''"
                          >回复</div>
                          <div></div>
                          <div class="fs-xxs">{{$dayjs(reply.created).format("MM月DD号 HH点")}}</div>
                        </div>
                        <div v-if="showReply==reply.id">
                          <el-input size="mini" v-model="replyData" placeholder="回复内容"></el-input>
                          <div class="text-right">
                            <el-button
                              class="mt-3"
                              size="mini"
                              type="primary"
                              @click="sendReply(comment.id,reply.from_uid.id)"
                            >提交评论</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    <el-backtop target=".container"></el-backtop>
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
  comment = "";
  replyData: string = "";
  fetchedComment = "";
  showReply = "";
  showComment = "";
  mounted() {
    this.fetchpost(this.id);
    this.fetchComment();
  }
  updated() {
    highlightCode();
  }
  async fetchpost(id) {
    if (!this.post) {
      const res = await this.$http.get(`posts/${id}`);
      this.post = res.data;
      this.liked = res.data.liked;
      if (!res.data.editor) {
        res.data.body = md.render(res.data.body);
      }
    } else {
      //如果文章已经载入就请求轻量级的方法
      const res = await this.$http.get(`/users/${this.id}/liked/count`);
      this.liked = res.data;
    }
  }

  //获取文章评论
  async fetchComment() {
    const res = await this.$http.get(`posts/${this.id}/comments`);
    this.fetchedComment = res.data;
  }

  async like() {
    await this.$http.get(`/users/${this.id}/like`);
    this.fetchpost(this.id);
  }

  async commentLike(id) {
    await this.$http.get(`posts/${id}/comments/like`);
    this.fetchComment();
  }

  async replyLike() {}

  //关注
  async follow(id) {
    // 提供用户id
    await this.$http.get(`/users/${id}/follow`);
  }

  async sendComment() {
    if (this.comment) {
      const data = {
        body: this.comment
      };
      await this.$http.post(`/posts/${this.id}/comments`, data);
      this.$notify({
        type: "success",
        message: "评论成功",
        title: "成功"
      });
      this.comment = "";
      this.fetchpost(this.id);
    } else {
      this.$notify({
        type: "error",
        message: "内容不能为空",
        title: "评论失败"
      });
    }
  }

  //这里commentId就是父级的评论
  //当前用户id
  // 被回复用户id:from_uid
  async sendReply(commentId, from_uid) {
    // console.log(commentId);
    // console.log(this.$store.state.userId);
    // console.log(from_uid);
    const data = {
      parent_id: commentId,
      body: this.replyData,
      from_uid: this.$store.state.userId,
      to_uid: from_uid
    };

    const res = await this.$http.post("posts/1/reply", data);
    this.$notify({
      type: "success",
      message: "回复成功",
      title: "成功"
    });
    this.replyData = "";
    this.showReply = "";
    this.showComment = "";
    this.fetchpost(this.id);
  }
}
</script>

<style lang="scss" >
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
