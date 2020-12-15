<template>
  <v-main>
    <markdown ref="markdown" :upload="uploadFile" @submit="submit" :isSaving.sync="isSaving" name="发布文章"></markdown>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { getDocDetail, updateDoc } from '@/api/doc'
import { fileUpload } from '@/api/file'
@Component({
  computed: mapGetters(['selectedDoc'])
})
export default class DocWrite extends Vue {
  asyncData({ store, redirect }) {
    if (!store.state.modules.user.loggedIn) {
      store.commit('toggleLoginForm')
      return redirect('/')
    }
  }
  head() {
    return {
      title: '写文章'
    }
  }

  layout(context) {
    return 'doc'
  }

  selectedDoc
  uploadFile(params, config) {
    return fileUpload(params, config)
  }

  isSaving = false
  $refs: {
    markdown: HTMLFormElement
  }

  async mounted() {
    if (this.selectedDoc.id) {
      const res = await getDocDetail({ docId: this.selectedDoc.id })
      this.$refs.markdown.setContent(res.datas.body)
    }
  }

  @Watch('selectedDoc')
  async valueChanged(newval, oldval) {
    if (newval.id) {
      const res = await getDocDetail({ docId: newval.id })
      this.$refs.markdown.setContent(res.datas.body)
    }
  }

  @Watch('isSaving')
  isvalueChanged(newval, oldval) {
    if (newval) {
      this.$store.commit('PUSH_MSG', this.selectedDoc.title + ' 保存中')
    } else {
      this.$store.commit('PUSH_MSG', this.selectedDoc.title + ' 已同步')
    }
  }

  async submit(value) {
    await updateDoc({ id: this.selectedDoc.id, body: value })
  }
}
</script>

<style lang="scss" scoped></style>
