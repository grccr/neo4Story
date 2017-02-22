/**
 * Created by forwardmomentum on 21.02.17.
 */

import { expect } from 'chai';

let configValidator = require('../configValidator');

describe('configValidation', () => {
    it('validateNodeTypesConfig1', () => {
        const nodeTypesSample = [];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig2', () => {
        const nodeTypesSample = [{
            name: 'Test'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });


    it('validateNodeTypesConfig3', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });


    it('validateNodeTypesConfig4', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [
            ]
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig5', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name'
            }]
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig6', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name'
            }]
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig7', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }]
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig8', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            mainLabelField: 'surname'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig9 - valid config', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            mainLabelField: 'name',
            searchFields: ['name']
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.true;
    });

    it('validateNodeTypesConfig10 - editControl in types', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true,
                editControl: 'something_very_wrong'
            }],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig11 - searchFields in fields', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            searchFields: ['surname'],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

});