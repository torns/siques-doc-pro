<template>
  <el-dialog
    id="login"
    :title="loginModel.thirdpart == true ? '绑定手机号' : '登录'"
    :visible="$store.state.loginFormVisible"
    @close="closeLoginForm"
    custom-class="login"
    style="margin: 0 auto"
    width="90%"
  >
    <div class="pt-3">
      <!--  -->
      <el-form
        ref="loginByAccountModel"
        v-show="loginByAccount"
        :model="loginByAccountModel"
        :rules="rules"
        status-icon
      >
        <el-form-item :label-width="formLabelWidth" class="pb-2" prop="account">
          <el-input
            v-model.number="loginByAccountModel.account"
            height="10"
            placeholder="输入手机号"
            autocomplete="off"
          >
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pb-2" prop="password">
          <el-input v-model="loginByAccountModel.password" show-password placeholder="输入密码" autocomplete="off">
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
        <div
          class="point"
          style="float:right;padding-bottom:15px"
          v-if="loginByAccount"
          @click="loginByAccount = false"
        >
          手机快捷登录
        </div>
      </el-form>

      <el-form ref="loginModel" :model="loginModel" :rules="rules" v-show="!loginByAccount" status-icon>
        <el-form-item :label-width="formLabelWidth" prop="account">
          <el-input v-model="loginModel.account" height="10" placeholder="请输入手机号" autocomplete="off">
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" class="pt-2" prop="verification">
          <el-input
            :class="isPhoneValid ? 'login-button--active' : ''"
            v-model="loginModel.verification"
            placeholder="请输入6位验证码"
            autocomplete="off"
          >
            <el-button slot="append" @click="getCode">{{
              this.$store.state.time !== 0 ? this.$store.state.time + 's后再次获取' : '获取验证码'
            }}</el-button>
          </el-input>
        </el-form-item>

        <!-- <el-form-item :label-width="formLabelWidth" class="pt-2" label="密码">
          <el-input v-model="loginModel.password" show-password placeholder="请输入密码" autocomplete="off">
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item> -->

        <div
          class=" point"
          style="float:right;padding-bottom:15px"
          v-if="!loginByAccount"
          @click="loginByAccount = true"
        >
          账号密码登录
        </div>
      </el-form>
    </div>

    <div class="pt-3 el-form">
      <div class="dialog-footer pb-2">
        <el-button
          @click="loginByAcc"
          v-if="loginByAccount"
          type="success"
          :class="isPhoneValid && isPassValid ? 'login-button--active' : ''"
          >登录</el-button
        >
        <el-button
          v-else
          @click="login"
          type="success"
          :class="isPhoneValid && isCodeValid ? 'login-button--active' : ''"
          >登录</el-button
        >
      </div>

      <div class="dialog-footer d-flex flex-column">
        <div class="py-4">
          <el-divider content-position="center">更多登录方式</el-divider>
          <div class="text-center">
            <el-tooltip class="item " effect="dark" content="微博登录" placement="bottom">
              <a :href="url.weibo_url" class="fs-lg fa fa-weibo text-red"></a>
            </el-tooltip>
            <el-tooltip class="item px-2" effect="dark" content="QQ登录(暂时不可用)" placement="bottom">
              <a :href="url.weibo_url" class=" fa fa-qq text-blue"></a>
            </el-tooltip>
            <el-tooltip class="item " effect="dark" content="Github登录" placement="bottom">
              <a :href="url.github_url" class="fs-lg fa fa-github text-dark"></a>
            </el-tooltip>
          </div>
        </div>
        <!-- <el-button v-if="loginByAccount" @click="loginByAccount = false" type="message">已有账号登录</el-button>
        <el-button v-else  type="message">账号密码登录</el-button> -->
      </div>
      <div class="pt-2 text-center" style="margin-bottom:-10px">
        继续即表示同意
        <a href="#">《服务条款》</a>和
        <a href="#">《隐私政策》</a>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
// import cbox from './cbox/index'
@Component({})
/* eslint-disable */
export default class Login extends Vue {
  // head() {
  //   return {
  //     script: [{ src: 'https://www.yunpian.com/static/official/js/libs/riddler-sdk-0.2.2.js' }]
  //   }
  // }

  loginByAccount: boolean = false

  url = {}
  // 绑定第三方账号用
  uid = ''
  formLabelWidth: string = '120'

  phoneRegisted = false

  mounted() {
    // cbox()
    this.getUrl()

    if (this.code) {
      this.signToken()
    }
    setTimeout(() => {
      this.startClock()
    }, 1000)
  }

  @Watch('loginByAccount')
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

  isPhoneValid = false
  isCodeValid = false
  isPassValid = false
  async validatePhone(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入手机号'))
      this.isPhoneValid = false
    }

    if (this.phoneLength(value)) {
      // const res = await this.$http.get(`users/${value}/validate`)
      // if (res.data) {
      //   callback(new Error('该手机号已被注册'))
      //   this.phoneRegisted = true
      // } else {
      //   this.phoneRegisted = false
      //   callback()
      // }
      this.isPhoneValid = true
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
      this.isPhoneValid = false
    }
  }

  validatePass(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入密码'))
      this.isPassValid = false
    }

    if (this.charLength(value)) {
      callback()
      this.isPassValid = true
    } else {
      callback(new Error('密码太短啦'))
      this.isPassValid = false
    }
  }

  validateCode(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入验证码'))
    }

    if (this.number(value) && value.length == 6) {
      callback()
      this.isCodeValid = true
    } else {
      callback(new Error('验证码为6位数字'))
    }
  }

  validateName(rule: any, value: any, callback: any) {
    if (value === '') {
      callback(new Error('请输入昵称'))
    }
  }

  loginByAccountModel = {
    account: '',
    password: ''
  }

  loginModel = {
    account: '',
    name: '',
    password: '',
    thirdpart: false,
    uid: '',
    verification: ''
  }

  rules = {
    // name: [
    //   { required: true, message: '请输入姓名', trigger: 'blur' },
    //   { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    //   {
    //     required: true,
    //     pattern: /^[\u4E00-\u9FA5_a-zA-Z0-9.·-]+$/,
    //     message: '姓名不支持特殊字符',
    //     trigger: 'blur'
    //   }
    // ],
    account: [{ required: true, validator: this.validatePhone }],
    password: [{ required: true, validator: this.validatePass }],
    verification: [{ required: true, validator: this.validateCode }]
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

    this.loginModel.thirdpart = true
    this.loginModel.uid = res.data.uid
    this.loginModel.name = res.data.name
    if (res.data.allowThirdpartLogin) {
      // 数据库已存在第三方绑定用户，直接登录

      await this.$auth.loginWith('local', { data: this.loginModel })

      this.$store.commit('UserExist')
      this.$store.commit('closeLoginForm')
    } else {
      // 需要绑定手机号码

      this.loginByAccount = false
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
          this.$store.state.time = 0
        }
      }, 1000)
    }
  }
  // 获取短信验证码
  getCode() {
    // console.log(123)
    if (this.$store.state.time === 0) {
      const ref: any = this.$refs.loginModel
      ref.validate(async (valid: any, index: any) => {
        if (this.isPhoneValid) {
          const data = { account: this.loginModel.account }
          const res = await this.$http.post('auth/code', data)
          this.$store.commit('setTime', 30)
          this.startClock()
        }
      })
    }
  }

  login() {
    const ref: any = this.$refs.loginModel
    ref.validate(async (valid: any) => {
      if (valid) {
        await this.$auth.loginWith('local', { data: this.loginModel })

        this.$store.commit('UserExist')
        this.$store.commit('closeLoginForm')
        // this.loginModel.account = ''
      } else {
        // eslint-disable-next-line
        console.log('error submit!!')
        return false
      }
    })
  }

  // 通过账号密码登录
  loginByAcc() {
    const ref: any = this.$refs.loginByAccountModel
    ref.validate(async (valid: any) => {
      if (valid) {
        await this.$auth.loginWith('local', { data: this.loginByAccountModel })
        this.$store.commit('UserExist')
        this.$store.commit('closeLoginForm')
      }
    })
  }

  resetForm() {
    // const ref: any = this.$refs.RegisterDto
    // ref.resetFields()
  }

  logout() {
    // this.$store.commit('toggleBanner')
    this.$store.commit('toggleUser')

    this.$notify({
      title: '成功',
      type: 'success',
      message: '退出登录成功 '
    })
    this.$router.push('/')
  }
}
</script>

<style lang="scss">
//登录相关

.login-button--active .el-input-group__append {
  background-color: #27282d !important;
  color: #fff !important;
}

.login-button--active.el-button--success {
  color: #fff !important;
  background-color: #67c23a !important;
  border-color: #b3e19d;
}

#login .el-button--success {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}

#login .el-form {
  width: 290px !important;
  margin: 0 auto;
  input {
    height: 35px;
  }
}

#login .login {
  max-width: 400px;
}

#login .el-form-item__label {
  line-height: 20px !important;
}
#login .el-dialog__header {
  background-color: whitesmoke;
}
#login .el-form-item {
  margin-bottom: 10px !important;
}
#login .dialog-footer .el-button {
  padding: 9px 0 !important;
  width: 290px !important;
}
#login .el-dialog__body {
  padding: 30px 20px 50px 20px;
}
</style>
