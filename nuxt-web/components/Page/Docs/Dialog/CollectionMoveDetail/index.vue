<template>
  <v-dialog v-model="visible" max-width="500">
    <v-card class="mx-auto">
      <v-sheet class="pa-4 primary lighten-2">
        <v-text-field
          v-model="search"
          label="搜索"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
      </v-sheet>
      <v-card-text min-height="500">
        <v-treeview
          v-model="tree"
          :selectionType="selectionType"
          :items="postTree"
          :search="search"
          :filter="filter"
          :open-all="true"
          selectable
          item-key="id"
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="item.children" v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"></v-icon>
            <span>{{ item.title }}</span>
          </template>
        </v-treeview>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          @click="
            () => {
              this.$emit('move')
              visible = false
            }
          "
          color="green darken-1"
          text
        >
          移动
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class CollectionDetail extends Vue {
  @Prop()
  collectionId

  @Prop()
  currentId

  @Prop()
  postTree

  tree = []

  selectionType = 'independent'
  search = null
  visible = false
  caseSensitive = false
  filter() {
    return this.caseSensitive ? (item, search, textKey) => item[textKey].includes(search) : undefined
  }
}
</script>

<style lang="scss" scoped></style>
