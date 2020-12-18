<template>
  <v-dialog v-model="visible" max-width="500px">
    <v-card>
      <v-card-title>
        修改文章标题
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="data.title" :counter="35" :rules="nameRules" label="title" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions justify-end>
        <v-btn color="warning" text @click="visible = false">
          取消
        </v-btn>
        <v-btn color="primary" text @click="validates">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class DocTitleChangeDialog extends Vue {
  visible = false
  nameRules = [(v) => !!v || '请填写标题', (v) => (v && v.length <= 35) || '标题过长']
  valid = false
  data = {}
  $refs: any
  validates() {
    const valid = this.$refs.form.validate()
    if (valid) {
      this.$emit('changeTitle', this.data)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
