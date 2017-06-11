var path = require('path');

module.exports = {
    entry: {
        "app": "./app/index.ts"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "app/dist")
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts?$/, loader: "ts-loader" }
        ],
    },
};