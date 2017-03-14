### How to set up neo4Story for unique data?

Of course, every data set has it's own scheme and
 you need to set this scheme in JSON form. 
 
We plan to do some auto-setters of basic configuration and desktop GUI for fast setting,
 but not there is one easy way to start:

```
cp public/config.template.js public/config.js
```

And edit public/config.js to your data scheme.

Take a look to your config.js:

```
// The first part of config is constant, you don't have to change it 

const editControls = {       // use const to choose some props
    INPUT: 'input',
    SELECT: 'select',
    DATEPICKER: 'datepicker',
    RANGE: 'range'
};

// The config itself:

module.exports = {
    neo4jConfig: {                    // your Neo4J config!:) 
        neo4jUrl: 'bolt://localhost',
        neo4jLogin: 'neo4j',
        neo4jPassword: 'P@ssw0rd'
    },
    nodeTypes: [          // list of types for your graph nodes
        {
            name: 'Person',              // machine name of node type
            value: 'Person',             // human name of node type
            fields: [                    // fields list with at least 1 required field - required!
                {
                    name: 'name',        // machine name of field - required!
                    alias: 'Name',       // human name of field - required!
                    type: 'string',        // field type - String, Num, Boolean. Default: String
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
            cardIcon: 'person', //  google material icon 
            nodeIcon: 'person', // put it's png to public/img/custom-icons and write 'custom-icons/mysupericon.png'
            mainLabelField: 'name',             // mainLabelField and extraMainLabelFields fills card header, mainLabelField is required
            extraMainLabelFields: ['surname'],  // default - []
            subLabelField: 'workplace',         // subLabelField fills card subheader, default - empty
            searchFields: ['name', 'surname'],  // search row will use this fields for
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
            icon: 'factory',
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
    ]

};
```
