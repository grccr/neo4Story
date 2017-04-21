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
                    <search-row @elementSelected="onFirstNodeSelected"
                                @selectOff="onSelectFirstOff"
                                class="search-row"
                                :onlyAutocomplete="true"
                                :labelActive="false"
                                :selectedElement="selectedNodes[0]"
                    > </search-row>
                    <!--<md-button class="md-mini md-icon-button">-->
                        <!--<md-icon>location_searching</md-icon>-->
                    <!--</md-button>-->
                </div>
                <div class="search-input-container">
                    <label class="autocomlete-input-label">2:</label>
                    <search-row @elementSelected="onSecondNodeSelected"
                                @selectOff="onSelectSecondOff"
                                class="search-row"
                                :onlyAutocomplete="true"
                                :selectedElement="selectedNodes[1]"
                                :labelActive="false"> </search-row>

                </div>
                <div v-if="inputsActivated">
                    <div class="type-select-container">
                        <label for="semantic-type-select" class="semantic-type-select-label">Relationship type:</label>
                        <md-select :disabled="!inputsActivated" name="semantic-type-select" id="semantic-type-select" v-model="selectedTypeName">
                            <md-option :disabled="type.from == 1" v-bind:class="{'oriented-type': type.oriented}" v-for="type in availableTypes" :value="type.name" >{{type.value}}</md-option>
                        </md-select>
                    </div>
                    <!--<md-input-container class="search-row-container">-->
                        <!--<md-input :disabled="!inputsActivated" v-model="comment" placeholder="Prooflink"></md-input>-->
                    <!--</md-input-container>-->
                    <input-card :type-config="selectedType" ref="inputCard" class="input-card"
                                v-if="selectedType.name"></input-card>
                </div>

            </div>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClicked">Ok, go!</md-button>
        </md-card>
    </div>
</template>

<script type="text/javascript">
    import {mapActions} from "vuex";
    export default {
        data () {
            return {
                selectedTypeName: 'friends',
                selectedType: {},
                comment: '',
                selectedNodes: JSON.parse(JSON.stringify(this.selectedElements)),
//                ppTypes: [{value: 'friends', name: 'Друзья', oriented: false}, {value: 'collegue', name: 'Collegue', oriented: false}],
//                pcTypes: [{value: 'host', name: 'Учредитель', oriented: false}, {value: 'client', name: 'Client', oriented: false}],
//                ccTypes: [{value: 'child', name: 'Дочка', oriented: true}]       // oriented type! todo coloring of oriented types
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
//        mounted () {
//            console.log("MOUNT");
//            this.selectedNodes = JSON.parse(JSON.stringify(this.selectedNodesProp));
//          this.$nextTick(() => {
//
//              console.log(this.selectedNodesProp);
//
//          });
//        },
        components: {
            searchRow: require('../../../search/autocompleteSearch/searchRow.vue'),
            inputCard: require('./../inputCard.vue')
        },
        computed: {
            inputsActivated () {
                return this.selectedNodes.length == 2 && this.selectedNodes[0];
            },
            availableTypes () {
                let include = (arr,obj) => {
                    return (arr.indexOf(obj) != -1);
                };
                let toReturn = [];
                if (this.selectedNodes.length == 2) {
                    let firstNode = this.selectedNodes[0];
                    let secondNode = this.selectedNodes[1];
                    this.$store.state.appConfig.config.edgeTypes.forEach((edgeType) => {
                        if (edgeType.allowedLinks.hasOwnProperty(firstNode.semantic_type)) {
                            if (include(edgeType.allowedLinks[firstNode.semantic_type], secondNode.semantic_type)){
                                if (edgeType.oriented) {
                                    toReturn.push({
                                        from: 0,
                                        to: 1,
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });}
                                else {
                                    toReturn.push({
                                        from: '',
                                        to: '',
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                }
                            }

                        }
                        if (edgeType.allowedLinks.hasOwnProperty(secondNode.semantic_type)) {
                            if (include(edgeType.allowedLinks[secondNode.semantic_type], firstNode.semantic_type)){
                                if (edgeType.oriented) {
                                    toReturn.push({
                                        from: 1,
                                        to: 0,
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });}
                                else {
                                    toReturn.push({
                                        from: '',
                                        to: '',
                                        value: edgeType.value,
                                        name: edgeType.name,
                                        oriented: edgeType.oriented,
                                        fields: edgeType.fields
                                    });
                                }
                            }

                        }
                    });
            }
                return toReturn;
        }},
        mounted () {
        },
        watch: {
            selectedTypeName(newVal, oldVal){
                this.selectedType = this.availableTypes.filter((type) => {
                        return type.name == this.selectedTypeName;
                    })[0]||{};
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
            onSelectFirstOff () {
                if(this.selectedNodes.length > 0) this.selectedNodes = this.selectedNodes.splice(0, 1);
            },
            onSelectSecondOff () {
                if(this.selectedNodes.length > 1) this.selectedNodes = this.selectedNodes.splice(1, 1);
            },
            onNodeSelect(index, value) {
                if (index == 0) this.selectedNodes[0] = value.selected;
                if (index == 1) {
                    if(this.selectedNodes.length == 1)
                        this.selectedNodes.push(value.selected);
                    else
                        this.selectedNodes[1] = value.selected;
                }
            },
            typeSelected (selected) {
                console.log(selected);
            },
            confirmButtonClicked () {
                let newEdge = this.$refs.inputCard.getData();
                if (newEdge) {
                    newEdge.source = this.selectedNodes[0].id;
                    newEdge.target = this.selectedNodes[1].id;
                    newEdge.data.id = newEdge.source + '_' + newEdge.target;
                    newEdge.edgeType = this.selectedTypeName;
                    this.addNewEdge(newEdge);
                }
                this.setWorkMode({workMode: 'none'});
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

</style>