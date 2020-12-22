<template>
  <v-app-bar color="transparent" style="top:60px;box-shadow:none!important" dense app>
    <v-spacer></v-spacer>

    <v-btn text @click="copyLink">
      <v-icon link left>
        mdi-link-variant
      </v-icon>
      复制文档链接
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(option, index) in menuOptions" :key="index" @click="option.callback">
          <v-list-item-title>{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <LazyDocHistoryDialog ref="dialog"></LazyDocHistoryDialog>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { copyToClip } from '@/plugins/utils'
@Component({
  computed: mapGetters(['selectedDoc'])
})
export default class DocInnerAppBar extends Vue {
  menuOptions = [{ title: '查看历史版本', callback: this.getHistoryDoc }]
  selectedDoc

  copyLink() {
    copyToClip(`https://www.siques.cn/doc/${this.selectedDoc.id}`)
    this.$notify({ text: '复制成功' })
  }

  $refs: {
    dialog: HTMLFormElement
  }

  getHistoryDoc() {
    this.$refs.dialog.visible = true
  }
}
</script>

<style lang="scss" scoped></style>
