import vue from 'vue'

const collectionApi = {
  restApi: '/collection',
  pageCollection: '/collection/findPage',
  deletedCollection: '/collection/deleted',
  reuse: '/collection/reuse',
  cover: '/collection/cover'
}

export function coverUpload(parameter) {
  return vue.prototype.$http({
    url: collectionApi.cover,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: parameter
  })
}

// 获取用户的集合
export function getCollection() {
  return vue.prototype.$http({
    url: collectionApi.restApi,
    method: 'get'
  })
}

export function insertCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.restApi,
    method: 'post',
    data: parameter
  })
}

export function updateCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.restApi,
    method: 'put',
    data: parameter
  })
}
export function delCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.restApi,
    method: 'delete',
    params: parameter
  })
}

/**
 *
 * @param {pageNum,pageSize} parameter
 */
export function pageCollection(parameter) {
  return vue.prototype.$http({
    url: collectionApi.pageCollection,
    method: 'post',
    data: parameter
  })
}

export function getUserDelCollection() {
  return vue.prototype.$http({
    url: collectionApi.deletedCollection,
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
