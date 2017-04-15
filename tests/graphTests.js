/**
 * Created by lolkasasa on 19/01/17.
 */

// todo normal graph tests



import { expect } from 'chai';
var mutations = require('../public/store/modules/graph').mutations;
var actions = require('../public/store/modules/graph').actions;

// destructure assign mutations
const {ADD_NODE_TO_SELECTION, ADD_EDGE_TO_SELECTION } = mutations;
const {addNodeToSelection, addEdgeToSelection} = actions;

describe('mutations', () => {
    it('ADD_NODE_TO_SELECTION', () => {
        // mock state
        const state = {
            nodes:[],
            edges:[],
            selectedNodes: []
        };
        // apply mutation
        node =
        ADD_NODE_TO_SELECTION(state, node);
        // assert result
        expect(state.nodes[0].id).to.equal("n3");
    })
});

// describe('actions', () => {
//    it('neo4jFullTextSearch',() => {
//        let store = {};
//        let payload = {searchRequest: ''};
//        neo4jFullTextSearch(store, payload).then(result => {
//            console.log(result);
//        });
//
// });
// });