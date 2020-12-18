<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, id) in userCollection" :key="id" cols="6">
        <v-card :color="colors[id % colors.length]" dark @contextmenu="(e) => show(e, id)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.name"></v-card-title>

              <v-card-subtitle v-text="item.description"></v-card-subtitle>

              <v-card-actions>
                <v-btn class="ml-2 mt-5" outlined rounded small>
                  START RADIO
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.cover"></v-img>
            </v-avatar>
          </div>
        </v-card>
        <v-menu v-model="showMenu[`${id}`]" :position-x="x" :position-y="y" absolute offset-y>
          <v-list>
            <v-list-item v-for="(menu, index) in menus" :key="index" @click="menu.callback(item)">
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <CollectionFormDialog ref="dialog" v-model="item" title="修改知识库" @submits="submit"></CollectionFormDialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { updateCollection, coverUpload, delCollection } from '@/api/collection'
@Component({
  computed: mapGetters(['userCollection', 'selectedCollection'])
})
/** 正在使用 */
export default class CollectionManageCard extends Vue {
  userCollection
  selectedCollection
  item = {}
  colors = ['#1F7087', '#952175', '#385F73']
  showMenu = []
  x = 0
  y = 0
  menus = [
    { title: '重命名', callback: this.showCollectionDialog },
    { title: '移入回收站', callback: this.delCollection }
  ]

  $refs: any

  async submit(collectionDetail) {
    const formData = new FormData()

    formData.append('uploadFile', collectionDetail.uploadFile)
    formData.append('name', collectionDetail.name)
    formData.append('description', collectionDetail.description || '')
    formData.append('id', collectionDetail.id)
    if (collectionDetail.uploadFile && collectionDetail.cover.includes('blob')) {
      await coverUpload(formData)
    } else {
      await updateCollection(collectionDetail)
    }

    this.$store.dispatch('modules/collection/getUserCollection')
  }

  showCollectionDialog(item) {
    this.item = Object.assign({}, item)
    this.$refs.dialog.visible = true
  }

  async delCollection(item) {
    await delCollection({ collectionId: item.id })
    if (this.selectedCollection.id === item.id) {
      this.$store.commit('SET_DOC', {})
      this.$store.commit('SET_COLLECTION', {})
    }
    this.$store.dispatch('modules/collection/getDelCollection')
    this.$store.dispatch('modules/collection/getUserCollection')
  }

  show(e, index) {
    e.preventDefault()
    this.showMenu.forEach((elem) => {
      elem = false
    })
    this.x = e.clientX
    this.y = e.clientY

    this.showMenu[`${index}`] = true
  }
}
</script>

<style lang="scss" scoped></style>
