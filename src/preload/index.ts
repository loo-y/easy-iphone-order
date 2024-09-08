// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

// 暴露服务给window.electronAPI用客户端使用
contextBridge.exposeInMainWorld('electronAPI', {
    orderiPhone: () => ipcRenderer.invoke('order-iPhone'),
    minimizeToTray: () => ipcRenderer.send('minimize-to-tray'),
    // minimizeToTray: () => ipcRenderer.invoke('minimize-to-tray'),
    readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
})
