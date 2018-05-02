const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, "public/build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.css$/, exclude: [/node_modules/, /public/], loader: "style-loader!css-loader" }
        ]
    }
}
