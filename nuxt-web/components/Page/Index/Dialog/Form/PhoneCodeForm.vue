<template>
  <v-form ref="loginForm">
    <h1>{{ constant[type].name }}</h1>
    <SocialForm></SocialForm>
    <span>{{ constant[type].desc }}</span>
    <v-text-field
      v-if="type == 'register'"
      v-model="phoneCodeModel.username"
      hide-details="auto"
      :rules="rules.username"
      label="取个好听的名字吧"
    >
    </v-text-field>

    <v-text-field v-model="phoneCodeModel.phoneNumber" hide-details="auto" :rules="rules.phoneNumber" label="手机号">
    </v-text-field>
    <v-text-field v-model="phoneCodeModel.verification" hide-details="auto" :rules="rules.verification" label="验证码">
      <v-btn slot="append" :disabled="disabled" text @click.stop @click="verifyAndSendCode">{{ btnText }}</v-btn>
    </v-text-field>

    <div class="action pt-6">
      <v-btn :disabled="!valid" block :loading="loading" @click="emitLoginEvent()">
        {{ constant[type].btnName }}
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'
import { sendCode, checkExist } from '@/api/auth'
import { phoneLength } from '@/plugins/utils.js'
@Component({})
export default class PhoneCodeForm extends Vue {
  @Prop()
  type

  @Prop()
  loading

  constant = {
    register: {
      name: '注册用户',
      desc: '手机快捷注册',
      btnName: '注册'
    },
    login: {
      name: '登录',

      desc: '手机快捷登录',
      btnName: '登录'
    }
  }

  valid = true
  disabled = false

  phoneCodeModel: any = {}
  btnText = '获取验证码'
  rules = {
    phoneNumber: [(val) => (/^[1][3,4,5,7,8][0-9]{9}$/.test(val) && val.length === 11) || `请输入手机号码`],
    verification: [(val) => (val && val.length === 6) || '请输入6位验证码'],
    username: [(val) => (val && val.length < 14) || '小主的名字不太好记哦']
  }

  async verifyAndSendCode() {
    const { phoneNumber } = this.phoneCodeModel
    if (phoneLength(phoneNumber)) {
      const res = await checkExist({ phoneNumber })
      // 注册界面，用户已存在
      if (this.type === 'register' && res.respCode === 100) {
        this.$notify({ text: '小主，您的手机号已经注册过了哦' })
        this.$emit('changeForm')
        return
      }
      // 登录界面，用户不存在
      if (this.type === 'login' && res.respCode === 101) {
        this.$notify({ text: '小主，您还未注册哦' })
        this.$emit('changeForm')
        return
      }
      this.triggerCode()
      sendCode({ phoneNumber })
    }
  }

  $refs: any
  emitLoginEvent() {
    if (this.$refs.loginForm.validate()) {
      this.$emit('verifyLogin', this.phoneCodeModel)
    }
  }

  triggerCode() {
    this.disabled = true

    let i = 60
    const timer = setInterval(() => {
      this.btnText = i + 's后再次获取'
      i--
      if (i < 0) {
        this.disabled = false
        this.btnText = '获取验证码'
        clearInterval(timer)
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped></style>
