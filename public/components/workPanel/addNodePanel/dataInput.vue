<template>
    <div class="data-input-container">
        <md-input-container class="data-row-container">
            <label class="data-label">{{field.value}}</label>
            <md-input class="data-input" v-model="data" :placeholder="field.alias"></md-input>
        </md-input-container>
    </div>
</template>
<script>


    export default{
        data() {
            return {
                data: ''
            }
        },
        components: {},

        computed: {},

        methods: {},
        props: {
            field: {
                type: Object
            }
        }
    }
</script>

<style>
    .data-input {
        font-size: 18px !important;
    }

    .data-input::-webkit-input-placeholder {
        font-size: 18px !important;
        font-family: Roboto;
    }

    .data-row-container {
        /*width: 19%;*/
        /*margin-left: 17px;*/
        z-index: 10;
        margin-bottom: 10px;
    }

    .data-label {
        top: -3px !important;
    }

</style>