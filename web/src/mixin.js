var myMixin = {

    mounted() {

    },
    watch: {
        "$route": function () {

            window.scrollTo(0, 0);


        },
        data() {
            return {
                scroll: ""
            }
        }

    },

}
export default myMixin