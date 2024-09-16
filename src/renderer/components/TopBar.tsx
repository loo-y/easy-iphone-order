import React, { useEffect, useState } from 'react'
import { Pin, PinOff, Settings } from 'lucide-react'
import { useMainStore } from '../providers'
import { electronServices } from '../../services'
import { SystemConfig, PageType } from '../../shared/types'
import { configKeys } from '../../shared/constants'

const TopBar = () => {
    const { pageTitle, updateCurrentPage } = useMainStore(state => state)
    const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false)
    const handleToggleAlwaysOnTop = async () => {
        const newOnTopStatus = await electronServices.toggleAlwaysOnTop()
        console.log(`result`, newOnTopStatus)
        setIsAlwaysOnTop(newOnTopStatus)
        const systemConfig = await electronServices.getConfig({ key: configKeys.system })
        electronServices.saveConfig({
            key: configKeys.system,
            value: {
                ...systemConfig,
                isAlwaysOnTop: newOnTopStatus,
            },
        })
    }

    const handleClickSettings = () => {
        updateCurrentPage(PageType.Configuration)
    }
    useEffect(() => {
        electronServices.getConfig({ key: configKeys.system }).then((systemConfig: SystemConfig) => {
            const { isAlwaysOnTop } = systemConfig || {}
            setIsAlwaysOnTop(isAlwaysOnTop)
        })
    }, [])

    return (
        <div className="bg-white shadow-lg p-4 flex flex-row items-center w-full fixed top-0">
            <div className="flex-1 flex justify-center">
                <div className="text-2xl font-bold">{pageTitle || ''}</div>
            </div>
            <div className="absolute right-2 text-white">
                <button
                    onClick={handleClickSettings}
                    className="p-2 rounded-full transition-colors bg-gray-600 hover:bg-gray-700 mr-2"
                    title="配置"
                >
                    <Settings size={20} />
                </button>

                <button
                    onClick={handleToggleAlwaysOnTop}
                    className={`p-2 rounded-full transition-colors  ${
                        isAlwaysOnTop ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    title={isAlwaysOnTop ? '取消置顶' : '置顶窗口'}
                >
                    {isAlwaysOnTop ? <Pin size={20} /> : <PinOff size={20} />}
                </button>
            </div>
        </div>
    )
}

export default TopBar
