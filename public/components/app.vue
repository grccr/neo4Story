<template>
	<div class="main">
		<div class="nav">
			<!-- <router-link class="link" :to="{ name: 'mainPage' }">MAIN<router-link> -->
			<!-- <router-link class="link" :to="{ name: 'bPage' }">BRATVA<router-link> -->
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {

			}
		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style type="text/css">
	body, html {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	.main {
		height: 100%;
    	width: 100%;
	}
</style>