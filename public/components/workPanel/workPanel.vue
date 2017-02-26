<template>
    <div class="work-panel">

        <info-panel v-if="mode=='info'"></info-panel>
        <add-node-panel v-if="mode=='addNode'"></add-node-panel>
        <add-edge-panel v-if="mode=='addEdge'" :selectedElements="selectedElements"></add-edge-panel>

    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {}
        },
        components: {
            infoPanel: require('./infoPanel/infoPanel.vue'),
            addEdgePanel: require('./addEdgePanel/addEdgePanel.vue'),
            addNodePanel: require('./addNodePanel/addNodePanel.vue')
        },
        computed: {
            mode () {
                return this.$store.state.edit.workMode;
            },
            selectedElements () {
                return this.$store.state.graph.selectedElements;
            }
        },
        mounted () {

        },
        methods: {}
    }
</script>


<style>
    .work-panel {
        /*width: 20%;*/
        max-height: 70%;
        min-width: 350px;
        max-width: 25%;
        top: 100px;
        position: fixed;
        padding-left: 15px;
    }
</style>