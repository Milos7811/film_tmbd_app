<template>
	<div>
		<v-menu :open-on-hover="openOnHover" :offset-y="true">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on">
					Vyhladavanie
				</v-btn>
			</template>
			<v-list>
				<v-list-item>Filmy</v-list-item>
				<v-list-item>Herci</v-list-item>
				<v-list-item>Serialy</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<script>
// import AverageVote from '../components/AverageVote.vue'
export default {
	// components: { AverageVote },
	data() {
		return {
			openOnHover: true
		}
	},
	watch: {
		isActive(newValue, oldValue) {
			console.log(this.isActive)
		}
	}
}
</script>
<style lang="scss" scoped>
.ahoj {
	margin-top: 400px;
}
.okno {
	// min-height: 100%;
}
</style>