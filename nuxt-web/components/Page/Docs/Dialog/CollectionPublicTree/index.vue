<template>
  <v-card-text style="height: 500px;">
    <v-treeview ref="tree" v-model="tree.selected" :items="docTree" dense selectable>
      <template v-slot:prepend="{ item }">
        <span>{{ item.title }}</span>
      </template>

      <template v-slot:label="{ item }">
        <span v-if="item.isPublished == 3" class="text-red">审核失败</span>
        <span v-if="item.isPublished == 2" class="text-yellow">审核中</span>
        <span v-if="item.isPublished == 1" class="text-green">已发布</span>
      </template>
    </v-treeview>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Model, Watch } from 'vue-property-decorator'

@Component({})
export default class CollectionPublicTree extends Vue {
  @Prop({ type: Array })
  docTree
  /** 选中的树 */

  @Model('value')
  tree

  @Prop()
  initSelected

  @Watch('initSelected')
  valueChanged(newval, oldval) {
    const t = []

    this.initSelected.forEach((e) => {
      if (this._items[e].children.length === 0) {
        t.push(e)
      }
    })
    this.tree.selected = t
  }

  $refs: any
  get _items(): Object {
    return this.$refs.tree.nodes
  }

  /** 包括父节点的选中内容 */
  get _selection() {
    const proxy = {}
    const addParent = (parentId) => {
      const id = this._items[parentId].parent
      if (id) {
        addParent(id)
      }
      proxy[parentId] = this._items[parentId].item.id
    }
    this.tree.selected.forEach((e) => {
      const parentId = this._items[e].parent
      if (parentId) {
        addParent(parentId)
      }
      proxy[e] = this._items[e].item.id
    })
    return Object.values(proxy)
  }
}
</script>

<style lang="scss">
.v-treeview-node__label {
  text-align: right;
}
</style>
