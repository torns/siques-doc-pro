<template>
  <div :id="$route.path == '/' ? 'home' : ''">
    <!-- 父元素设置高度以及overflow，实现页面滚动的重要条件 -->
    <div id="app ">
      <div style="height:3px;" class="bg-primary"></div>
      <div>
        <div class="shadow-1" style="position:sticky;top:0;z-index: 10;">
          <el-menu
            default-active="/"
            class="d-flex jc-between ai-center el-menu-demo container"
            mode="horizontal"
            style="margin:0 auto;"
            router
          >
            <el-menu-item class="favicon xs-flex-1">
              <img
                @click="$router.push('/')"
                src="~/static/banner.png"
                style="object-fit:cover;height:100%;"
              />
            </el-menu-item>

            <el-menu-item class="menu-item" index="/">
              <span style="font-weight:600" class="text-primary fs-md"
                >首页</span
              >
            </el-menu-item>

            <el-menu-item class="xm" index="/q">
              <span class="fs-md">问答</span>
            </el-menu-item>

            <el-menu-item index="/blogs">
              <span class="fs-md">专栏</span>
            </el-menu-item>

            <el-menu-item index="/tags">
              <span class="fs-md">标签</span>
            </el-menu-item>
            <el-menu-item class="menu-item" index="/n">
              <span class="fs-md">笔记</span>
            </el-menu-item>

            <el-menu-item
              v-show="this.$store.state.UserNotExist == false"
              :show-timeout="0"
              :hide-timeout="0"
              class="xs"
            >
              <el-popover
                :popper-class="`message`"
                @show="show"
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
                      <i class="fs-sm iconfont icon-desLampidea"></i>
                    </el-radio-button>
                    <el-radio-button label="class">
                      <i class="fs-sm iconfont icon-message"></i>
                    </el-radio-button>
                    <el-radio-button label="follow">
                      <i class="fs-sm iconfont icon-follow"></i>
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
                      <router-link
                        :to="
                          (notify.post.type === 'post' ? '/p/' : '/q/') +
                            `${notify.post.id}`
                        "
                        tag="span"
                      >
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

            <!-- <el-menu-item class="menu-item">
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
            </el-menu-item> -->

            <el-menu-item class="md" :index="`search`">
              <el-input
                v-model="search"
                @change="dataSearch"
                clearable
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
              ></el-input>
            </el-menu-item>

            <el-submenu
              :index="`person`"
              v-if="$store.state.UserNotExist == false"
              :show-timeout="0"
              :hide-timeout="0"
            >
              <template slot="title">
                <el-avatar
                  v-if="this.$store.state.auth.user !== undefined"
                  :size="35"
                  class="shadow-1"
                >
                  <img
                    v-if="this.$store.state.auth.user.avator[0].url !== null"
                    :src="this.$store.state.auth.user.avator[0].url"
                    style="background-color:white;"
                  />

                  <img v-else src="~/static/avator.jpg" />
                </el-avatar>
              </template>
              <el-menu-item :index="`/u`">
                <i class="iconfont icon-me px-3 fs-lg"></i> 我的主页
              </el-menu-item>

              <!-- <el-menu-item index="/u">
                <i class="el-icon-star-on"></i> 我的收藏
              </el-menu-item> -->

              <!-- <el-menu-item index="/u/setting">个人设置</el-menu-item>
              <el-menu-item index="/u/help">帮助与反馈</el-menu-item> -->
              <el-menu-item @click="logout">退出</el-menu-item>
            </el-submenu>

            <el-submenu
              :index="`store`"
              :show-timeout="0"
              :hide-timeout="0"
              class="menu-item"
            >
              <template slot="title">
                <el-button type="plain">创建</el-button>
              </template>

              <el-menu-item :span="4" class="write ml-4" index="/post">
                <i class="iconfont  pr-3  icon-Write fs-xm"></i>
                写文章
              </el-menu-item>
              <el-menu-item :span="4" class="write ml-3" index="/ask">
                <i class="iconfont pr-3   icon-iconawsquestion fs-xm"></i>提问题
              </el-menu-item>
              <el-menu-item :span="4" class="write ml-3" index="/record">
                <i class="iconfont  pr-3 icon-note fs-xm"></i>记笔记
              </el-menu-item>
            </el-submenu>

            <el-menu-item
              v-if="$store.state.UserNotExist"
              @click="$store.commit('toggleLoginForm'), (isRegister = false)"
              >立即登录</el-menu-item
            >
            <el-menu-item class="menu-item">
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
      style="max-width:500px;margin: 0 auto"
      width="90%"
    >
      <el-form
        ref="RegisterDto"
        v-show="isRegister"
        :model="RegisterDto"
        :rules="rules"
        status-icon
      >
        <el-form-item
          :label-width="formLabelWidth"
          class="pb-2"
          label="你的名字"
          prop="name"
        >
          <el-input
            v-model="RegisterDto.name"
            height="10"
            placeholder="常用昵称"
            autocomplete="off"
            clearable
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="pb-2"
          label="手机号"
          prop="phonenumber"
        >
          <el-input
            v-model.number="RegisterDto.phonenumber"
            :maxlength="11"
            height="10"
            placeholder="11位手机号"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="pb-2"
          label="密码"
          prop="password"
        >
          <el-input
            v-model="RegisterDto.password"
            show-password
            placeholder="不少于7位"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <el-form
        ref="LoginDto"
        :model="LoginDto"
        :rules="rules"
        v-show="!isRegister"
        status-icon
      >
        <el-form-item :label-width="formLabelWidth" label="手机号">
          <el-input
            v-model="LoginDto.phonenumber"
            :maxlength="11"
            height="10"
            placeholder="11位手机号"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pt-2" label="密码">
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
import { Component, Vue, Watch } from 'vue-property-decorator'
// const Cookie = process.client ? require('js-cookie') : undefined

@Component({})
export default class Home extends Vue {
  isRegister: boolean = false

  topRadio = 'message'
  notifies = ''
  search = ''
  formLabelWidth: string = '120'

  visible: boolean = false

  @Watch('isRegister')
  isVisible(newval: any, oldval: any) {
    if (!newval) {
      this.resetForm()
    }
  }

  phoneLength(value: any) {
    const regex = /^[1][3,4,5,7,8][0-9]{9}$/
    if (regex.test(value)) {
      return true
    }
  }

  charLength(value: any) {
    if (value.length >= 7) {
      return true
    }
  }

  lowercase(value: any) {
    const regex = /^(?=.*[a-z]).+$/

    if (regex.test(value)) {
      return true
    }
  }
  // 大写暂时不需要
  // uppercase(value) {
  //   const regex = /^(?=.*[A-Z]).+$/

  //   if (regex.test(value)) {
  //     return true
  //   }
  // }
  number(value: any) {
    const regex = /^(?=.*[0-9]).+$/

    if (regex.test(value)) {
      return true
    }
  }
  validatePhone(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入手机号'))
    }

    if (this.phoneLength(value)) {
      callback()
    } else {
      callback(new Error('不合格的手机号'))
    }
  }

  validatePass(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入密码'))
    }

    if (this.charLength(value) && this.lowercase(value) && this.number(value)) {
      callback()
    } else {
      callback(new Error('密码强度不足'))
    }
  }

  validateName(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入昵称'))
    }
  }

  RegisterDto = {
    name: '',
    phonenumber: '',
    password: ''
  }

  LoginDto = {
    phonenumber: '',
    password: ''
  }

  rules = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
      {
        required: true,
        pattern: /^[\u4E00-\u9FA5_a-zA-Z0-9.·-]+$/,
        message: '姓名不支持特殊字符',
        trigger: 'blur'
      }
    ],
    phonenumber: [
      { required: true, validator: this.validatePhone, trigger: 'blur' }
    ],
    password: [
      { required: true, validator: this.validatePass, trigger: 'blur' }
    ]
  }

  mounted() {
    // this.fetchNotify()
    // window.addEventListener('unload', this.saveState)
  }

  get isUser() {
    return !this.$store.state.UserNotExist
  }

  closeLoginForm() {
    this.$store.commit('closeLoginForm')
  }

  login() {
    const ref: any = this.$refs.LoginDto
    ref.validate(async (valid: any) => {
      if (valid) {
        await this.$auth.loginWith('local', { data: this.LoginDto })

        this.$store.commit('UserExist')
        this.$store.commit('closeLoginForm')
        // this.fetchNotify()
      } else {
        // eslint-disable-next-line
        console.log('error submit!!')
        return false
      }
    })
  }

  register() {
    const ref: any = this.$refs.RegisterDto
    ref.validate(async (valid: any) => {
      if (valid) {
        await this.$http.post('/users', this.RegisterDto)
        this.$notify({
          title: '',
          type: 'success',
          message: '注册成功'
        })
        this.isRegister = false
      } else {
        // eslint-disable-next-line
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm() {
    const ref: any = this.$refs.RegisterDto
    ref.resetFields()
  }

  logout() {
    this.$store.commit('toggleBanner')
    this.$store.commit('toggleUser')
    this.$notify({
      title: '成功',
      type: 'success',
      message: '退出登录成功 '
    })
    this.$router.push('/')
  }

  async show() {
    if (this.isUser) {
      const res = await this.$http.get('/notification')
      this.notifies = res.data
    }
  }

  async fetchuser() {
    if (this.isUser) {
      const res = await this.$http.get('users')
      const usertag = []
      res.data.tags.map((e: any) => {
        usertag.push(e)
      })
      // console.log(usertag)
    }
  }

  dataSearch() {}
  // 刷新保存状态

  // saveState() {
  //   localStorage.setItem('state', JSON.stringify(this.$store.state))
  // }

  change(e: any) {}
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
      width: 160px;
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
  width: 320px !important;
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
  overflow-y: auto;
  overflow-x: hidden !important;
  height: 100vh;
}
</style>
