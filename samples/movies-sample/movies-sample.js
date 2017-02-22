/**
 * Created by forwardmomentum on 21.02.17.
 *
 *
 * This is the config.js sample for movies database. It contains schema of presentable part of data.
 * important: We don't need to change data or code of neo4Story - just define config in your public folder!
 *
 */

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
                    alias: 'Birthday'
                },
                {
                    name: 'biography',
                    alias: 'Biography'
                }
            ],
            color: 'blue',    // choose from vuematerial colors, default - blue
            icon: 'person',   // if you want use custom icon for your type (like mysupericon.png) - put it's png to public/img/custom-icons and write 'custom-icons/mysupericon.png'
            mainLabelField: 'name',             // mainLabelField and extraMainLabelFields fills card header, mainLabelField is required
            subLabelField: 'birthplace',         // subLabelField fills card subheader, default - undefined
            searchFields: ['name', 'birthplace'],  // search row will use this fields for
            pages: [
                {
                    title: 'Personal',
                    fields: ['birthday', 'birthplace']      // fields presented at this (1) page of card
                },
                {
                    title: 'Biography',
                    fields: ['biography']
                }
            ]
        },
        {
            value: 'Movie',
            name: 'Movie',
            fields: [
                {
                    name: 'title',
                    alias: 'title',
                    required: true
                },
                {
                    name: 'studio',
                    alias: 'studio'
                },
                {
                    name: 'description',
                    alias: 'description'
                },
                {
                    name: 'homepage',
                    alias: 'homepage'
                },
                {
                    name: 'genre',
                    alias: 'genre'
                },
            ],
            searchFields: ['name', 'studio'],
            icon: 'factory',
            mainLabelField: 'name',
            color: 'brown',
            pages: [
                {
                    title: 'General',
                    fields: ['genre', 'homepage']
                },
                {
                    title: 'Description',
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