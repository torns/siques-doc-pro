<template>
  <v-main>
    <v-container style="padding-top: 100px;">
      <v-row>
        <v-col cols="12" md="2">
          <v-card :elevation="6" class="mx-auto mx-6">
            <v-img :src="selectedCollection.cover" aspect-ratio="1.1"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="2">
          <p class="font-weight-black">
            {{ selectedCollection.name }}
          </p>
          <p class="font-weight-bold">
            {{ selectedCollection.description }}
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-btn-toggle v-model="setting" dense background-color="primary" multiple>
            <v-btn @click="openSettingDialog">
              <v-icon>mdi-cog</v-icon>
              设置
            </v-btn>

            <v-btn @click="openPublishDialog">
              <v-icon>mdi-format-color-fill</v-icon>
              发布
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
    <CollectionSettingDialog
      ref="collectSetting"
      v-model="collectionForm"
      title="知识库设置"
      @submits="submit"
    ></CollectionSettingDialog>
    <LazyCollectionPublishDialog ref="dialog"></LazyCollectionPublishDialog>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { coverUpload, updateCollection } from '@/api/collection'
@Component({
  computed: mapGetters(['selectedCollection'])
})
export default class OverView extends Vue {
  selectedCollection
  layout(context) {
    return 'doc'
  }

  collectionForm: any = {}

  $refs: any

  openPublishDialog() {
    this.$refs.dialog.visible = true
  }

  openSettingDialog() {
    this.collectionForm = {
      ...this.selectedCollection
    }
    this.$refs.collectSetting.visible = true
  }

  async submit() {
    const { id, name, description, cover, uploadFile } = this.collectionForm
    if (uploadFile && cover.includes('blob')) {
      const formData = new FormData()

      formData.append('id', id)
      formData.append('uploadFile', uploadFile)
      formData.append('name', name)
      formData.append('description', description || '')

      await coverUpload(formData)
    } else {
      await updateCollection({ id, name, description, cover })
    }

    const updatedCollect = await this.$store.dispatch('modules/collection/getUserCollection', id)
    this.$store.commit('SET_COLLECTION', updatedCollect)
  }

  @Watch('selectedCollection')
  isCollectionChanged(newval, oldval) {
    if (newval.id) {
      this.$router.push(`/docs/overview/${newval.id}`)
    }
  }

  setting = ''
}
</script>

<style lang="scss" scoped></style>
