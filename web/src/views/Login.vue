<template>
  <div class="sign">
    <div class="logo">抒写</div>
    <div class="main" v-if="show">
      <div class="title d-flex jc-center">
        <el-button type="primary" @click="show=true">登录</el-button>
        <el-button type="primary" @click="show=false">注册</el-button>
      </div>
      <el-form :model="model" label-width="0">
        <el-form-item label>
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="main" v-else>
      <div class="title d-flex jc-center">
        <el-button type="primary" @click="show=true">登录</el-button>
        <el-button type="primary" @click="show=false">注册</el-button>
      </div>
      <el-form :model="model" label-width="0">
        <el-form-item label>
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Login extends Vue {
  model: any = {};
  show: boolean = true;
  viewChange() {
    this.show = !this.show;
  }
  async onLogin() {
    const res = await this.$http.post("/auth/login", this.model);
    localStorage.token = res.data.token;
    this.$router.push("/");
  }

  async onRegister() {
    const res = await this.$http.post("/users", this.model);
    this.$router.push("/login");
  }
}
</script>

<style lang="scss" scoped>
.sign {
  height: 100vh;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
  &::before {
    content: "";
    display: inline-block;
    height: 35%;
    vertical-align: middle;
  }
}
.logo {
  position: absolute;
  top: 56px;
  margin-left: 50px;
}
.main {
  width: 400px;
  margin: 60px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  display: inline-block;
}
</style>