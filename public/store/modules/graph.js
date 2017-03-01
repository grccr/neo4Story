

'use strict';

var Vue = require('vue');

module.exports = {
    state: {
        selectedNodes: [],
        selectedEdges: [],
        nodes: [], //rawData.nodes,
        edges: [],  //rawData.edges,
        nodesMap: {},
        edgesMap: {},
        layoutFlag: false
    },
    mutations: {
        ADD_NODE (state, payload) {
            let temp = state.nodes;
            temp.push(temp);
            Vue.set(state, 'nodes', temp);
        },
        UPDATE_NODES (state, payload) {

        },
        ADD_NODE_TO_SELECTION (state, element) {
            let selectedElements = JSON.parse(JSON.stringify(state.selectedNodes));
            selectedElements.selectedd = true;
            selectedElements.push(element);
            let tempNodes = [];
            state.nodes.forEach((node) => {
                // node.selected = false;
                if (node.id == element.id){
                    node.selected = true;
                }
                tempNodes.push(node);
            });
            Vue.set(state, 'selectedNodes', selectedElements);
            Vue.set(state, 'nodes', tempNodes);
        },
        ADD_EDGE_TO_SELECTION (state, element) {
            let selectedElements = JSON.parse(JSON.stringify(state.selectedNodes));
            selectedElements.selectedd = true;
            selectedElements.push(element);
            let tempEdges = [];
            state.edges.forEach((edge) => {
                // node.selected = false;
                if (edge.id == element.id){
                    edge.selected = true;
                }
                tempEdges.push(edge);
            });
            Vue.set(state, 'selectedEdges', selectedElements);
            Vue.set(state, 'edges', tempEdges);
        },
        RESET_SELECTION (state) {
            let tempNodes = [];
            let tempEdges = [];
            state.nodes.forEach((node) => {
                node.selected = false;
                tempNodes.push(node);
            });
            state.edges.forEach((edge) => {
                edge.selected = false;
                tempEdges.push(edge);
            });
            Vue.set(state, 'nodes', tempNodes);
            Vue.set(state, 'edges', tempEdges);
            Vue.set(state, 'selectedNodes', []);
            Vue.set(state, 'selectedEdges', []);
        },
        SET_GRAPH(state, graph){
            Vue.set(state, 'nodes', graph.nodes);
            Vue.set(state, 'edges', graph.edges);
            Vue.set(state, 'nodesMap', graph.nodesMap);
            Vue.set(state, 'edgesMap', graph.edgesMap);
            // Vue.set(state, 'graphData', graph);
        },
        SET_NODES(state, nodes){
            Vue.set(state, 'nodes', nodes);
        },
        UPDATE_GRAPH(state, graph) {
            // console.log(graph);
            // console.log('IN MUTATION!!!');
            let tempNodes = state.nodes;
            let tempEdges = state.edges;
            let tempNodesMap = state.nodesMap;
            let tempEdgesMap = state.edgesMap;
            graph.nodes.forEach((node) => {
                if (node.id in state.nodesMap) {

                }
                else {
                    node.selected = false;
                    tempNodes.push(node);
                    tempNodesMap[node.id] = node;
                }
            });
            graph.edges.forEach((edge) => {
                if (edge.id in state.edgesMap) {

                }
                else {
                    tempEdges.push(edge);
                    tempEdgesMap[edge.id] = edge;
                }
            });
            Vue.set(state, 'nodes', tempNodes);
            Vue.set(state, 'edges', tempEdges);
            Vue.set(state, 'nodesMap', tempNodesMap);
            Vue.set(state, 'edgesMap', tempEdgesMap);
        },
        GRAPH_LAYOUT (state, layoutFlag) {
            // this.$store.state.graph.layoutActive = true;
            Vue.set(state, "layoutFlag", layoutFlag);
            // Vue.set(state, "layoutActive", true);
        }
    },
    actions: {
        // ...mapActions({
        //     neo4jFullTextSearch: "neo4jFullTextSearch",
        //     neo4jSearchById: "neo4jSearchById",
        //     neo4jResponseParse: "neo4jResponseParse"
        //
        // }),
        deactivateSelect (store, payload) {                   // can be replaced with selectNodes([]). if correct -> delete
            store.commit("SELECT_ELEMENTS", false);
        },
        updateGraph(store, graph) {
            store.commit("SET_GRAPH", graph);
            // store.commit("SET_NODES", graph.nodes);
        },
        addSubGraphBySearchRequest (store, payload) {
            if (payload.searchRequest && payload.searchRequest.length > 0) {
                store.dispatch('neo4jFindAllMatches', payload)
                    .then(graphResponse => {
                        store.commit('UPDATE_GRAPH', graphResponse)
                    });
            }
        },
        addSubGraphById (store, payload) {
            store.dispatch('neo4jSearchById', payload)
                .then(graphResponse => {
                    store.commit('UPDATE_GRAPH', graphResponse);
                });
        },
        addNewEdge(store, payload) {
            store.dispatch('neo4jCreateEdge', payload)
                .then((graph) =>  {
                if (graph.edges[0].source in store.state.nodesMap && graph.edges[0].target in store.state.nodesMap) {
                store.commit("UPDATE_GRAPH", graph)}
            });

        },
        addNewNode(store, payload) {
            // if (payload.nodeType == 'Person') {
            store.dispatch('neo4jCreateNode', payload)
                .then(graph =>  store.commit("UPDATE_GRAPH", graph));
            // }
            // else if (payload.nodeType == 'Company') {
            //     store.dispatch('neo4jCreateCompany', payload.nodeData)
            //         .then(graph =>  store.commit("UPDATE_GRAPH", graph));
            // }
        },
        addNodeToSelection (store, element) {
            store.commit("ADD_NODE_TO_SELECTION", element);
        },
        addEdgeToSelection (store, element) {
            store.commit("ADD_EDGE_TO_SELECTION", element);
        },
        resetSelection (store) {
            store.commit("RESET_SELECTION");
        },
        exploreNode(store, payload) {
            store.dispatch("neo4jSearch", payload);
        },
        cleanGraph(store, graph){
            store.commit("SET_GRAPH", {nodes: [], edges: [], nodesMap: {}, edgesMap: {}})
        },
        graphLayout(store, payload) {
            store.commit("GRAPH_LAYOUT", payload.layoutFlag);
        }

    },
    getters: {}
};
