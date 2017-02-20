<template>
    <div class="info-panel">
        <person-card :information="information" v-if="information.semantic_type == 'Person'"></person-card>
        <company-card :information="information" v-if="information.semantic_type == 'Company'"></company-card>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default{
        data() {
            return {}
        },
        components: {
            personCard: require('./cards/personCard/personCard.vue'),
            companyCard: require('./cards/companyCard/companyCard.vue')
        },
        computed: {
            information () {
                let selectedNodes = this.$store.state.graph.selectedElements;
//                let selectedNodes = this.$store.state.graph.nodes.filter((node) => selectedIds.includes(node.id));
                return selectedNodes[0];
            }
        },
        methods: {
            ...mapActions({
                exploreNode: "exploreNode",
                neo4jSearch: "neo4jSearch",
                selectNodes: 'selectNodes'
            }),
            exploreButtonClick () {
                let selectedIds = this.$store.state.graph.selectedElements;
                let selectedNodes = this.$store.state.graph.nodes.filter((node) => selectedIds.includes(node.id));
                let name = selectedNodes[0].name;
                let surname = selectedNodes[0].surname;
                this.neo4jSearch({name: name, surname: surname, update: true});
//                this.exploreNode({name, surname})
            }
        }
    }
</script>

<style>
    /*.info-panel {*/
        /*width: 20%;*/
        /*max-height: 70%;*/
        /*min-width: 320px;*/
        /*top: 100px;*/
        /*position: fixed;*/
        /*padding-left: 15px;*/
    /*}*/


</style>