interface ElectronAPI {
    minimizeToTray: () => void
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
}

export {}

declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}
