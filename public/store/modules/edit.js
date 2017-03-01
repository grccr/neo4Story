var Vue = require('vue');

/**
 * Module for edit tech tools - in workPanel and maybe other
 */
module.exports = {
    state: {
        // type for node creation
        nodeType: "",
        // workMode - info (starts infoPanel), addNode (starts nodeAddPanel), edgeNode (starts edgeAddPanel),
        workMode: 'none',
        // selectorNodeActive - flag that can be used to understand switch workMode on nodeClick or not
        selectorNodeActive: false,
        selectorEdgeActive: false
    },
    mutations: {
        SWITCH_NODE_TYPE(state, nodeType) {
            //possible deprecated and useless 26.02.2017
            Vue.set(state, 'nodeType', nodeType);
        },
        SET_WORK_MODE (state, workMode) {
            Vue.set(state, 'workMode', workMode);
        },
        SET_SELECTOR_NODE_ACTIVE (state, selectorNodeActive) {
            Vue.set(state, 'selectorNodeActive', selectorNodeActive);
        },
        SET_SELECTOR_EDGE_ACTIVE (state, selectorEdgeActive) {
            Vue.set(state, 'selectorEdgeActive', selectorEdgeActive);
        }
    },
    actions: {
        switchNodeType(store, nodeType){
            store.commit("SWITCH_NODE_TYPE", nodeType);
        },
        setWorkMode (store, payload) {
            store.commit('SET_WORK_MODE', payload.workMode);
        },
        setSelectorNodeActive (store, selectorNodeActive) {
            store.commit('SET_SELECTOR_NODE_ACTIVE', selectorNodeActive);
        },
        setSelectorEdgeActive (store, selectorEdgeActive) {
            store.commit('SET_SELECTOR_EDGE_ACTIVE', selectorEdgeActive);
        }
    },
    getters: {}
};
