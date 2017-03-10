/**
 * Created by forwardmomentum on 21.02.17.
 */

const validEditControls = ['input', 'select', 'datepicker', 'range'];

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

            let fieldNames = type.fields.map((field) => { return field.name; });

            if(!fieldNames.includes(type.mainLabelField))
                return { success: false, message: 'type ' + type.name + ' has mainLabelField not from fields of this type!'};

            if(type.fields.filter((field) => {
                    if (!field.editControl) return false;
                    return !validEditControls.includes(field.editControl)
                }).length > 0)
                return { success: false, message: 'type ' + type.name + ' has field with not valid editControl!'};

            if(!type.swSearchFields)
                return { success: false, message: 'type ' + type.name + ' has no swSearchFields'};

            var flag = true;
            if (type.swSearchFields) {
                type.swSearchFields.forEach((searchField) => {
                    if(!fieldNames.includes(searchField))
                        flag = false;
                });
            }
            if(!flag) return { success: false, message: 'type ' + type.name + ' has swSearchField/s not from fields of this type!'};

            if(!type.conSearchFields)
                return { success: false, message: 'type ' + type.name + ' has no conSearchFields'};

            if (type.conSearchFields.length == 0 && type.swSearchFields.length == 0)
                return { success: false, message: 'type ' + type.name + ' has both swSearchField conSearchFields empty'};

            flag = true;
            if (type.conSearchFields) {
                type.conSearchFields.forEach((searchField) => {
                    if(!fieldNames.includes(searchField))
                        flag = false;
                });
            }
            if(!flag) return { success: false, message: 'type ' + type.name + ' has conSearchField/s not from fields of this type!'};

            //todo icon validator

        }
        return {success: true};
    },
    validateEdgeTypes (edgeTypes, nodeTypes) {

        if (!nodeTypes) return {success: false, message: 'node types undefined!'};
        if (!edgeTypes) return {success: false, message: 'node types undefined!'};
        let nodeTypesNames = nodeTypes.map((type) => {
            return type.name
        });
        if (edgeTypes.length == 0) return {success: false, message: 'empty node types list!'};
        for (let typeIndex in edgeTypes) {
            let type = edgeTypes[typeIndex];
            if (!type.name) return {success: false, message: 'type with ' + typeIndex + ' has no name!'};
            if (!type.value) return {success: false, message: 'type with ' + type.name + ' has no value!'};
            if (!type.fields) return {success: false, message: 'type ' + type.name + ' has no fields!'};
            if (type.fields.length == 0) return {
                success: false,
                message: 'type ' + type.name + ' has empty fields list!'
            };

            if (!type.hasOwnProperty('oriented')) return {success: false, message: 'type ' + type.name + ' has no orientation!'};

            if (type.fields.filter((field) => {
                    return !field.name;
                }).length > 0)
                return {
                    success: false,
                    message: 'type ' + type.name + ' has field without name!'
                };

            if (type.fields.filter((field) => {
                    return !field.name
                }).length > 0)
                return {success: false, message: 'type ' + type.name + ' has field/s without name!'};
            if (type.fields.filter((field) => {
                    return !field.alias
                }).length > 0)
                return {success: false, message: 'type ' + type.name + ' has field/s without alias!'};

            if(type.fields.filter((field) => {
                    if (!field.editControl) return false;
                    return !validEditControls.includes(field.editControl)
                }).length > 0)
                return { success: false, message: 'type ' + type.name + ' has field with not valid editControl!'};

            let fieldNames = type.fields.map((field) => { return field.name; });

            if (!type.allowedLinks) return {success: false, message: 'type ' + type.name + ' has no allowedLinks!'};

            if (Object.keys(type.allowedLinks).length === 0 && type.allowedLinks.constructor === Object)
                return {success: false, message: 'type ' + type.name + ' has empty allowedLinks!'};

            if (type.allowedLinks) {
                for (var key in type.allowedLinks) {
                    if (type.allowedLinks.hasOwnProperty(key)) {
                        // do stuff
                        if (!nodeTypesNames.includes(key)) {
                            return {
                                success: false,
                                message: 'type ' + type.name + ' has non existing ' + 'nodeTypeName: ' + key + ' as a key in allowedLinks'};
                        }
                        if (!type.allowedLinks[key]) return {
                            success: false,
                            message: ' allowedLinks with key '+ key + '' + 'of type ' + type.name + ' has no allowedLinks!'
                        };
                        if (type.allowedLinks[key] == 0) return {
                            success: false,
                            message: ' allowedLinks with key '+ key + '' + 'of type ' + type.name + ' has empty allowedLinks!'
                        };
                        var flag = true;
                        if (type.allowedLinks[key]) {
                            type.allowedLinks[key].forEach((secondNode) => {
                                if(!nodeTypesNames.includes(secondNode))
                                    flag = false;
                            });
                            if(!flag) return {
                                success: false,
                                message: 'type ' + type.name + ' has non existing node type under the key ' + key
                            };
                        }

                    }
                }
            }

        }
        return {success: true};
    }
};