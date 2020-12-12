<template>
  <div>
    <v-dialog v-model="visible" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">移动至</span>
        </v-card-title>
        <div v-for="collection in userCollection" :key="collection.id">
          <CollectionCard
            @click="click"
            :cover="collection.cover"
            :id="collection.id"
            :title="collection.name"
            class="mb-4"
          ></CollectionCard>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <CollectionMoverDetail
      ref="CollectionDetail"
      @move="doMove"
      :postTree="postTree"
      :currentId="currentId"
      :collectionId="collectionId"
    ></CollectionMoverDetail>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { moveDoc, getDocTree } from '@/api/doc'
@Component({
  computed: mapGetters(['userCollection'])
})
export default class PostMoveDialog extends Vue {
  userCollection
  visible = false
  currentId = ''
  collectionId = ''
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
    }

    this.$store.dispatch('modules/collection/getUserCollection')
  }
}
</script>

<style lang="scss" scoped></style>
