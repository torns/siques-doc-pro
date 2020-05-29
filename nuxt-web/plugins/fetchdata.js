import BuildUrl from 'build-url'
import vue from 'vue'

const http = vue.prototype.$http

async function fetchData({ resource = '', page = 0, pageSize = '', search = '', sort = '', tags = null, taglist = '', type = '', success = (res) => {}, fail = () => {}, complete = () => {} }) {
  const queryParams = {}

  if (page) queryParams.page = page
  if (pageSize) queryParams.limit = pageSize
  if (search) queryParams.q = search
  if (sort) queryParams.sort = sort
  if (tags) queryParams.tags = tags
  if (taglist) queryParams.taglist = taglist
  if (type) queryParams.type = type

  // eslint-disable-next-line no-undef
  const url = BuildUrl(process.env.API_URL, {
    path: resource,
    queryParams
  })

  try {
    const res = await http.request({
      url,
      fail(error) {
        error.message = '服务出现问题，请稍后再试'
        fail(error)
      }
    })

    const { status } = res

    switch (status) {
      case 200:
        success(res)
        break

      default:
        throw new Error('服务出现问题，请稍后再试')
    }
  } catch (error) {
    fail(error)
  }

  complete()
}

export default fetchData
