<template>
  <div>
    <DocInnerAppBar v-show="!loading && selectedDoc.id"></DocInnerAppBar>
    <v-main id="doc-content" style="padding-top:120px" app>
      <CkEditor v-show="!loading && selectedDoc.id" ref="editor" v-scroll-spy @focus="onEditorFocus($event)"></CkEditor>
      <v-banner v-show="!selectedDoc.id" two-line>
        <v-avatar slot="icon" color="deep-purple accent-4" size="40">
          <v-icon icon="mdi-lock" color="white">
            mdi-lock
          </v-icon>
        </v-avatar>

        选择你要查看的文档
      </v-banner>
    </v-main>
    <PostToc></PostToc>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { getDocDetail } from '@/api/doc'
import toc from '@/plugins/toc'
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

  loading = false

  selectedDoc

  saving = false
  $refs: {
    editor: HTMLFormElement
  }

  onEditorFocus() {
    this.$store.commit('modules/editor/SET_SIDEBAR', false)
  }

  async mounted() {
    if (this.selectedDoc.id) {
      const loading = this.$loading({ text: '努力加载中', status: this.loading })

      const res = await getDocDetail({ docId: this.selectedDoc.id })
      this.$refs.editor.setContent(res.datas.body, this.selectedDoc.id)

      loading.close()

      toc()
    }
  }

  @Watch('selectedDoc')
  async valueChanged(newval, oldval) {
    if (newval.id) {
      const loading = this.$loading({ text: '努力加载中', status: this.loading })

      const res = await getDocDetail({ docId: newval.id })
      this.$refs.editor.setContent(res.datas.body, newval.id)
      this.$store.commit('SET_DOC_BODY', res.datas.body)
      toc()
      loading.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
