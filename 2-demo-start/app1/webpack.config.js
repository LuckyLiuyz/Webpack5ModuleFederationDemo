const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

module.exports = {
	devtool: false,
	entry: "./src/index",
	mode: "development",
	devServer: {
		port: 3001,
		static: path.join(__dirname, "dist"),
	},
	output: {
		publicPath: "http://localhost:3001/",
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: require.resolve("babel-loader"),
						options: {
							babelrc: false,
							cacheDirectory: true,
							presets: [
								require.resolve("@babel/preset-env"),
								require.resolve("@babel/preset-react"),
							],
							plugins: [
								[
									require.resolve("@babel/plugin-transform-runtime"),
									{
										corejs: false,
										helpers: true,
										regenerator: true,
										useESModules: false,
									},
								],
								[
									require.resolve("@babel/plugin-syntax-dynamic-import"),
									{
										helpers: false,
										polyfill: false,
										regenerator: true,
									},
								],
								[
									require.resolve("@babel/plugin-proposal-decorators"),
									{
										legacy: true,
									},
								],
								[
									require.resolve("@babel/plugin-proposal-class-properties"),
									{
										loose: true,
									},
								],
								[
									require.resolve(
										"@babel/plugin-proposal-private-property-in-object"
									),
									{
										loose: true,
									},
								],
								[
									require.resolve("@babel/plugin-proposal-private-methods"),
									{
										loose: true,
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.js[x]?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-react"],
				},
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					"style-loader",
					"css-loader",
					"less-loader",
				],
			},
		],
	},
	//http://localhost:3002/remoteEntry.js
	plugins: [
		new ModuleFederationPlugin({
			name: "app1",
			filename: "remoteEntry.js",
			exposes: {
				"./Slides": "./src/Slides",
				"./LoadProgress": "./src/LoadProgress/index.js",
				"./TwoPointDom": "./src/TwoPointDom/index.js",
			},
			remotes: {
				app2: "app2@http://localhost:3002/remoteEntry.js",
			},
			shared: {
				react: {singleton: true},
				"react-dom": {singleton: true},
			},
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
