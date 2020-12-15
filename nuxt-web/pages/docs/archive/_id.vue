<template>
  <v-main>
    <LazyArchiveList @reuse="docReuse" :list="delDoc"></LazyArchiveList>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { reuseDoc } from '@/api/doc'

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
    await reuseDoc({ docId: item.id })
    this.$store.dispatch('modules/doc/getDocTree', { collectionId: this.selectedCollection.id })
    // this.docList.splice(item.index, 1)
  }
}
</script>

<style lang="scss" scoped></style>
