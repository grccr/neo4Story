
<template>
    <div class="fields-card-container">
        <div class="field-control" v-for="field in fields">
            <data-input :field="field" :ref="field.name" v-if="field.editControl == 'input'"></data-input>
            <data-select :field="field" :ref="field.name" v-if="field.editControl == 'select'"></data-select>
            <data-datepicker :field="field" :ref="field.name" v-if="field.editControl == 'datepicker'"></data-datepicker>
            <data-range :field="field" :ref="field.name" v-if="field.editControl == 'range'"></data-range>
        </div>
    </div>
</template>
<script>


    export default{
        data() {
            return {}
        },
        components: {
            dataInput: require('./editControls/inputControl.vue'),
            dataSelect: require('./editControls/selectControl.vue'),
            dataDatepicker: require('./editControls/datepickerControl.vue'),
            dataRange: require('./editControls/rangeControl.vue')
        },

        computed: {
            fields (){
                return this.typeConfig.fields;
            }
        },

        methods: {
        },
        props: {
            typeConfig: {
                type: Object
            }
        }
    }
</script>

<style>
    /*.input-card-container{*/
        /*height: 100%;*/
        /*width: 100%;*/
    /*}*/

</style>