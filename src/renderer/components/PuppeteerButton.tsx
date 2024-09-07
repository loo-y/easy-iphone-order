import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import createPuppeteerService from '../../services/order'

const PuppeteerButton: React.FC = () => {
    const [status, setStatus] = useState<string>('未启动')

    const handleClick = async () => {
        setStatus('正在启动...')
        const result = await createPuppeteerService()
        setStatus(result?.status === 'success' ? '成功' : '失败')
        // ipcRenderer.send('minimize-to-tray');
    }

    return (
        <div>
            <button onClick={handleClick}>启动 Puppeteer 服务</button>
            <p>服务状态: {status}</p>
        </div>
    )
}

export default PuppeteerButton
