// 配置页
import React, { useCallback, useEffect } from 'react'
import { MainStoreProvider, useMainStore } from '../providers'
import PhoneSelection from '../components/PhoneSelection'
import CitySelection from '../components/CitySelection'

const Configuration: React.FC = () => {
    const { savePickupConfigToStore, getPickupConfigFromStore, pickupConfig } = useMainStore(state => state)
    const handleConfirm = useCallback(() => {
        const { province, city, iPhoneModel } = pickupConfig || {}
        if (!province || !city || !iPhoneModel) {
            return
        }
        savePickupConfigToStore()
        getPickupConfigFromStore()
    }, [savePickupConfigToStore])

    const handleCancel = useCallback(() => {
        getPickupConfigFromStore()
    }, [getPickupConfigFromStore])

    useEffect(() => {
        console.log(`getPickupConfigFromStore`)
        getPickupConfigFromStore()
    }, [])

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center p-6 pt-0">
            <CitySelection />
            <PhoneSelection />

            <div className="mt-6 w-full flex justify-between gap-4 min-h-[44px]">
                <button
                    className="bg-gray-500 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    onClick={handleCancel}
                >
                    取消
                </button>
                <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-lg"
                    onClick={handleConfirm}
                >
                    确认
                </button>
            </div>
        </div>
    )
}

export default Configuration
