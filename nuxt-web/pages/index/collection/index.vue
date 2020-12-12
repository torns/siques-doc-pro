<template>
  <div>
    <!-- <sq-pagination
      :href="`${$route.path}?page=1`"
      @current-change="handleCurrentChange"
      :currentPage="currentPage"
      :maxLen="maxLen"
    ></sq-pagination> -->
    <sq-footer class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class CollectionIndex extends Vue {
  asyncData({ params, store, route }: any) {
    return {}
  }

  head() {
    return {
      title: '专栏-思趣网'
    }
  }
}
</script>

<style lang="scss">
.notification ul li {
  width: 200px;
  padding: 12px 0 12px 20px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
  i {
    padding-right: 10px;
  }
}
.bg {
  background-color: #f0f0f0;
}
</style>
