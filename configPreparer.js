/**
 * Created by forwardmomentum on 21.02.17.
 */

module.exports = {
    prepareNodeTypes (nodeTypes) {
        nodeTypes.forEach((type) => {

            type.fields.map((field) => {
                if(!field.required) field.required = false; // direct false definition to escape undefined
                if(!field.editControl) field.editControl = 'input';
                if(!field.type) field.type = String;
            });

        });
        return nodeTypes;
    },
    prepareEdgeTypes (edgeTypes) {
        return edgeTypes;
    }
};