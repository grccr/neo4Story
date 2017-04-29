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

    it('validateNodeTypesConfig9', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            mainLabelField: 'name',
            swSearchFields: ['name']
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig10 - valid config', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            mainLabelField: 'name',
            swSearchFields: ['name'],
            conSearchFields: ['name']
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.true;
    });

    it('validateNodeTypesConfig11 - editControl in types', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true,
                editControl: 'something_very_wrong'
            }],
            mainLabelField: 'name',
            swSearchFields: ['name'],
            conSearchFields: ['name']
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig12 - conSearchFields in fields', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            swSearchFields: ['name'],
            conSearchFields: ['veryWrongField'],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig13 - swSearchFields in fields', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            swSearchFields: ['badBoyField'],
            conSearchFields: ['name'],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateNodeTypesConfig14 - swSearchField empty', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            swSearchFields: [],
            conSearchFields: ['name'],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.true;
    });

    it('validateNodeTypesConfig15 - conSearchField empty', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            swSearchFields: ['name'],
            conSearchFields: [],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.true;
    });


    it('validateNodeTypesConfig15 - con/swSearchFields are both empty', () => {
        const nodeTypesSample = [{
            name: 'Test',
            value: 'test',
            fields: [{
                name: 'name',
                alias: 'name',
                required: true
            }],
            swSearchFields: [],
            conSearchFields: [],
            mainLabelField: 'name'
        }];
        let validationResult = configValidator.validateNodeTypes(nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig1', () => {
        const edgeTypesSample = [{
            name: 'test'
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig2', () => {
        const edgeTypesSample = [{
            value: 'test',
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig3', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test'
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig4', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig5', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
            ]
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig6', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    alias: 'name'
                }
            ]
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig7', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                }
            ]
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig8', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ]
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig9', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ],
            allowedLinks: {}
        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig10', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ],
            allowedLinks: {
                Test: []
            }

        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig11', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ],
            allowedLinks: {
                Test: ['WrongType']
            }

        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig12', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ],
            allowedLinks: {
                wrongType: ['Debug']
            }

        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.false;
    });

    it('validateEdgeTypesConfig13 - valid config', () => {
        const edgeTypesSample = [{
            name: 'Test',
            value: 'test',
            oriented: true,
            fields: [
                {
                    name: 'link',
                    alias: 'link',
                }
            ],
            allowedLinks: {
                Test: ['Debug']
            }

        }];
        const nodeTypesSample = [
            {name: 'Test'}, {name: 'Debug'}
        ];
        let validationResult = configValidator.validateEdgeTypes(edgeTypesSample, nodeTypesSample);
        expect(validationResult.success).to.be.true;
    });

});