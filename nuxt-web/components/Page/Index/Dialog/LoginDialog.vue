<template>
  <v-dialog v-model="$store.state.loginFormVisible" persistent max-width="400" style="background-color:white">
    <v-card :loading="loading" class="pb-3">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>

      <v-toolbar flat dark color="primary">
        <v-toolbar-title>用户登录</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="closeLoginForm" icon dark right>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <PhoneCodeForm :phoneCodeModel="phoneCodeModel" v-model="status">
        <template v-slot:default="{ valid }">
          <v-card-actions>
            <v-btn :disabled="!valid" @click="login" block color="success darken-1">
              登录
            </v-btn>
          </v-card-actions>
        </template></PhoneCodeForm
      >
      <PasswordForm :loginCodeModel="loginCodeModel" v-model="status">
        <template v-slot:default="{ valid }">
          <v-card-actions>
            <v-btn :disabled="!valid" @click="loginByPass(valid)" block color="success darken-1">
              密码登录
            </v-btn>
          </v-card-actions>
        </template>
      </PasswordForm>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
/* eslint-disable */
export default class Login extends Vue {
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
  login() {}
  // 通过账号密码登录
  loginByPass(valid) {
    if (valid) {
      this.$store.dispatch('modules/user/Login', this.loginCodeModel)
    }
    this.$store.commit('closeLoginForm')
  }
  logout() {
    this.$router.push('/')
  }
}
</script>

<style lang="scss">
//登录相关
</style>
