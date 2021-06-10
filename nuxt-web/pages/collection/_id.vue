<template>
  <div class="pt-10">
    <CollectionCard :collects="collections"></CollectionCard>

    <BasePagination v-model="pagination" @current-change="handleChange"></BasePagination>

    <BaseFooter class="pt-5"></BaseFooter>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { listCollection } from '@/api/collection'
@Component({})
export default class CollectionIndex extends Vue {
  async asyncData({ params, store, route }: any) {
    const res = await listCollection({ pageNum: parseInt(params.id) || 1, pageSize: 10 })

    return {
      collections: res.datas.records,
      pagination: Object.assign({ pageNum: parseInt(params.id) || 1, pageSize: 10, total: res.datas.total })
    }
  }

  pagination: any = {
    pageNum: 1,
    pageSize: 10
  }

  collections = []

  handleChange() {
    console.log(this.pagination)
    this.$router.push(`/collection/${this.pagination.pageNum}`)
  }

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
