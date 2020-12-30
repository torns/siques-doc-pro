// Update the "Status: Saving..." info.
import toc from '@/plugins/toc'
export default (editor, vue) => {
  const pendingActions = editor.plugins.get('PendingActions')

  pendingActions.on('change:hasAny', (evt, propertyName, newValue) => {
    const title = vue.$store.state.selectedDoc.title || ' '
    if (newValue) {
      toc()
      vue.$store.commit('PUSH_MSG', title + ' 保存中😱')
    } else {
      toc()
      vue.$store.commit('PUSH_MSG', title + ' 已同步😊')
      // vue.$notify({ text: vue.$store.state.selectedDoc.title + ' 已同步' })
    }
  })
}
