<template>
  <div id="app" class="font-songti">
    <router-view :key="$route.path"></router-view>
    <el-backtop target="#app" :visibility-height="100"></el-backtop>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  mounted() {
    this.fetchuser();
    window.addEventListener("unload", this.saveState);
  }

  async fetchuser() {
    if (this.$store.state.UserNotExist == false) {
      const res = await this.$http.get("users");
      this.$store.state.userName = res.data.name;
      this.$store.state.userId = res.data.id;
      this.$store.state.userCreated = res.data.created;
      this.$store.state.myFollowers = res.data.follows.length;

      this.$store.state.userAvator = res.data.avator[0].url;

      const personal = [
        {
          city: res.data.city,
          school: res.data.school,
          organization: res.data.organization,
          website: res.data.website
        }
      ];

      this.$store.state.personalData = personal;
    }
  }

  //刷新保存状态
  saveState() {
    localStorage.setItem("state", JSON.stringify(this.$store.state));
  }
}
</script>

<style lang="scss">
.el-avatar > img {
  object-fit: cover;
  width: 100%;
}
.el-menu-item * {
  vertical-align: unset !important;
}
.article img {
  justify-content: center;
  display: flex;
  max-width: -webkit-fill-available;
  margin: 0.667em 0;
}

.el-popover {
  height: 440px !important;

  .el-radio-button__inner {
    padding-left: 50px !important;
    padding-right: 50px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
}

.write {
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
