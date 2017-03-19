

'use strict';

let Vue = require('vue');

const colorBrewPerson = [
    "#BBDEFB",
    "#B2DFDB",
    "#B3E5FC",
    "#B2EBF2",
    "#D1C4E9"
];

const colorBrewCompany = [
    "#D7CCC8",
    "#FFE0B2",
    "#FFF9C4",
    "#F0F4C3",
    "#C8E6C9"
];

const defNode = {
    label: 'UZEL',
    // size: 10,
    color: '#fff',
    borderColor: '#fff',
    hoverBorderColor: '#BBDEFB',
    borderWidth: 3
};

const type_trans = {
    RELATION: 'Relstionship',
    friends: 'Friends',
    host: 'Host'
};

const defEdge = {};


let neo4j = window.neo4j.v1;
let idToHash =  (hash) => hash.toNumber(); //neo4jId.high + '_' + neo4jId.low;
let hashToId =  (neo4jId) => neo4j.int(neo4jId);

// let neo4jConfig = require('../../config').neo4j;

module.exports = {
    state: {
        neo4jUrl: '',
        neo4jLogin: '',
        neo4jPassword: ''
    },
    mutations: {
        SET_NEO4J_CONFIG (state, payload) {
            console.log(payload);
            Vue.set(state, "neo4jUrl", payload.neo4jConfig.neo4jUrl);
            Vue.set(state, "neo4jLogin", payload.neo4jConfig.neo4jLogin);
            Vue.set(state, "neo4jPassword", payload.neo4jConfig.neo4jPassword);
        }
    },
    actions: {
        neo4jConfigSet (store, payload) {
            store.commit('SET_NEO4J_CONFIG', payload);
        },
        neo4jFullTextSearch(store, payload) {
            /**
             * Use it for autocomplete (or any other full text) search
             * @param payload: {
             *   searchRequest: String
             * }
             * @return Promise
             */
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();
            let searchRequest = payload.searchRequest,
                name = searchRequest.split(' ')[0],
                surname = searchRequest.split(' ')[1];
            let extraQueryStr = surname ? (`OR a.name STARTS WITH "${surname}" OR a.surname STARTS WITH "${surname}"`) : '';
            return session
                .run(
                    "MATCH (a) WHERE a.name STARTS WITH {name} OR a.surname STARTS WITH {name} " +
                    "OR a.name STARTS WITH {searchRequest}" +
                    extraQueryStr +
                    "RETURN a", {name, surname, searchRequest}
                )
                .then(result => {
                    return store.dispatch('neo4jResponseParse', {neo4jData: result});
                })
                .catch(error => {
                    session.close();
                    throw error;
                });
        },
        neo4jFindAllMatches(store, payload) {
            /**
             * Use it for find any mantched nodes in neo4j with search request from payload
             * @param payload: {
             *     searchRequest: String,
             *     withEdges: boolean (default: true) - NOT IMPLEMENTED!
             * }
             */
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();
            let withEdges = payload.withEdges || true;

            return store.dispatch('neo4jFullTextSearch', payload)
                .then(result => {
                    let matches = result.nodes.map((node) => {
                        return hashToId(node.id);
                    });
                    if(matches.length > 0)
                        return session.run('MATCH p=(a)-[r]-(b) WHERE ID(a) IN {matches} ' +
                            'UNWIND nodes(p) as allnodes WITH COLLECT(ID(allnodes)) AS ALLID ' +
                            'MATCH (n)-[r2]-(m) where ID(n) IN ALLID AND ID(m) IN ALLID ' +
                            'return n, m, r2', {matches});
                    else return { records: [] };
                })
                .then(result => store.dispatch('neo4jResponseParse', {neo4jData: result}))
                .catch(error => {
                    session.close();
                    throw error;
                });
        },
        neo4jSearchById (store, payload) {
            /**
             * Simple search by id
             * @param payload: {
             *     id: String/int id
             * }
             */
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();
            let id = hashToId(payload.id);
            return session
                .run(
                    "MATCH (a) WHERE ID(a) = {id} " +
                    "OPTIONAL MATCH (a)-[b]-(c) " +
                    "RETURN a,b,c", {id}
                )
                .then(result => store.dispatch('neo4jResponseParse', {neo4jData: result}))
                .catch(error => {
                    session.close();
                    throw error;
                });
        },
        neo4jResponseParse(store, payload) {
            /**
             * Parser for neo4j bolt response
             * @param payload: {
             *  neo4jData: bolt response
             *  }
             * @type {{nodes: Array, edges: Array, nodesMap: {}, edgesMap: {}}}
             */
            let graph = {
                nodes: [],
                edges: [],
                nodesMap: {},
                edgesMap: {}
            };
            let neo4jData = payload.neo4jData;
            let colorPerson = colorBrewPerson[Math.round(Math.random() * colorBrewPerson.length)];
            let colorCompany = colorBrewCompany[Math.round(Math.random() * colorBrewCompany.length)];
            neo4jData.records.forEach(res => {
                res._fields.forEach(field => {
                    if (field) {
                        if (!field.start) {
                            let nodeData = Object.assign({}, defNode, field.properties);
                            nodeData.id = idToHash(field.identity);
                            if (!(nodeData.id in graph.nodesMap)) {
                                graph.nodesMap[nodeData.id] = nodeData;
                                nodeData.semantic_type = field.labels[0];
                                nodeData.x = Math.random() * 0.5;
                                nodeData.y = Math.random() * 0.5;
                                nodeData.image = 'img/pig.png'; // default for fast detecting
                                if(nodeData.semantic_type == "Person") {
                                    nodeData.image = 'img/person.png';
                                    nodeData.color = colorPerson;
                                }
                                if(nodeData.semantic_type == "Company") {
                                    nodeData.image = 'img/factory.png';
                                    nodeData.color = colorCompany;
                                }
                                nodeData.size = 10;
                                nodeData.hoverBorderColor = nodeData.color;
                                nodeData.type = 'image';

                                nodeData.label = (nodeData.name || '') + ' ' + (nodeData.surname || '');
                                graph.nodes.push(nodeData);
                            }
                        }
                        else {
                            let edgeData = {
                                source: idToHash(field.start),
                                target: idToHash(field.end),
                                color: '#acacaf',
                                type: "def",
                                label: type_trans[field.type],
                                semantic_type: field.type,
                                id: idToHash(field.start) + '_' + idToHash(field.end),
                                // id: field.properties.id,
                                size: 500
                            };
                            graph.edges.push(edgeData);
                            graph.edgesMap[edgeData.id] = edgeData;
                        }
                    }
                });
            });
            return graph;

        },
        neo4jCreateEdge(store, data) {
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();

            // console.log(data);

            let id = data.source + '_' + data.target;
            let source = hashToId(data.source);
            let target = hashToId(data.target);
            let label = data.semanticType;
            let comment = data.comment;

            let queryStr = `MATCH (a),(b)
                WHERE ID(a) = {source} AND ID(b) = {target}
                CREATE (a)-[r:${label} {id: {id}, comment: {comment}}]->(b) RETURN r`;

            // console.log(queryStr);

            return session.run(queryStr, {source, target, id, comment})
                .then(result => store.dispatch('neo4jResponseParse', {neo4jData: result}))
                .catch(error => {
                    session.close();
                    throw error;
                });

        },
        neo4jCreatePerson (store, data) {
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();

            return session
                .run(
                    "CREATE (a:Person {data}) RETURN a",
                    {data: data}
                )
                .then(result => store.dispatch('neo4jResponseParse', {neo4jData: result}))
                .catch(error => {
                    session.close();
                    throw error;
                });

        },
        neo4jCreateCompany (store, data) {
            let neo4j = window.neo4j.v1;
            let driver = neo4j.driver(store.state.neo4jUrl, neo4j.auth.basic(store.state.neo4jLogin,
                store.state.neo4jPassword));
            let session = driver.session();

            let name = data.name;
            let inn = data.inn;
            let country = data.country;
            let city = data.city;
            let description = data.description;
            let url = data.url;

            return session
                .run(
                    "CREATE (a:Company {name: {name}, inn: {inn}, country: {country}, " +
                    "description: {description}, city: {city}, url:{url}}) RETURN a",
                    {name, inn, country, description, city, url}
                )
                .then(result => store.dispatch('neo4jResponseParse', {neo4jData: result}))
                .catch(error => {
                    session.close();
                    throw error;
                });
        }

    },
    getters: {}
};
