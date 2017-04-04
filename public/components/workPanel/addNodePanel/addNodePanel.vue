<template>
    <div class="create-node-panel">
        <md-card>
        <md-toolbar class="md-dense">

            <md-icon class="link-icon">note_add</md-icon>
            <h3 class="md-title" style="flex: 1">Create node</h3>

            <md-button class="md-icon-button" v-on:click="closeButtonClick">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="top">Close</md-tooltip>
            </md-button>
        </md-toolbar>
        <!--<div class="radio-container">-->
            <!--<md-radio v-model="radioType" id="my-test1" name="my-test-group1" md-value="Person" @change="radioButtonChange">Person</md-radio>-->
            <!--<md-radio v-model="radioType" id="my-test2" name="my-test-group1" md-value="Company" @change="radioButtonChange">Company</md-radio>-->
        <!--</div>-->
        <div class="type-select-container">
            <label for="node-type-select" class="semantic-type-select-label">Node type:</label>
            <md-select name="node-type-select" id="node-type-select" v-model="nodeType">
                <md-option v-bind:class="{'oriented-type': type.oriented}" v-for="type in availableTypes" :value="type" >{{type.name}}</md-option>
            </md-select>
        </div>
        <create-person v-if="radioType == 'Person'"></create-person>
        <!--<create-company></create-company>-->
        <create-company v-if="radioType == 'Company'"></create-company>
        </md-card>
    </div>
</template>
<script>

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                nodeType: ""
            };
        },
        components: {
//            createPerson: require('./nodeTypes/createPerson.vue'),
//            createCompany: require('./nodeTypes/createCompany.vue'),
            inputCard: require('./inputCard.vue'),
        },

        computed: {
            availableTypes(){
                return this.$store.state.appConfig.config.nodeTypes;
            }
        },

        methods: {
            ...mapActions({
                showAddPanel: "showAddPanel",
                setWorkMode: "setWorkMode",
                switchNodeType: "switchNodeType",
                addNewNode: "addNewNode"
            }),
            radioButtonChange() {
                this.switchNodeType(this.radioType);
            },
            closeButtonClick () {
//                this.selectNodes([]);
                this.setWorkMode({workMode: 'none'});
            }
//            confirmButtonClick(){
////                this.neo4jCreateCompany({
////                    name: this.name,
////                    inn: this.inn,
////                    city: this.city,
////                    description: this.description,
////                    country: this.country,
////                    url: this.url
////                });
////                this.addNewNode(this.$store.state.addNodeButton.inputData);
//                console.log(this.$store.state.addNodeButton.inputData);
////                this.showAddPanel(false);
////                this.showAddPanel(false);
//                this.setWorkMode({workMode: 'none'});
//            }
        }
    }
</script>

<style>

    .radio-container {
        text-align: center;
    }

    /*.create-node-panel{*/
    /*width: 20%;*/
    /*max-height: 70%;*/
    /*min-width: 320px;*/
    /*top: 100px;*/
    /*position: fixed;*/
    /*padding-left: 15px;*/
    /*}*/


</style>