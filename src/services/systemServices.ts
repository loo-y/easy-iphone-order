import { ipcMain, BrowserWindow, Notification } from 'electron'
import { mainWindow } from '../main'
import fs from 'fs'
import path from 'path'
import soundPlay from 'sound-play'

export default function systemServices() {
    // 这个需要被 ipcRenderer.send('minimize-to-tray') 触发
    ipcMain.on('minimize-to-tray', event => {
        console.log('ipcMain handle minimize-to-tray')
        const win = BrowserWindow.fromWebContents(event.sender)
        if (win) {
            win.hide()
        }
    })
    // 添加IPC监听器
    ipcMain.handle('toggle-always-on-top', async event => {
        if (mainWindow) {
            const isAlwaysOnTop = mainWindow.isAlwaysOnTop()
            mainWindow.setAlwaysOnTop(!isAlwaysOnTop)
            // 可选：将新状态发送回渲染进程
            // mainWindow.webContents.send('always-on-top-changed', !isAlwaysOnTop)
            console.log(`isAlwaysOnTop`, !isAlwaysOnTop)
            return !isAlwaysOnTop
        }
        return false
    })

    ipcMain.handle('play-notication', async event => {
        const audioPath = path.join(__dirname, './resources/audio/bubble-pop-ding.mp3')

        new Notification({
            title: `通知`,
            body: `抢到了！`,
            // sound: audioPath
        }).show()

        // const audio = new Audio(audioPath)
        console.log(`audioPath`, audioPath)
        const audioBuffer = fs.readFileSync(audioPath)

        let playCount = 0
        function playSound() {
            if (playCount < 3) {
                soundPlay.play(audioPath)
                // event.sender.send('play-audio', audioBuffer.toString('base64'))
                console.log('尝试播放音频, 次数:', playCount + 1)
                // audio.play()
                playCount++
            }
        }

        // 初始调用播放函数
        playSound()

        // 设置定时器以间隔播放音效
        const interval = setInterval(() => {
            if (playCount < 3) {
                playSound()
            } else {
                clearInterval(interval)
                playCount = 0
            }
        }, 2000) // 假设音效长度为1秒,可根据实际情况调整
    })
}
