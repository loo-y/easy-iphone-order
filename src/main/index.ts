import { app, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import path from 'path'
import setupServices from '../services/setupServices'
import { getConfig } from './electronStore'
import { configKeys } from '../shared/constants'
import { SystemConfig } from '../shared/types'

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit()
}

let tray: Tray | null = null
export let mainWindow: BrowserWindow | null = null

const createWindow = (): void => {
    console.log('createWindow')
    const systemConfig: SystemConfig = getConfig(configKeys.system)
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 1200,
        minHeight: 800,
        width: 500,
        minWidth: 500,
        alwaysOnTop: systemConfig.isAlwaysOnTop ?? false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true,
        },
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // 点击关闭时仅隐藏
    mainWindow.on('close', e => {
        e.preventDefault()
        mainWindow.hide()
        app.quit()
    })

    mainWindow.on('closed', () => {
        // mainWindow = null;
        // mainWindow.hide()
    })

    if (mainWindow) {
        mainWindow.show()
        mainWindow.focus()
    }

    createTray()

    setupMenus()

    setupServices()
}

// TODO 似乎没起作用
function setupMenus() {
    // 在 macOS 上，添加一个菜单项来退出应用
    if (process.platform === 'darwin') {
        const menu = Menu.buildFromTemplate([
            {
                label: app.name,
                submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
            },
        ])
        Menu.setApplicationMenu(menu)
    }
}

function createTray() {
    console.log('createTray, tray is existd: ', !!tray)
    if (tray !== null && !tray.isDestroyed()) {
        console.log('Tray 已存在，不需要重新创建')
        return
    }

    console.log('创建新的 Tray')
    tray = new Tray(path.join(__dirname, './resources/images/tray-icon.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示',
            click: () => {
                console.log(`click on 显示`, mainWindow)
                if (mainWindow) {
                    mainWindow.show()
                }
            },
        },
        {
            label: '退出',
            click: () => {
                console.log('click on 退出')
                app.quit()
                app.exit()
            },
        },
    ])
    tray.setToolTip('Puppeteer 服务控制')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        console.log('Tray 被点击')
        if (tray && !tray.isDestroyed() && mainWindow && !mainWindow.isDestroyed()) {
            // mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
            mainWindow.show()
        }
    })
}

function destroyTray() {
    if (tray && !tray.isDestroyed()) {
        console.log('销毁 Tray')
        tray.destroy()
        tray = null
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    console.log(`window-all-closed`)
    if (process.platform !== 'darwin') {
        destroyTray()
        app.quit()
    }
})

app.on('before-quit', () => {
    console.log('应用准备退出')
    destroyTray()
})

app.on('will-quit', () => {
    console.log('应用即将退出')
    destroyTray()
})

app.on('quit', () => {
    console.log('应用已退出')
})

app.on('activate', () => {
    console.log('app activate')
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    } else {
        mainWindow.show()
        mainWindow.focus()
    }

    if (tray === null || tray.isDestroyed()) {
        createTray()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
