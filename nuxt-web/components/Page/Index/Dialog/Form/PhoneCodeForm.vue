<template>
  <v-card-text v-if="status.show">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" xs="12">
            <v-text-field ref="loginCode" :rules="rules.loginCode" v-model="phoneCodeModel.loginCode" label="手机号">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12" xs="12">
            <v-text-field :rules="rules.verification" v-model="phoneCodeModel.verification" label="验证码">
              <v-btn slot="append" @click.stop @click="renderBox" text>{{
                this.$store.state.time !== 0 ? this.$store.state.time + 's后再次获取' : '获取验证码'
              }}</v-btn>
            </v-text-field>
          </v-col>
          <v-btn @click="status.show = !status.show" text class="pointer">
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

  valid = true
  showcbox = false

  rules = {
    loginCode: [(val) => (/^[1][3,4,5,7,8][0-9]{9}$/.test(val) && val.length === 11) || `I don't believe you!`],
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

  async successCallback(authenticate: string, token: string) {
    const res = await this.$http.post(`/auth/retranVerify`, {
      authenticate,
      token,
      loginCode: this.phoneCodeModel.loginCode
    })
  }
}
</script>

<style lang="scss" scoped></style>
