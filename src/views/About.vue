<template>
	<div class="container">
		<article>
			<h1></h1>
			<p>
				Táto stránka bola vytvorená za účelom vytvorit svoj vlastný
				projekt kďe budem môcť rozširovať svoje znalosti a skúsenosti oh
			</p>
		</article>
	</div>
</template>
<script>
export default {
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