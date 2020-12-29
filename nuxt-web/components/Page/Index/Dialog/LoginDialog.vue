<template>
  <v-dialog v-model="$store.state.loginFormVisible" persistent max-width="400" style="background-color:white">
    <v-card :loading="loading" class="pb-3">
      <template slot="progress">
        <v-progress-linear color="blue" height="5" indeterminate></v-progress-linear>
      </template>

      <v-toolbar flat dark color="primary">
        <v-toolbar-title>用户登录</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark right @click="closeLoginForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-window v-model="status.show">
        <v-window-item :value="true">
          <PhoneCodeForm v-model="status" :phone-code-model="phoneCodeModel">
            <template v-slot:default="{ valid }">
              <v-card-actions>
                <v-btn :disabled="!valid" block color="success darken-1" @click="loginByPhoneCode(valid)">
                  登录
                </v-btn>
              </v-card-actions>
            </template></PhoneCodeForm
          >
        </v-window-item>
        <v-window-item :value="false">
          <PasswordForm v-model="status" :login-code-model="loginCodeModel">
            <template v-slot:default="{ valid }">
              <v-card-actions>
                <v-btn :disabled="!valid" block color="success darken-1" @click="loginByPass(valid)">
                  密码登录
                </v-btn>
              </v-card-actions>
            </template>
          </PasswordForm>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
/* eslint-disable */
export default class LoginDialog extends Vue {
  loading = false
  status = {
    show: true
  }

  phoneCodeModel = {}
  loginCodeModel = {}
  mounted() {}

  closeLoginForm() {
    this.$store.commit('closeLoginForm')
  }
  // 通过验证码登录
  async loginByPhoneCode(valid) {
    if (valid) {
      this.loading = true
      const res = await this.$store.dispatch('modules/user/LoginByCode', this.phoneCodeModel)
      if (res.respCode === 1) {
        setTimeout(() => {
          this.closeLoginForm()
          this.loading = false
        }, 500)
      }
    }
  }
  // 通过账号密码登录
  async loginByPass(valid) {
    if (valid) {
      this.loading = true
      const res = await this.$store.dispatch('modules/user/Login', this.loginCodeModel)
      if (res.respCode === 1) {
        setTimeout(() => {
          this.closeLoginForm()
          this.loading = false
        }, 500)
      }
    }
  }
  logout() {
    this.$router.push('/')
  }
}
</script>

<style lang="scss">
//登录相关
</style>
