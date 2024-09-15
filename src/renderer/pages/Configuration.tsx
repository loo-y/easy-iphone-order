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
        <div>
            <PhoneSelection />
            <CitySelection />
            <div className="mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleConfirm}
                >
                    确认
                </button>
            </div>
        </div>
    )
}

export default Configuration
