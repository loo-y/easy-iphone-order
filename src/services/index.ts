import { ConfigValue, AddressType } from '../shared/types'
export const electronServices = {
    orderiPhone: () => {
        window.electronAPI.orderiPhone()
    },
    getiPhoneStock: async ({
        iPhoneModel,
        storeNumber,
        location,
    }: {
        iPhoneModel: string
        storeNumber?: string
        location?: string
    }) => {
        return await window.electronAPI.getiPhoneStock({ iPhoneModel, storeNumber, location })
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
    getStates: async (): Promise<AddressType[]> => {
        return await window.electronAPI.getStates()
    },
    getCityList: async ({ state }: { state: string }): Promise<AddressType[]> => {
        return await window.electronAPI.getCityList({ state })
    },
    getDistrictList: async ({ state, city }: { state: string; city: string }): Promise<AddressType[]> => {
        return await window.electronAPI.getDistrictList({ state, city })
    },
    getConfig: ({ key }: { key: string }): any => {
        return window.electronAPI.getConfig({ key })
    },
    saveConfig: async ({ key, value }: { key: string; value: ConfigValue }): Promise<any> => {
        return await window.electronAPI.saveConfig({ key, value })
    },
    toggleAlwaysOnTop: async (): Promise<boolean> => {
        return await window.electronAPI.toggleAlwaysOnTop()
    },
    playNotication: (params: { openUrl?: string }) => {
        return window.electronAPI.playNotication(params)
    },
}
