<template>
  <v-card max-width="600" class="mx-auto">
    <v-list subheader two-line>
      <v-subheader inset>最近删除</v-subheader>

      <v-list-item v-for="(item, index) in list" :key="item.id">
        <v-list-item-avatar>
          <v-icon v-text="`mdi-clipboard-text`" class="blue" dark></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>

          <v-list-item-subtitle v-text="item.alias"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="$emit('reuse', { ...item, index })" icon>
            <v-icon color="grey lighten-1">mdi-restart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-delete-empty</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ArchiveList extends Vue {
  @Prop()
  list
}
</script>

<style lang="scss" scoped></style>
