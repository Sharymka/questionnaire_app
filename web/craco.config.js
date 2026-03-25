const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
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
	jest: {
		configure: (jestConfig) => {
			return {
				...jestConfig,
				moduleNameMapper: {
					...(jestConfig.moduleNameMapper || {}),
					'^@/(.*)$': '<rootDir>/src/$1',
				},
			};
		},
	},
};
