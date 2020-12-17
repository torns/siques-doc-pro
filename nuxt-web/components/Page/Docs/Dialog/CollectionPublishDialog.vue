<template>
  <v-dialog v-model="visible" scrollable persistent max-width="600px">
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="title">
          知识库内容发布
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="visible = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-radio-group v-model="selectedRadio">
          <v-radio
            v-for="(option, index) in options"
            :key="index"
            :label="`${option.label}`"
            :value="option.value"
          ></v-radio>
        </v-radio-group>
        <v-divider></v-divider>
      </v-card-text>

      <CollectionPublicTree ref="tree" v-model="tree" :doc-tree="docTree" :init-selected="initSelected">
      </CollectionPublicTree>
      <v-card-text>
        <v-card-actions>
          <v-btn :loading="loading" @click="doPublish" block color="primary">
            发布
          </v-btn>
        </v-card-actions>
      </v-card-text>

      <v-card-text v-if="initSelected.length !== 0">
        已发布：地址：<a :href="`https://www.siques.cn/doc/${initSelected[0]}`" target="_blank"
          >https://www.siques.cn/doc/{{ initSelected[0] }}</a
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { getPublishedList, publishDoc } from '@/api/doc'

@Component({
  computed: mapGetters(['docTree', 'selectedCollection'])
})
export default class CollectionPublishDialog extends Vue {
  docTree
  selectedCollection

  tree = {
    selected: []
  }
  visible = false
  selectedRadio = true
  loading = false
  $refs: any
  initSelected = []

  async mounted() {
    const res = await getPublishedList({ collectionId: this.selectedCollection.id })
    this.initSelected = res.datas
  }

  async doPublish() {
    this.loading = true
    await publishDoc(this.$refs.tree._selection, { collectionId: this.selectedCollection.id })
    setTimeout(() => {
      this.loading = false
      this.visible = false
    }, 500)
  }
  options = [
    // {
    //   label: '发布所有内容',
    //   value: true
    // },
    {
      label: '选择发布内容',
      value: true
    }
  ]
}
</script>

<style lang="scss" scoped></style>
