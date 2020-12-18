<template>
  <v-dialog v-model="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>知识库</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in items" :key="item">
          <CollectionManageCard v-if="index == 0"></CollectionManageCard>
          <CollectionReuseCard v-else></CollectionReuseCard>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
/** 集合管理面板 */
export default class CollectionManageDialog extends Vue {
  visible = false
  tab = ''
  items = ['正在使用', '回收站']
}
</script>

<style lang="scss" scoped></style>
