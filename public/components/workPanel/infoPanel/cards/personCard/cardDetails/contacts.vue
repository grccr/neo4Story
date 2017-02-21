<template>
    <div class="contacts-details-container">

        <md-list class="md-double-line">
            <md-list-item v-if="information.fbUrl">
                <md-icon class="md-size-2x md-primary">face</md-icon>

                <a :href="information.fbUrl" class="contact-link">
                    <div class="md-list-text-container">
                        <span>facebook.com</span>
                    </div>
                </a>
            </md-list-item>

            <md-list-item v-if="information.vkUrl">
                <md-icon class="md-size-2x md-primary">face</md-icon>

                <a :href="information.vkUrl" class="contact-link">
                    <div class="md-list-text-container">
                        <span>vk.com</span>
                    </div>
                </a>
            </md-list-item>

        </md-list>

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