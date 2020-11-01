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

      if (temp - top > 0) {
        // console.log('持续向上')
        $('#navigation').removeClass('animated fadeOut show')
        $('#navigation').addClass('animated fadeIn show')
      } else {
        // console.log('持续向下')
        $('#navigation').removeClass('animated fadeIn hide')
        $('#navigation').addClass('animated fadeOut show')
      }

      // console.log(top)
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
