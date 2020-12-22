import vue from 'vue'

const historyApi = {
  docHistory: '/doc/history'
}

/**
 *
 * @param {docId} parameter
 */
export function getDocHistory(parameter) {
  return vue.prototype.$http({
    url: historyApi.docHistory,
    method: 'get',
    params: parameter
  })
}
/**
 *
 * @param {updated} parameter
 */
export function getDocHistoryDetail(id, parameter) {
  return vue.prototype.$http({
    url: historyApi.docHistory + `/${id}`,
    method: 'get',
    params: parameter
  })
}

/**
 *
 * @param {versionId} parameter
 */
export function retrack(parameter) {
  return vue.prototype.$http({
    url: historyApi.docHistory,
    method: 'put',
    params: parameter
  })
}
