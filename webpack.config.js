const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://editor.matteobruni.it/
GitHub : https://www.github.com/matteobruni/objectgui
How to use? : Check the GitHub README
v${version}`;

const minBanner = `ObjectGUI v${version} by Matteo Bruni`;

const getJsConfig = (entry) => {
    const reportFileName = "report";

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this"
        },
        resolve: {
            extensions: [".js", ".json"]
        },
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner,
                exclude: /\.min\.js$/
            }),
            new webpack.BannerPlugin({
                banner: minBanner,
                include: /\.min\.js$/
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static",
                exclude: /\.min\.js$/,
                reportFilename: `${reportFileName}.html`
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                    sourceMap: false,
                    terserOptions: {
                        output: {
                            comments: minBanner
                        }
                    },
                    extractComments: false
                })
            ]
        }
    };
};

module.exports = [
    getJsConfig({
        "js/objectgui": "./dist/js/index.js",
        "js/objectgui.min": "./dist/js/index.js"
    })
];