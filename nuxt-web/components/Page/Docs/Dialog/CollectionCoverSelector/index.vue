<template>
  <div>
    <v-img :src="imgLink"></v-img>
    <v-slide-group v-model="link" mandatory class="pa-4" show-arrows>
      <v-slide-item v-for="(url, index) in imgUrls" :key="index" v-slot="{ active, toggle }" class="pointer">
        <v-img :src="url" @click="toggle" class="ma-4" height="150" width="150">
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon v-if="active" v-text="'mdi-close-circle-outline'" color="white" size="48"></v-icon>
            </v-scale-transition>
          </v-row>
        </v-img>
      </v-slide-item>
    </v-slide-group>
    <v-card-text>
      <v-file-input
        v-model="collectionDetail.uploadFile"
        v-on:change="imagePreview($event)"
        :rules="rules"
        show-size
        accept="image/*"
        label="上传封面"
        truncate-length="15"
      ></v-file-input>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Model, Prop } from 'vue-property-decorator'

@Component({})
export default class CollectionCoverSelector extends Vue {
  @Prop()
  imgLink

  link = ''

  @Watch('link')
  isvalueChanged(newval, oldval) {
    this.$emit('update:imgLink', this.imgUrls[newval])

    // this.$emit('update:imgLink', this.imgUrls[newval])
  }
  @Model('value')
  collectionDetail

  imagePreview(e) {
    if (e) {
      this.$emit('update:imgLink', URL.createObjectURL(e))
    }
  }
  rules = [(value) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']
  imgUrls = [
    'https://cdn.siques.cn/public/default/default.9769378e.png',
    'https://cdn.siques.cn/public/default/default2.17470089.png',
    'https://cdn.siques.cn/public/default/project.e215b7dd.png',
    'https://cdn.siques.cn/public/default/project2.b8858243.png'
  ]
}
</script>

<style lang="scss" scoped></style>
