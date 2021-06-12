<template>
  <v-main>
    <ArchiveList :list="deletedDoc" @realDelete="realDelete" @reuse="reuseDoc"></ArchiveList>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { reuseDoc, realDelDoc } from '@/api/doc'

@Component({
  computed: mapGetters(['selectedCollection', 'deletedDoc'])
})
export default class Archive extends Vue {
  layout(context) {
    return 'doc'
  }

  selectedCollection
  deletedDoc

  mounted() {
    if (this.selectedCollection.id) {
      this.$store.dispatch('modules/doc/getDocDeleted', { collectionId: this.selectedCollection.id })
    }
  }

  @Watch('selectedCollection')
  valueChanged(newval, oldval) {
    if (newval.id) {
      this.$store.dispatch('modules/doc/getDocDeleted', { collectionId: this.selectedCollection.id })
    }
  }

  async reuseDoc(item) {
    const loading = this.$loading({ text: '执行中...' })
    await reuseDoc({ docId: item.id })

    this.$store.dispatch('modules/doc/getDocTree', { collectionId: this.selectedCollection.id })
    this.$store.dispatch('modules/doc/getDocDeleted', { collectionId: this.selectedCollection.id })

    loading.close()
  }

  realDelete(item) {
    this.$confirm({ title: `确定要删除文档${item.title}`, text: '请注意该文档删除后将无法恢复' })
      .then(async () => {
        await realDelDoc({ docId: item.id })
        this.$store.dispatch('modules/doc/getDocDeleted', { collectionId: this.selectedCollection.id })
        this.$notify({ text: '删除成功' })
      })
      .catch(() => {
        this.$notify({ text: '取消删除' })
      })
  }
}
</script>

<style lang="scss" scoped></style>
