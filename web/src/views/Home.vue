<template>
  <div class="home">
    <el-container>
      <div style="height:2px;" class="bg-primary"></div>
      <el-header style="position:sticky;top:0;z-index: 10;">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo shadow-1"
          mode="horizontal"
          router
        >
          <el-menu-item>
            <img src="../assets/banner.png" style="object-fit:cover;height:100%;" />
          </el-menu-item>

          <el-menu-item index="/">
            <i class="el-icon-discover"></i> 发现
          </el-menu-item>

          <el-menu-item index="/follow">
            <i class="el-icon-document-checked"></i> 关注
          </el-menu-item>

          <el-submenu index="4" :show-timeout="0" :hide-timeout="0">
            <template slot="title">
              <i class="el-icon-bell"></i> 消息
            </template>
            <el-menu-item index="/notification/comments">
              <i class="el-icon-chat-dot-round"></i>评论
            </el-menu-item>
            <el-menu-item index="/notification/message">
              <i class="el-icon-wallet"></i>简信
            </el-menu-item>
            <el-menu-item index="/notification/request">
              <i class="el-icon-s-order"></i> 投稿请求
            </el-menu-item>
            <el-menu-item index="/notification/like">
              <i class="el-icon-s-opportunity"></i> 喜欢和赞
            </el-menu-item>
            <el-menu-item index="/notification/follow">
              <i class="el-icon-star-on"></i> 关注
            </el-menu-item>
            <el-menu-item index="/notification/pay">
              <i class="el-icon-shopping-cart-2"></i> 赞赏和付费
            </el-menu-item>
          </el-submenu>

          <el-menu-item>
            <el-popover placement="top" width="160" v-model="visible">
              <div style="text-align: left; margin: 0">
                <div>夜间模式</div>
                <el-button size="mini" type="text" @click="visible = false">开启</el-button>
                <el-button type="primary" size="mini" @click="visible = false">关闭</el-button>
              </div>
              <el-button slot="reference">Aa</el-button>
            </el-popover>
          </el-menu-item>

          <el-submenu
            v-if="$store.state.UserNotExist == false"
            index="6"
            :show-timeout="0"
            :hide-timeout="0"
            style="right: 15%;position: absolute;"
          >
            <template slot="title">
              <el-avatar :size="35" src="../assets/avator.jpg" class="shadow-1">
                <img src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/avator.jpg" />
              </el-avatar>
            </template>
            <el-menu-item index="/u/mypage">
              <i class="el-icon-user-solid"></i> 我的主页
            </el-menu-item>

            <el-menu-item index="/u/collect">
              <i class="el-icon-star-on"></i> 收藏的文章
            </el-menu-item>
            <el-menu-item index="/u/like">喜欢的文章</el-menu-item>

            <el-menu-item index="/u/setting">设置</el-menu-item>
            <el-menu-item index="/u/help">帮助与反馈</el-menu-item>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-submenu>

          <el-menu-item :span="4" index="/post" style="right: 2%;position: absolute;">
            <el-button type="primary" round>写文章</el-button>
          </el-menu-item>

          <el-menu-item
            v-if="$store.state.UserNotExist"
            @click="$store.state.loginFormVisible = true,isRegister = false"
          >立即登录</el-menu-item>
          <el-menu-item>
            <el-button
              v-if="this.$store.state.UserNotExist"
              type="primary"
              @click="$store.state.loginFormVisible = true,isRegister = true"
            >免费注册</el-button>
          </el-menu-item>
        </el-menu>

        <div class="line"></div>
      </el-header>
      <div class="h-100">
        <router-view :key="$route.path"></router-view>
      </div>
    </el-container>
    <el-dialog
      width="500px"
      :title="isRegister?'注册':'登录'"
      :visible.sync="$store.state.loginFormVisible"
    >
      <el-form v-if="isRegister" :model="RegisterDto">
        <el-form-item label="你的名字" :label-width="formLabelWidth">
          <el-input height="10" placeholder="常用昵称" v-model="RegisterDto.name" autocomplete="off">
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            height="10"
            placeholder="11位手机号"
            v-model="RegisterDto.phonenumber"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            show-password
            placeholder="不少于6位的密码"
            v-model="RegisterDto.password"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <el-form v-else :model="LoginDto">
        <el-form-item label="手机号或Email" :label-width="formLabelWidth">
          <el-input
            height="10"
            placeholder="11位手机号或Email"
            v-model="LoginDto.phonenumber"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model="LoginDto.password"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="pt-2" style="width:320px;margin:0 auto;">
        <div class="dialog-footer pb-2">
          <el-button v-if="isRegister" type="success" @click="register">注册</el-button>
          <el-button v-else type="success" @click="login">登录</el-button>
        </div>

        <div class="dialog-footer d-flex flex-column">
          <div class="py-4">
            <el-divider content-position="center">更多登录方式</el-divider>
          </div>
          <el-button v-if="isRegister" type="message" @click="isRegister = false">已有账号登录</el-button>
          <el-button v-else type="message" @click="isRegister = true">注册新账号</el-button>
        </div>
        <div class="pt-2" style="margin-bottom:-10px">
          继续即表示你同意
          <a href="#">《服务条款》</a> 和
          <a href="#">《隐私政策》</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import SearchBtn from "../components/SearchBtn/SearchButton.vue";
@Component({
  components: { "search-button": SearchBtn }
})
export default class Home extends Vue {
  isRegister: boolean = false;
  LoginDto: any = {};
  RegisterDto: any = {};

  formLabelWidth: string = "120";
  visible: boolean = false;
  watch: {};
  mounted() {
    this.fetchuser();
    window.addEventListener("unload", this.saveState);
  }
  async login() {
    const res = await this.$http.post("/auth/login", this.LoginDto);
    localStorage.token = res.data.token;
    this.$notify({
      title: "",
      type: "success",
      message: "登录成功"
    });

    this.$store.state.loginFormVisible = false;
    this.$store.state.UserNotExist = false;
    this.$router.go(0); //刷新页面
  }

  async register() {
    const res = await this.$http.post("/users", this.RegisterDto);
    this.$notify({
      title: "",
      type: "success",
      message: "注册成功"
    });
    this.isRegister = false;
  }

  logout() {
    localStorage.token = "";
    this.$store.state.UserNotExist = true;
    this.$notify({
      title: "成功",
      type: "success",
      message: "退出登录成功 "
    });
    this.$router.push("/");
  }

  async fetchuser() {
    if (this.$store.state.UserNotExist == false) {
      const res = await this.$http.get("users");
      this.$store.state.userName = res.data.name;
      this.$store.state.userId = res.data.id;
      this.$store.state.postLength = res.data.posts.length;
    }
  }

  //刷新保存状态
  saveState() {
    localStorage.setItem("state", JSON.stringify(this.$store.state));
  }
}
</script>

<style lang="scss">
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
  position: relative;
}
.el-main {
  padding: 0 !important;
}
.item {
  right: 17px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  border-radius: 20px;
}
.el-form {
  width: 320px;
  margin: 0 auto;
  input {
    height: 35px;
  }
}

.el-form-item__label {
  line-height: 20px !important;
}
.el-dialog__header {
  background-color: whitesmoke;
}
.el-form-item {
  margin-bottom: 10px !important;
}
.dialog-footer .el-button {
  padding: 9px 0 !important;
  width: 320px !important;
}
</style>
