<template>
    <div class="application-title">
        {{ appTitle }}
    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {}
        },
        computed: {
            appTitle () {
                return this.$store.state.appConfig.config.appTitle;
            }
        },
        mounted () {

        },
        methods: {}
    }
</script>

<style>
    .application-title {
        position: absolute;
        right: 8%;
        top: 50px;
        font-size: 21px;
        font-family: Roboto;
        color: #989898;
        -webkit-user-select: none;
    }
</style>