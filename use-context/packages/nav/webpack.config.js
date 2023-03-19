const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const deps = require("./package.json").dependencies;

module.exports = {

  entry: path.resolve(__dirname, 'src/Header.jsx'), // + 'path/to/your/file.js',

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  output: {
    path: path.resolve("dist"),
    filename: "[name].[fullhash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "nav",
      library: {type: 'var', name: 'nav'},
      filename: "remoteEntryNav.js",
      remotes: {
        store: "store"
      },
      exposes: {
        "./Header": "./src/Header",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
