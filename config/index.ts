import fs from 'fs'
import path from 'path'

export interface Config {
    baseUrl: string
    loginUrl: string
    cartUrl: string
    checkoutUrl: string
    username: string
    password: string
    items: string[]
    personalInfo: {
        name: string
        idNumber: string
    }
    paymentMethod: string
}

export function loadConfig(configPath?: string): Config {
    const defaultPath = path.resolve(__dirname, '../config/default.json')
    const filePath = configPath || defaultPath
    const configFile = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(configFile)
}
