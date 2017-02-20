/**
 * Created by nilly on 19/01/17.
 */



import { expect } from 'chai';
// var mutations = require('../public/store/modules/graph').mutations;
var actions = require('../public/store/modules/neo4j').actions;

// destructure assign mutations
// const { ADD_NODE } = mutations;
const {neo4jFullTextSearch, neo4jFindAllMatches} = actions;

// describe('mutations', () => {
//     it('ADD_NODE2', () => {
//         // mock state
//         const state = {
//             nodes:[],
//             edges:[]
//         };
//         // apply mutation
//         ADD_NODE(state);
//         // assert result
//         expect(state.nodes[0].id).to.equal("n3");
//     })
// });

describe('actions', () => {
   it('neo4jFullTextSearch',() => {
       let store = {};
       let payload = {searchRequest: 'Владимир Мединский'};
       neo4jFullTextSearch(store, payload).then(result => {
           console.log(result);
       });

});
});