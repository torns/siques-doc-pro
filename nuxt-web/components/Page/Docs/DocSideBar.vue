<template>
  <div>
    <v-navigation-drawer app permanent>
      <v-btn :disabled="!selectedCollection.id" @click="manageCurrentCollection" block>
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
          ref="tree"
          @update:active="selectDoc"
          :items="docTree"
          :active="[selectedDoc.id]"
          class="pointer"
          activatable
          open-all
          rounded
          dense
          hoverable
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
              <div @e.prevent :class="{ 'on-hover': hover }" class="doc-action float-right">
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

          <span @click="manageCurrentDeleteDoc" class="pointer grey--text text--darken-2">最近删除</span>
        </div>
      </v-list>
    </v-navigation-drawer>

    <DocMoveDialog ref="DocMoveDialog"></DocMoveDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'

import { mapGetters } from 'vuex'
import { createDoc, delDoc } from '@/api/doc.js'

@Component({
  computed: mapGetters(['selectedCollection', 'selectedDoc', 'docTree'])
})
export default class DocSideBar extends Vue {
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
  valueChanged(newval, oldval) {
    this.getDocTree()
  }

  async getDocTree() {
    await this.$store.dispatch('modules/doc/getDocTree', {
      collectionId: this.selectedCollection.id,
      isPublished: false
    })
  }

  async createDoc(row) {
    await createDoc({ parentId: row.id, collectionId: this.selectedCollection.id })
    this.getDocTree()
  }

  async delDoc(row) {
    await delDoc(row.id)
    this.$store.dispatch('modules/doc/getDelDoc', { collectionId: this.selectedCollection.id })
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

  createMoveDialog(row) {
    this.$refs.DocMoveDialog.currentId = row.id
    this.$refs.DocMoveDialog.visible = true
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
      icon: 'mdi-copy'
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
