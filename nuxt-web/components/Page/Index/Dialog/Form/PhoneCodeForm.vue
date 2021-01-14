<template>
  <v-card-text>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" xs="12">
            <v-text-field ref="loginCode" v-model="phoneCodeModel.loginCode" :rules="rules.loginCode" label="手机号">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12" xs="12">
            <v-text-field v-model="phoneCodeModel.verification" :rules="rules.verification" label="验证码">
              <v-btn slot="append" :disabled="disabled" text @click.stop @click="renderBox">{{ btnText }}</v-btn>
            </v-text-field>
          </v-col>
          <v-btn text class="pointer" @click="status.show = !status.show">
            账号密码登录
          </v-btn>
        </v-row>
      </v-container>
      <v-dialog v-model="showcbox" class="cbox" title="" width="300px">
        <div id="cbox"></div>
      </v-dialog>
    </v-form>
    <slot :valid="valid"></slot>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'nuxt-property-decorator'
import { verifyAndSendCode } from '@/api/user'
import cbox from './cbox/index'
@Component({})
export default class PhoneCodeForm extends Vue {
  @Model('value')
  status

  @Prop({
    default: () => {
      return {}
    }
  })
  phoneCodeModel

  btnText = '获取验证码'
  disabled = false
  triggerCode() {
    this.disabled = true
    this.showcbox = false
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

  valid = true
  showcbox = false

  rules = {
    loginCode: [(val) => (/^[1][3,4,5,7,8][0-9]{9}$/.test(val) && val.length === 11) || `请输入手机号码`],
    verification: [(val) => (val && val.length === 6) || '请输入6位验证码']
  }

  $refs: any
  renderBox() {
    if (this.$refs.loginCode.valid) {
      this.showcbox = true
      this.$nextTick(() => {
        cbox(this.successCallback)
      })
    }
  }

  successCallback(authenticate: string, token: string) {
    this.triggerCode()
    verifyAndSendCode({ authenticate, token, loginCode: this.phoneCodeModel.loginCode })
  }
}
</script>

<style lang="scss" scoped></style>
