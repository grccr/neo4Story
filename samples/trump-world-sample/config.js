/**
 * Created by forwardmomentum on 27.02.17.
 */

const editControls = {       // use const to choose some props
    INPUT: 'input',
    SELECT: 'select',
    DATEPICKER: 'datepicker',
    RANGE: 'range'
};

module.exports = {
    appTitle: 'TrumpWorld DataSet - neo4Story',
    searchPlaceholder: 'Person/Company',
    neo4jConfig: {
        neo4jUrl: 'bolt://localhost',
        neo4jLogin: 'neo4j',
        neo4jPassword: 'P@ssw0rd'
    },
    nodeTypes: [
        {
            name: 'Person',              // machine name of node type
            value: 'Person',             // human name of node type
            fields: [
                {
                    name: 'name',        // machine name of field - required!
                    alias: 'Name',       // human name of field - required!
                    required: true,         // required in create/edit process, Default - false
                }
            ],
            color: 'teal',    // choose from vuematerial colors, default - blue
            nodeIcon: 'person',   // if you want use custom icon for your type (like mysupericon.png) - put it's png to public/img/custom-icons and write 'custom-icons/mysupericon.png'
            cardIcon: 'person',   // choose from material icons set
            mainLabelField: 'name',             // mainLabelField and extraMainLabelFields fills card header, mainLabelField is required
            searchFields: ['name'],  // search row will use this fields for
            pages: [
                {
                    title: 'Personal',
                    icon: 'account_circle',
                    fields: []      // fields presented at this (1) page of card
                }
            ]
        },
        {
            value: 'Organization',
            name: 'Organization',
            cardIcon: 'account_balance',
            fields: [
                {
                    name: 'name',
                    alias: 'name',
                    required: true
                }
            ],
            color: 'brown',
            searchFields: ['name'],
            nodeIcon: 'factory',
            mainLabelField: 'name',
            pages: [
                {
                    title: 'General',
                    icon: 'description',
                    fields: []
                }
            ]
        }],
    edgeTypes: [
        {
            value: 'RELATED_TO',
            name: 'RELATED_TO',
            oriented: false,            // default - false
            allowedLinks: {
                Person: ['Person']      // if edge is oriented - key will be 'from', list will be the set of options 'to'
            }
        },
        {
            value: 'INVOLVED_WITH',
            name: 'INVOLVED_WITH',
            oriented: false,
            allowedLinks: {
                Person: ['Organization']
            },
            fields: [] //todo
        },
        {
            value: 'CONNECTED_TO',
            name: 'CONNECTED_TO',
            oriented: false,
            allowedLinks: {
                Organization: ['Organization']
            },
            fields: [] //todo
        }
    ]



};