interface ElectronAPI {
    orderiPhone: () => Promise<void>
    minimizeToTray: () => void
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
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
