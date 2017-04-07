
<template>
    <div class="input-card-container">
        <dataInput v-for="field in fields" :field="field" :ref="field.name"></dataInput>
    </div>
</template>
<script>


    export default{
        data() {
            return {}
        },
        components: {
            dataInput: require('./dataInput.vue')
        },

        computed: {
            fields (){
                console.log('computing fields');
                console.log(this.nodeType.fields);
                return this.nodeType.fields
            }
        },

        methods: {},
        props: {
            nodeType:{
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