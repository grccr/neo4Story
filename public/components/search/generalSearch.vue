<template>
    <div>
        <search-row class="search-container" @elementSelected="onElementSelected" :clearOnSelect="true"></search-row>
    </div>
</template>
<script>


    import {mapActions} from "vuex";
    export default{
        data() {
            return {}
        },
        components: {
            searchRow: require('./autocompleteSearch/searchRow.vue')
        },
        computed: {},
        methods: {
            ...mapActions({
                addSubGraphById: "addSubGraphById",
                addSubGraphBySearchRequest: 'addSubGraphBySearchRequest'
            }),
            onElementSelected (item) {
                if (item.selected) {
                    this.addSubGraphById({id: item.selected.id});
                }
                else {
                    this.addSubGraphBySearchRequest({searchRequest: item.searchRequest});
                }
            }
        }
    }
</script>

<style>
    .search-container {
        position: fixed;
        padding-left: 17px;
        z-index: 10;
        width: 21%;
        margin-top: 14px;
        margin-left: 10px;
        min-width: 300px;
    }
</style>