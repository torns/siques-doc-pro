<template>
  <div :id="$route.path == '/' ? 'home' : ''">
    <!-- <div> -->
    <div id="app ">
      <div style="height:3px;" class="bg-primary"></div>
      <div>
        <div class="shadow-1" style="z-index: 10;">
          <el-menu
            default-active="/"
            class="d-flex jc-between ai-center  container"
            mode="horizontal"
            style="margin:0 auto;"
            router
          >
            <el-menu-item class="favicon xs-flex-1 d-flex ai-center">
              <img
                @click="$router.push('/')"
                src="~/static/banner.png"
                style="object-fit:cover;height:70%;"
              />
            </el-menu-item>

            <el-menu-item class="xs" index="/">
              <span style="font-weight:600" class="text-primary fs-md"
                >首页</span
              >
            </el-menu-item>

            <el-menu-item class="xm" index="/q">
              <span class="fs-md">问答</span>
            </el-menu-item>

            <el-menu-item class="xs" index="/blogs">
              <span class="fs-md">专栏</span>
            </el-menu-item>

            <el-menu-item class="xs" index="/tags">
              <span class="fs-md">标签</span>
            </el-menu-item>
            <el-menu-item class="xs" index="/n">
              <span class="fs-md">笔记</span>
            </el-menu-item>

            <el-menu-item
              v-show="this.$store.state.UserNotExist == false"
              :show-timeout="0"
              :hide-timeout="0"
              class="xm "
              style="padding-left:40px"
            >
              <el-badge
                :value="hasNewMessage ? 'new' : null"
                class="item"
                type="primary"
              >
                <el-popover
                  :popper-class="`message`"
                  @show="fetchUserLetter"
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
                      <el-radio-button label="letter">
                        <i class="fs-sm iconfont icon-message"></i>
                      </el-radio-button>
                      <el-radio-button label="follow">
                        <i class="fs-sm iconfont icon-follow"></i>
                      </el-radio-button>
                    </el-radio-group>

                    <div
                      v-if="topRadio == 'message'"
                      style="width: 350px;overflow-y: auto;"
                    >
                      <div class="border-bottom py-1 pl-2">
                        一些关于你的通知
                      </div>
                      <div v-for="(letter, index) in userLetters" :key="index">
                        <div
                          v-if="
                            letter.type !== 'followuser' &&
                              letter.content === null
                          "
                          :class="
                            `d-flex py-1 pl-2 lh-2 ${
                              letter.is_read === 1 ? '' : 'bg-2'
                            }`
                          "
                        >
                          <router-link
                            :to="`/u/${letter.from_uid.id}`"
                            tag="div"
                          >
                            <div
                              class="hover-4 point pr-1 text-primary "
                              style="white-space: nowrap;"
                            >
                              {{ letter.from_uid.name }}
                            </div>
                          </router-link>
                          <div style="white-space: nowrap;" class="pr-1">
                            {{ actionTransFomer(letter) }}
                          </div>
                          <router-link
                            :to="link(letter) + `${letter.to_Post.id}`"
                            tag="div"
                          >
                            <div
                              class="point text-primary hoverlink ellipsis-1"
                            >
                              {{ letter.to_Post.title }}
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>

                    <div v-if="topRadio == 'follow'">
                      <div class="border-bottom py-1 pl-2">
                        他们最近关注了你
                      </div>

                      <div v-for="(letter, index) in userLetters" :key="index">
                        <div
                          v-if="letter.type == 'followuser'"
                          :class="
                            `py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`
                          "
                        >
                          <router-link
                            :to="`/u/${letter.from_uid.id}`"
                            tag="span"
                          >
                            <span
                              class="ml-2 hover-4 text-primary point pr-1"
                              >{{ letter.from_uid.name }}</span
                            > </router-link
                          >关注了你
                        </div>
                      </div>
                    </div>

                    <div v-if="topRadio == 'letter'">
                      <div class="border-bottom py-1 pl-2">
                        他们最近私信了你
                      </div>

                      <div v-for="(letter, index) in userLetters" :key="index">
                        <div
                          v-if="
                            letter.content != null && letter.from_uid !== null
                          "
                          :class="
                            `py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`
                          "
                        >
                          <el-popover
                            :content="
                              ` ${letter.content +
                                $dayjs(letter.created).format('M月D日 H:MM')}`
                            "
                            placement="bottom"
                            title="私信详情"
                            width=""
                            icon
                            trigger="hover"
                          >
                            <router-link
                              slot="reference"
                              :to="`/u/${letter.from_uid.id}`"
                              tag="span"
                            >
                              <span
                                class="ml-2 hover-4 text-primary point pr-1"
                                >{{ letter.from_uid.name }}</span
                              >
                              私信了你
                            </router-link>
                          </el-popover>
                        </div>
                        <div v-if="letter.from_uid === null">
                          <div
                            :class="
                              `py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`
                            "
                          >
                            <div class="pl-2">
                              {{ letter.content }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 pt-3"></div>

                    <div></div>
                    <div class=" border-top ">
                      <div class="d-flex jc-between pt-2">
                        <div @click="markedRead" class="point ">
                          全部标记为已读
                        </div>
                        <router-link
                          to="/notification"
                          tag="div"
                          class="point hover-4"
                          >查看全部</router-link
                        >
                      </div>
                    </div>
                  </div>
                  <i slot="reference" class="fa fa-bell-o fs-xm "> </i>
                </el-popover>
              </el-badge>
            </el-menu-item>

            <el-menu-item>
              <el-input
                v-model="search"
                @keyup.enter.native="dataSearch"
                size="small"
                class="md"
                placeholder="请输入内容"
              >
                <el-button @click="dataSearch" slot="append">
                  <i class="fa fa-search"></i>
                </el-button>
              </el-input>
              <div style="padding: 23px 0;">
                <i @click="dataSearch" class="fa fa-search visible-md"></i>
              </div>
            </el-menu-item>

            <!-- <el-menu-item>
              <i class="fa fa-search"></i>
            </el-menu-item> -->

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
                <i class="iconfont icon-me pr-2 mr-1 pl-2 fs-lg"></i>
                我的主页
              </el-menu-item>

              <el-menu-item @click="logout">
                <i class="fa fa-remove pl-2 pr-3 fs-lg"></i> 退出</el-menu-item
              >
            </el-submenu>

            <el-submenu
              :index="`store`"
              :show-timeout="0"
              :hide-timeout="0"
              class="xs"
            >
              <template slot="title">
                <el-button type="text">创建</el-button>
              </template>

              <el-menu-item :span="4" class="write ml-3" index="/post">
                <i class="iconfont  pr-3  icon-nav2 fs-xm"></i>
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
            <el-menu-item v-if="$store.state.UserNotExist" class="xm">
              <el-button
                @click="$store.commit('toggleLoginForm'), (isRegister = true)"
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

    <sq-navigation></sq-navigation>

    <el-dialog
      :title="isRegister ? '注册' : '登录'"
      :visible="$store.state.loginFormVisible"
      @close="closeLoginForm"
      custom-class="login"
      style="margin: 0 auto"
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
        <el-form-item
          :label-width="formLabelWidth"
          class="pt-2"
          label="验证码"
          prop="verification"
        >
          <el-input
            v-model="RegisterDto.verification"
            placeholder="验证码"
            autocomplete="off"
          >
            <el-button slot="append" type="primary" @click="getCode">{{
              this.$store.state.time !== 0
                ? this.$store.state.time + 's后再次获取'
                : '获取验证码'
            }}</el-button>
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
        <el-form-item :label-width="formLabelWidth" label="账号">
          <el-input
            v-model="LoginDto.account"
            height="10"
            placeholder="手机号/昵称"
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
            <div class="text-center">
              <el-tooltip
                class="item "
                effect="dark"
                content="微博登录"
                placement="bottom"
              >
                <a :href="url.weibo_url" class="fs-lg fa fa-weibo text-red"></a>
              </el-tooltip>
              <el-tooltip
                class="item px-2"
                effect="dark"
                content="QQ登录(暂时不可用)"
                placement="bottom"
              >
                <a :href="url.weibo_url" class=" fa fa-qq text-blue"></a>
              </el-tooltip>
              <el-tooltip
                class="item "
                effect="dark"
                content="Github登录"
                placement="bottom"
              >
                <a
                  :href="url.github_url"
                  class="fs-lg fa fa-github text-dark"
                ></a>
              </el-tooltip>
            </div>
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
import { Meta } from '@sophosoft/vue-meta-decorator'
import navigation from '~/components/BottomNavigation/navigation.vue'

@Component({
  components: { 'sq-navigation': navigation }
})
export default class Home extends Vue {
  @Meta
  getMetaInfo() {
    return {
      title: '思趣'
    }
  }
  isRegister: boolean = false

  topRadio = 'message'
  notifies = ''
  search = ''
  url = {}
  // 绑定第三方账号用
  uid = ''
  formLabelWidth: string = '120'
  userLetters = []
  visible: boolean = false
  bakendCode = '123456'
  phoneRegisted = false

  @Watch('isRegister')
  isVisible(newval: any, oldval: any) {
    if (!newval) {
      this.resetForm()
    }
  }

  actionTransFomer(action: any) {
    if (
      action.to_Post !== null &&
      action.to_Post.type === 'question' &&
      action.type === 'commentpost'
    ) {
      return '评论了问题'
    } else {
      switch (action.type) {
        case 'likepost':
          return '点赞了文章'
        case 'followque':
          return '关注了问题'

        case 'followuser':
          return '关注了用户'
        case 'commentpost':
          return '评论了文章'

        case 'createpost':
          return '发布了文章'

        case 'adoptanswer':
          return '采纳了答案'
        case 'bookmarkpost':
          return '收藏了文章'
        case 'privateletter':
          return '私信了'
        default:
          break
      }
    }
  }

  link(action: any) {
    if (action.to_Post.type === 'question') {
      return '/q/'
    } else {
      switch (action.type) {
        case 'likepost':
          return '/p/'
        case 'followque':
          return '/q/'
        case 'followuser':
          return '关注了用户'
        case 'privateletter':
          return '私信了用户'
        case 'commentpost':
          return '/p/'
        case 'createpost':
          return '/p/'
        case 'adoptanswer':
          return '/q/'
        case 'bookmarkpost':
          return '/p/'
        default:
          break
      }
    }
  }

  // @Watch('topRadio')
  // isRadioChanged(newval: any, oldval: any) {
  //   if (newval === 'letter') {
  //     this.fetchUserLetter()
  //   }
  // }

  get hasNewMessage() {
    let hasNew = false
    this.userLetters.map((e: any) => {
      if (e.is_read !== 1) {
        hasNew = true
      }
    })
    return hasNew
  }

  get isUser() {
    return !this.$store.state.UserNotExist
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
  async validatePhone(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入手机号'))
    }

    if (this.phoneLength(value)) {
      const res = await this.$http.get(`users/${value}/validate`)
      if (res.data) {
        callback(new Error('该手机号已被注册'))
        this.phoneRegisted = true
      } else {
        this.phoneRegisted = false
        callback()
      }
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
      callback(new Error('密码必须包含数字、字母，区分大小写'))
    }
  }

  validateCode(rule: any, value: any, callback: any) {
    if (value === this.$store.state.bakendCode) {
      callback()
    } else if (value !== this.$store.state.bakendCode && value !== '') {
      callback(new Error('验证码不匹配'))
    }
    if (value === '') {
      callback(new Error('请输入验证码'))
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
    password: '',
    uid: '',
    verification: ''
  }

  LoginDto = {
    account: '',
    password: '',
    thirdpart: false,
    uid: ''
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
    ],
    verification: [
      { required: true, validator: this.validateCode, trigger: 'blur' }
    ]
  }

  mounted() {
    setTimeout(() => {
      if (this.isUser) {
        this.fetchUserLetter()
      }
    }, 300)

    this.getUrl()

    if (this.code) {
      this.signToken()
    }
    setTimeout(() => {
      this.startClock()
    }, 1000)
  }

  get code() {
    return this.$route.query.code
  }

  async signToken() {
    let res: any

    if (this.$route.query.git !== undefined) {
      res = await this.$http.get(`/auth/${this.code}/signToken?thirdpart=git`)
    }

    if (this.$route.query.weibo !== undefined) {
      res = await this.$http.get(`/auth/${this.code}/signToken?thirdpart=weibo`)
    }
    if (res.data.allowThirdpartLogin) {
      this.LoginDto.thirdpart = true
      this.LoginDto.uid = res.data.id
      this.login()
    } else {
      this.$notify({
        title: '成功',
        message: '只差最后一步，完成注册绑定您的帐号',
        type: 'success',
        duration: 0
      })
      this.isRegister = true
      this.RegisterDto.name = res.data.name
      this.RegisterDto.uid = res.data.uid
      this.RegisterDto.phonenumber = ''
      this.RegisterDto.password = ''
    }
  }

  async getUrl() {
    const res = await this.$http.get('/auth/url')

    this.url = res.data
  }

  closeLoginForm() {
    this.$store.commit('closeLoginForm')
  }

  startClock() {
    if (this.$store.state.time > 0) {
      const settime = setInterval(() => {
        this.$store.commit('timeDcre', 1)
        if (this.$store.state.time <= 0) {
          clearTimeout(settime)
        }
      }, 1000)
    }
  }
  // 短信验证码
  getCode() {
    if (this.$store.state.time === 0 && !this.phoneRegisted) {
      const ref: any = this.$refs.RegisterDto
      ref.validate(async (valid: any, index: any) => {
        if (index.phonenumber === undefined) {
          const data = { phonenumber: this.RegisterDto.phonenumber }
          const res = await this.$http.post('auth/code', data)
          this.$store.commit('setTime', 60)
          this.startClock()
          this.$store.commit('setCode', JSON.stringify(res.data))
        }
      })
    }
  }

  login() {
    const ref: any = this.$refs.LoginDto
    ref.validate(async (valid: any) => {
      if (valid) {
        await this.$auth.loginWith('local', { data: this.LoginDto })

        this.$store.commit('UserExist')
        this.$store.commit('closeLoginForm')
        this.LoginDto.account = ''
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
      if (valid && !this.RegisterDto.uid) {
        await this.$http.post('/users', this.RegisterDto)
        this.$notify({
          title: '',
          type: 'success',
          message: '注册成功'
        })
        this.isRegister = false
      } else if (valid && this.RegisterDto.uid) {
        await this.$http.post('/users', this.RegisterDto)
        this.$notify({
          title: '',
          type: 'success',
          message: '账号绑定成功'
        })
        this.LoginDto.account = this.RegisterDto.name
        this.LoginDto.password = this.RegisterDto.password
        this.login()
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

  // async show() {
  //   if (this.isUser) {
  //     const res = await this.$http.get('/notification')
  //     this.notifies = res.data
  //   }
  // }

  async fetchUserLetter() {
    if (this.isUser) {
      const res = await this.$http.get(
        `/notification/${this.$store.state.auth.user.id}`
      )
      this.userLetters = res.data
    }
  }

  async markedRead() {
    if (this.isUser) {
      await this.$http.get(
        `/notification/${this.$store.state.auth.user.id}/marked`
      )
      this.userLetters.map((e: any) => {
        e.is_read = 1
      })
    }
  }

  dataSearch() {
    this.$router.push(`/search/${this.search}`)
    this.search = ''
  }

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

.login {
  max-width: 450px;
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

// .el-popover {
//   padding: 0 !important;
// }

.el-menu-item * {
  vertical-align: unset !important;
}
.el-menu-item:nth-child(1) {
  padding-left: 10px !important;
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

//首页红点
.el-badge__content.is-fixed {
  top: 18px !important;
  right: 11px !important;
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
