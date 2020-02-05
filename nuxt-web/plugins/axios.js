import Vue from 'vue'

export default function({ $axios, redirect, store }) {
  // Create a custom axios instance

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      //   redirect('/sorry')
      Vue.prototype.$notify({
        type: 'error',
        message: error.response.data.message
      })
    }
  })
}
