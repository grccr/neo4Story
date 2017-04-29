var Vue = require('vue');
var VueResource = require('vue-resource');
var VueRouter = require('vue-router');
var VueMaterial = require('vue-material');
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueMaterial);

console.log(Vue.material);

// Vue.material.registerTheme('default', {
//     primary: 'cyan',
//     accent: 'white'
// });


Vue.material.registerTheme('brown', {
    primary: 'brown',
    accent: 'white'
});

Vue.material.registerTheme('blue', {
    primary: 'blue',
    accent: 'white'
});

Vue.material.registerTheme('teal', {
    primary: 'teal',
    accent: 'white'
});

// Vue.material.registerTheme('brown', {
//     primary: 'brown',
//     accent: 'white'
// });


Vue.config.debug = true;
Vue.config.devtools = true;



var store = require('./store');

var router = new VueRouter({
    // mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            name: 'main',
            path: '/',
            component: require('./components/mainPage.vue')
        }
        // {
        //     path: '/main',
        //     component: require('./components/mainPage.vue'),
        //     name: 'mainPage',
        //     // meta: { requiresAuth: false }
        // },
        // {
        //     path: '/bratva',
        //     component: require('./components/bratvaPage.vue'),
        //     name: 'bPage'
        // }
    ]
});


new Vue({
    el: '#app',
    store: store,
    router: router,
    render: function(h){
        return h(require('./components/app.vue'))
    }
});


