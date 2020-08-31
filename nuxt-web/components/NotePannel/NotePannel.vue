<template>
  <el-row :gutter="43">
    <el-col class="py-3 pb-6" v-for="(note, index) in $attrs.data" :key="index" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
      <div class="w-100 shadow-2 d-flex flex-column card-shadow" style="height:520px;border-radius:15px">
        <div class="pannel-head">
          <div class="pannel-image">
            <el-image style="border-radius: 15px 15px 0 0;height:220px;" fit="cover" :src="note.cover || link[0].url"> </el-image>
          </div>
        </div>
        <div class="pannel-body flex-1 text-center">
          <div class="py-3">2019-12-12</div>
          <h1>
            <router-link :to="`/n/${note.id}`" class="ellipsis-1 title">{{ note.title }}</router-link>
          </h1>
          <div class="description">{{ note.alias }}</div>
        </div>
        <div class="pannel-footer" style="height: 80px;">
          <el-divider></el-divider>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class NotePannel extends Vue {
  link = [
    {
      url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/hello-world.jpg'
    },
    {
      url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/hello-world.jpg'
    },
    {
      url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/hello-world.jpg'
    },
    {
      url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/hello-world.jpg'
    }
  ]
}
</script>

<style lang="scss" scoped></style>
