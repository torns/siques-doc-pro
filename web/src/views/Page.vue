<template>
<div class="h-100 d-flex">
  <div class="profile flex-1">
    <header class="profile__heading pt-5" style="background-color: #f6f6f6;">
      <div class="container">
        <el-row type="flex" :gutter="15">
          <el-col class="mr-6" :xs="6" :sm="4" :md="4" :lg="4" :xl="4">
            <div style="width:157.5px;height:157.5">
              <div class="point">
                <el-avatar
                  style="width:auto"
                  :size="157.5"
                  src="../assets/avator.jpg"
                  class="shadow-1"
                >
                  <img v-if="avatorUrl" :src="avatorUrl" class="avatar" />

                  <img v-else src="../assets/avator.jpg" />
                </el-avatar>
                <el-upload
                  class="avatar-uploader hover-5 text-center"
                  action="string"
                  :http-request="uploadAvator"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button size="small" type="text">上传头像</el-button>
                </el-upload>
              </div>

              <ul class="icon-list d-flex jc-between fs-xl pt-2">
                <li class="hover-1 opacity25 text-dark-1">
                  <font-awesome-icon :icon="['fab', 'github']" />
                </li>
                <li class="hover-1 opacity25 text-orange">
                  <font-awesome-icon :icon="['fab', 'weibo']" />
                </li>
                <li class="hover-1 opacity25 text-blue">
                  <font-awesome-icon :icon="['fab', 'invision']" />
                </li>
                <li class="hover-1 opacity25 text-blue">
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </li>
                <li class="hover-1 opacity25 text-darkblue">
                  <font-awesome-icon :icon="['fab', 'facebook']" />
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="12" :sm="9" :md="9" :lg="9" :xl="10">
            <div class="d-flex pb-1">
              <h2 class="pr-4 text-ellipsis">{{user.name}}</h2>
              <el-button type="text">查看完整档案</el-button>
            </div>
            <div class="fs-xl pb-3">
              <font-awesome-icon
                class="pr-2"
                :icon="['fas', 'american-sign-language-interpreting']"
              />10
              <span class="opacity60">声望</span>
            </div>
            <ul class="opacity60">
              <li class="pb-2 fs-xm hoverlink" v-for="(link,index) in messageLinks" :key="index">
                <div style="height:30px" v-if="show&&showname==link.alias" class="d-flex ai-center">
                  <el-input
                    size="mini"
                    style="width:200px;"
                    v-model="messageBox"
                    :placeholder="link.placeholder"
                  ></el-input>
                  <el-button class="ml-3" type="text" @click="save(link.alias)">保存</el-button>
                </div>

                <div class="d-flex" v-else>
                  <font-awesome-icon class="pr-2" :icon="[link.tag, link.icon]" />
                  <div @click="show=true,showname=link.alias">
                    <!-- 没有解决 -->
                    <div v-if="user.showname!=null">{{user}}</div>
                    <div v-else>{{link.name}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="10">
            <div class="border-radius">
              <div
                class="profile__heading--desc-heading"
                style="height:32px;background-color: #E3E3E3;border-radius: 5px 5px 0 0;"
              ></div>
              <div
                class="profile__heading--desc-body"
                style="height:210px;background-color: #EEEEEE;"
              >
                暂时没有个人简介,
                <el-button type="text">立即添加</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </header>
    <body class="container">
      <el-row
        type="flex"
        style="margin-left: -5px;margin-right: -5px;"
        class="h-100 pt-4"
        :gutter="20"
      >
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="5" :lg="4" :xl="4">
          <div class="d-flex jc-around">
            <div>
              <div>关注了</div>
              <span>0人</span>
            </div>
            <el-divider direction="vertical"></el-divider>

            <div @click="handleComponent" class="pl-1 point">
              <div>粉丝</div>
              <span>{{this.$store.state.myFollowers}}人</span>
            </div>
          </div>
          <div>
            <el-divider></el-divider>
          </div>
          <ul>
            <li
              :class="(defaultLink==link.alias?'bg-1':'')+' py-1 pl-2 fs-xm'"
              v-for="(link,index) in pageLinks"
              :key="index"
              @click="changeComponent(link.alias)"
            >{{link.name}}</li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <component :id="this.id" :is="currentComponent"></component>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
          <component :is="currentComponent=='MyHomepage'?'MySideBar':''"></component>
        </el-col>
      </el-row>
    </body>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MyHomepage from "../components/Mypage/MyHomepage.vue";
import MyPost from "../components/Mypage/MyPost.vue";
import MyFollower from "../components/Mypage/MyFollower.vue";
import MySideBar from "../components/Mypage/MySideBar.vue";

@Component({
  components: { MyHomepage, MyPost, MySideBar, MyFollower }
})
export default class MyPage extends Vue {
  @Prop()
  id: string;
  introduction: string = "";
  collections: string = "";
  followers: string = "";
  defaultLink: string = "MyHomepage";
  currentComponent: string = "MyHomepage";
  messageBox: string = "";
  show: boolean = false;
  avatorUrl = "";
  showname: string = "";
  user: any = "";
  messageLinks = [
    {
      name: "填写现居城市",
      alias: "city",
      placeholder: "请填写城市",
      tag: "far",
      icon: "address-card"
    },
    {
      name: "填写毕业院校",
      alias: "school",
      placeholder: "请填写院校",
      tag: "far",
      icon: "thumbs-up"
    },
    {
      name: "填写所在公司/组织",
      alias: "organization",
      placeholder: "请填写公司&组织",
      tag: "far",
      icon: "compass"
    },
    {
      name: "填写个人网站",
      alias: "website",
      placeholder: "请填写网站地址",
      tag: "fab",
      icon: "js-square"
    }
  ];
  pageLinks = [
    {
      name: `${this.id != this.$store.state.userId ? "他" : "我"}的主页`,
      alias: "MyHomepage"
    },
    {
      name: `${this.id != this.$store.state.userId ? "他" : "我"}的文章`,
      alias: "myPost"
    },
    {
      name: `${this.id != this.$store.state.userId ? "他" : "我"}的回答`,
      alias: "myQue"
    },
    {
      name: `${this.id != this.$store.state.userId ? "他" : "我"}的提问`,
      alias: "myWebsite"
    }
  ];

  mounted() {
    // this.fetchCollect();
    this.fetchFollowers();
    this.fetchUser();
  }

  async fetchCollect() {
    const res = await this.$http.get("/collections");
    this.collections = res.data;
  }

  async fetchFollowers() {
    const res = await this.$http.get(`/users/${this.id}/whofollows`);
    this.followers = res.data;
  }

  async changeComponent(alias) {
    this.defaultLink = alias;
    this.currentComponent = alias;
  }
  //关注组件
  handleComponent() {
    this.defaultLink = "";
    this.currentComponent = "MyFollower";
  }

  async save(alias) {
    this.show = false;
    const data = { [alias]: this.messageBox };
    if (this.messageBox) {
      await this.$http.put(`/users/${this.id}`, data);
    }
    this.$notify({
      type: "success",
      message: "保存成功",
      title: "成功"
    });
    this.messageBox = "";
  }
  async fetchUser() {
    const res = await this.$http.get(`/users/${this.id}`);
    this.user = res.data;
    this.avatorUrl = res.data.avator[0].url;
  }

  async uploadAvator(param) {
    let params = new FormData();

    params.append("avator", param.file, param.file.name);

    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const res = await this.$http.post("/avators", params, config);

    this.$notify({
      title: "成功",
      type: "success",
      message: "上传成功"
    });
  }

  // 头像上传相关

  handleAvatarSuccess(res, file) {
    this.avatorUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";

    const isLt2M = file.size / 1024 / 1024 < 0.5;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 500k!");
    }
    return isJPG && isLt2M;
  }

  edit() {}
}
</script>

<style lang="scss" scoped>
.el-divider--vertical {
  height: inherit;
}
.el-divider--horizontal {
  margin: 12px 0;
}

.profile__heading .el-row {
  flex-wrap: none;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
}
</style>