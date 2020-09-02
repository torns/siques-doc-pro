<template>
  <nav class="pagination" id="pagination">
    <h2 class="screen-reader-text">Posts Navigation</h2>
    <div class="inner relative ">
      <a v-if="$attrs.currentPage != 1" class="newer-posts arrow-left point" @click="handleCurrentChange($attrs.currentPage - 1)">
        <span class="screen-reader-text"></span>
      </a>
      <span class="page-number">
        <a class="point" :href="$attrs.href">PAGE {{ $attrs.currentPage }} OF {{ maxPage }} </a>
      </span>
      <a v-if="$attrs.currentPage != maxPage" class="older-posts arrow-right point" @click="handleCurrentChange($attrs.currentPage + 1)">
        <span class="screen-reader-text"></span>
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class extends Vue {
  @Prop()
  maxLen

  get maxPage() {
    return Math.ceil(this.maxLen / 10)
  }

  handleCurrentChange(val: any) {
    // @current-change="handleCurrentChange"
    this.$emit('current-change', val)
  }
}
</script>

<style lang="scss" scoped></style>
