const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/services/orderServices/injects/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'orderServicesInjects.bundle.js',
        library: 'orderServicesInjects',
        libraryTarget: 'var',
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    stats: {
        errorDetails: true,
    },
}
