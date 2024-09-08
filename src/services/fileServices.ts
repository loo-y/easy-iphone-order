import { ipcMain } from 'electron'
import fs from 'fs/promises'

export default function fileServices() {
    ipcMain.handle('read-file', async (event, filePath: string) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8')
            return content
        } catch (error) {
            console.error('读取文件失败:', error)
            throw error
        }
    })

    ipcMain.handle('write-file', async (event, filePath: string, content: string) => {
        try {
            await fs.writeFile(filePath, content, 'utf-8')
            return true
        } catch (error) {
            console.error('写入文件失败:', error)
            throw error
        }
    })
}
