/**
 * Created by forwardmomentum, 20.02.17.
 */

'use strict';

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
        SET_NODE_TYPES_CONFIGURATION(state, edgeTypes) {
            Vue.set(state, 'edgeTypes', edgeTypes);
        }
    },
    actions: {
        setNodeTypesConfig() {
            // todo validation, decoration and commit to state of config
        },
        setEdgeTypesConfig() {
            // todo validation, decoration and commit to state of config
        }
    },
    getters: {}
};
