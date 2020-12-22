<template>
  <div>
    <v-navigation-drawer :width="editorSideBar ? 320 : 0" app permanent>
      <v-btn :disabled="!selectedCollection.id" block @click="manageCurrentCollection">
        <v-icon left>
          mdi-home
        </v-icon>
        主页
      </v-btn>

      <v-list nav dense>
        <div class="ellipsis-1 d-flex jc-between">
          <div>
            <v-icon color="   darken-2" class="pr-2">
              mdi-apps
            </v-icon>

            <span class="grey--text text--darken-2">目录</span>
          </div>
          <MenuBtn :title="`更多操作`" :options="menuOptions">mdi-plus</MenuBtn>
        </div>
        <v-treeview
          v-show="!loading"
          ref="tree"
          :items="docTree"
          :active="[selectedDoc.id]"
          class="pointer"
          activatable
          open-all
          rounded
          dense
          hoverable
          @update:active="selectDoc"
        >
          <template v-slot:prepend="{ item, open }">
            <div class="text-truncate">
              <v-icon small>
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>

              <span>{{ item.title }}</span>
            </div>
          </template>

          <template v-slot:label="{ item }">
            <v-hover v-slot="{ hover }">
              <div :class="{ 'on-hover': hover }" class="doc-action float-right" @e.prevent>
                <MenuBtn :title="`删除等操作`" :item="item" :options="moreOptions">mdi-dots-horizontal</MenuBtn>
                <MenuBtn :title="`更多操作`" :item="item" :options="addOptions">mdi-plus</MenuBtn>
              </div>
            </v-hover>
          </template>
        </v-treeview>

        <div class="ellipsis-1 d-flex ai-center">
          <v-icon color="   darken-2 " class="pr-2">
            mdi-trash-can
          </v-icon>

          <span class="pointer grey--text text--darken-2" @click="manageCurrentDeleteDoc">最近删除</span>
        </div>
      </v-list>
    </v-navigation-drawer>

    <DocMoveDialog ref="DocMoveDialog"></DocMoveDialog>
    <DocTitleChangeDialog ref="DocTitleDialog" @changeTitle="changeTitle"></DocTitleChangeDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

import { mapGetters } from 'vuex'
import { createDoc, delDoc, updateDoc } from '@/api/doc.js'
import { copyToClip } from '@/plugins/utils'
@Component({
  computed: mapGetters(['selectedCollection', 'selectedDoc', 'docTree', 'editorSideBar'])
})
export default class DocSideBar extends Vue {
  loading = false
  attrs = {
    class: 'mb-6',
    boilerplate: true
  }

  editorSideBar
  docTree
  selectedCollection
  selectedDoc

  $refs: any
  manageCurrentCollection() {
    // 当前选中文档清空
    this.$store.commit('SET_DOC', {})
    this.$router.push(`/docs/overview/${this.selectedCollection.id}`)
  }

  manageCurrentDeleteDoc() {
    // 当前选中文档清空
    this.$store.commit('SET_DOC', {})
    this.$router.push(`/docs/archive/${this.selectedCollection.id}`)
  }

  selectDoc(row) {
    if (row.length > 0) {
      const doc = this.$refs.tree.nodes[row[0]].item
      this.$store.commit('PUSH_MSG', doc.title + ' 已同步')
      this.$store.commit('SET_DOC', doc)
      this.$router.push('/docs')
    }
  }

  @Watch('selectedCollection')
  collectChanged(newval, oldval) {
    this.getDocTree()
  }

  async getDocTree() {
    this.loading = true
    await this.$store.dispatch('modules/doc/getDocTree', {
      collectionId: this.selectedCollection.id,
      isPublished: false
    })
    this.loading = false
  }

  async createDoc(row) {
    await createDoc({ parentId: row.id, collectionId: this.selectedCollection.id })
    this.getDocTree()
  }

  async delDoc(row) {
    await delDoc(row.id)
    this.$store.dispatch('modules/doc/getDelDoc', { collectionId: this.selectedCollection.id })
    if (this.selectedDoc.id === row.id) {
      this.$store.commit('SET_DOC', {})
    }
    this.getDocTree()
  }

  async createParent() {
    await createDoc({ parentId: 0, collectionId: this.selectedCollection.id })
    this.getDocTree()
  }

  openDocDetail(row) {
    if (!row.isPublished) {
      this.$notify({
        text: row.title + ' 尚未发布，请先发布该文章哦'
      })
    } else {
      window.open(`/doc/${row.id}`)
    }
  }

  async changeTitle(row) {
    await updateDoc({ id: row.id, title: row.title })
    this.$notify({ text: '修改成功' })
  }

  createChangeTitleDialog(row) {
    this.$refs.DocTitleDialog.data = row
    this.$refs.DocTitleDialog.visible = true
  }

  createMoveDialog(row) {
    this.$refs.DocMoveDialog.currentId = row.id
    this.$refs.DocMoveDialog.visible = true
  }

  copyToClip(row) {
    copyToClip(`https://www.siques.cn/doc/${row.id}`)
  }

  menuOptions = [
    {
      title: '创建文档',
      icon: 'mdi-plus',
      callback: this.createParent
    }
  ]

  moreOptions = [
    {
      title: '移动',
      icon: 'mdi-move',
      callback: this.createMoveDialog
    },
    {
      title: '修改文章标题',
      icon: 'mdi-edit',
      callback: this.createChangeTitleDialog
    },
    {
      title: '删除',
      icon: 'mdi-delete',
      callback: this.delDoc
    }
  ]

  addOptions = [
    {
      title: '创建文档',
      icon: 'mdi-plus',
      callback: this.createDoc
    },
    {
      title: '打开文档详情页',
      icon: 'mdi-click',
      callback: this.openDocDetail
    },
    {
      title: '复制文档链接',
      icon: 'mdi-copy',
      callback: this.copyToClip
    }
  ]
}
</script>

<style lang="scss" scoped>
.v-treeview-node__label {
  display: inline-table;
  transition: opacity 0.4s ease-in-out;
  .doc-action:not(.on-hover) {
    opacity: 0;
  }
  .doc-action {
    position: absolute;
    right: 0;
  }
}

.v-navigation-drawer {
  z-index: 6;
}
</style>
