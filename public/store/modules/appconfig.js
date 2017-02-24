/**
 * Created by forwardmomentum, 20.02.17.
 */

var Vue = require('vue');

/**
 * Configuration state management
 */
module.exports = {
    state: {
        config: {}
    },
    mutations: {
        SET_APP_CONFIG(state, config) {
            Vue.set(state, 'config', config);
        }
    },
    actions: {
        setAppConfig(store, appConfig) {
            store.commit('SET_APP_CONFIG', appConfig);
        }
    },
    getters: {}
};
