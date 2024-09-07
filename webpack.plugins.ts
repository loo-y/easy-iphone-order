import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

export const plugins = [
    new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure',
    }),
    new NodePolyfillPlugin(),
    new CopyPlugin({
        patterns: [{ from: 'src/main/tray-icon.png', to: 'tray-icon.png' }],
    }),
]
