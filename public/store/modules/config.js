/**
 * Created by forwardmomentum, 20.02.17.
 */

var Vue = require('vue');

let validateNodeTypes = (nodeTypes) => {

    if (!nodeTypes) return {success: false, message: 'node types undefined!'};
    if (nodeTypes.length == 0) return {success: false, message: 'empty node types list!'};
    for (let typeIndex in nodeTypes) {
        let type = nodeTypes[typeIndex];
        if (!type.name) return {success: false, message: 'type with ' + typeIndex + ' has no name!'};
        if (!type.value) return {success: false, message: 'type with ' + type.name + ' has no value!'};
        if (!type.fields) return {success: false, message: 'type ' + type.name + ' has no fields!'};
        if (type.fields.length == 0) return {success: false, message: 'type ' + type.name + ' has empty fields list!'};
        if (type.fields.filter((field) => { return field.required; }).length == 0)
            return {
                success: false,
                message: 'type ' + type.name + ' has all fields without required flag! At least one field must be required'
            };
        if(type.fields.filter((field) => { return !field.name}).length > 0)
            return {success: false, message: 'type ' + type.name + ' has field/s without name!'};
        if(type.fields.filter((field) => { return !field.alias}).length > 0)
            return {success: false, message: 'type ' + type.name + ' has field/s without alias!'};
        if(!type.mainLabelField) return {success: false, message: 'type with ' + type.name + ' has no mainLabelField!'};
    }

    return {success: true};

};

let prepareNodeTypes = (nodeTypes) => {

    // set defaults
    return nodeTypes;
};

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
        setNodeTypesConfig(store, nodeTypes) {
            let validateResult = validateNodeTypes(nodeTypes);
            if (validateResult.success)
                store.commit('SET_NODE_TYPES_CONFIGURATION', prepareNodeTypes(nodeTypes));
            else
                console.error(validateResult.message);
        },
        setEdgeTypesConfig() {
            // todo validation, decoration and commit to state of config
        }
    },
    getters: {}
};
