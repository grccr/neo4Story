<template>
        <div class="md-list-item-holder">
            {{ label }}
            <div v-if="sublabel" class="additional-label"> {{ sublabel }} </div>
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
            },
            label () {
                var extra = '';
                if(this.typeConfig.extraMainLabelFields)
                    this.typeConfig.extraMainLabelFields.forEach((extraField) => {
                        if (this.information[extraField])
                            extra += this.information[extraField] + ' ';
                    });
                if (extra)  extra = extra.slice(0, -1);
                return this.information[this.typeConfig.mainLabelField] + ' ' + extra;
            },
            sublabel() {
                if(this.typeConfig.subLabelField) return this.information[this.typeConfig.subLabelField];
                return '';
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