<template>
        <div class="md-list-item-holder">
            {{ information.label }}
            <div v-if="information.sublabel" class="additional-label"> {{ information.sublabel }} </div>
        </div>
</template>
<script>
    export default{
        data() {
            return {}
        },
        components: {},
        computed: {
            typeConfig () {
                let match = this.$store.state.appConfig.config.nodeTypes.filter((type) => {
                    return type.name == this.information.semantic_type;
                });
                return match.length > 0 ? match[0] : false;
            }
        },
        props: ['information'],
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