interface ElectronAPI {
    orderiPhone: () => Promise<void>
    getiPhoneStock: ({ iPhoneModel, storeNumber }: { iPhoneModel: string; storeNumber: string }) => Promise<any>
    minimizeToTray: () => void
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
    getProvinces: () => Promise<any>
    getCityList: ({ provinceId }: { provinceId: string }) => Promise<any>
}

export {}

export interface OrderServicesInjects {
    getPageInitInfo: () => Promise<any> // 根据实际返回类型调整
}

declare global {
    interface Window {
        electronAPI: ElectronAPI
        orderServicesInjects: OrderServicesInjects
    }
}
