
var mixin = {
    data: function () {
        return {


        }
    },

    watch: {
        "$route": function () {

            window.scrollTo(0, 0);
        },

    }
}
export default mixin