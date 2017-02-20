<template>
    <div id="create-company-inputs">
        <md-card>
            <div class="company-input-card">
                <md-input-container class="search-row-container name add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="name"  placeholder="Name"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container surname add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="inn"  placeholder="INN"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container country add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="country"  placeholder="Country"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container city add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="city"  placeholder="City"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container description add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="description"  placeholder="Description"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container url add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="url"  placeholder="WEB URL"></md-input>
                </md-input-container>
            </div>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClick">Create!</md-button>
            <!--<md-button class="md-raised confirm-button" v-on:click="confirmButtonClick">Создать</md-button>-->
            <!--<md-button class="md-raised close-button" v-on:click="closeButtonClick">Закрыть</md-button>-->
        </md-card>
    </div>
</template>
<script>

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                name: '',
                inn: '',
                city: '',
                description: '',
                country: '',
                url:''
            }
        },
        components: {},

        computed: {},

        methods: {
            ...mapActions({
                inputDataToState: "inputDataToState",
                addNewNode: "addNewNode",
                setWorkMode: "setWorkMode"

            }),
            inputChanged() {
                this.inputDataToState({
                    name: this.name,
                    inn: this.inn,
                    city: this.city,
                    description: this.description,
                    country: this.country,
                    url: this.url})
            },
            closeButtonClick(){
                this.showAddPanel(false);
            },
            confirmButtonClick(){
//                debugger;
                this.addNewNode(
                    {
                        nodeData:{
                    name: this.name,
                    inn: this.inn,
                    city: this.city,
                    description: this.description,
                    country: this.country,
                    url: this.url},
                    nodeType: "Company"});
                this.setWorkMode({workMode: 'none'});
            }
        }
    }
</script>

<style>

    .company-input-card {
        padding-left: 3%;
        padding-right: 2%;
    }

    #create-company-inputs .confirm-button {
        margin-bottom: 3%;
    }


    /*.name{*/
        /*z-index: 1000;*/
    /*}*/
    /*.add-input{*/
        /*margin-left: 4px;*/
        /*margin-right: 9px;*/
        /*width: 88%;*/
    /*}*/

</style>