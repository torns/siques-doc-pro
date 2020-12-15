import vue from 'vue'

const docApi = {
  docList: '/doc/findPage',
  createDoc: '/doc',
  delDoc: '/doc/logic',
  reuseDoc: '/doc/reuse',
  updateDoc: '/doc',
  delDocList: '/doc/deleted',
  getDocDetail: '/doc',
  docTree: '/doc/findTree',
  moveDoc: '/doc/move',
  publishedList: 'doc/publish',
  publishDoc: 'doc/publish'
}
export function moveDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.moveDoc,
    method: 'get',
    params: parameter
  })
}

export function updateDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.updateDoc,
    method: 'put',
    data: parameter
  })
}

/**
 *
 * @param {collectionId} parameter
 */
export function getDocTree(parameter) {
  return vue.prototype.$http({
    url: docApi.docTree,
    method: 'get',
    params: parameter
  })
}

export function getDocList(parameter) {
  return vue.prototype.$http({
    url: docApi.docList,
    method: 'post',
    data: parameter
  })
}

export function publishDoc(parameter, params) {
  return vue.prototype.$http({
    url: docApi.publishDoc,
    method: 'post',
    params,
    data: parameter
  })
}

/** collectionId  */
export function getPublishedList(parameter) {
  return vue.prototype.$http({
    url: docApi.publishedList,
    method: 'get',
    params: parameter
  })
}

export function getDocDetail(parameter) {
  return vue.prototype.$http({
    url: docApi.getDocDetail,
    method: 'get',
    params: parameter
  })
}

export function createDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.createDoc,
    method: 'post',
    params: { ...parameter }
  })
}

export function delDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.delDoc + `/${parameter}`,
    method: 'delete'
  })
}

export function reuseDoc(parameter) {
  return vue.prototype.$http({
    url: docApi.reuseDoc,
    method: 'get',
    params: parameter
  })
}

export function getDelDocList(parameter) {
  return vue.prototype.$http({
    url: docApi.delDocList,
    method: 'get',
    params: parameter
  })
}
