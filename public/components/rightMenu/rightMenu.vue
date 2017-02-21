<template>
    <div class="right-menu">

        <md-button class="md-icon-button md-raised right-menu-btn layout-btn" @click="layoutBtnClick">
            <!--<md-icon>wb_sunny</md-icon>-->
            <md-tooltip md-direction="left">Layout</md-tooltip>

        </md-button>

        <md-button class="md-icon-button md-raised right-menu-btn" @click="addNodeClicked">
            <md-icon>note_add</md-icon>
            <md-tooltip md-direction="left">Add person/company</md-tooltip>
        </md-button>

        <md-button class="md-icon-button md-raised right-menu-btn" @click="addEdgeClicked">
            <md-icon>link</md-icon>
            <md-tooltip md-direction="left">Add relationship</md-tooltip>
        </md-button>

        <md-button class="md-icon-button md-raised right-menu-btn">
            <md-icon>file_download</md-icon>
            <md-tooltip md-direction="left">Download</md-tooltip>
        </md-button>

        <md-button class="md-icon-button md-raised right-menu-btn clean-btn" @click=cleanClicked>
            <md-tooltip md-direction="left">Clear</md-tooltip>
            <!--<md-icon>clear</md-icon>-->
        </md-button>

    </div>
</template>

<script type="text/javascript">

    import {mapActions} from "vuex";
    export default {
        data () {
            return {}
        },
        computed: {},
        mounted () {

        },
        methods: {
            ...mapActions({
                graphLayout: "graphLayout",
                setWorkMode: 'setWorkMode',
                cleanGraph: "cleanGraph",
            }),
            layoutBtnClick(){
                this.graphLayout({layoutFlag: true});
            },
            addNodeClicked () {
                this.setWorkMode({workMode: 'addNode'});
            },
            addEdgeClicked() {
                this.setWorkMode({workMode: 'addEdge'});
            },
            cleanClicked() {
                this.setWorkMode({workMode: 'none'});
                this.cleanGraph();
            }
        }
    }
</script>


<style>
    .right-menu {
        display: block;
        position: absolute;
        padding: 4px;
        right: 10px;
        top: 20%;
    }

    .layout-btn {
        background-image: url("../../img/icons/networking.png");
        background-repeat: no-repeat;
        background-size: 70% 70%;
        background-position: center;
    }

    .clean-btn {
        background-image: url("../../img/icons/broom.png");
        background-repeat: no-repeat;
        background-size: 60% 60%;
        background-position: center;
    }

    .right-menu-btn {
        display: block;
        margin-top: 14px !important;
        background-color: #fff !important;
    }

    .md-tooltip {
        font-size: 13px !important;
    }

    /* some hell with vuematerial css hover behaviour*/
    .layout-btn:hover {
        background-image: url("../../img/icons/networking.png") !important;
        background-repeat: no-repeat !important;
        background-size: 70% 70% !important;
        background-position: center !important;
    }

    .clean-btn {
        background-image: url("../../img/icons/broom.png") !important;
        background-repeat: no-repeat !important;
        background-size: 60% 60% !important;
        background-position: center !important;
    }

</style>