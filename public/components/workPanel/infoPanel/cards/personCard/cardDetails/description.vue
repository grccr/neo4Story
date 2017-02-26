<template>
    <div class="description-details-container">
        <md-card-content>
            <p>{{information.description}}</p>
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
        props: ['information', 'editable'],
        methods: {}
    }
</script>