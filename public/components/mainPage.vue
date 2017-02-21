<template>
	<div class="main-page">
		<general-search></general-search>
		<!--<search-row></search-row>-->
		<graph-window></graph-window>
		<work-panel v-if="workPanelActivated"></work-panel>
		<!--<create-node-panel v-if="createNodePanelActivated"></create-node-panel>-->
		<right-menu></right-menu>
		<app-title></app-title>
		<!--<md-button class="md-raised layout" v-if="!layoutIsActive" v-on:click="startLayoutClick">Уложить</md-button>-->
		<!--<md-button class="md-raised layout" v-if="layoutIsActive" v-on:click="stopLayoutClick">Стоп</md-button>-->
	</div>
</template>

<script type="text/javascript">
    import {mapActions} from "vuex";
	export default {
		data () {
			return {
			}
		},
		computed: {
			workPanelActivated(){
				return this.$store.state.edit.workMode != 'none';
			},
//            layoutIsNotActive(){
//				return !this.$store.state.graph.layoutActive;
//			},
            layoutIsActive(){
                return this.$store.state.graph.layoutActive;
            }

		},
		components: {
		    generalSearch: require('./search/generalSearch.vue'),
            graphWindow: require('./graph/graphWindow.vue'),
			workPanel: require('./workPanel/workPanel.vue'),
			rightMenu: require('./rightMenu/rightMenu.vue'),
			appTitle: require('./appTitle/appTitle.vue')
		},
		methods: {
            ...mapActions({
                neo4jConfigSet: "neo4jConfigSet",
                graphConfigSet: "graphConfigSet",
				setNodeTypesConfig: 'setNodeTypesConfig',
				setEdgeTypesConfig: 'setEdgeTypesConfig'
            })
		},
        created () {
            this.$http.get('config').then((response) => {
                let config = response.body;
				console.log(config);
            	this.neo4jConfigSet(config);
            	this.graphConfigSet(config);
				this.setNodeTypesConfig(config.nodeTypes);
				this.setEdgeTypesConfig(config.edgeTypes);
            }, (response) => {});
        }

	}
</script>

<style>
	.main-page {
		width: 100%;
		height: 100%;
	}
	.layout{
		width: 20%;
	}
</style>