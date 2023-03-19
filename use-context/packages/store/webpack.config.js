const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const path = require('path');

module.exports = {

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    entry: path.resolve(__dirname, 'src/store.jsx'), // + 'path/to/your/file.js',

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
            name: "store",
            library: {type: 'var', name: 'store'},
            filename: "remoteEntryStore.js",
            exposes: {
              "./store": "./src/store",
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
