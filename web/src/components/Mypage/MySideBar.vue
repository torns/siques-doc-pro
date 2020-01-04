<template>
  <div>
    <div class="fs-xm">
      <h4 class="pb-4">认证与成就</h4>
      <ul class="text-primary">
        <li class="pb-2">
          <font-awesome-icon class="pr-3" :icon="['fas','thumbs-up' ]" />
          <span class="text-dark-1">获得 0 次点赞</span>
        </li>
        <li>
          <font-awesome-icon class="pr-3" :icon="['fab','discourse' ]" />
          <span class="text-dark-1">获得 0 个关注</span>
        </li>
      </ul>
      <el-divider></el-divider>
      <div>
        <div class="d-flex jc-between">
          <div>
            <h4 class="title">擅长技能</h4>
          </div>
          <div class="text-gray">
            <font-awesome-icon :icon="['fas','edit' ]" />编辑
          </div>
        </div>

        <div
          class="bg-light-1 ai-center jc-center d-flex mt-3"
          style="height:110px;border:1px dashed #DDDDDD;"
        >
          <div class="text-gray ai-baseline">
            (ﾟ∀ﾟ )
            暂时没有，
            <el-button type="text">立即添加</el-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex jc-between">
          <div>
            <h4 class="title">开源项目&著作</h4>
          </div>
          <div class="text-gray">
            <font-awesome-icon :icon="['fas','edit' ]" />编辑
          </div>
        </div>

        <div
          class="bg-light-1 ai-center jc-center d-flex mt-3"
          style="height:110px;border:1px dashed #DDDDDD;"
        >
          <div class="text-gray ai-baseline">
            (ﾟ∀ﾟ )
            暂时没有，
            <el-button type="text">立即添加</el-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div>注册于{{this.$dayjs(this.$store.state.userCreated).format("YYYY-MM-DD & HH:MM")}}分</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class MySideBar extends Vue {}
</script>

<style lang="scss">
.el-divider--horizontal {
  margin: 25px 0;
}
</style>
