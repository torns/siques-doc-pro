<template>
  <div>
    <ul v-if="posts" class="pt-3">
      <li v-for="post in posts" :key="post.id" class="text-gray">
        <div class="d-flex fs-xm">
          <div style="padding: 0 10px;" class="bg-2 mr-2">xx票</div>
          <router-link tag="div" class="flex-1 text-primary" :to="`/p/${post.id}`">{{post.title}}</router-link>

          <div>{{$dayjs(post.created).format("YYYY-MM-DD")}}</div>
        </div>
        <div class="py-3">
          <el-divider></el-divider>
        </div>
      </li>
    </ul>
    <div v-else>(ﾟ∀ﾟ ) 暂时没有任何数据</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ListPanel extends Vue {
  @Prop()
  posts: any;
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 auto !important;
}
</style>
