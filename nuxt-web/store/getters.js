const getters = {
  selectedCollection: (state) => state.selectedCollection,
  selectedDoc: (state) => state.selectedDoc,
  userCollection: (state) => state.modules.collection.userCollection,
  delCollection: (state) => state.modules.collection.delCollection,
  docTree: (state) => state.modules.doc.docTree,
  loggedIn: (state) => state.modules.user.loggedIn,
  userInfo: (state) => state.modules.user.info,
  delDoc: (state) => state.modules.doc.delDoc,
  loadMsg: (state) => state.modules.tips.loadMsg,
  notifyMsg: (state) => state.modules.tips.notifyMsg,
  docSideBar: (state) => state.docSideBar,
  extendMenu: (state) => state.extendMenu,
  confirmMsg: (state) => state.modules.tips.confirmMsg,
  recomendCollection: (state) => state.modules.collection.recomendCollection,
  pageLoading: (state) => state.pageLoading,
  editorSideBar: (state) => state.modules.editor.editorSideBar
}

export default getters
