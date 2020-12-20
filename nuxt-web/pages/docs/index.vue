<template>
  <v-main app>
    <QuillEditor
      v-show="!loading"
      ref="markdown"
      :upload="uploadFile"
      :saving.sync="saving"
      @focus="onEditorFocus($event)"
      @submit="submit"
    ></QuillEditor>
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

  onEditorFocus() {
    this.$store.commit('modules/editor/SET_SIDEBAR', false)
  }

  loading = false

  layout(context) {
    return 'doc'
  }

  selectedDoc
  uploadFile(params, config) {
    return fileUpload(params)
  }

  saving = false
  $refs: {
    markdown: HTMLFormElement
  }

  async mounted() {
    if (this.selectedDoc.id) {
      const loading = this.$loading({ text: '努力加载中', status: this.loading })

      const res = await getDocDetail({ docId: this.selectedDoc.id })
      this.$refs.markdown.setContent(res.datas.body)

      loading.close()
    }
  }

  @Watch('selectedDoc')
  async valueChanged(newval, oldval) {
    if (newval.id) {
      const loading = this.$loading({ text: '努力加载中', status: this.loading })

      const res = await getDocDetail({ docId: newval.id })
      this.$refs.markdown.setContent(res.datas.body)

      loading.close()
    }
  }

  @Watch('saving')
  isvalueChanged(newval, oldval) {
    if (newval) {
      this.$store.commit('PUSH_MSG', this.selectedDoc.title + ' 保存中')
    } else {
      this.$store.commit('PUSH_MSG', this.selectedDoc.title + ' 已同步')
      this.$notify({ text: this.selectedDoc.title + ' 已同步' })
    }
  }

  async submit(value) {
    // await updateDoc({ id: this.selectedDoc.id, body: value })
  }
}
</script>

<style lang="scss" scoped></style>
