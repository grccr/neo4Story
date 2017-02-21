var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
    strict: true, // turn off on production!
    modules: {
    	// test: require('./modules/test'),
        graph: require('./modules/graph'),
        auth: require('./modules/auth'),
        // addNodeButton: require('./modules/addNode'),
        neo4j: require('./modules/neo4j'),
        edit: require('./modules/edit'),
        config: require('./modules/config')
    }
});