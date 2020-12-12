<template>
  <v-main>
    <markdown ref="markdown" @submit="submit" :isSaving.sync="isSaving" name="发布文章"></markdown>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { getDocDetail, updateDoc } from '@/api/doc'
@Component({
  computed: mapGetters(['selectedDoc'])
})
export default class DocWrite extends Vue {
  head() {
    return {
      title: '写文章'
    }
  }

  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.loggedIn) {
      store.commit('toggleLoginForm')
      return redirect('/')
    }
  }

  layout(context) {
    return 'doc'
  }
  isSaving = false
  $refs: {
    markdown: HTMLFormElement
  }

  selectedDoc
  @Watch('selectedDoc')
  async valueChanged(newval, oldval) {
    const res = await getDocDetail({ docId: newval.id })
    this.$refs.markdown.setContent(res.datas.body)
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
