<template>
  <el-dialog id="login" :title="isRegister ? '注册' : '登录'" :visible="$store.state.loginFormVisible" @close="closeLoginForm" custom-class="login" style="margin: 0 auto" width="90%">
    <div>
      <el-form ref="RegisterDto" v-show="isRegister" :model="RegisterDto" :rules="rules" status-icon>
        <el-form-item :label-width="formLabelWidth" class="pb-2" label="你的名字" prop="name">
          <el-input v-model="RegisterDto.name" height="10" placeholder="常用昵称" autocomplete="off" clearable>
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pb-2" label="手机号" prop="phonenumber">
          <el-input v-model.number="RegisterDto.phonenumber" :maxlength="11" height="10" placeholder="11位手机号" autocomplete="off">
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pb-2" label="密码" prop="password">
          <el-input v-model="RegisterDto.password" show-password placeholder="不少于7位" autocomplete="off">
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pt-2" label="验证码" prop="verification">
          <el-input v-model="RegisterDto.verification" placeholder="验证码" autocomplete="off">
            <el-button slot="append" @click="getCode" type="primary">{{ this.$store.state.time !== 0 ? this.$store.state.time + 's后再次获取' : '获取验证码' }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <el-form ref="LoginDto" :model="LoginDto" :rules="rules" v-show="!isRegister" status-icon>
        <el-form-item :label-width="formLabelWidth" label="账号">
          <el-input v-model="LoginDto.account" height="10" placeholder="手机号/昵称" autocomplete="off">
            <i slot="prefix" class="el-icon-user-solid pl-1"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" class="pt-2" label="密码">
          <el-input v-model="LoginDto.password" show-password placeholder="请输入密码" autocomplete="off">
            <i slot="prefix" class="el-icon-paperclip pl-1"></i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="pt-2 el-form">
      <div class="dialog-footer pb-2">
        <el-button @click="register" v-if="isRegister" type="success">注册</el-button>
        <el-button @click="login" v-else type="success">登录</el-button>
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
        <el-button v-if="isRegister" @click="isRegister = false" type="message">已有账号登录</el-button>
        <el-button v-else @click="isRegister = true" type="message">注册新账号</el-button>
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
@Component({})
export default class Login extends Vue {
  isRegister: boolean = false

  url = {}
  // 绑定第三方账号用
  uid = ''
  formLabelWidth: string = '120'
  bakendCode = '123456'
  phoneRegisted = false

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
    phonenumber: [{ required: true, validator: this.validatePhone, trigger: 'blur' }],
    password: [{ required: true, validator: this.validatePass, trigger: 'blur' }],
    verification: [{ required: true, validator: this.validateCode, trigger: 'blur' }]
  }

  mounted() {
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
