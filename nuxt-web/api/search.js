import vue from 'vue'

const searchApi = {
  search: '/search/nest_doc'
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
