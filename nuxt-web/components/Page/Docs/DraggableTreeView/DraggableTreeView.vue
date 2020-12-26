<template>
  <!-- <draggable
    :value="localValue"
    :group="group"
    
    ghost-class="ghost"
    @input="updateValue"
    ><transition-group> -->

  <div class="v-treeview v-treeview-draggable" :class="themeClassName">
    <TreeViewNode
      v-for="items in value"
      :key="items.id"
      :active="active"
      :group="group"
      :value="items"
      :expand-icon="expandIcon"
      @input="updateItem"
    >
      <template v-slot:prepend="{ item, open }">
        <slot name="prepend" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:label="{ item, open }">
        <slot name="label" v-bind="{ item, open }"> </slot>
      </template>
      <template v-slot:append="{ item, open }">
        <slot name="append" v-bind="{ item, open }"> </slot>
      </template>
    </TreeViewNode>
  </div>
  <!-- </transition-group>
  </draggable> -->
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component } from 'nuxt-property-decorator'

import { Prop, Watch } from 'vue-property-decorator'
import bus from './bus'
@Component({})
export default class DraggableTreeView extends Vue {
  @Prop({
    default: (): { id: string | number }[] => {
      return []
    }
  })
  value

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

  @Prop()
  active

  mounted() {
    this.localValue = [...this.value]
    bus.$on('update:active', (msg) => {
      this.$emit('update:active', msg)
    })
  }

  localValue = []

  get themeClassName(): string {
    return this.$vuetify.theme.isDark ? 'theme--dark' : 'theme--light'
  }

  @Watch('value')
  isvalChanged(newval, oldval) {
    this.localValue = [...newval]
  }

  updateValue(value): void {
    // console.log('updateValue： ', value)
    this.localValue = value
    this.$emit('input', this.localValue)
  }

  updateItem(itemValue): void {
    // console.log('updateItem： ', itemValue)
    const index = this.localValue.findIndex((v) => v.id === itemValue.id)
    this.$set(this.localValue, index, itemValue)
    this.$emit('input', this.localValue)
  }
}
</script>

<style lang="scss" scoped></style>
