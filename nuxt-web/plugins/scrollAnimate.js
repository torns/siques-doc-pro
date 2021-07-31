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
        $('#menu').addClass('up')
        $('#menu').removeClass('down')
        $('#scroll-top').addClass('up')
        $('#scroll-top').removeClass('down')
      } else {
        $('#menu').addClass('down')
        $('#menu').removeClass('up')

        $('#scroll-top').addClass('down')
        $('#scroll-top').removeClass('up')
      }
      if (top > 200) {
        $('#sidebar').css('position', 'fixed')
        $('#sidebar').css('top', '150px')
      } else {
        $('#sidebar').css('position', 'absolute')
        $('#sidebar').css('top', '350px')
      }
    }
  })
}
