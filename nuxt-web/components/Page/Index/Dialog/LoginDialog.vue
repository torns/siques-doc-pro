<template>
  <v-dialog v-model="$store.state.loginFormVisible" style="background-color:white">
    <div id="login">
      <div :class="`container ${signIn ? 'right-panel-active' : ''}`" id="container">
        <div class="form-container sign-up-container">
          <PhoneCodeForm
            name="注册用户"
            desc="手机快捷注册"
            btnName="注册"
            :loading="loading"
            @verifyLogin="loginByPhoneCode"
          ></PhoneCodeForm>
        </div>
        <div class="form-container sign-in-container">
          <PhoneCodeForm
            name="登录"
            :loading="loading"
            @verifyLogin="loginByPhoneCode"
            desc="手机快捷登录"
            btnName="登录"
          ></PhoneCodeForm>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>欢迎回来!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <div class="action">
                <v-btn @click="signIn = !signIn" class="ghost" id="signIn">
                  登录
                </v-btn>
              </div>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>你好，朋友!</h1>
              <p>Enter your personal details and start journey with us</p>
              <div class="action">
                <v-btn @click="signIn = !signIn" class="ghost" id="signUp">
                  注 册
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
/* eslint-disable */
export default class LoginDialog extends Vue {
  loading = false

  signIn = false

  closeLoginForm() {
    this.$store.commit('closeLoginForm')
  }
  // 通过验证码登录
  async loginByPhoneCode(model) {
    this.loading = true
    const res = await this.$store.dispatch('modules/user/LoginByCode', model)
    if (res.respCode === 1) {
      this.closeLoginForm()
    }
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

<style lang="scss">
#login .v-input__control {
  width: 300px !important;
}

#login .v-input {
  flex: initial;
}

#login h1 {
  font-weight: bold;
  margin: 0;
}

#login h2 {
  text-align: center;
}

#login p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

#login span {
  font-size: 12px;
}

#login a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

#login .action button {
  border-radius: 20px;
  border: 1px solid #4caf50;
  background-color: #4caf50;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

#login .action button:active {
  transform: scale(0.95);
}

#login .action button:focus {
  outline: none;
}

#login .action button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

#login form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

// #login input {
//   background-color: #eee;
//   border: none;
//   padding: 12px 15px;
//   margin: 8px 0;
//   width: 100%;
// }

#login .container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

#login .form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

#login .sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

#login .container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

#login .sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

#login .container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

#login .overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

#login .container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

#login .overlay {
  background: #4caf50;
  background: -webkit-linear-gradient(to right, #009688, #4caf50);
  background: linear-gradient(to right, #009688, #4caf50);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

#login .container.right-panel-active .overlay {
  transform: translateX(50%);
}

#login .overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

#login .overlay-left {
  transform: translateX(-20%);
}

#login .container.right-panel-active .overlay-left {
  transform: translateX(0);
}

#login .overlay-right {
  right: 0;
  transform: translateX(0);
}

#login .container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

#login footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

#login footer p {
  margin: 10px 0;
}

#login footer i {
  color: red;
}

#login footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
