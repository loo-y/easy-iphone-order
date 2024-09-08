import { ipcMain, BrowserWindow } from 'electron'
export default function trayServices() {
    //   ipcMain.handle('minimize-to-tray', (event) => {
    //     console.log('ipcMain handle minimize-to-tray')
    //     const win = BrowserWindow.fromWebContents(event.sender)
    //     if (win) {
    //       win.hide()
    //     }
    //   })

    // 这个需要被 ipcRenderer.send('minimize-to-tray') 触发
    ipcMain.on('minimize-to-tray', event => {
        console.log('ipcMain handle minimize-to-tray')
        const win = BrowserWindow.fromWebContents(event.sender)
        if (win) {
            win.hide()
        }
    })
}
