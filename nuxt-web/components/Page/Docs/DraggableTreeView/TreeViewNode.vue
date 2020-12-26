<template>
  <div :id="value.id" :class="`v-treeview-node v-treeview-node--click ${hasChildren ? '' : 'v-treeview-node--leaf'}`">
    <div :class="`v-treeview-node__root  ${value.id === active ? 'v-treeview-node--active primary--text' : ''} `">
      <div v-for="index in appendLevel" :key="index" class="v-treeview-node__level" />
      <i
        v-if="hasChildren"
        role="button"
        class="v-icon notranslate v-treeview-node__toggle v-icon--link mdi"
        :class="[
          {
            'v-treeview-node__toggle--open': open,
            'theme--dark': isDark,
            'theme--light': !isDark
          },
          expandIcon
        ]"
        @click="open = !open"
      />

      <div class="v-treeview-node__content">
        <div class="v-treeview-node__prepend" @click="(e) => nodeClicked(e, value)">
          <slot name="prepend" v-bind="{ item: value, open }" />
        </div>
        <div class="v-treeview-node__label">
          <slot name="label" v-bind="{ item: value, open }">
            {{ value.name }}
          </slot>
        </div>
      </div>

      <slot name="append" v-bind="{ item: value }" />
    </div>
    <div v-if="open" class="v-treeview-node__children v-treeview-node__children__draggable">
      <draggable
        :id="value.id"
        :data-parent="value.parentId"
        :group="group"
        :value="value.children"
        ghost-class="ghost"
        v-bind="dragOptions"
        @start="(e) => checkStart(e, value.children)"
        @end="(e) => checkEnd(e, value.children)"
        @input="updateValue"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <treeview-node
            v-for="child in value.children"
            :key="child.id"
            :active="active"
            :group="group"
            :value="child"
            :level="level + 1"
            :expand-icon="expandIcon"
            @input="updateChildValue"
          >
            <template v-slot:prepend="{ item, open }">
              <slot name="prepend" v-bind="{ item, open }" />
            </template>
            <template v-slot:label="{ item, open }">
              <slot name="label" v-bind="{ item, open }"></slot>
            </template>
            <template v-slot:append="{ item }">
              <slot name="append" v-bind="{ item }" />
            </template>
          </treeview-node>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { Prop } from 'vue-property-decorator'

import { moveDoc, updateDoc } from '@/api/doc'
import bus from './bus'
import { TreeItem } from '~/custom-vue'
@Component({
  computed: mapGetters(['docTree', 'selectedCollection'])
})
export default class TreeviewNode extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  level

  selectedCollection
  docTree
  drag = false
  dragOptions = {
    animation: 200,
    disabled: false,
    ghostClass: 'ghost'
  }

  @Prop({
    default: (): TreeItem => ({
      id: 0,
      name: '',
      children: []
    })
  })
  value

  @Prop({
    type: Boolean,
    default: (): boolean => false
  })
  root

  @Prop()
  active

  @Prop({
    type: String,
    default: null
  })
  group

  @Prop({
    type: String,
    default: 'mdi-menu-down'
  })
  expandIcon

  open = true
  localValue: TreeItem

  mounted() {
    this.localValue = { ...this.value }
  }

  item: any = {}
  findTreeItem(items, id, parent?) {
    if (!items) {
      return
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      // Test current object
      // eslint-disable-next-line eqeqeq
      if (item.id === id) {
        this.item = parent
        break
      }
      // Test children recursively

      this.findTreeItem(item.children, id, item)
    }
  }

  fromChildren = []

  checkStart(evt, children) {
    this.fromChildren = children
    this.drag = true
  }

  checkEnd(evt, children) {
    const current = this.findItem(this.fromChildren, children)
    // 换位
    if (current.length > 0) {
      this.findTreeItem(this.docTree, current[0].id)
      moveDoc({ parentId: this.item.id, currentId: current[0].id, collectionId: this.selectedCollection.id })
    }
    // 排序
    else {
      const index = this.contains(children, evt.item.id)

      const doc = children[index]
      let sort = doc.sort
      if (index === 0) {
        sort = this.fromChildren[0].sort + 1
      } else if (index === children.length - 1) {
        sort = this.fromChildren[children.length - 1].sort - 1
      } else {
        sort = (this.fromChildren[index - 1].sort + this.fromChildren[index + 1].sort) / 2
      }

      doc.sort = sort
      updateDoc({ id: doc.id, sort })
    }

    this.drag = false
  }

  contains(arr, id) {
    let i = arr.length
    while (i--) {
      // eslint-disable-next-line eqeqeq
      if (arr[i].id == id) {
        return i
      }
    }
    return false
  }

  findItem(curArr, oldArr) {
    return curArr.concat(oldArr).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v)
    })
  }

  get hasChildren() {
    return this.value.children != null && this.value.children.length > 0
  }

  get isDark(): boolean {
    return this.$vuetify.theme.isDark
  }

  get appendLevel(): number {
    return this.level + (this.hasChildren ? 0 : 1)
  }

  @Watch('value')
  changed(newval, oldval) {
    this.localValue = { ...newval }
  }

  nodeClicked(e, value) {
    bus.$emit('update:active', value)
  }

  updateValue(value: TreeItem[]): void {
    this.localValue.children = [...value]
    // console.log(value)
    this.$emit('input', this.localValue)
  }

  updateChildValue(value: TreeItem): void {
    const index = this.localValue.children.findIndex((c) => c.id === value.id)
    this.$set(this.localValue.children, index, value)
    // console.log('updateChildValue ：', this.localValue)
    this.$emit('input', this.localValue)
  }
}
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
