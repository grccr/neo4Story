<template>
    <div class="add-edge-panel">

        <md-toolbar class="md-dense">

            <md-icon class="link-icon">link</md-icon>
            <h3 class="md-title" style="flex: 1">Добавить связь</h3>

            <md-button class="md-icon-button" v-on:click="closeButtonClick">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Close</md-tooltip>
            </md-button>
        </md-toolbar>

        <md-card class="add-edge-card">
            <div class="inputs-container">
                <div class="search-input-container">
                    <label class="autocomlete-input-label">1:</label>
                    <search-row ref="firstSearchRow" @elementSelected="onFirstNodeSelected"
                                @selectOff="onSelectFirstOff"
                                class="search-row"
                                :onlyAutocomplete="true"
                                :labelActive="false"
                                :selectedElement="selectedNodes[0]"
                    ></search-row>
                </div>
                <div class="search-input-container">
                    <label class="autocomlete-input-label">2:</label>
                    <search-row ref="secondSearchRow" @elementSelected="onSecondNodeSelected"
                                @selectOff="onSelectSecondOff"
                                class="search-row"
                                :onlyAutocomplete="true"
                                :selectedElement="selectedNodes[1]"
                                :labelActive="false"></search-row>

                </div>
                <div v-if="inputsActivated">
                    <div class="type-select-container">
                        <label for="semantic-type-select" class="semantic-type-select-label">Relationship type:</label>
                        <md-select :disabled="!inputsActivated" name="semantic-type-select" id="semantic-type-select"
                                   v-model="selectedTypeName">
                            <my-option :disabled="type.from == 1" v-bind:class="{'oriented-type': type.oriented}"
                                       v-for="type in availableTypes" :value="type.name" @selected="typeSelected(type)">
                                <div class="text-div">{{type.value}}</div>
                                <div class="additional-label" v-if="type.orientation == 'reverse'" slot="extras"><md-icon>loop</md-icon></div>
                            </my-option>
                        </md-select>
                    </div>
                    <input-card :type-config="selectedType" ref="inputCard" class="input-card"
                                v-if="selectedType.name"></input-card>
                </div>

            </div>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClicked">Ok, go!</md-button>
            <md-button class="md-icon-button md-primary swap-button" v-if="selectedType.orientation == 'bidirectional'" v-on:click="swapNodes">
                <md-icon>loop</md-icon>
            </md-button>
        </md-card>
    </div>
</template>

<script type="text/javascript">
    import {mapActions} from "vuex";
//    import mySelect from "./myAwesomeSelect"
    export default {
        data () {
            return {
                selectedTypeName: '',
                selectedType: {},
                comment: '',
                selectedNodes: JSON.parse(JSON.stringify(this.selectedElements)),
                typesMap: {
                    direct: [],
                    reverse: [],
                    undirected: []
                }

            }
        },
        props: {
            selectedElements: {
                type: Array,
                default () {
                    return [];
                },
                validator (value) {
                    return value.length <= 2;
                }
            }
        },
        components: {
            searchRow: require('../../../search/autocompleteSearch/searchRow.vue'),
            inputCard: require('./../inputCard.vue'),
            myOption: require('./myAwesomeSelect/myOption.vue')
        },
        computed: {
            inputsActivated () {
                return this.selectedNodes.length == 2 && this.selectedNodes[0];
            },
            availableTypes () {
                let include = (arr, obj) => {
                    return (arr.indexOf(obj) != -1);
                };
                let toReturn = [];
                this.typesMap = {
                    direct: [],
                    reverse: [],
                    undirected: []
                };
                if (this.selectedNodes.length == 2) {
                    let firstNode = this.selectedNodes[0];
                    let secondNode = this.selectedNodes[1];
                    this.$store.state.appConfig.config.edgeTypes.forEach((edgeType) => {
                        if (edgeType.allowedLinks.hasOwnProperty(firstNode.semantic_type)) {
                            if (include(edgeType.allowedLinks[firstNode.semantic_type], secondNode.semantic_type)) {
                                if (edgeType.oriented) {
                                    toReturn.push({
                                        from: 0,
                                        to: 1,
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                    this.typesMap.direct.push(edgeType.name)
                                }
                                else {
                                    toReturn.push({
                                        from: '',
                                        to: '',
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                    this.typesMap.undirected.push(edgeType.name)
                                }
                            }

                        }
                        if (edgeType.allowedLinks.hasOwnProperty(secondNode.semantic_type)) {
                            if (include(edgeType.allowedLinks[secondNode.semantic_type], firstNode.semantic_type)) {
                                if (edgeType.oriented) {
                                    toReturn.push({
                                        from: 1,
                                        to: 0,
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                    this.typesMap.reverse.push(edgeType.name)
                                }
                                else if (firstNode.semantic_type != secondNode.semantic_type) {
                                    toReturn.push({
                                        from: '',
                                        to: '',
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                    this.typesMap.undirected.push(edgeType.name)
                                }
                            }

                        }
                    });
                }
                let bidirectional_types = [];
                toReturn.forEach((type, index, object) => {
                    if (include(this.typesMap.undirected, type.name)) {type.orientation = 'undirected'}
                    else if (include(this.typesMap.direct, type.name) && include(this.typesMap.reverse, type.name)){
                        if (include(bidirectional_types, type.name)) {
                            object.splice(index, 1);
                            console.log('POPPING');
                        }
                        else {
                            type.orientation = 'bidirectional';
                            bidirectional_types.push(type.name);
                            console.log('ADDING');
                            console.log(type.name);
                        }
                    }
                    else if (include(this.typesMap.direct, type.name)) {type.orientation = 'direct'}
                    else if (include(this.typesMap.reverse, type.name)) {type.orientation = 'reverse'}
                });
                return toReturn;
            }
        },
        mounted () {
        },
        watch: {
            selectedTypeName(newVal, oldVal){
                this.selectedType = this.availableTypes.filter((type) => {
                        return type.name == this.selectedTypeName;
                    })[0] || {};
                console.log(this.selectedType);
            }
        },
        methods: {
            ...mapActions({
                setWorkMode: 'setWorkMode',
                addNewEdge: 'addNewEdge'
            }),
            onFirstNodeSelected (value) {
                this.onNodeSelect(0, value);
            },
            onSecondNodeSelected (value) {
                this.onNodeSelect(1, value);
            },
            swapNodes () {
                if (this.selectedNodes.length == 2) {
                    this.selectedNodes.reverse();

//                    this.$refs.secondSearchRow.$forceUpdate();
                }
            },
            onSelectFirstOff () {
                if (this.selectedNodes.length > 0) this.selectedNodes = this.selectedNodes.splice(0, 1);
            },
            onSelectSecondOff () {
                if (this.selectedNodes.length > 1) this.selectedNodes = this.selectedNodes.splice(1, 1);
            },
            onNodeSelect(index, value) {
                if (index == 0) this.selectedNodes[0] = value.selected;
                if (index == 1) {
                    if (this.selectedNodes.length == 1)
                        this.selectedNodes.push(value.selected);
                    else
                        this.selectedNodes[1] = value.selected;
                }
            },
            typeSelected (selectedType) {
                if (selectedType.orientation == 'reverse') {
                    this.swapNodes()
                }
            },
            confirmButtonClicked () {
                let newEdge = this.$refs.inputCard.getData();
                if (newEdge) {
                    newEdge.source = this.selectedNodes[0].id;
                    newEdge.target = this.selectedNodes[1].id;
                    newEdge.data.id = newEdge.source + '_' + newEdge.target;
                    newEdge.edgeType = this.selectedTypeName;
                    this.addNewEdge(newEdge);
                    this.setWorkMode({workMode: 'none'});
                }
            },
            closeButtonClick () {
                this.setWorkMode({workMode: 'none'});
            }
        }
    }
</script>

<style>

    .semantic-type-select-label {
        color: rgba(130, 135, 140, 0.94);
    }

    .confirm-button {
        margin-top: 13px;
        margin-bottom: 10px;
    }

    .md-icon-button.swap-button {
        position: absolute;
        margin-top: 20% !important;
        margin-left: 85% !important;

    }

    .link-icon {
        margin-right: 8px;
        margin0left: 3px;
    }

    .type-select-container {
        margin-top: 13px;
    }

    .type-select-container {
        margin-left: 6%;
        width: 81%;
    }

    .inputs-container {
        padding-left: 5%;
        padding-right: 5%;
        margin-top: 15px;
    }

    .autocomlete-input-label {
        margin-bottom: -5px;
    }

    .add-edge-card {
        background-color: #f7f7f4 !important;
        overflow: inherit !important;
    }

    .search-row {
        margin-left: 7px;
        width: 80%;
        display: inline-block;
    }
    .additional-label {
        margin-left: 16px;
        color: rgba(0,0,0,0.26);
        font-size: 13px;
    }

</style>