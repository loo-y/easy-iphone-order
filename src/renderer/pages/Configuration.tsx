// 配置页
import React, { useCallback } from 'react'
import { MainStoreProvider, useMainStore } from '../providers'
import PhoneSelection from '../components/PhoneSelection'
import CitySelection from '../components/CitySelection'

const Configuration: React.FC = () => {
    const { updateConfig } = useMainStore(state => state)
    const handleConfirm = useCallback(() => {
        updateConfig('iPhoneModel', 'iPhone 15 Pro Max')
        updateConfig('city', '北京')
    }, [updateConfig])
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6">
            <PhoneSelection />
            <CitySelection />
            <div className="mt-6 w-full flex justify-center px-4">
                <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 min-h-[44px] rounded-lg"
                    onClick={handleConfirm}
                >
                    确认
                </button>
            </div>
        </div>
    )
}

export default Configuration
