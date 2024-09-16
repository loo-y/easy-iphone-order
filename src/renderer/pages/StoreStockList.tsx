// 这是一个显示某个 iPhoneModel 在某地的所有门店的库存列表

import React, { useState, useCallback, useEffect } from 'react'
import { useMainStore } from '../providers'
import { electronServices } from '../../services'
import _ from 'lodash'
import { configKeys, iPhoneModels } from '../../shared/constants'
import { PickupConfig } from '../../shared/types'
import { MapPin, Phone, Hash, Package, XCircle } from 'lucide-react'

const StoreStockList: React.FC = () => {
    const { pickupConfig, updatePageTitle } = useMainStore(state => state)
    const [stockData, setStockData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const refreshIntervalSeconds = 30

    const fetchStockData = useCallback(async () => {
        try {
            setIsRefreshing(true)
            const pickupConfig: PickupConfig = await electronServices.getConfig({ key: configKeys.pickup })
            const { iPhoneModel, city, state, district } = pickupConfig || {}
            // const storeNumber = 'R390'
            const location = `${state} ${city} ${district}`
            const data = await electronServices.getiPhoneStock({ iPhoneModel: iPhoneModel, location })
            console.log(`data---<`, data)
            setStockData(data)
            setLoading(false)
            const hasStock = _.find(data, item => {
                return item?.pickupAvailable
            })
            if (hasStock) {
                electronServices.playNotication()
            }
        } catch (error) {
            console.error('Error fetching stock data:', error)
            setLoading(false)
        }
        setIsRefreshing(false)
    }, [])

    useEffect(() => {
        updatePageTitle(`门店库存信息`)
        fetchStockData()
        const interval = setInterval(() => {
            fetchStockData()
        }, refreshIntervalSeconds * 1000) // 1分钟刷新一次

        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className="bg-gray-100">
                <div className="mt-10">Loading...</div>
            </div>
        )
    }

    return (
        <div className="w-full py-10">
            {isRefreshing && (
                <div className="fixed text-base font-normal top-16 left-0 z-10 w-full flex justify-center items-center bg-yellow-100 border-b-2 border-yellow-300 border-solid">
                    <div>{`正在刷新...  下次刷新:${refreshIntervalSeconds}秒后`}</div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pb-10 z-0">
                {_.map(stockData, (store, index) => {
                    const {
                        storeName,
                        storeNumber,
                        city,
                        state,
                        storeDistanceWithUnit,
                        phoneNumber,
                        pickupSearchQuote,
                        pickupAvailable,
                    } = store || {}

                    return (
                        <div key={`store-stock-${index}`} className="">
                            {/* <div className="flex flex-col"> */}
                            <StoreCard store={store} />
                            {/* <h3 className="text-lg font-semibold">{`Apple ${storeName}`}</h3>
                                <p className="text-sm text-gray-600">{`${city} ${state || ''}`}</p>
                                <p className="text-sm text-gray-600">{`${storeDistanceWithUnit || ''}`}</p>
                                <p className="text-sm text-gray-600">{`门店编号：${storeNumber}`}</p>
                                <p className="text-sm text-gray-600">{phoneNumber}</p> */}
                            {/* </div> */}
                            {/* <div className="mt-2 md:mt-0">
                                <p className={`text-sm ${pickupAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                    {pickupSearchQuote}
                                </p>
                            </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StoreStockList

const StoreCard = ({ store }: { store: Record<string, string> }) => {
    const {
        storeName,
        city = '',
        state = '',
        phoneNumber = '',
        storeDistanceWithUnit = '',
        storeNumber = '',
        pickupSearchQuote = '',
        pickupAvailable = false,
    } = store || {}
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{storeName}</h3>
                <p className="text-sm text-gray-600 mb-3">
                    {city}
                    {state ? `, ${state}` : ''}
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                        <MapPin size={16} className="mr-2 flex-shrink-0" />
                        <span>{storeDistanceWithUnit}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Hash size={16} className="mr-2 flex-shrink-0" />
                        <span>门店编号: {storeNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Phone size={16} className="mr-2 flex-shrink-0" />
                        <span>{phoneNumber}</span>
                    </div>
                </div>
            </div>
            <div className={`p-4 ${pickupAvailable ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center justify-center">
                    {pickupAvailable ? (
                        <>
                            <Package size={20} className="text-green-500 mr-2" />
                            <p className="text-sm font-medium text-gray-800">{pickupSearchQuote}</p>
                        </>
                    ) : (
                        <>
                            <XCircle size={20} className="text-red-500 mr-2" />
                            <p className="text-sm font-medium text-gray-800">{pickupSearchQuote || `暂无库存`}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
