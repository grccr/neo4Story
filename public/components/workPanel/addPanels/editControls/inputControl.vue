<template>
    <div class="data-input-container">
        <md-input-container class="data-row-container" v-if="correct">
            <label class="data-label">{{field.value}}</label>
            <md-input class="data-input" v-model="data" :placeholder="field.alias"></md-input>
        </md-input-container>
        <md-input-container class="data-row-container md-input-invalid" v-if="(!correct)">
            <label class="data-label">{{field.value}}</label>
            <md-input class="data-input" v-model="data" :placeholder="field.alias"></md-input>
        </md-input-container>
    </div>
</template>
<script>


    export default{
        data() {
            return {
                data: '',
                correct: true
            }
        },
        components: {},

        computed: {},
        watch: {
            data(newVal, oldVal) {
                this.correct = true
            }
        },
        methods: {
            validate(){
                if (this.field.required){
                    if (this.data){
                        return this.data;
                    }
                    else {
                        this.correct = false;
                        return false;
                    }
                }
                else return this.data;
            }
        },
        props: {
            field: {
                type: Object
            }
        }
    }
</script>

<style>
    /*.data-input {*/
    /*font-size: 18px !important;*/
    /*}*/

    /*.data-input::-webkit-input-placeholder {*/
    /*!*font-size: 18px !important;*!*/
    /*font-family: Roboto;*/
    /*}*/

    /*.data-row-container {*/
    /*!*width: 19%;*!*/
    /*margin-left: 10px;*/
    /*margin-right: 20px;*/
    /*margin-top: 40px;*/
    /*margin-buttom: 80px;*/
    /*z-index: 10;*/
    /*margin-bottom: 10px;*/
    /*}*/

    /*.data-label {*/
    /*top: -3px !important;*/
    /*}*/

</style>