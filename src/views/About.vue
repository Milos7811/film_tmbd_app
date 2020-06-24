<template>
	<div class="container">
		<article>
			<h1></h1>
			<p class="text">
				Táto stránka bola vytvorená za účelom vytvoriť svoj vlastný
				projekt kde si budem môcť rozširovať svoje znalosti a skúsenosti
				ohľadom programovania webových stránok .
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
.text {
	max-width: 50%;
	margin: auto;
	text-align: left;
}
</style>
