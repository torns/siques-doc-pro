<template>
  <v-card-text v-if="!status.show">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" xs="12">
            <v-text-field :rules="rules.loginCode" v-model="loginCodeModel.loginCode" label="账号" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="12" xs="12">
            <v-text-field
              :rules="rules.password"
              v-model="loginCodeModel.password"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              autocomplete="true"
              label="输入密码"
              passw
              hint="至少6个字符"
              counter
            >
            </v-text-field>
          </v-col>
          <v-btn @click="status.show = !status.show" text class="pointer">
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
