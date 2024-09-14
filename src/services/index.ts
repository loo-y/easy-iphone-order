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
}
