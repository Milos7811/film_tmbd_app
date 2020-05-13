<template>
	<div class="about">
		<h1>This is an about page</h1>
		<!-- <v-app id="inspire"> -->
		<!-- <v-container fluid> -->
		<v-progress-circular
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular>
	</div>
</template>
<script>
export default {
	data() {
		return {
			switch1: true,
			switch2: false
		}
	}
}
</script>
