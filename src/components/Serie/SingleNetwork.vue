<template>
	<div>
		<div class="wrapper">
			<a
				target="_blank"
				rel="noopener noreferrer"
				:href="`${this.resultNetwork.homepage}`"
			>
				<img
					class="network-logo"
					:src="
						`https://image.tmdb.org/t/p/original/${this.result.logo_path}`
					"
					alt=""
				/>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ['result'],
	data() {
		return {
			resultNetwork: ''
		}
	},
	created() {
		this.getResult()
	},

	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/network/${this.result.id}?api_key=${this.$apiKey}`
				)
				this.resultNetwork = response.data
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.wrapper {
	max-width: em(80);
	max-height: em(50);
	overflow: hidden;
}
.network-logo {
	width: 100%;
	height: 100%;

	// display: flex;
	// align-items: center;
}
</style>