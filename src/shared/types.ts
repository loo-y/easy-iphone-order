interface ElectronAPI {
    orderiPhone: () => Promise<void>
    getiPhoneStock: ({
        iPhoneModel,
        storeNumber,
        location,
    }: {
        iPhoneModel: string
        storeNumber?: string
        location?: string
    }) => Promise<any>
    minimizeToTray: () => void
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
    getStates: () => Promise<AddressType[]>
    getCityList: ({ state }: { state: string }) => Promise<AddressType[]>
    getDistrictList: ({ state, city }: { state: string; city: string }) => Promise<AddressType[]>
    getConfig: ({ key }: { key: string }) => Promise<any>
    saveConfig: ({ key, value }: { key: string; value: ConfigValue }) => Promise<any>
    toggleAlwaysOnTop: () => Promise<boolean>
    playNotication: (params: { openUrl?: string }) => void
}

export type ConfigValue = Record<string, any> | string | number | boolean

export type AddressType = {
    label: string
    value: string
}
export enum PageType {
    Configuration = `configuration`,
    StoreStockList = `storeStockList`,
}

export interface PickupConfig {
    state: string
    city: string
    district: string
    iPhoneModel: string
}

export interface SystemConfig {
    isAlwaysOnTop?: boolean
}

export interface OrderServicesInjects {
    getPageInitInfo: () => Promise<any> // 根据实际返回类型调整
}

declare global {
    interface Window {
        electronAPI: ElectronAPI
        orderServicesInjects: OrderServicesInjects
    }
}

export {}
