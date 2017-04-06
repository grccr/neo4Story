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
            <md-select name="node-type-select" id="node-type-select" v-model="selectedNodeType">
                <md-option v-for="type in availableTypes" :value="type" >{{type.name}}</md-option>
            </md-select>
        </div>
            <!--<input-card node-type="nodeType" ref="inputCard"></input-card>-->
            <data-input v-for="field in selectedNodeType.fields" :field="field" :ref="field.name"></data-input>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClick">Create!</md-button>
        </md-card>

    </div>
</template>
<script>

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                selectedNodeType: ""
            };
        },
        components: {
//            createPerson: require('./nodeTypes/createPerson.vue'),
//            createCompany: require('./nodeTypes/createCompany.vue'),
            inputCard: require('./inputCard.vue'),
            dataInput: require('./dataInput.vue')
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
//                switchNodeType: "switchNodeType",
                addNewNode: "addNewNode"
            }),
            closeButtonClick () {
                this.setWorkMode({workMode: 'none'});
            },
            confirmButtonClick(){
                console.log(this.$refs);
                let fields = {};
                for (let key in this.$refs) {
                    if (this.$refs.hasOwnProperty(key)) {
                        fields[key] = this.$refs[key][0].data;
                    }
                }
                let nodeType = this.selectedNodeType.name;
                let nodeData = fields;
                console.log(nodeType);
                console.log(nodeData);
                this.addNewNode({
                    nodeType: nodeType,
                    nodeData: nodeData
                });
                this.setWorkMode({workMode: 'none'});
            }
        }
    }
</script>

<style>

    .radio-container {
        text-align: center;
    }
    .data-input {
        padding-left: 3%;
        padding-right: 2%;
    }

    #create-person-inputs .confirm-button {
        margin-bottom: 3%;
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