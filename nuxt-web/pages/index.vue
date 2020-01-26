<template>
  <div :id="$route.path == '/' ? 'home' : ''">
    <!-- 父元素设置高度以及overflow，实现页面滚动的重要条件 -->
    <div id="app ">
      <div style="height:3px;" class="bg-primary"></div>
      <div>
        <div class="shadow-1" style="position:sticky;top:0;z-index: 10;">
          <el-menu
            default-active="/"
            class="el-menu-demo  container"
            mode="horizontal"
            style="margin:0 auto;"
            router
          >
            <el-menu-item class="favicon">
              <img
                @click="$router.push('/')"
                src="~/static/banner.png"
                style="object-fit:cover;height:100%;"
              />
            </el-menu-item>

            <el-menu-item index="/">
              <span style="font-weight:600" class="text-primary fs-md"
                >首页</span
              >
            </el-menu-item>

            <el-menu-item index="/q">
              <span class="fs-md">问答</span>
            </el-menu-item>

            <el-menu-item index="/blogs">
              <span class="fs-md">专栏</span>
            </el-menu-item>

            <el-menu-item index="/tags">
              <span class="fs-md">标签</span>
            </el-menu-item>

            <el-menu-item
              v-if="this.$store.state.UserNotExist == false"
              :show-timeout="0"
              :hide-timeout="0"
            >
              <el-popover
                :popper-class="`message`"
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
                      <font-awesome-icon
                        :icon="['fas', 'male']"
                        class="fs-xm"
                      />
                    </el-radio-button>
                  </el-radio-group>

                  <div v-if="topRadio == 'message'">
                    <div
                      v-for="(notify, index) in notifies.comment"
                      :key="index"
                      class="py-1 lh-2"
                    >
                      <router-link :to="`/u/${notify.user.id}`" tag="span">
                        <span class="hover-4 point pr-1 text-primary">{{
                          notify.user.name
                        }}</span> </router-link
                      >评论了你的
                      <router-link :to="`/p/${notify.post.id}`" tag="span">
                        <span class="point text-primary">{{
                          notify.post.title
                        }}</span>
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
                        <span class="ml-2 hover-4 text-primary point pr-1">{{
                          notify.name
                        }}</span> </router-link
                      >关注了你
                    </div>
                  </div>

                  <div class="flex-1 pt-3"></div>
                  <el-divider></el-divider>
                  <div class="d-flex jc-between pb-3 px-3">
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

            <!-- <el-menu-item :show-timeout="0" :hide-timeout="0" class="pl-4">
              <el-badge value="new" type="primary" class="item pl-2">
                <el-popover
                  :popper-class="`message`"
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
            </el-menu-item> -->

            <el-menu-item>
              <el-popover v-model="visible" placement="top" width="160">
                <div style="text-align: center; margin: 0">
                  <div>夜间模式</div>
                  <div class="d-flex jc-center pt-3">
                    <el-button
                      @click="visible = false"
                      size="mini"
                      type="primary"
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

            <el-menu-item
              ><el-input
                v-model="search"
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
              >
              </el-input
            ></el-menu-item>

            <el-submenu
              :index="`person`"
              v-if="$store.state.UserNotExist == false"
              :show-timeout="0"
              :hide-timeout="0"
              style="right: 15%;position: absolute;"
            >
              <template slot="title">
                <el-avatar :size="35" class="shadow-1">
                  <img
                    v-if="this.$store.state.auth.user.avator.length !== 0"
                    :src="this.$store.state.auth.user.avator[0].url"
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

            <el-submenu
              :index="`store`"
              :show-timeout="0"
              :hide-timeout="0"
              style="right: 2%;position: absolute;"
            >
              <template slot="title">
                <el-button type="plain">创建</el-button>
              </template>

              <el-menu-item :span="4" class="write ml-4" index="/post">
                <font-awesome-icon :icon="['fas', 'pen']" class="fs-xm" />
                写文章
              </el-menu-item>
              <el-menu-item :span="4" class="write ml-3" index="/ask">
                <font-awesome-icon
                  :icon="['fas', 'question-circle']"
                  class="fs-xm"
                />
                提问题
              </el-menu-item>
              <el-menu-item :span="4" class="write ml-3" index="/record">
                <font-awesome-icon
                  :icon="['fas', 'sticky-note']"
                  class="fs-xm"
                />
                记笔记
              </el-menu-item>
            </el-submenu>

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
        </div>
      </div>

      <div class="h-100">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
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
// const Cookie = process.client ? require('js-cookie') : undefined

@Component({})
export default class Home extends Vue {
  isRegister: boolean = false
  LoginDto: any = {}
  RegisterDto: any = {}
  topRadio = 'message'
  notifies = ''
  search = ''
  formLabelWidth: string = '120'

  visible: boolean = false

  mounted() {
    this.fetchNotify()
    // window.addEventListener('unload', this.saveState)
  }

  get store() {
    return this.$store.state.UserNotExist
  }

  closeLoginForm() {
    this.$store.commit('closeLoginForm')
  }

  async login() {
    await this.$auth.loginWith('local', { data: this.LoginDto })

    this.$store.commit('UserExist')
    this.$store.commit('closeLoginForm')
    this.fetchNotify()
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
    localStorage['auth._token.local'] = ''
    localStorage.state = ''
    this.$store.commit('toggleBanner')
    this.$store.commit('toggleUser')
    this.$notify({
      title: '成功',
      type: 'success',
      message: '退出登录成功 '
    })
    this.$router.push('/')
  }

  async fetchNotify() {
    const res = await this.$http.get('/notification')
    this.notifies = res.data
  }

  async fetchuser() {
    if (!this.store) {
      const res = await this.$http.get('users')
      const usertag = []
      res.data.tags.map((e) => {
        usertag.push(e)
      })
      console.log(usertag)
    }
  }

  // 刷新保存状态

  // saveState() {
  //   localStorage.setItem('state', JSON.stringify(this.$store.state))
  // }

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

.favicon {
  object-fit: contain;
  &:hover {
    &::before {
      content: '';
      background: url(../static/tip.png) no-repeat;
      position: absolute;
      top: 98%;
      width: -webkit-fill-available;
      z-index: 1;
      height: inherit;
      background-size: contain;
    }
  }
}

.item {
  right: 17px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  border-radius: 20px;
}
//登录相关
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

.el-menu-item * {
  vertical-align: unset !important;
}
.el-menu-item:nth-child(1) {
  padding-left: 0 !important;
}
.article img {
  justify-content: center;
  display: flex;
  max-width: -webkit-fill-available;
  margin: 0.667em 0;
}

.el-popover {
  &.message {
    height: 440px !important;
    .el-radio-button__inner {
      padding-left: 50px !important;
      padding-right: 50px !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }
  }
}

.write {
  @media (max-width: 768px) {
    display: none;
  }
}

//首页标签
.el-badge__content.is-fixed {
  top: 15px !important;
  right: 1px !important;
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

#home {
  overflow: auto;
  height: 100vh;
}
</style>
