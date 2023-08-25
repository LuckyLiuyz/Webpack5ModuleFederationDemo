const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
	mode,
	entry: "./src/index",
	output: {
		publicPath: "http://localhost:3001/", // New
	},
	devtool: "source-map",
	optimization: {
		minimize: mode === "production",
	},
	resolve: {
		extensions: [".jsx", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: require.resolve("babel-loader"),
				options: {
					presets: [require.resolve("@babel/preset-react")],
				},
			},
		],
	},

	plugins: [
		// New
		new ModuleFederationPlugin({
			name: "application_a",
			library: {type: "var", name: "application_a"},
			filename: "remoteEntry.js",
			exposes: {
				// "SayHelloFromA": "./src/app", 这么写会报错，详情参见： https://www.tkcnn.com/webpack/concepts/module-federation.html#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
				"./SayHelloFromA": "./src/app",
			},
			remotes: {
				application_b: "application_b",
			},
			shared: ["react", "react-dom"],
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
