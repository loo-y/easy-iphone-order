import { ConfigValue } from '../shared/types'
export const electronServices = {
    orderiPhone: () => {
        window.electronAPI.orderiPhone()
    },
    getiPhoneStock: async ({ iPhoneModel, storeNumber }: { iPhoneModel: string; storeNumber: string }) => {
        return await window.electronAPI.getiPhoneStock({ iPhoneModel, storeNumber })
    },
    minimizeToTray: () => {
        window.electronAPI.minimizeToTray()
    },
    readFile: async (filePath: string): Promise<string> => {
        return await window.electronAPI.readFile(filePath)
    },
    writeFile: async (filePath: string, content: string): Promise<boolean> => {
        return await window.electronAPI.writeFile(filePath, content)
    },
    getProvinces: async (): Promise<any> => {
        return await window.electronAPI.getProvinces()
    },
    getCityList: async ({ provinceId }: { provinceId: string }): Promise<any> => {
        return await window.electronAPI.getCityList({ provinceId })
    },
    getConfig: ({ key }: { key: string }): any => {
        return window.electronAPI.getConfig({ key })
    },
    saveConfig: async ({ key, value }: { key: string; value: ConfigValue }): Promise<any> => {
        return await window.electronAPI.saveConfig({ key, value })
    },
}
