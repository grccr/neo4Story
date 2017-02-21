/**
 * Created by forwardmomentum on 21.02.17.
 */

'use strict';

const editControls = {       // use const to choose some props
    INPUT: 'input',
    SELECT: 'select',
    DATEPICKER: 'datepicker',
    RANGE: 'range'
};

module.exports = {
    neo4jConfig: {
        neo4jUrl: 'bolt://localhost',
        neo4jLogin: 'neo4j',
        neo4jPassword: 'P@ssw0rd'
    },
    nodeTypes: [
        {
            name: 'Person',              // machine name of node type
            value: 'Person',             // human name of node type
            fields: [                    // fields list with at least 1 required field - required!
                {
                    name: 'name',        // machine name of field - required!
                    alias: 'Name',       // human name of field - required!
                    type: String,        // field type - String, Num, Boolean. Default: String
                    editControl: editControls.INPUT,    // edit field UI control  Default: 'input'
                    required: false,         // required in create/edit process, Default - false
                    placeholder: 'person name'     // placeholder of editControl
                },
                {
                    name: 'surname',
                    alias: 'Surname',
                    required: true
                },
                {
                    name: 'workplace',
                    alias: 'Work'
                },
                {
                    name: 'position',
                    alias: 'Position'
                },
                {
                    name: 'birthday',
                    alias: 'Birthday'
                },
                {
                    name: 'university',
                    alias: 'Education'
                },
                {
                    name: 'text',
                    alias: 'Description'
                }
            ],
            color: 'blue',    // pick from vuematerial colors, default - blue
            mainLabelField: 'name',             // mainLabelField and extraMainLabelFields fills card header, mainLabelField is required
            extraMainLabelFields: ['surname'],  // default - []
            subLabelField: 'workplace',         // subLabelField fills card subheader, default - empty
            pages: [
                {
                    title: 'Personal',
                    fields: ['workplace', 'position', 'birthday', 'education']      // fields presented at this (1) page of card
                },
                {
                    title: 'Description',
                    fields: ['description']
                }
            ]
        },
        {
            value: 'Company',
            name: 'Company',
            fields: [
                {
                    name: 'name',
                    alias: 'Name',
                    required: true
                },
                {
                    name: 'inn',
                    alias: 'INN'
                }
            ],
            mainLabelField: 'name',
            color: 'brown',
            pages: [
                {
                    title: 'First',
                    fields: ['name']
                },
                {
                    title: 'Inn',
                    fields: ['inn']
                }
            ],
            subLabelField: 'inn'
        }],
    edgeTypes: [
        {
            value: 'Friends',
            name: 'Friends',
            oriented: false,            // default - false
            allowedLinks: {
                Person: ['Person']      // if edge is oriented - key will be 'from', list will be the set of options 'to'
            }
        },
        {
            value: 'Colleagues',
            name: 'Colleagues',
            allowedLinks: {
                Person: ['Person']
            }
        },
        {
            value: 'Host',
            name: 'Host',
            allowedLinks: {
                Person: ['Company']
            }
        }
        // {value: 'Host', name: 'Host', oriented: false, allowedLinks: {'Person': 'Company'}},
        // {value: 'Employe', name: 'Employe', oriented: false, allowedLinks: {'Person': 'Company'}},
        // {value: 'HostCompany', name: 'Компания HostCompany', oriented: true, allowedLinks: {'Company': 'Company'}},
        // {value: 'TrustCompany', name: 'TrustCompany Компания', oriented: true, allowedLinks: {'Company': 'Company'}}
    ]



};