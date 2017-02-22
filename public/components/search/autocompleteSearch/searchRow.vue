<template>
    <div @keydown.enter="searchRequestEnterPressed"
         @keydown.down='down'
         @keydown.up='up'>
        <md-input-container class="search-row-container">
            <label v-if="labelActive" class="search-label">Search</label>
            <md-input class="search-input" v-model="searchRequest" v-on:blur.native="onBlured" :placeholder="searchPlaceholder"></md-input>
        </md-input-container>
        <div class="autocomplete-menu md-menu-content md-direction-bottom-right md-active"
             id="autocomplete-container"
             v-if="open && matches.length > 0">
            <ul class="md-list md-theme-default">
                <li class="md-list-item md-menu-item" v-for="(match, index) in matches"
                    v-bind:class="{'active': isActive(index)}"
                    @click="matchClick(index)">
                    <button type="button" class="md-button md-button md-list-item-container md-theme-default">
                        <autocomplete-row :data="match"></autocomplete-row>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    'use strict';

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                searchRequest: this.selectedElement ? (this.selectedElement.name || '') + ' ' + (this.selectedElement.surname || '') : '',
                matches: this.selectedElement ? [this.selectedElement] : [],
                selection: this.selectedElement ? this.selectedElement : {},
                current: -1,
                open: false,
                ignoreSearchWatch: false
            };
        },
        components: {
            autocompleteRow: require('./autocompleteRow.vue')
        },
        watch: {
            searchRequest (newVal, oldVal) {
                if(!this.ignoreSearchWatch) {
                    this.$emit('selectOff');
                    if (!newVal) {
                        this.matches = [];
                        return;
                    }
                    this.open = true;
                    this.neo4jFullTextSearch({searchRequest: newVal})
                            .then((graphResponse) => {
                                this.matches = graphResponse.nodes;
                            });
                }
                this.ignoreSearchWatch = false;
            },
        },
        props: {
            labelActive: {
                type: Boolean,
                default: true
            },
            clearOnSelect: {
                type: Boolean,
                default: false
            },
            onlyAutocomplete: {
                type: Boolean,
                default: false
            },
            selectedElement: {
                type: Object
            }
        },
        computed: {
            searchPlaceholder () {
                return this.$store.state.appConfig.config.searchPlaceholder;
            }
        },
        methods: {
            ...mapActions({
                neo4jFullTextSearch: "neo4jFullTextSearch"
            }),
            onBlured () {
                setTimeout(() => {
                    this.current = -1;
                    this.matches = [];
                }, 100);
            },
            searchRequestEnterPressed () {
                if (this.current > -1) {
                    this.selection = this.matches[this.current];
                    this.ignoreSearchWatch = true;
                    this.searchRequest = (this.selection.name || '') + ' ' + (this.selection.surname || '');
                    this.$emit('elementSelected', {searchRequest: this.searchRequest, selected: this.selection});
                }
                else {
                    if(!this.onlyAutocomplete)
                        this.$emit('elementSelected', {searchRequest: this.searchRequest});
                    else
                        this.$emit('selectOff');
                }
                if (this.clearOnSelect)
                    this.searchRequest = '';
                this.open = false;
                this.current = -1;
            },
            up() {
                if (this.current > -1) {
                    this.current--;
                    if (this.current > -1) {
                        var container = document.getElementById('autocomplete-container');
                        var rowToScrollTo = document.getElementsByClassName('md-menu-item')[this.current];
                        container.scrollTop = rowToScrollTo.offsetTop;
                    }
                }
            },
            down() {
                if (this.current < this.matches.length - 1) {
                    this.current++;
                    //todo: find more flux way for scroll move problem
                    var container = document.getElementById('autocomplete-container');
                    var rowToScrollTo = document.getElementsByClassName('md-menu-item')[this.current];
                    container.scrollTop = rowToScrollTo.offsetTop;
                }
            },
            matchClick(index) {
                console.log("D");
                this.current = index;
                this.searchRequestEnterPressed();
            },
            isActive(index) {
                return index === this.current;
            },
            change() {
                if (this.open == false) {
                    this.open = true;
                    this.current = 0;
                }
            }

        }
    }
</script>

<style>

    .add-button {
        z-index: 10;
    }

    .search-input {
        font-size: 18px !important;
    }

    .search-input::-webkit-input-placeholder {
        font-size: 18px !important;
        font-family: Roboto;
    }

    .search-row-container {
        /*width: 19%;*/
        /*margin-left: 17px;*/
        z-index: 10;
        margin-bottom: 10px;
    }

    .search-label {
        top: -3px !important;
    }

    /*.search-container {*/
        /*position: fixed;*/
        /*padding-left: 17px;*/
        /*z-index: 10;*/
        /*width: 21%;*/
        /*margin-top: 14px;*/
        /*margin-left: 10px;*/
        /*min-width: 300px;*/
    /*}*/

    .active {
        background-color: #c7e2f9;
        font-size: 1.5em;
    }

    .autocomplete-menu {
        /*height: 20%;*/
        max-height: 300px;
        width: 100%;
        /*overflow: hidden;*/
        /*!*width: 20%;*!*/
        /*font-size: 1.2em;*/
        /*list-style-type: none;*/
    }

    .menu-item {
        height: 1.1em;

    }

    .dropdown-string {
        color: #901841;
    }

</style>