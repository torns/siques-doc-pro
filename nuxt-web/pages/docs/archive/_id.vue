<template>
  <v-main>
    <LazyArchiveList @reuse="docReuse" :list="docList"></LazyArchiveList>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { getDelDocList, reuseDoc } from '@/api/doc'
@Component({
  computed: mapGetters(['selectedCollection'])
})
export default class Archive extends Vue {
  layout(context) {
    return 'doc'
  }
  selectedCollection
  docList = []

  mounted() {
    this.getDelPostList()
  }
  async docReuse(item) {
    await reuseDoc({ docId: item.id })
    this.$store.dispatch('modules/doc/getDocTree', { collectionId: this.selectedCollection.id })
    this.docList.splice(item.index, 1)
  }
  async getDelPostList() {
    const res = await getDelDocList({ collectionId: this.selectedCollection.id })
    this.docList = res.datas
  }
}
</script>

<style lang="scss" scoped></style>
