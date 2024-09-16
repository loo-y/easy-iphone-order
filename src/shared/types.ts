interface ElectronAPI {
    orderiPhone: () => Promise<void>
    getiPhoneStock: ({ iPhoneModel, storeNumber }: { iPhoneModel: string; storeNumber: string }) => Promise<any>
    minimizeToTray: () => void
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
    getProvinces: () => Promise<any>
    getCityList: ({ provinceId }: { provinceId: string }) => Promise<any>
    getConfig: ({ key }: { key: string }) => Promise<any>
    saveConfig: ({ key, value }: { key: string; value: ConfigValue }) => Promise<any>
    toggleAlwaysOnTop: () => Promise<boolean>
}

export type ConfigValue = Record<string, any> | string | number | boolean

export enum PageType {
    Configuration = `configuration`,
    StoreStockList = `storeStockList`,
}

export interface PickupConfig {
    province: string
    city: string
    iPhoneModel: string
}

export interface SystemConfig {
    isAlwaysOnTop: boolean
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
