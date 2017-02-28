<template>
    <div id="create-person-inputs">
        <md-card>
            <div class="person-input-card">
                <md-input-container class="search-row-container name add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="name"  placeholder="Name"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container surname add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="surname"  placeholder="Surname"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container middleName add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="middleName"  placeholder="Middle name"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container workplace add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="workplace"  placeholder="Work"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container avatar add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="avatar"  placeholder="Avatar"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container birthdate add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="birthdate"  placeholder="Birthday"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container facebook add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="facebook"  placeholder="Facebook"></md-input>
                </md-input-container>
                <md-input-container class="search-row-container description add-input">
                    <!--<label>Input something</label>-->
                    <md-input v-model="description"  placeholder="Description"></md-input>
                </md-input-container>
                </div>
            <md-button class="md-raised md-primary confirm-button" v-on:click="confirmButtonClick">Create!</md-button>
        </md-card>

    </div>
</template>
<script>

    import {mapActions} from "vuex";
    export default{
        data() {
            return {
                name: '',
                surname: '',
                middleName: '',
                workplace: '',
                description: '',
                birthdate: '',
                facebook: '',
                avatar:''
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
                    surname: this.surname,
                    middleName: this.middleName,
                    workplace: this.workplace,
                    description: this.description,
                    birthdate: this.birthdate,
                    facebook: this.facebook,
                    avatar: this.avatar
            })
            },
            confirmButtonClick(){
                this.addNewNode(
                    {
                        nodeData:{
                            name: this.name,
                            surname: this.surname,
                            middleName: this.middleName,
                            workplace: this.workplace,
                            description: this.description,
                            birthdate: this.birthdate,
                            facebook: this.facebook,
                            avatar: this.avatar
                },
                    nodeType: 'Person'
                });
                this.setWorkMode({workMode: 'none'});
            }
        }
    }
</script>

<style>
    .person-input-card {
        padding-left: 3%;
        padding-right: 2%;
    }

    #create-person-inputs .confirm-button {
        margin-bottom: 3%;
    }
    /*.input-card{*/
        /*background-color: #f7f7f4 !important;*/
    /*}*/
    /*.name{*/
        /*z-index: 1000;*/
    /*}*/
    /*.add-input{*/
        /*margin-left: 4px;*/
        /*margin-right: 9px;*/
        /*width: 88%;*/
    /*}*/

</style>