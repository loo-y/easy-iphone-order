import type { ForgeConfig, ForgeMakeResult } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import { FusesPlugin } from '@electron-forge/plugin-fuses'
import { FuseV1Options, FuseVersion } from '@electron/fuses'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const preBuild = async () => {
    const { exec } = require('child_process')
    return new Promise((resolve, reject) => {
        exec('npm run build:orderServicesInjects', (error, stdout, stderr) => {
            if (error) {
                console.error(`执行出错: ${error}`)
                return reject(error)
            }
            console.log(`stdout: ${stdout}`)
            console.error(`stderr: ${stderr}`)
            resolve(true)
        })
    })
}

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
        // osxSign: {},
    },
    hooks: {
        preMake: async () => {
            await preBuild()
        },
        // postMake: async (forgeConfig, makeResults): Promise<ForgeMakeResult[]> => {
        //     const { makeUniversalApp } = require('@electron/universal');
        //     const path = require('path');

        //     // 找到 macOS 的构建结果
        //     const macResults = makeResults.filter(result => result.platform === 'darwin');

        //     if (macResults.length >= 2) {
        //       const x64Result = macResults.find(result => result.arch === 'x64');
        //       const arm64Result = macResults.find(result => result.arch === 'arm64');

        //       if (x64Result && arm64Result) {
        //         const universalAppPath = path.join(path.dirname(x64Result.artifacts[0]), '..', 'universal');
        //         await makeUniversalApp({
        //           x64AppPath: x64Result.artifacts[0],
        //           arm64AppPath: arm64Result.artifacts[0],
        //           outAppPath: path.join(universalAppPath, 'YourAppName.app'),
        //         });

        //         // 添加通用二进制文件到结果中
        //         makeResults.push({
        //           ...x64Result,
        //           arch: 'universal',
        //           artifacts: [path.join(universalAppPath, 'YourAppName.app')],
        //         });
        //       }
        //     }

        //     return makeResults;
        // },
    },
    rebuildConfig: {},
    makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer/index.tsx',
                        name: 'main_window',
                        preload: {
                            js: './src/preload/index.ts',
                        },
                    },
                ],
            },
        }),
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
}

export default config
