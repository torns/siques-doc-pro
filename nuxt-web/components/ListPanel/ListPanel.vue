<template>
  <div>
    <div class="pt-3">
      <div v-for="post in posts" :key="post.id" class="text-gray">
        <div class="d-flex fs-xm">
          <div v-if="$attrs.type !== undefined" style="padding: 0 10px;">
            {{ type(post.type) }}
          </div>
          <div style="padding: 0 10px;" class="bg-2 mr-2">
            {{ post.liked }} 票
          </div>
          <router-link
            :to="`${link(post)}`"
            target="_blank"
            tag="a"
            class="flex-1 text-dark ellipsis-1 hoverlink"
            >{{ post.title }}</router-link
          >
          <div v-if="collection" class="mr-4 hover-4 text-primary point">
            {{ post.collection.name }}
          </div>
          <div>{{ $dayjs(post.created).format('YYYY-MM-DD') }}</div>
        </div>
        <div class="py-3">
          <el-divider></el-divider>
        </div>
      </div>
      <el-pagination
        v-if="$attrs.pagination != false"
        :hide-on-single-page="$attrs.len < 10 ? true : false"
        @current-change="handleCurrentChange"
        :total="$attrs.len"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <!-- <div v-if="show">(ﾟ∀ﾟ ) 暂时没有任何数据</div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ListPanel extends Vue {
  @Prop()
  posts: any
  @Prop()
  collection: any

  show: boolean = false

  type(type: any) {
    if (type === 'post') {
      return '文章'
    }
    if (type === 'question') {
      return '提问'
    }

    if (type === 'answer') {
      return '回答'
    }
    if (type === 'note') {
      return '笔记'
    }
  }

  link(post: any) {
    if (post.type === 'post') {
      return `/p/${post.id}`
    }

    if (post.type === 'question') {
      return `/q/${post.id}`
    }
    if (post.type === 'note') {
      return `/n/${post.id}`
    }
    if (post.type === 'answer') {
      return `/q/${post.post.id}`
    }
  }

  // get PostLen(): any {
  //   return this.posts
  // }

  // @Watch('posts')
  // isShow(newVal: any) {
  //   if (newVal.length === 0) {
  //     this.show = true
  //   } else {
  //     this.show = false
  //   }
  // }
  handleCurrentChange(val: any) {
    const page = val
    this.$emit('pageChange', page)
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 auto !important;
}
</style>
