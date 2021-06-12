const getters = {
  selectedCollection: (state) => state.selectedCollection,
  selectedDoc: (state) => state.selectedDoc,
  docSideBar: (state) => state.docSideBar,
  extendMenu: (state) => state.extendMenu,
  pageLoading: (state) => state.pageLoading,

  userCollection: (state) => state.modules.collection.userCollection,
  deletedCollection: (state) => state.modules.collection.deletedCollection,
  recomendCollection: (state) => state.modules.collection.recomendCollection,
  docTree: (state) => state.modules.doc.docTree,
  deletedDoc: (state) => state.modules.doc.deletedDoc,
  loggedIn: (state) => state.modules.user.loggedIn,
  userInfo: (state) => state.modules.user.info,
  loadMsg: (state) => state.modules.tips.loadMsg,
  notifyMsg: (state) => state.modules.tips.notifyMsg,
  confirmMsg: (state) => state.modules.tips.confirmMsg,

  editorSideBar: (state) => state.modules.editor.editorSideBar
}

export default getters
