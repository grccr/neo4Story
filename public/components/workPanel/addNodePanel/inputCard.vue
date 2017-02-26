<template>
    <div class="input-card-container">
        <dataInput v-for="field in nodeType.fields" field="field" :ref="field.name"></dataInput>
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

        computed: {},

        methods: {},
        props: ['nodeType']
    }
</script>

<style>

</style>