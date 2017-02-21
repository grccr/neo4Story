/**
 * Created by forwardmomentum, 20.02.17.
 */

var Vue = require('vue');


/**
 * Configuration state management
 */
module.exports = {
    state: {
        nodeTypes: [],
        edgeTypes: []
    },
    mutations: {
        SET_NODE_TYPES_CONFIGURATION(state, nodeTypes) {
            Vue.set(state, 'nodeTypes', nodeTypes);
        },
        SET_EDGE_TYPES_CONFIGURATION(state, edgeTypes) {
            Vue.set(state, 'edgeTypes', edgeTypes);
        }
    },
    actions: {
        setNodeTypesConfig(store, nodeTypes) {
            store.commit('SET_NODE_TYPES_CONFIGURATION', nodeTypes);
        },
        setEdgeTypesConfig() {
            store.commit('SET_EDGE_TYPES_CONFIGURATION', edgeTypes);
        }
    },
    getters: {}
};
