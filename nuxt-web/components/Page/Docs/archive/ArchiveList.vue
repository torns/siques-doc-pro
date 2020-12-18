<template>
  <v-card max-width="600" min-height="300" class="mx-auto">
    <v-card-title>最近删除</v-card-title>
    <v-list v-if="list.length > 0" subheader two-line>
      <v-list-item v-for="(item, index) in list" :key="item.id">
        <v-list-item-avatar>
          <v-icon class="blue" dark v-text="`mdi-clipboard-text`"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>

          <v-list-item-subtitle v-text="item.alias"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" color="primary" dark icon @click="$emit('reuse', { ...item, index })" v-on="on">
                <v-icon color="grey lighten-1">mdi-restart</v-icon>
              </v-btn>
            </template>
            <span>还原</span>
          </v-tooltip>
        </v-list-item-action>
        <v-list-item-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                color="primary"
                dark
                icon
                @click="$emit('realDelete', { ...item, index })"
                v-on="on"
              >
                <v-icon color="grey lighten-1">mdi-delete-empty</v-icon>
              </v-btn>
            </template>
            <span>彻底删除</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-img
      v-else
      class="mx-auto mt-5"
      max-height="150"
      max-width="150"
      src="https://cdn.siques.cn/public/default/noStickyDoc.167af5ad.svg"
    ></v-img>
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
