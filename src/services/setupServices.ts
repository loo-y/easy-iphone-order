// 用于注册所有服务，需要在主进程中启动
// 类似于nodejs服务

import { ipcMain, BrowserWindow } from 'electron'
import fs from 'fs/promises'

export default function setupServices() {
    ipcMain.handle('read-file', async (event, filePath: string) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8')
            return content
        } catch (error) {
            console.error('读取文件失败:', error)
            throw error
        }
    })

    ipcMain.handle('write-file', async (event, filePath: string, content: string) => {
        try {
            await fs.writeFile(filePath, content, 'utf-8')
            return true
        } catch (error) {
            console.error('写入文件失败:', error)
            throw error
        }
    })

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
