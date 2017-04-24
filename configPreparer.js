/**
 * Created by forwardmomentum on 21.02.17.
 */

module.exports = {
    prepareNodeTypes (nodeTypes) {
        nodeTypes.forEach((type) => {

            type.fields.forEach((field) => {
                if(!field.required) field.required = false; // direct false definition to escape undefined
                if(!field.editControl) field.editControl = 'input';
                if(!field.type) field.type = 'string';
                if(!field.extraMainLabelFields) field.extraMainLabelFields = [];
            });

        });
        return nodeTypes;
    },
    prepareEdgeTypes (edgeTypes) {
        edgeTypes.forEach((type) => {

            type.fields.forEach((field) => {
                if(!field.required) field.required = false; // direct false definition to escape undefined
                if(!field.editControl) field.editControl = 'input';
                if(!field.type) field.type = 'string';
            });

        });
        return edgeTypes;
    }
};