<template>
    <div v-if="typeConfig">
        <md-toolbar class="md-dense" :md-theme="typeConfig.color">

            <md-icon class="semantic-type-icon"> {{typeConfig.cardIcon}} </md-icon>
            <h3 class="md-title" style="flex: 1"> {{typeConfig.value}} </h3>


            <md-button class="md-icon-button" @click="editNodeClicked">
                <md-icon>mode_edit</md-icon>
                <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="exploreNodeClicked">
                <md-icon>people</md-icon>
                <md-tooltip md-direction="top">Explore relationships</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" @click="addEdgeClicked">
                <md-icon>link</md-icon>
                <md-tooltip md-direction="top">Add relationship</md-tooltip>
            </md-button>

            <md-button class="md-icon-button" v-on:click="closeButtonClick">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Close</md-tooltip>
            </md-button>
        </md-toolbar>

        <md-card class="person-card">

            <md-card-header>
                <md-card-header-text>
                    <div class="md-title" v-if="label">{{label}}</div>
                    <div class="md-subhead" v-if="sublabel">{{sublabel}}</div>
                </md-card-header-text>

                <md-card-media v-if="information.avatar" class="person-avatar">
                    <img :src="information.avatar">
                </md-card-media>
            </md-card-header>

            <!--<general-details :information="information" :editable="editable" v-if="modeIndex == 0"></general-details>-->
            <!--<contacts-details :information="information" :editable="editable" v-if="modeIndex == 1"></contacts-details>-->
            <!--<business-details :information="information" :editable="editable" v-if="modeIndex == 2"></business-details>-->
            <!--<description-details :information="information" :editable="editable"-->
                                 <!--v-if="modeIndex == 3"></description-details>-->

            <md-bottom-bar md-shift @change="switchDetails" :md-theme="typeConfig.color">
                <md-bottom-bar-item md-icon="account_circle" md-active v-for="(page, index) in typeConfig.pages"></md-bottom-bar-item>
            </md-bottom-bar>

        </md-card>
    </div>
</template>
<script>


    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                modes: ['general', 'contacts', 'business', 'description'],
                modeIndex: 0,
                editable: false
            }
        },
        components: {
            nodePage: require('./nodePage.vue')
        },
        computed: {
            typeConfig () {
                let match = this.$store.state.appConfig.config.nodeTypes.filter((type) => {
                    return type.name == this.information.semantic_type
                });
                return match.length > 0 ? match[0] : false;
            },
            label () {
                var extra = '';
                if(this.typeConfig.extraMainLabelFields)
                    this.typeConfig.extraMainLabelFields.forEach((extraField) => {
                        if (this.information[extraField])
                            extra += this.information[extraField] + ' ';
                    });
                if (extra)  extra = extra.slice(0, -1);
                return this.information[this.typeConfig.mainLabelField] + ' ' + extra;
            },
            sublabel() {
                if(this.typeConfig.subLabelField) return this.information[this.typeConfig.subLabelField];
                return '';
            }
        },
        props: ['information'],
        methods: {
            ...mapActions({
                exploreNode: "exploreNode",
                neo4jSearchById: "neo4jSearchById",
                selectNodes: 'selectNodes',
                addSubGraphById: 'addSubGraphById',
                setWorkMode: 'setWorkMode'
            }),
            closeButtonClick () {
                this.selectNodes([]);
                this.setWorkMode({workMode: 'none'});
            },
            switchDetails (index) {
                this.modeIndex = index;
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
            editNodeClicked(){

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