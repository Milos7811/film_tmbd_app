module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
        @import "@/scss/app.scss";
        @import "@/scss/colors.scss";
        `
			}
		}
	},
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'http://localhost:8080'
	}
}
