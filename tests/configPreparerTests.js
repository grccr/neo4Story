/**
 * Created by forwardmomentum on 21.02.17.
 */

import { expect } from 'chai';

let configPreparer = require('../configPreparer');
let configValidator = require('../configValidator');

describe('configPreparation', () => {

    it('prepareNodeTypes1', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            mainLabelField: 'name'
        }];
        let preparedNodeTypes = configPreparer.prepareNodeTypes(nodeTypesSample);
        expect(configValidator.validateNodeTypes(preparedNodeTypes).success).to.be.true;  // check that valid config is still valid
        // expect(preparedNodeTypes.fields[0х).success).to.be.true;

    });

});