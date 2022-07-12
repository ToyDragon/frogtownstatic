"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Path = __importStar(require("path"));
module.exports = [
    {
        output: {
            filename: 'indexBundle.js',
            path: __dirname,
            libraryTarget: 'commonjs',
        },
        name: 'indexBundle',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        entry: Path.resolve(__dirname, './views/index.js'),
        mode: 'development',
        devtool: 'source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    },
];
//# sourceMappingURL=webpack.config.js.map