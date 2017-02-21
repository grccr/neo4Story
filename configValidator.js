/**
 * Created by forwardmomentum on 21.02.17.
 */

module.exports = {
    validateNodeTypes: (nodeTypes) => {
        if (!nodeTypes) return {success: false, message: 'node types undefined!'};
        if (nodeTypes.length == 0) return {success: false, message: 'empty node types list!'};
        for (let typeIndex in nodeTypes) {
            let type = nodeTypes[typeIndex];
            if (!type.name) return {success: false, message: 'type with ' + typeIndex + ' has no name!'};
            if (!type.value) return {success: false, message: 'type with ' + type.name + ' has no value!'};
            if (!type.fields) return {success: false, message: 'type ' + type.name + ' has no fields!'};
            if (type.fields.length == 0) return {
                success: false,
                message: 'type ' + type.name + ' has empty fields list!'
            };

            if (type.fields.filter((field) => {
                    return !field.name;
                }).length > 0)
                return {
                    success: false,
                    message: 'type ' + type.name + ' has field without name!'
                };

            if (type.fields.filter((field) => {
                    return field.required;
                }).length == 0)
                return {
                    success: false,
                    message: 'type ' + type.name + ' has all fields without required flag! At least one field must be required'
                };

            if (type.fields.filter((field) => {
                    return !field.name
                }).length > 0)
                return {success: false, message: 'type ' + type.name + ' has field/s without name!'};
            if (type.fields.filter((field) => {
                    return !field.alias
                }).length > 0)
                return {success: false, message: 'type ' + type.name + ' has field/s without alias!'};
            if (!type.mainLabelField) return {
                success: false,
                message: 'type with ' + type.name + ' has no mainLabelField!'
            };

            if(!type.fields.map((field) => { return field.name; }).includes(type.mainLabelField))
                return { success: false, message: 'type ' + type.name + ' has mainLabelField not from fields of this type!'};

        }
        return {success: true};
    },
    validateEdgeTypes (edgeTypes) {
        // todo
        return {success: true};
    }
};