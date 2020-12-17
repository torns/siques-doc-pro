<template>
  <div>
    <v-dialog v-model="visible" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">移动至</span>
        </v-card-title>
        <div v-for="collection in userCollection" :key="collection.id">
          <CollectionMoveCard
            @click="click"
            :cover="collection.cover"
            :id="collection.id"
            :title="collection.name"
            :description="collection.description"
            class="mb-4"
          ></CollectionMoveCard>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <CollectionMoveDetail
      ref="CollectionDetail"
      @move="doMove"
      :postTree="postTree"
      :currentId="currentId"
      :collectionId="collectionId"
    ></CollectionMoveDetail>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { moveDoc, getDocTree } from '@/api/doc'
@Component({
  computed: mapGetters(['userCollection', 'selectedCollection'])
})
export default class PostMoveDialog extends Vue {
  userCollection
  visible = false
  currentId = ''
  collectionId = ''
  selectedCollection
  $refs: {
    CollectionDetail: HTMLFormElement
  }
  postTree = []
  async click(id) {
    this.$refs.CollectionDetail.visible = true
    const res = await getDocTree({ collectionId: id })
    this.postTree = res.datas
    this.collectionId = id
  }

  /** 移动文章 */
  async doMove() {
    if (this.currentId === this.$refs.CollectionDetail.tree[0]) {
    } else {
      await moveDoc({
        collectionId: this.collectionId,
        currentId: this.currentId,
        parentId: this.$refs.CollectionDetail.tree[0] || 0
      })
      this.$store.dispatch('modules/doc/getDocTree', {
        collectionId: this.selectedCollection.id,
        isPublished: false
      })
      this.$store.dispatch('modules/collection/getUserCollection')
      this.visible = false
      this.$notify({ text: '移动成功' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
