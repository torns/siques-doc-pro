<template>
  <v-dialog v-model="visible" max-width="800px" persistent hide-overlay>
    <v-card tile>
      <v-toolbar dark color="primary">
        <v-btn
          icon
          dark
          @click="
            () => {
              visible = false
            }
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          知识库信息
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <CollectionCoverSelector
              v-model="collectionDetail"
              :img-link.sync="collectionDetail.cover"
            ></CollectionCoverSelector>
            <div class="pt-4">知识库信息</div>
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-row class="justify-center">
                  <v-col cols="12">
                    <v-text-field
                      v-model="collectionDetail.name"
                      :rules="nameRules"
                      label="知识库名称"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="collectionDetail.description"
                      label="知识库简介"
                      hint="介绍一下这个知识库"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn width="150" :disabled="!valid" color="primary" class="  float-right" @click="doValidate">
                      保存
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'nuxt-property-decorator'
@Component({})
export default class CollectionSettingDialog extends Vue {
  @Prop({})
  title

  visible = false

  valid = true

  @Model('value', {
    type: Object,
    default: () => {
      return {}
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
