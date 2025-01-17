module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			webpackConfig.optimization = {
				...webpackConfig.optimization,
				minimize: false,
				splitChunks: {
					chunks: 'all',
				},
			};
			return webpackConfig;
		},
	},
};

