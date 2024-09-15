// src/main/store.ts
import Store from 'electron-store'

const configStore = new Store()

export const savePickupConfig = (key: string, value: any) => {
    // @ts-ignore
    configStore.set(key, value)
}

export const getPickupConfig = (key: string) => {
    // @ts-ignore
    return configStore.get(key)
}
