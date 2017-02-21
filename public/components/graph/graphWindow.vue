<template>
    <div>
        <div id="graph-container"></div>
    </div>
</template>
<script>

    import {mapActions} from "vuex";
    let $sigma = window.sigma;
    export default{
        data() {
            return {}
        },
        components: {},
        computed: {
            graphData () {
                //todo image caching before render should be here
                let {nodes, edges
//                    nodesMap,
//                    edgesMap
                } = this.$store.state.graph;
                return {
                    nodes,
                    edges
//                    nodesMap,
//                    edgesMap
                };
            },
            layoutFlag(){
                return this.$store.state.graph.layoutFlag;
            }
        },
        watch: {
            graphData(newVal, oldVal){
                this.sigmaInstance.graph.clear();
                this.sigmaInstance.graph.read(newVal);
                this.sigmaInstance.refresh();
            },
            layoutFlag (newVal, oldVal) {
                if (newVal) {
                    this.sigmaInstance.startForceAtlas2({
                        worker: false,
                        barnesHutOptimize: false,
                        scalingRatio: 200,
//                    iterationsPerRender: 100,
                        startingIterations: 1
//                        outboundAttractionDistribution: true}
                    });


                    setTimeout(() => {
                        this.sigmaInstance.stopForceAtlas2();
                        let graph = {
                            nodes: this.sigmaInstance.graph.nodes(),
                            edges: this.sigmaInstance.graph.edges(),
                            nodesMap: this.$store.state.graph.nodesMap,
                            edgesMap: this.$store.state.graph.edgesMap
                        };
                        this.sigmaInstance.killForceAtlas2();
                        this.updateGraph(graph);
                    }, 500);

                    this.graphLayout(false);
                }
            }
        },
        methods: {
            ...mapActions({
                resetSelection: "resetSelection",
                addElementToSelection: "addElementToSelection",
                neo4jSearch: "neo4jSearch",
                updateGraph: "updateGraph",
                graphLayout: "graphLayout",
                setWorkMode: "setWorkMode",
                addSubGraphById: 'addSubGraphById'
            }),
            onNodeClick(event) {
                if (!this.$store.state.edit.selectorNodeActive) {
                    this.resetSelection();
                    this.addElementToSelection(JSON.parse(JSON.stringify(event.data.node)));
                    this.setWorkMode({workMode: 'info'});
                }
                else
                    this.addElementToSelection(JSON.parse(JSON.stringify(event.data.node)));
            },
            onNodeDoubleClick(event) {
                let selectedNodes = this.$store.state.graph.selectedElements;
                this.addSubGraphById({id: selectedNodes[0].id});
            },
            onClickStage(event) {
                this.resetSelection();
                this.setWorkMode({workMode: 'none'});
            }
        },
        mounted () {
            this.$nextTick(function () {
                var self = this;
                $sigma.canvas.nodes.image.cacheArray(
                        ['img/pig.png', 'img/person.png', 'img/factory.png'],
                        function () {
                            self.sigmaInstance = new $sigma({
                                graph: self.graphData,
                                settings: {
                                    doubleClickEnabled: false,
                                    defaultNodeColor: '#93bcff',
                                    drawLabels: true,
                                    borderSize: 2,
                                    defaultNodeBorderColor: '#000',
                                    zoomMax: 2,
                                    zoomMin: 0.01,
                                    nodesPowRatio: 0.8,
                                    zoomingRatio: 4,
                                    nodeHoverColor: 'default',
                                    edgeHoverExtremities: true,
                                    enableEdgeHovering: true,
                                    edgeHoverSizeRatio: 2,
                                    autoResize: false,
                                    font: 'Roboto',
                                    labelSize: 'proportional',
                                    labelSizeRatio: 1,
                                    labelThreshold: 10,
                                    defaultHoverLabelBGColor: '#fff',
                                    drawEdgeLabels: true,
                                    edgeLabelSize: 'proportional',
                                    defaultEdgeLabelColor: '#000',
                                    defaultEdgeLabelActiveColor: '#000'
                                },
                                renderers: [
                                    {
                                        container: document.getElementById('graph-container'),
                                        type: 'canvas'
                                    }
                                ]
                            });
                            self.sigmaInstance.bind('clickNode', self.onNodeClick);
                            self.sigmaInstance.bind('doubleClickNode', self.onNodeDoubleClick);
                            self.sigmaInstance.bind('clickStage', self.onClickStage);
                        }
                );
            });
        }
    }


</script>

<style>
    #graph-container {
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background-color: #EBEBEB;
    }

</style>