import { ipcMain, BrowserWindow } from 'electron'
import { mainWindow } from '../main'

export default function systemServices() {
    // 这个需要被 ipcRenderer.send('minimize-to-tray') 触发
    ipcMain.on('minimize-to-tray', event => {
        console.log('ipcMain handle minimize-to-tray')
        const win = BrowserWindow.fromWebContents(event.sender)
        if (win) {
            win.hide()
        }
    })
    // 添加IPC监听器
    ipcMain.handle('toggle-always-on-top', async event => {
        if (mainWindow) {
            const isAlwaysOnTop = mainWindow.isAlwaysOnTop()
            mainWindow.setAlwaysOnTop(!isAlwaysOnTop)
            // 可选：将新状态发送回渲染进程
            // mainWindow.webContents.send('always-on-top-changed', !isAlwaysOnTop)
            console.log(`isAlwaysOnTop`, !isAlwaysOnTop)
            return !isAlwaysOnTop
        }
        return false
    })
}
