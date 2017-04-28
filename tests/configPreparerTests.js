/**
 * Created by forwardmomentum on 21.02.17.
 */

import {expect} from 'chai';

let configPreparer = require('../configPreparer');
let configValidator = require('../configValidator');

describe('configPreparation', () => {

    it('prepareNodeTypes1 - common case', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [
                {
                    name: 'name',
                    alias: 'name',
                    required: true
                },
                {
                    name: 'surname',
                    alias: 'Surname'
                }
            ],
            mainLabelField: 'name',
            swSearchFields: ['name'],
            conSearchFields: ['name']
        }];
        let preparedNodeTypes = configPreparer.prepareNodeTypes(nodeTypesSample);
        expect(configValidator.validateNodeTypes(preparedNodeTypes).success).to.be.true;  // check that valid config is still valid
        expect(preparedNodeTypes[0].fields[0].editControl).to.equal('input');
        expect(preparedNodeTypes[0].fields[0].type).to.equal('string');
        expect(preparedNodeTypes[0].fields[1].required).to.equal(false);
    });

});