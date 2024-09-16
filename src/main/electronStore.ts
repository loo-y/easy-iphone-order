// src/main/store.ts
import Store from 'electron-store'
import { ConfigValue } from '../shared/types'

const configStore = new Store()

export const saveConfig = (key: string, value: ConfigValue) => {
    console.log('saveConfig', key, value)
    // @ts-ignore
    configStore.set(key, value)
}

export const getConfig = (key: string) => {
    // @ts-ignore
    return configStore.get(key) || {}
}
