import vue from 'vue'

const collectionApi = {
  userCollection: '/collection',
  insertCollection: '/collection',
  updateCollection: '/collection',
  delCollection: '/collection',
  userDelCollection: '/collection/deleted',
  reuse: '/collection/reuse'
}

export function getUserCollection() {
  return vue.prototype.$http({
    url: collectionApi.userCollection,
    method: 'get'
  })
}
export function delCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.delCollection,
    method: 'delete',
    params: parameter
  })
}

export function getUserDelCollection() {
  return vue.prototype.$http({
    url: collectionApi.userDelCollection,
    method: 'get'
  })
}

export function reUseCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.reuse,
    method: 'get',
    params: parameter
  })
}

export function insertCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.insertCollection,
    method: 'post',
    data: parameter
  })
}

export function updateCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.updateCollection,
    method: 'put',
    data: parameter
  })
}
