const getters = {
  selectedCollection: (state) => state.selectedCollection,
  selectedDoc: (state) => state.selectedDoc,
  userCollection: (state) => state.modules.collection.userCollection,
  delCollection: (state) => state.modules.collection.delCollection,
  docTree: (state) => state.modules.doc.docTree,
  loggedIn: (state) => state.modules.user.loggedIn
}

export default getters
