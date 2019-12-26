import Vue from "vue"
Vue.directive('focus', {
    inserted: function (el) {

        el.getElementsByTagName("input")[0].focus()

    }
})