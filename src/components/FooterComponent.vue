<template>
	<div class="wrapper">
		<div class="container">
			<h1 class="title-footer">© Holba 2020</h1>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.wrapper {
	height: em(50);
	background-color: $navbar;
}
.title-footer {
	color: $primary-text;
	float: left;
}
</style>
