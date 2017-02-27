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
            <div class="type-select-container">
                <label for="node-type-select" class="semantic-type-select-label">Node type:</label>
                <md-select name="node-type-select" id="node-type-select" v-model="selectedTypeName">
                    <md-option v-for="type in availableTypes" :value="type.name">{{type.value}}</md-option>
                </md-select>
            </div>

            <input-card :type-config="selectedType" :ref="inputCard" class="input-card"
                        v-if="selectedType.name"></input-card>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClick">Create!</md-button>
        </md-card>

    </div>
</template>
<script>

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                selectedTypeName: "",
                selectedType: {}
            };
        },
        components: {
            inputCard: require('./inputCard.vue')
        },

        computed: {
            availableTypes(){
                return this.$store.state.appConfig.config.nodeTypes;
            }
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
                showAddPanel: "showAddPanel",
                setWorkMode: "setWorkMode",
//                switchNodeType: "switchNodeType",
                addNewNode: "addNewNode"
            }),
            closeButtonClick () {
                this.setWorkMode({workMode: 'none'});
            },
            confirmButtonClick(){
                console.log(this.$refs.inputCard.$refs);
                let fields = {};
                for (let key in this.$refs.inputCard.$refs) {
                    if (this.$refs.inputCard.$refs.hasOwnProperty(key)) {
                        fields[key] = this.$refs.inputCard.$refs[key][0].data;
                    }
                }
                let nodeType = this.selectedNodeType.name;
                let nodeData = fields;
                console.log(nodeType);
                console.log(nodeData);
//                this.addNewNode({
//                    nodeType: nodeType,
//                    nodeData: nodeData
//                });
                this.setWorkMode({workMode: 'none'});
            }
        }
    }
</script>

<style>

    .radio-container {
        text-align: center;
    }

    .data-inputs-container {
        padding-left: 4%;
        padding-right: 8%;
        padding-top: 6%;
        overflow: auto;
        max-height: 60%;
        /*padding-bottom: 10%;*/
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