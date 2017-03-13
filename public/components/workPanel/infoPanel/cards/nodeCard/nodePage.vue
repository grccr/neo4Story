<template>
    <div class="general-details-container">
        <md-card-content>
            <p v-for="fieldName in page.fields" v-if="information[fieldName]">
                <label class="card-label">{{ fieldAlias(fieldName) }}:</label>
                {{information[fieldName]}}
            </p>
        </md-card-content>
    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {}
        },
        computed: {},
        mounted () {

        },
        props: ['information', 'editable', 'page', 'typeConfig'],
        methods: {
            fieldAlias (fieldName) {
                return this.typeConfig.fields.filter((field) => {
                    return field.name == fieldName;
                })[0].alias;
            }
        }
    }
</script>

<style>
    .card-label {
        font-size: 15px;
        font-weight: 600;
    }
</style>