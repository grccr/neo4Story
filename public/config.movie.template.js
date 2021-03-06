/**
 * Created by forwardmomentum on 22.02.17.
 */


const editControls = {       // use const to choose some props
    INPUT: 'input',
    SELECT: 'select',
    DATEPICKER: 'datepicker',
    RANGE: 'range'
};

module.exports = {
    appTitle: 'Movies Dataset',
    searchPlaceholder: 'Person/Movie',
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
                },
                {
                    name: 'birthday',
                    alias: 'Birthday'
                },
                {
                    name: 'birthplace',
                    alias: 'Birthplace'
                },
                {
                    name: 'biography',
                    alias: 'Biography'
                }
            ],
            color: 'teal',    // choose from vuematerial colors, default - blue
            nodeIcon: 'person',   // if you want use custom icon for your type (like mysupericon.png) - put it's png to public/img/custom-icons and write 'custom-icons/mysupericon.png'
            cardIcon: 'person',   // choose from material icons set
            mainLabelField: 'name',             // mainLabelField and extraMainLabelFields fills card header, mainLabelField is required
            subLabelField: 'birthplace',         // subLabelField fills card subheader, default - undefined
            searchFields: ['name'],  // search row will use this fields for
            pages: [
                {
                    title: 'Personal',
                    icon: 'account_circle',
                    fields: ['birthday', 'birthplace']      // fields presented at this (1) page of card
                },
                {
                    title: 'Biography',
                    icon: 'description',
                    fields: ['biography']
                }
            ]
        },
        {
            value: 'Movie',
            name: 'Movie',
            cardIcon: 'movie',
            fields: [
                {
                    name: 'title',
                    alias: 'Title',
                    required: true
                },
                {
                    name: 'studio',
                    alias: 'Studio'
                },
                {
                    name: 'description',
                    alias: 'Description'
                },
                {
                    name: 'homepage',
                    alias: 'Homepage'
                },
                {
                    name: 'genre',
                    alias: 'Genre'
                },
            ],
            color: 'brown',
            searchFields: ['title'],
            nodeIcon: 'factory',
            mainLabelField: 'title',
            pages: [
                {
                    title: 'General',
                    icon: 'description',
                    fields: ['genre', 'homepage']
                },
                {
                    title: 'Description',
                    icon: 'description',
                    fields: ['description']
                }
            ],
            subLabelField: 'studio'
        }],
    edgeTypes: [
        {
            value: 'FRIEND',
            name: 'Friends',
            oriented: false,            // default - false
            allowedLinks: {
                Person: ['Person']      // if edge is oriented - key will be 'from', list will be the set of options 'to'
            }
        },
        {
            value: 'DIRECTED',
            name: 'Directed',
            allowedLinks: {
                Person: ['Movie']
            }
        },
        {
            value: 'ACTS_IN',
            name: 'Acts In',
            allowedLinks: {
                Person: ['Movie']
            },
            fields: [
                {
                    name: 'name',
                    alias: 'name'
                }
            ]
        },
        {
            value: 'RATED',
            name: 'Rated',
            allowedLinks: {
                Person: ['Movie']
            },
            fields: [
                {
                    name: 'comment',
                    alias: 'comment'
                },
                {
                    name: 'stars',
                    alias: 'stars'
                }
            ]
        }
    ]



};