<template>
  <v-card-text>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" xs="12">
            <v-text-field v-model="loginCodeModel.loginCode" :rules="rules.loginCode" label="账号" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12" xs="12">
            <v-text-field
              v-model="loginCodeModel.password"
              :rules="rules.password"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              autocomplete="true"
              label="输入密码"
              passw
              hint="至少6个字符"
              counter
              @click:append="showPass = !showPass"
            >
            </v-text-field>
          </v-col>
          <v-btn text class="pointer" @click="status.show = !status.show">
            手机快捷登录
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <slot :valid="valid"></slot>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'nuxt-property-decorator'
@Component({})
export default class PasswordForm extends Vue {
  @Model('value', {})
  status

  showPass = false
  valid = true
  @Prop()
  loginCodeModel

  rules = {
    loginCode: [(val) => (val && val.length === 11) || `I don't believe you!`],
    password: [(val) => (val && val.length >= 6) || '请输入密码']
  }
}
</script>

<style lang="scss" scoped></style>
