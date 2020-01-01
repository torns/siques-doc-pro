<template>
  <div class="contanier h-100 d-flex">
    <div class="leftside"></div>
    <div class="main pt-5 d-flex">
      <div style="width:30%">
        <div class="pb-2">全部关注</div>

        <el-divider></el-divider>
        <ul class="pt-2">
          <li v-for="(follow,index) in follows" :key="index">{{follow.name}}</li>
        </ul>
      </div>
      <div class="flex-1 pl-3">全部推荐</div>
    </div>

    <div class="sidebar"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Follow extends Vue {
  follows = "";

  mounted() {
    this.fetchfollows();
  }
  async fetchfollows() {
    const res = await this.$http.get("users/1/follows");
    this.follows = res.data;
  }
}
</script>

<style lang="scss">
</style>
