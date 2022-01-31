const path = require("path");

module.exports = {
    entry: "./src/app.js",
    watch: true,
    mode: 'development',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
};