<template>
  <div>
    <div style="height:190px" class="bg-primary d-flex jc-around text-white hidden-xs-and-down">
      <div class="d-flex flex-column jc-center" style="width:500px">
        <div class="fs-xll pb-3">在 抒写，学习技能、解决问题</div>
        <div>每个月，我们帮助 1000 万的开发者解决各种各样的技术问题。并助力他们在技术能力、职业生涯、影响力上获得提升。</div>
      </div>
      <div class="d-flex"></div>
    </div>

    <div class="container">
      <el-row class="d-flex pt-4" :gutter="0">
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="5" :lg="4" :xl="4">
          <div class="d-flex" style="flex-direction: row-reverse;">
            <ul class="text-left fs-xm">
              <li
                @click="fetchCategory(link.alias)"
                v-for="(link,index) in links"
                :key="index"
                :class="link.alias==category?'bg-1 pr-6  pl-3 py-2':''+`pr-6 hover-2 pl-3 py-2`"
              >
                <font-awesome-icon class="pr-1" :icon="[link.tag, link.icon]" />
                {{link.name}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col class="px-2" :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div>
            <div>
              <el-carousel height="150px" style="border-radius: 5px;" direction="vertical">
                <el-carousel-item v-for="item in 4" :key="item">
                  <div
                    style="background: url(https://image-static.segmentfault.com/299/579/2995795553-5e0acc638a96c);background-size: cover;height:150px"
                    class="w-100"
                  ></div>
                  <div class="mask"></div>
                </el-carousel-item>
              </el-carousel>

              <div class="pt-3">为你推荐</div>

              <el-divider></el-divider>

              <ul
                class="infinite-list"
                infinite-scroll-disabled="loading"
                v-infinite-scroll="load"
                infinite-scroll-distance="0"
                style="heihgt:200px"
              >
                <li v-for="(post,$index) in posts" :key="$index">
                  <router-link
                    tag="div"
                    class="hoverlink point visitlink fs-lg"
                    :to="`/p/${post.id}`"
                  >{{post.title}}</router-link>
                  <div class="text-gray fs-xm lh-2">
                    <!-- 过滤 -->
                    <span>{{post.alias | capitalize}}...</span>
                    <div class="d-flex mb-3">
                      <div class="d-flex point">
                        <i class="el-icon-success hover-1 lh-2"></i>

                        <div class="pl-1 pr-3 text-primary hoverlink">×{{post.liked}} · 赞</div>
                      </div>
                      <div class="pr-2">{{post.user.name}} ·</div>
                      <div>{{$dayjs(post.created).format("MM月DD日")}}</div>
                      <div>{{post.category}}</div>
                    </div>
                  </div>
                </li>
                <div v-if="loading" class="my-3 text-primary fs-xl">
                  <i class="el-icon-loading"></i> Loading
                </div>
                <div v-if="noMore" class="my-3 text-primary fs-xl">
                  <i class="el-icon-loading"></i> (ﾟ∀ﾟ )没有更多内容了
                </div>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col class="hidden-sm-and-down" :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
          <div style="min-width:200px;max-width:240px;">
            <div class="bg-info border-1">
              <div style="height:50px;margin:0 auto;" class="notice text-black fs-sm">
                <div class="fs-xxs" style="padding: 16px 10px;">抒写年度有奖征文丨一起来总结你的 2019</div>
              </div>
            </div>
            <div class="pt-3 d-flex jc-between">
              <div>文章推荐</div>
              <div class="text-primary">更多</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class MyPage extends Vue {
  count = 1;
  loading = false;
  noMore = false;
  posts = [];
  category: string = "suggest";
  links = [
    { name: "为你推荐", alias: "suggest", tag: "far", icon: "address-card" },
    { name: "近期热门", alias: "hot", tag: "far", icon: "thumbs-up" },
    { name: "最新内容", alias: "new", tag: "far", icon: "compass" },
    { name: "前端", alias: "frontEnd", tag: "fab", icon: "js-square" },
    { name: "后端", alias: "backEnd", tag: "fab", icon: "bitbucket" },
    { name: "小程序", alias: "miniProgram", tag: "fab", icon: "cloudsmith" }
  ];
  mounted() {
    this.fetchPost();
  }
  async fetchPost() {
    const res = await this.$http.get("/posts/all?limit=10&page=1");

    this.posts = res.data;
  }

  async fetchHotPost() {
    const res = await this.$http.get("/posts/all?limit=10&page=1");

    this.posts = res.data;
  }

  async load() {
    this.loading = true;
    this.count += 1;

    var clock = setTimeout(async () => {
      const res = await this.$http.get(`/posts/all?limit=4&page=${this.count}`);
      this.posts = this.posts.concat(res.data);

      this.loading = false;
    }, 2500);
  }

  fetchCategory(alias) {
    this.category = alias;
  }
}
</script>

<style lang="scss" >
.el-divider--vertical {
  height: inherit;
}

.el-divider--horizontal {
  margin: 15px 0;
}

.mask {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.7));
  border-radius: 4px;
}
</style>