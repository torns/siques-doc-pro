<template>
  <div class="pt-10">
    <CollectionCard :collects="collections"></CollectionCard>

    <BasePagination @current-change="handleChange" v-model="pagination"></BasePagination>

    <sq-footer class="pt-5"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { listCollection } from '@/api/collection'
@Component({})
export default class CollectionIndex extends Vue {
  async asyncData({ params, store, route }: any) {
    const res = await listCollection({ pageNum: params.id || 1, pageSize: 10 })

    return {
      collections: res.datas.records,
      pagination: Object.assign({ pageNum: params.id || 1, pageSize: 10, total: res.datas.total })
    }
  }
  pagination: any = {}

  async handleChange() {
    const res = await listCollection({ pageNum: this.pagination.pageNum, pageSize: this.pagination.pageSize })
    this.collections = res.datas.records
  }
  collections = []

  head() {
    return {
      title: '知识星球-思趣网'
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
