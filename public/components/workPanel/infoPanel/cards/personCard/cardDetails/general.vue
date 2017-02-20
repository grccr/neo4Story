<template>
    <div class="general-details-container">

        <md-card-content>


            <p v-if="information.position"><label class="card-label">Position:</label> {{information.position}}</p>
            <p v-if="information.birthDate && age"><label class="card-label">Age:</label> {{age}}</p>
            <p v-if="information.birthDate"><label class="card-label">Birthday:</label> {{information.birthDate}}</p>
            <p v-if="information.university"><label class="card-label">Education:</label> {{information.university}}</p>

        </md-card-content>

    </div>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {}
        },
        computed: {
            age() {
                let ageDifMs = Date.now() - new Date(this.information.birthDate).getTime();
                let ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
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