<template>
  <div>
    <v-navigation-drawer :width="editorSideBar ? 320 : 0" app permanent>
      <div style="position: absolute;width: 100%;background-color: white;z-index: 5;">
        <v-btn :disabled="!selectedCollection.id" block @click="manageCurrentCollection">
          <v-icon left>
            mdi-home
          </v-icon>
          主页
        </v-btn>
        <div class="ellipsis-1 d-flex jc-between my-2 mx-1">
          <div>
            <v-icon color="darken-2" class="pr-2">
              mdi-apps
            </v-icon>

            <span class="grey--text text--darken-2">目录</span>
          </div>
          <MenuBtn :title="`更多操作`" :options="menuOptions">mdi-plus</MenuBtn>
        </div>
      </div>
      <v-list style="margin-top:70px" nav dense>
        <DraggableTreeView
          v-show="!loading"
          v-model="docTree"
          dense
          activatable
          :active="selectedDoc.id"
          group="hoge"
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
        </DraggableTreeView>
      </v-list>

      <div class="ellipsis-1 d-flex ai-center absolute w-100 mx-1 bg-white" style="bottom: 0px;height:50px">
        <v-icon color="darken-2 " class="pr-2">
          mdi-trash-can
        </v-icon>

        <span class="pointer grey--text text--darken-2" @click="manageCurrentDeleteDoc">最近删除</span>
      </div>
    </v-navigation-drawer>

    <DocMoveDialog ref="DocMoveDialog"></DocMoveDialog>
    <DocTitleChangeDialog ref="DocTitleDialog" @changeTitle="changeTitle"></DocTitleChangeDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

import { mapGetters } from 'vuex'
import { insertDoc, logicDelDoc, updateDoc } from '@/api/doc.js'
import { copyToClip } from '@/plugins/utils'

@Component({
  computed: {
    docTree: {
      get() {
        return this.$store.state.modules.doc.docTree
      },
      set(v) {
        // console.log('docTree set : ', v)
        this.$store.commit('modules/doc/SET_DOCTREE', v)
      }
    },
    ...mapGetters(['selectedCollection', 'selectedDoc', 'editorSideBar'])
  }
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

  // ###########tree drag drop

  // ###########

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
    this.$store.commit('PUSH_MSG', row.title + ' 已同步')
    this.$store.commit('SET_DOC', row)
    this.$router.push('/docs')
  }

  @Watch('selectedCollection')
  collectChanged(newval, oldval) {
    this.getDocTree()
  }

  async getDocTree() {
    const loading = this.$loading({ text: '加载中' })
    await this.$store.dispatch('modules/doc/getDocTree', {
      collectionId: this.selectedCollection.id,
      isPublished: false
    })
    loading.close()
  }

  async createChild(row) {
    await insertDoc({ parentId: row.id, collectionId: this.selectedCollection.id })
    this.getDocTree()
  }

  async createParent() {
    await insertDoc({ parentId: 0, collectionId: this.selectedCollection.id })
    this.getDocTree()
  }

  async logicDelDoc(row) {
    await logicDelDoc(row.id)
    this.$store.dispatch('modules/doc/getDocDeleted', { collectionId: this.selectedCollection.id })
    if (this.selectedDoc.id === row.id) {
      this.$store.commit('SET_DOC', {})
    }
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
      icon: 'mdi-file-move',
      callback: this.createMoveDialog
    },
    {
      title: '修改文章标题',
      icon: 'mdi-file-edit',
      callback: this.createChangeTitleDialog
    },
    {
      title: '删除',
      icon: 'mdi-delete',
      callback: this.logicDelDoc
    }
  ]

  addOptions = [
    {
      title: '创建子文档',
      icon: 'mdi-plus',
      callback: this.createChild
    },
    {
      title: '打开文档详情页',
      icon: 'mdi-open-in-new',
      callback: this.openDocDetail
    },
    {
      title: '复制文档链接',
      icon: 'mdi-content-copy',
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
