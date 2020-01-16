<template>
  <div>
    <ul>
      <li v-for="bookmark in bookmarks" :key="bookmark.id" class="text-dark">
        <div class="d-flex fs-xm">
          <router-link
            :to="`/bookmark/${bookmark.id}`"
            tag="div"
            class="flex-1 hoverlink"
            >{{ bookmark.title }}
          </router-link>
          <div>{{ bookmark.posts.length }}条目</div>
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
export default class ListBookmark extends Vue {
  @Prop()
  bookmarks: any
  show: boolean = false
  @Watch('bookmarks')
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
