<template>
  <div>
    <ul class="pt-3">
      <li v-for="post in posts" :key="post.id" class="text-gray">
        <router-link tag="div" class="fs-m text-primary" :to="`/p/${post.id}`">{{post.title}}</router-link>
        <div class="d-flex fs-xs pt-2">
          <div>
            <i class="el-icon-view pr-2">
              <span class="pl-1">0</span>
            </i>
          </div>
          <div>
            <i class="el-icon-chat-square pr-2">
              <span class="pl-1">0</span>
            </i>
          </div>
          <div>
            <i class="el-icon-star-off pr-2">
              <span class="pl-1">0</span>
            </i>
          </div>

          <div>{{$dayjs(post.created).format("MM.DD HH:MM")}}</div>
        </div>
        <div class="py-3">
          <el-divider></el-divider>
        </div>
      </li>
    </ul>
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

<style lang="scss">
</style>
