import vue from 'vue'

const searchApi = {
  search: '/search/nest_doc',
  predictive: '/search/predictive/nest_doc'
}

/**
 *
 * @param {pageNum,pageSize,queryStr} parameter
 */
export function getSearchResult(parameter) {
  return vue.prototype.$http({
    url: searchApi.search,
    method: 'post',
    data: parameter
  })
}

/**
 *
 * @param {filedName,prefix} parameter
 */
export function predictiveSearch(parameter) {
  return vue.prototype.$http({
    url: searchApi.predictive,
    method: 'post',
    data: parameter
  })
}
