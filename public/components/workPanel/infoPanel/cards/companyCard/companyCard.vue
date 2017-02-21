<template>
    <div>
        <md-toolbar class="md-dense" md-theme="brown">

            <md-icon class="semantic-type-icon">business</md-icon>
            <h3 class="md-title" style="flex: 1">Company</h3>


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

        <md-card class="company-card">

            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">{{label}}</div>
                    <div class="md-subhead">{{sublabel}}</div>
                </md-card-header-text>

                <md-card-media v-if="information.avatar" class="company-avatar">
                    <img :src="information.avatar">
                </md-card-media>
            </md-card-header>

            <general-details :information="information" :editable="editable" ></general-details>

            <!--<contacts-details :information="information" :editable="editable" v-if="modeIndex == 1"></contacts-details>-->
            <!--<business-details :information="information" :editable="editable" v-if="modeIndex == 2"></business-details>-->
            <!--<description-details :information="information" :editable="editable" v-if="modeIndex == 3"></description-details>-->

            <!--<md-bottom-bar md-shift @change="switchDetails">-->
                <!--<md-bottom-bar-item md-icon="account_circle" md-active>Общее</md-bottom-bar-item>-->
                <!--<md-bottom-bar-item md-icon="contact_mail">Контакты</md-bottom-bar-item>-->
                <!--<md-bottom-bar-item md-icon="business">Бизнес</md-bottom-bar-item>-->
                <!--<md-bottom-bar-item md-icon="description">Описание</md-bottom-bar-item>-->
            <!--</md-bottom-bar>-->

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
            generalDetails: require('./cardDetails/general.vue')
        },
        computed: {
            label () {
                return this.information.name;
            },
            sublabel() {
                return this.information.inn ? this.information.inn : '';
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
            },
            editNodeClicked(){
            }
        }
    }
</script>

<style>

    .company-avatar {
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

    .company-card {
        background-color: #f7f7f4 !important;
    }
</style>