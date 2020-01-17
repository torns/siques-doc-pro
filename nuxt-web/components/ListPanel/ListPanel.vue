<template>
  <div>
    <ul class="pt-3">
      <li v-for="post in posts" :key="post.id" class="text-gray">
        <div class="d-flex fs-xm">
          <div style="padding: 0 10px;" class="bg-2 mr-2">
            {{ post.liked }} 票
          </div>
          <router-link
            :to="`/p/${post.id}`"
            tag="div"
            class="flex-1 text-dark text-ellipsis"
            >{{ post.title }}</router-link
          >
          <div class="mr-4 hover-4 text-primary">
            {{ post.collection.name }}
          </div>
          <div>{{ $dayjs(post.created).format('YYYY-MM-DD') }}</div>
        </div>
        <div class="py-3">
          <el-divider></el-divider>
        </div>
      </li>
    </ul>
    <div v-if="show">(ﾟ∀ﾟ ) 暂时没有任何数据</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class ListPanel extends Vue {
  @Prop()
  posts: any
  show: boolean = false
  @Watch('posts')
  isShow(newVal: any) {
    if (newVal.length === 0) {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 auto !important;
}
</style>
