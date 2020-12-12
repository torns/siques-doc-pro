import _ from 'lodash'
export default () => {
  /* eslint-disable */

  $(document).ready(function() {
    let temp = 0
    let top = 0
    // 减流
    var re = _.debounce(refresh, 50)
    $(window).scroll(re)

    function refresh() {
      temp = top

      top = $(document).scrollTop()

      if (top < 2) {
        $('#menu').removeClass('showMenu')
        $('#menu').addClass('hideMenu')
      } else {
        $('#menu').removeClass('hideMenu')
        $('#menu').addClass('showMenu')
      }
    }
  })
}
