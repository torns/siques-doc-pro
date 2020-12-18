<template>
  <nav id="pagination" class="pagination">
    <div class="inner relative ">
      <a v-if="pagination.pageNum != 1" class="newer-posts arrow-left point" @click="prevPage">
        <span class="screen-reader-text"></span>
      </a>
      <span class="page-number">
        <a :href="$attrs.href" class="point">PAGE {{ pagination.pageNum }} OF {{ maxPage }} </a>
      </span>
      <a v-if="pagination.pageNum != maxPage" class="older-posts arrow-right point" @click="nextPage">
        <span class="screen-reader-text"></span>
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Model } from 'vue-property-decorator'
@Component({})
export default class extends Vue {
  @Model('value')
  pagination

  get maxPage() {
    return Math.ceil(this.pagination.total / this.pagination.pageSize)
  }

  prevPage() {
    this.pagination.pageNum -= 1
    this.$emit('current-change')
  }

  nextPage() {
    this.pagination.pageNum += 1
    this.$emit('current-change')
  }
}
</script>

<style lang="scss" scoped></style>
