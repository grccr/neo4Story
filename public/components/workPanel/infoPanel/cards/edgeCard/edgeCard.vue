<template>
    <div v-if="typeConfig">
        <md-toolbar class="md-dense" :md-theme="typeConfig.color">

            <!--&lt;!&ndash;<md-icon class="semantic-type-icon"> {{typeConfig.cardIcon}} </md-icon>&ndash;&gt;-->
            <!--<h3 class="md-title" style="flex: 1"> {{typeConfig.value}} </h3>-->


            <md-button class="md-icon-button" @click="editEdgeClicked">
                <md-icon>mode_edit</md-icon>
                <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" v-on:click="closeButtonClick">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Close</md-tooltip>
            </md-button>
        </md-toolbar>

        <md-card class="person-card">

            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" v-if="information.label">{{information.label}}</div>
                    <div class="md-subhead" v-if="information.sublabel">{{information.sublabel}}</div>
                </md-card-header-text>

                <md-card-media v-if="information.avatar" class="person-avatar">
                    <img :src="information.avatar">
                </md-card-media>
            </md-card-header>

            <edge-page :information="information" :page="activePage" :editable="editable" :typeConfig="typeConfig"></edge-page>
            <!--<md-bottom-bar md-shift @change="switchDetails" :md-theme="typeConfig.color">-->
                <!--<md-bottom-bar-item :md-icon="page.icon" md-active v-for="(page, index) in typeConfig.pages">{{ page.title }}</md-bottom-bar-item>-->
            <!--</md-bottom-bar>-->

        </md-card>
    </div>
</template>
<script>


    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                editable: false,
                activePageIndex: 0
            }
        },
        components: {
            edgePage: require('./edgePage.vue')
        },
        computed: {
            typeConfig () {
                let match = this.$store.state.appConfig.config.edgeTypes.filter((type) => {
                    let res = (type.name == this.information.semantic_type);
                    return res
                });
                return match.length > 0 ? match[0] : false;
            },
            activePage () {
                if (this.typeConfig) return this.typeConfig.pages[this.activePageIndex];
                return false;
            }
        },
        props: ['information'],
        methods: {
            ...mapActions({
                exploreNode: "exploreNode",
                neo4jSearchById: "neo4jSearchById",
                addSubGraphById: 'addSubGraphById',
                setWorkMode: 'setWorkMode',
                resetSelection: 'resetSelection'
            }),
            closeButtonClick () {
                this.resetSelection();
                this.setWorkMode({workMode: 'none'});
            },
            switchDetails (index) {
                this.activePageIndex = index;
            },
            exploreNodeClicked(){
                let selectedElements = this.$store.state.graph.selectedElements;
                this.addSubGraphById({id: selectedElements[0].id});
            },
            deleteNodeClicked(){

            },
            addEdgeClicked(){
                this.setWorkMode({workMode: 'addEdge'});
            },
            editEdgeClicked(){

            }
        }
    }
</script>

<style>

    .person-avatar {
        width: 100px !important;
        flex: 0 0 100px !important;
        height: 100px !important;
    }

    .semantic-type-icon {
        margin-left: 4px;
        margin-right: 9px;
    }

    .card-image {
        height: 100px;
        width: 100px;
        margin-left: 5%;
    }

    .person-card {
        background-color: #f7f7f4 !important;
    }
</style>