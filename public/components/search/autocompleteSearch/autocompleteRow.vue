<template>
        <div class="md-list-item-holder">
            {{ data.name }} {{ data.surname}}
            <div v-if="data.workplace" class="additional-label"> {{ data.workplace }} </div>
        </div>
</template>
<script>
    export default{
        data() {
            return {}
        },
        components: {},
        computed: {},
        props: ['data'],
        methods: {}
    }
</script>

<style>

    .additional-label {
        margin-left: 16px;
        color: rgba(0,0,0,0.26);
        font-size: 13px;
    }

</style>