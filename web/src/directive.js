import Vue from "vue"
Vue.directive('focus', {
    inserted: function (el) {
        //获得原生输入框
        el.getElementsByTagName("input")[0].focus()

    }
})