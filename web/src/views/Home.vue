<template>
  <div class="home" style="overflow:auto;height:100vh">
    <!-- 父元素设置高度以及overflow，实现页面滚动的重要条件 -->
    <el-container style>
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

          <el-menu-item :show-timeout="0" :hide-timeout="0">
            <el-popover style="height:400px!important" placement="bottom" trigger="click">
              <!-- <el-menu-item index="/notification/comments">
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
              </el-menu-item>-->
              <div class="d-flex flex-column h-100">
                <el-radio-group v-model="topRadio" size="small">
                  <el-radio-button label="message">
                    <font-awesome-icon class="fs-xm" :icon="['fas', 'lightbulb']" />
                  </el-radio-button>
                  <el-radio-button label="class">
                    <font-awesome-icon class="fs-xm" :icon="['fab', 'cloudversify']" />
                  </el-radio-button>
                  <el-radio-button label="friend">
                    <font-awesome-icon class="fs-xm" :icon="['fas', 'male']" />
                  </el-radio-button>
                </el-radio-group>
                <div class="flex-1 pt-3"></div>
                <el-divider></el-divider>
                <div class="d-flex jc-between">
                  <div class="point">全部标记为已读</div>
                  <router-link tag="div" class="point hover-4" to="/notification">查看全部</router-link>
                </div>
              </div>
              <el-button type="text" slot="reference">
                <i class="el-icon-bell"></i>
              </el-button>
            </el-popover>
          </el-menu-item>

          <el-menu-item>
            <el-popover placement="top" width="160" v-model="visible">
              <div style="text-align: center; margin: 0">
                <div>夜间模式</div>
                <div class="d-flex jc-center pt-3">
                  <el-button size="mini" type="primary" @click="visible = false">开启</el-button>

                  <el-button type="text" size="mini" @click="visible = false">关闭</el-button>
                </div>
              </div>
              <el-button type="text" slot="reference">Aa</el-button>
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
              <el-avatar :size="35" class="shadow-1">
                <img v-if="this.$store.state.userAvator" :src="this.$store.state.userAvator" />
                <img v-else src="../assets/avator.jpg" />
              </el-avatar>
            </template>
            <el-menu-item :index="`/u/${this.$store.state.userId }`">
              <i class="el-icon-user-solid"></i> 我的主页
            </el-menu-item>

            <el-menu-item index="/u">
              <i class="el-icon-star-on"></i> 我的收藏
            </el-menu-item>

            <el-menu-item index="/u/setting">个人设置</el-menu-item>
            <el-menu-item index="/u/help">帮助与反馈</el-menu-item>
            <el-menu-item @click="logout">退出</el-menu-item>
          </el-submenu>

          <el-menu-item class="write" :span="4" index="/post" style="right: 2%;position: absolute;">
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
  topRadio = "";
  formLabelWidth: string = "120";
  visible: boolean = false;
  watch: {};

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

  change() {
    console.log(123);
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
