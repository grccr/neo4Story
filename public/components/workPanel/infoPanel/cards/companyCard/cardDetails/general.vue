<template>
    <div class="general-details-container">

        <md-card-content>

            
            <!--<p v-if="information.position"><label class="card-label">:</label> {{information.position}}</p>-->
            <!--<p v-if="information.birthDate"><label class="card-label">Возраст:</label> {{age}}</p>-->
            <!--<p v-if="information.birthDate"><label class="card-label">Дата рождения:</label> {{information.birthDate}}</p>-->
            <!--<p v-if="information.university"><label class="card-label">Образование:</label> {{information.university}}</p>-->

        </md-card-content>

    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {}
        },
        computed: {
        },
        mounted () {

        },
        props: ['information', 'editable'],
        methods: {}
    }
</script>

<style>
    .card-label {
        font-size: 15px;
        font-weight: 600;
    }
</style>