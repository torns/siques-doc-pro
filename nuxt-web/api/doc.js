import vue from 'vue'

const docApi = {
  restApi: '/doc',
  list: '/doc/findPage',
  deletedList: '/doc/deleted',
  reuse: '/doc/reuse',
  tree: '/doc/findTree',
  move: '/doc/move',
  publish: 'doc/publish',
  publishedList: 'doc/publish'
}
export function moveDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.move,
    method: 'get',
    params: parameter
  })
}

export function insertDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.restApi,
    method: 'post',
    params: { ...parameter }
  })
}

export function updateDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.restApi,
    method: 'put',
    data: parameter
  })
}

export function publishDoc(parameter, params) {
  return vue.prototype.$http({
    url: docApi.publish,
    method: 'post',
    params,
    data: parameter
  })
}

export function reuseDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.reuse,
    method: 'get',
    params: parameter
  })
}

/**
 *
 * @param {docId,isPublished} parameter
 */
export function getDocDetail(parameter) {
  return vue.prototype.$http({
    url: docApi.restApi,
    method: 'get',
    params: parameter
  })
}

/**
 *
 * @param {collectionId} parameter
 */
export function getDocTree(parameter) {
  return vue.prototype.$http({
    url: docApi.tree,
    method: 'get',
    params: parameter
  })
}

export function getDocPage(parameter) {
  return vue.prototype.$http({
    url: docApi.list,
    method: 'post',
    data: parameter
  })
}

/**
 *
 * @param {collectionId} parameter
 */
export function getDocPublished(parameter) {
  return vue.prototype.$http({
    url: docApi.publishedList,
    method: 'get',
    params: parameter
  })
}

export function getDocDeleted(parameter) {
  return vue.prototype.$http({
    url: docApi.deletedList,
    method: 'get',
    params: parameter
  })
}

export function logicDelDoc(id) {
  return vue.prototype.$http({
    url: docApi.restApi + `/${id}`,
    method: 'delete'
  })
}
/**
 *
 * @param {docId} parameter
 */
export function realDelDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.restApi,
    method: 'delete',
    params: parameter
  })
}
