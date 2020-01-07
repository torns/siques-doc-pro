<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="通知提醒" name="first">通知提醒</el-tab-pane>
          <el-tab-pane label="私信消息" name="second">私信消息</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="hidden-md-and-down pl-2" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">123</el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Notification extends Vue {
  @Prop()
  name: string;
  follows = "";
  activeName = "first";
  mounted() {}

  handleClick(e) {
    console.log(e);
  }
}
</script>

<style lang="scss" >
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
</style>
