<template>
  <div class="home" style="overflow:auto;height:100vh">
    <!-- 父元素设置高度以及overflow，实现页面滚动的重要条件 -->
    <el-container style>
      <div style="height:3px;" class="bg-primary"></div>
      <el-header style="position:sticky;top:0;z-index: 10;">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo shadow-1"
          mode="horizontal"
          router
        >
          <el-menu-item>
            <img
              src="~/static/banner.png"
              style="object-fit:cover;height:100%;"
            />
          </el-menu-item>

          <el-menu-item index="/">
            <span style="font-weight:600" class="text-primary fs-md">首页</span>
          </el-menu-item>

          <el-menu-item index="/follow">
            <span class="fs-md">问答</span>
          </el-menu-item>

          <el-menu-item
            v-if="this.$store.state.UserNotExist == false"
            :show-timeout="0"
            :hide-timeout="0"
          >
            <el-popover
              style="height:400px!important;"
              placement="bottom"
              trigger="click"
            >
              <div class="d-flex flex-column h-100">
                <el-radio-group
                  @change="change"
                  v-model="topRadio"
                  size="small"
                >
                  <el-radio-button label="message">
                    <font-awesome-icon
                      :icon="['fas', 'lightbulb']"
                      class="fs-xm"
                    />
                  </el-radio-button>
                  <el-radio-button label="class">
                    <font-awesome-icon
                      :icon="['fab', 'cloudversify']"
                      class="fs-xm"
                    />
                  </el-radio-button>
                  <el-radio-button label="follow">
                    <font-awesome-icon :icon="['fas', 'male']" class="fs-xm" />
                  </el-radio-button>
                </el-radio-group>

                <div v-if="topRadio == 'message'">
                  <div
                    v-for="(notify, index) in notifies.comment"
                    :key="index"
                    class="py-1 lh-2"
                  >
                    <router-link :to="`/u/${notify.user.id}`" tag="span">
                      <span class="hover-4 point pr-1 text-primary">
                        {{ notify.user.name }}
                      </span> </router-link
                    >评论了你的
                    <router-link :to="`/p/${notify.post.id}`" tag="span">
                      <span class="point text-primary">
                        {{ notify.post.title }}
                      </span>
                    </router-link>
                  </div>
                </div>

                <div v-if="topRadio == 'follow'">
                  <div class="border-bottom py-1 pl-2">他们最近关注了你</div>

                  <div
                    v-for="(notify, index) in notifies.follow.user"
                    :key="index"
                    class="py-1 lh-2 bg-2"
                  >
                    <router-link :to="`/u/${notify.id}`" tag="span">
                      <span class="ml-2 hover-4 text-primary point pr-1">
                        {{ notify.name }}
                      </span> </router-link
                    >关注了你
                  </div>
                </div>

                <div class="flex-1 pt-3"></div>
                <el-divider></el-divider>
                <div class="d-flex jc-between">
                  <div class="point">全部标记为已读</div>
                  <router-link
                    to="/notification"
                    tag="div"
                    class="point hover-4"
                    >查看全部</router-link
                  >
                </div>
              </div>
              <el-button slot="reference" type="text">
                <i class="el-icon-bell"></i>
              </el-button>
            </el-popover>
          </el-menu-item>

          <el-menu-item :show-timeout="0" :hide-timeout="0" class="pl-4">
            <el-badge value="new" type="primary" class="item pl-2">
              <el-popover
                style="height:400px!important;"
                placement="bottom"
                trigger="click"
              >
                <div class="d-flex flex-column h-100">
                  <div class="flex-1 pt-3"></div>
                  <el-divider></el-divider>
                  <div class="d-flex jc-between">
                    <div class="point">全部标记为已读</div>
                    <router-link
                      to="/notification"
                      tag="div"
                      class="point hover-4"
                      >查看全部</router-link
                    >
                  </div>
                </div>

                <el-button slot="reference" type="text">
                  <font-awesome-icon
                    :icon="['far', 'envelope']"
                    class="fs-xm"
                  />
                </el-button>
              </el-popover>
            </el-badge>
          </el-menu-item>

          <el-menu-item>
            <el-popover v-model="visible" placement="top" width="160">
              <div style="text-align: center; margin: 0">
                <div>夜间模式</div>
                <div class="d-flex jc-center pt-3">
                  <el-button @click="visible = false" size="mini" type="primary"
                    >开启</el-button
                  >

                  <el-button @click="visible = false" type="text" size="mini"
                    >关闭</el-button
                  >
                </div>
              </div>
              <el-button slot="reference" type="text">Aa</el-button>
            </el-popover>
          </el-menu-item>

          <el-submenu
            v-if="$store.state.UserNotExist == false"
            :show-timeout="0"
            :hide-timeout="0"
            index="6"
            style="right: 15%;position: absolute;"
          >
            <template slot="title">
              <el-avatar :size="35" class="shadow-1">
                <img
                  v-if="this.$store.state.userAvator"
                  :src="this.$store.state.userAvator"
                  style="background-color:white;"
                />
                <img v-else src="~/static/avator.jpg" />
              </el-avatar>
            </template>
            <el-menu-item :index="`/u`">
              <i class="el-icon-user-solid"></i> 我的主页
            </el-menu-item>

            <el-menu-item index="/u">
              <i class="el-icon-star-on"></i> 我的收藏
            </el-menu-item>

            <el-menu-item index="/u/setting">个人设置</el-menu-item>
            <el-menu-item index="/u/help">帮助与反馈</el-menu-item>
            <el-menu-item @click="logout">退出</el-menu-item>
          </el-submenu>

          <el-menu-item
            :span="4"
            class="write"
            index="/post"
            style="right: 2%;position: absolute;"
          >
            <el-button type="primary" round>写文章</el-button>
          </el-menu-item>

          <el-menu-item
            v-if="$store.state.UserNotExist"
            @click="$store.commit('toggleLoginForm'), (isRegister = false)"
            >立即登录</el-menu-item
          >
          <el-menu-item>
            <el-button
              @click="$store.commit('toggleLoginForm'), (isRegister = true)"
              v-if="$store.state.UserNotExist"
              type="primary"
              >免费注册</el-button
            >
          </el-menu-item>
        </el-menu>
      </el-header>

      <div class="h-100">
        <router-view :key="$route.path"></router-view>
      </div>
    </el-container>
    <el-dialog
      :title="isRegister ? '注册' : '登录'"
      :visible="$store.state.loginFormVisible"
      @close="closeLoginForm"
      width="500px"
    >
      <el-form v-if="isRegister" :model="RegisterDto">
        <el-form-item :label-width="formLabelWidth" label="你的名字">
          <el-input
            v-model="RegisterDto.name"
            height="10"
            placeholder="常用昵称"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机号">
          <el-input
            v-model="RegisterDto.phonenumber"
            height="10"
            placeholder="11位手机号"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码">
          <el-input
            v-model="RegisterDto.password"
            show-password
            placeholder="不少于6位的密码"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <el-form :model="LoginDto" v-else>
        <el-form-item :label-width="formLabelWidth" label="手机号或Email">
          <el-input
            v-model="LoginDto.phonenumber"
            height="10"
            placeholder="11位手机号或Email"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码">
          <el-input
            v-model="LoginDto.password"
            show-password
            placeholder="请输入密码"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="pt-2" style="width:320px;margin:0 auto;">
        <div class="dialog-footer pb-2">
          <el-button @click="register" v-if="isRegister" type="success"
            >注册</el-button
          >
          <el-button @click="login" v-else type="success">登录</el-button>
        </div>

        <div class="dialog-footer d-flex flex-column">
          <div class="py-4">
            <el-divider content-position="center">更多登录方式</el-divider>
          </div>
          <el-button
            v-if="isRegister"
            @click="isRegister = false"
            type="message"
            >已有账号登录</el-button
          >
          <el-button v-else @click="isRegister = true" type="message"
            >注册新账号</el-button
          >
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
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  isRegister: boolean = false
  LoginDto: any = {}
  RegisterDto: any = {}
  topRadio = 'message'
  notifies = ''
  formLabelWidth: string = '120'

  visible: boolean = false

  mounted() {
    this.fetchNotify()
  }

  closeLoginForm() {
    this.$store.commit('toggleLoginForm')
  }

  async login() {
    const res = await this.$http.post('/auth/login', this.LoginDto)
    localStorage.token = res.data.token
    this.$notify({
      title: '',
      type: 'success',
      message: '登录成功'
    })

    this.$store.state.loginFormVisible = false
    this.$store.state.UserNotExist = false
    this.$router.go(0) // 刷新页面
  }

  async register() {
    await this.$http.post('/users', this.RegisterDto)
    this.$notify({
      title: '',
      type: 'success',
      message: '注册成功'
    })
    this.isRegister = false
  }

  logout() {
    localStorage.token = ''
    this.$store.state.UserNotExist = true
    this.$notify({
      title: '成功',
      type: 'success',
      message: '退出登录成功 '
    })
    this.$router.push('/')
  }

  async fetchNotify() {
    if (this.$store.state.UserNotExist === false) {
      const res = await this.$http.get('/notification')
      this.notifies = res.data
    }
  }

  async change(e) {}
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

.el-popover {
  padding: 0 !important;
}
</style>
