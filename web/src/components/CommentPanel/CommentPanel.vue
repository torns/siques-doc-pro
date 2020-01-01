<template>
  <div>
    <div class="pt-4">
      <div class="d-flex jc-between text-gray">
        <div>返回</div>
        <div>与 ### 的对话</div>
        <div>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="talk-body" style="height:400px"></div>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="communication"></el-input>
      <div class="d-flex jc-between pt-3">
        <div class="text-gray fs-xm">Enter直接发送</div>
        <div>
          <el-button type="primary" round @click="sendmessage">发送</el-button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CommentPanel extends Vue {
  communication = "";
  sendmessage() {}
}
</script>

<style lang="scss">
</style>
