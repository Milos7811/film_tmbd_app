<template>
	<v-select
		v-model="selectedSortBy"
		:items="sortBy"
		item-text="name"
		item-value="value"
		:menu-props="{ top: false, offsetY: true }"
		label="Zoradiť"
		width="250"
		height="48"
		class="select"
		solo
	>
	</v-select>
</template>

<script>
export default {
	data() {
		return {
			sortBy: [
				{ name: 'Popularita od najväčšej', value: 'popularity.desc' },
				{ name: 'Popularita od najmenšej', value: 'popularity.asc' },
				{
					name: 'Hodnotenie od najväčšieho',
					value: 'vote_average.desc'
				},
				{
					name: 'Hodnotenie od najmenšieho',
					value: 'vote_average.asc'
				},
				{
					name: 'Dátum vydania od najnovšieho',
					value: 'release_date.desc'
				},
				{
					name: 'Dátum vydania od najstaršieho',
					value: 'release_date.asc'
				}
				// {
				// 	name: 'Názov (A-Z)',
				// 	value: 'original_title.desc'
				// },
				// {
				// 	name: 'Názov (Z-A)',
				// 	value: 'original_title.asc'
				// }
			],
			selectedSortBy: ''
		}
	},
	watch: {
		selectedSortBy() {
			this.$root.$emit('search-sort-by', this.selectedSortBy)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.select {
	border-radius: em(20);
	width: em(250) !important;
	height: em(48);
	margin-top: em(5);
	padding: em(0) !important;
}
</style>
