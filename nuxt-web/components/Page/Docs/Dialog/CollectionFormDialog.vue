<template>
  <v-dialog v-model="visible" max-width="400px" persistent hide-overlay>
    <v-card tile>
      <v-toolbar dark color="primary">
        <v-btn
          icon
          dark
          @click="
            () => {
              visible = false
              collectionDetail.cover = 'https://cdn.siques.cn/public/default/default.9769378e.png'
            }
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-form class="pt-3 pb-5" ref="form" v-model="valid">
        <v-container>
          <v-row class="justify-center">
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                v-model="collectionDetail.name"
                :rules="nameRules"
                label="知识库名称"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                v-model="collectionDetail.description"
                label="知识库简介"
                hint="关于知识库的介绍"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-btn block :disabled="!valid" color="primary" class="mr-4" @click="doValidate">
                保存
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'nuxt-property-decorator'
/**
 * 创建知识库模块
 */
@Component({})
export default class CollectionFormDialog extends Vue {
  @Prop({
    default: '创建知识库'
  })
  title

  visible = false

  valid = true

  @Model('value', {
    type: Object,
    default: () => {
      return {
        cover: 'https://cdn.siques.cn/public/default/default.9769378e.png'
      }
    }
  })
  collectionDetail

  nameRules = [(v) => !!v || '名称必填哦', (v) => (v && v.length <= 14) || '明在太长啦']

  $refs: {
    form: HTMLFormElement
  }

  doValidate() {
    const v = this.$refs.form.validate()
    if (v) {
      this.$emit('submits', this.collectionDetail)
    }

    this.visible = false
  }
}
</script>

<style lang="scss" scoped></style>
