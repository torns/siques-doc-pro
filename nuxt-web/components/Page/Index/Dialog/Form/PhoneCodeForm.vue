<template>
  <v-form ref="loginForm">
    <h1>{{ name }}</h1>
    <SocialForm></SocialForm>
    <span>{{ desc }}</span>
    <v-text-field v-model="phoneCodeModel.loginCode" :rules="rules.loginCode" label="手机号"> </v-text-field>
    <v-text-field v-model="phoneCodeModel.verification" :rules="rules.verification" label="验证码">
      <v-btn slot="append" :disabled="disabled" text @click.stop @click="verifyAndSendCode">{{ btnText }}</v-btn>
    </v-text-field>

    <div class="action">
      <v-btn color="mt-5" block :loading="loading" @click="emitLoginEvent()">
        {{ btnName }}
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'
import { verifyAndSendCode } from '@/api/auth'
import { phoneLength } from '@/plugins/utils.js'
@Component({})
export default class PhoneCodeForm extends Vue {
  @Prop()
  name

  @Prop()
  desc

  @Prop()
  btnName

  @Prop()
  loading

  disabled = false

  phoneCodeModel: any = {}
  btnText = '获取验证码'
  rules = {
    loginCode: [(val) => (/^[1][3,4,5,7,8][0-9]{9}$/.test(val) && val.length === 11) || `请输入手机号码`],
    verification: [(val) => (val && val.length === 6) || '请输入6位验证码']
  }

  verifyAndSendCode() {
    const { loginCode } = this.phoneCodeModel
    if (phoneLength(loginCode)) {
      this.triggerCode()
      verifyAndSendCode({ loginCode })
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
