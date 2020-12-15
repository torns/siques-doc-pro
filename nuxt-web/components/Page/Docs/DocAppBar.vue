<template>
  <div>
    <v-app-bar app color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

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
      @submit="submit"
      v-model="collectionForm"
      title="新增知识库"
    ></CollectionFormDialog>
    <CollectionManageDialog ref="ManageDialog"></CollectionManageDialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { insertCollection } from '@/api/collection'

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

  collectionForm = {}
  $refs: any

  createCollection() {
    this.$refs.dialog.visible = true
  }
  manageCollection() {
    this.$refs.ManageDialog.visible = true
  }

  async submit() {
    await insertCollection(this.collectionForm)
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
