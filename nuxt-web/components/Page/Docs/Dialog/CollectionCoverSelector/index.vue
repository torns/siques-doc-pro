<template>
  <div>
    <div class="my-4">知识库封面</div>
    <div class="d-flex">
      <v-img height="145" max-width="220" :src="imgLink"></v-img>

      <div class="pl-3 d-flex flex-column align-center">
        <div>
          <v-item-group class="d-flex  h-100 ">
            <v-item v-for="img in imgUrls" :key="img" class=" mr-3">
              <v-card light @click="link = img">
                <v-img height="50" width="50" :src="img"></v-img>
              </v-card>
            </v-item>
          </v-item-group>
        </div>
        <v-spacer></v-spacer>

        <v-btn width="100%" color="primary" dark @click="openUploadDialog">本地上传</v-btn>
      </div>
    </div>

    <v-file-input
      id="fileinput"
      v-model="collectionDetail.uploadFile"
      style="display:none"
      :rules="rules"
      show-size
      accept="image/*"
      label="上传封面"
      truncate-length="15"
      @change="imagePreview($event)"
    ></v-file-input>
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
    this.$emit('update:imgLink', newval)

    // this.$emit('update:imgLink', this.imgUrls[newval])
  }

  @Model('value')
  collectionDetail

  openUploadDialog() {
    document.getElementById('fileinput').click()
  }

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
