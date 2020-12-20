<template>
  <div>
    <v-app-bar app color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon @click="$store.commit('modules/editor/SET_SIDEBAR', true)"></v-app-bar-nav-icon>

      <v-select
        v-model="selectedCollection"
        :items="userCollection"
        item-text="name"
        item-value="id"
        label="选择集合"
        persistent-hint
        return-object
        dense
        single-line
      ></v-select>

      <v-spacer></v-spacer>

      <v-btn icon>
        <MenuBtn :title="`更多操作`" :options="menuOptions" notip>mdi-plus-circle</MenuBtn>
      </v-btn>
    </v-app-bar>
    <CollectionFormDialog
      ref="dialog"
      v-model="collectionForm"
      title="新增知识库"
      @submits="submit"
    ></CollectionFormDialog>
    <CollectionManageDialog ref="ManageDialog"></CollectionManageDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { insertCollection, coverUpload } from '@/api/collection'

@Component({
  computed: {
    selectedCollection: {
      get() {
        return this.$store.state.selectedCollection
      },
      set(v) {
        this.$store.commit('SET_COLLECTION', v)
        this.$router.push(`/docs/overview/${v.id}`)
      }
    },
    ...mapGetters(['userCollection'])
  }
})
export default class DocAppBar extends Vue {
  selectedCollection
  userCollection

  collectionForm: any = {}
  $refs: any

  createCollection() {
    this.$refs.dialog.visible = true
  }

  manageCollection() {
    this.$refs.ManageDialog.visible = true
  }

  async submit() {
    const formData = new FormData()

    formData.append('uploadFile', this.collectionForm.uploadFile)
    formData.append('name', this.collectionForm.name)
    formData.append('description', this.collectionForm.description || '')

    if (this.collectionForm.uploadFile && this.collectionForm.cover.includes('blob')) {
      await coverUpload(formData)
    } else {
      await insertCollection(this.collectionForm)
    }

    this.$store.dispatch('modules/collection/getUserCollection')
  }

  menuOptions = [
    {
      title: '创建知识库',
      icon: 'mdi-plus',
      callback: this.createCollection
    },
    {
      title: '管理知识库',
      icon: 'mdi-cog',
      callback: this.manageCollection
    }
  ]

  mounted() {
    this.$store.dispatch('modules/collection/getUserCollection')
  }
}
</script>

<style lang="scss" scoped></style>
