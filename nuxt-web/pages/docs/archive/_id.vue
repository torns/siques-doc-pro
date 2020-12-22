<template>
  <v-main>
    <LazyArchiveList :list="delDoc" @realDelete="realDelete" @reuse="docReuse"></LazyArchiveList>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { reuseDoc, realDelete } from '@/api/doc'

@Component({
  computed: mapGetters(['selectedCollection', 'delDoc'])
})
export default class Archive extends Vue {
  layout(context) {
    return 'doc'
  }

  selectedCollection
  delDoc

  mounted() {}

  @Watch('selectedCollection')
  valueChanged(newval, oldval) {
    if (newval !== {}) {
      this.$store.dispatch('modules/doc/getDelDoc', { collectionId: this.selectedCollection.id })
    }
  }

  async docReuse(item) {
    const loading = this.$loading({ text: '执行中...' })
    await reuseDoc({ docId: item.id })

    this.$store.dispatch('modules/doc/getDocTree', { collectionId: this.selectedCollection.id })
    this.$store.dispatch('modules/doc/getDelDoc', { collectionId: this.selectedCollection.id })
    setTimeout(() => {
      loading.close()
    }, 500)
  }

  realDelete(item) {
    this.$confirm({ title: `确定要删除文档${item.title}`, text: '请注意该文档删除后将无法恢复' })
      .then(async () => {
        await realDelete({ docId: item.id })
        this.$store.dispatch('modules/doc/getDelDoc', { collectionId: this.selectedCollection.id })
        this.$notify({ text: '删除成功' })
      })
      .catch(() => {
        this.$notify({ text: '取消删除' })
      })
  }
}
</script>

<style lang="scss" scoped></style>
