<template>
  <div class="border-radius">
    <div class="d-flex jc-between header bg-light-1 border-solid py-1 px-3">
      <div style="line-height:28px">高分内容</div>
      <div>
        <el-radio-group v-model="radio" size="mini">
          <el-radio-button label="概览"></el-radio-button>
          <el-radio-button label="提问"></el-radio-button>
          <el-radio-button label="回答"></el-radio-button>
          <el-radio-button label="文章"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="body border-solid">
      <div style="height:200px" class="d-flex ai-center">
        <div
          class="d-flex bg-light-1 ai-center jc-center border-dash border-radius"
          style="height:80%;width:80%;margin:0 auto;"
        >
          (ﾟ∀ﾟ )
          暂时没有任何数据
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex jc-between header bg-light-1 border-solid py-1 px-3">
      <div style="line-height:28px">个人动态</div>
    </div>
    <div class="body border-solid">
      <div style="height:200px" class="d-flex ai-center"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class MyHomepage extends Vue {
  radio = "";
}
</script>

<style lang="scss">
</style>
