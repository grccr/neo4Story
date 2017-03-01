<template>
    <div class="info-panel">
        <node-card :information="nodeInformation" v-if="mode=='nodeInfo'"></node-card>
        <edge-card :information="edgeInformation" v-if="mode=='edgeInfo'"></edge-card>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    export default{
        data() {
            return {}
        },
        components: {
            nodeCard: require('./cards/nodeCard/nodeCard.vue'),
            edgeCard: require('./cards/edgeCard/edgeCard.vue')
        },
        computed: {
            nodeInformation () {
                let selectedNodes = this.$store.state.graph.selectedNodes;
//                let selectedNodes = this.$store.state.graph.nodes.filter((node) => selectedIds.includes(node.id));
                return selectedNodes[0];
            },
            mode () {
                return this.$store.state.edit.workMode;
            },
            edgeInformation () {
                let selectedEdges = this.$store.state.graph.selectedEdges;
//                let selectedNodes = this.$store.state.graph.nodes.filter((node) => selectedIds.includes(node.id));
                return selectedEdges[0][0];
            }
        },
        methods: {
//            ...mapActions({
//                exploreNode: "exploreNode",
//                neo4jSearch: "neo4jSearch",
//                selectNodes: 'selectNodes'
//            }),
//            exploreButtonClick () {
//                let selectedIds = this.$store.state.graph.selectedNodes;
//                let selectedNodes = this.$store.state.graph.nodes.filter((node) => selectedIds.includes(node.id));
//                let name = selectedNodes[0].name;
//                let surname = selectedNodes[0].surname;
//                this.neo4jSearch({name: name, surname: surname, update: true});
////                this.exploreNode({name, surname})
//            }
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