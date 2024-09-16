// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
import { ConfigValue } from '../shared/types'
const dd = `dd`
// 暴露服务给window.electronAPI用客户端使用
contextBridge.exposeInMainWorld('electronAPI', {
    orderiPhone: () => ipcRenderer.invoke('order-iPhone'),
    minimizeToTray: () => ipcRenderer.send('minimize-to-tray'),
    // minimizeToTray: () => ipcRenderer.invoke('minimize-to-tray'),
    getiPhoneStock: (iPhoneModel: string) => ipcRenderer.invoke('getiPhoneStock', iPhoneModel),
    readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
    getStates: () => ipcRenderer.invoke('getStates'),
    getCityList: (params: { state: string }) => ipcRenderer.invoke('getCityList', params),
    getDistrictList: (params: { state: string; city: string }) => ipcRenderer.invoke('getDistrictList', params),
    getConfig: (key: string) => ipcRenderer.invoke('getConfig', key),
    saveConfig: (key: string, value: ConfigValue) => ipcRenderer.invoke('saveConfig', key, value),
    toggleAlwaysOnTop: () => ipcRenderer.invoke('toggle-always-on-top'),
    playNotication: () => ipcRenderer.invoke('play-notication'),
})
