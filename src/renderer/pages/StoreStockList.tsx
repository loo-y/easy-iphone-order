// 这是一个显示某个 iPhoneModel 在某地的所有门店的库存列表

import React, { useState, useCallback, useEffect } from 'react'
import { useMainStore } from '../providers'
import { electronServices } from '../../services'
import _ from 'lodash'
import { iPhoneModels } from '../../shared/constants'

const StoreStockList: React.FC = () => {
    const { pickupConfig, updatePageTitle } = useMainStore(state => state)
    const { province, city, iPhoneModel } = pickupConfig || {}
    const [stockData, setStockData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const refreshIntervalSeconds = 30

    const fetchStockData = useCallback(async () => {
        try {
            setIsRefreshing(true)
            const iPhone16Model = iPhoneModels.iPhone16Pro[0].model
            const storeNumber = 'R390'
            const data = await electronServices.getiPhoneStock({ iPhoneModel: iPhone16Model, storeNumber })
            console.log(`data---<`, data)
            setStockData(data)
            setLoading(false)
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
        <div className="w-full">
            {isRefreshing && (
                <div className="fixed text-base font-normal top-16 left-0 z-10 w-full flex justify-center items-center bg-yellow-100 border-b-2 border-yellow-300 border-solid">
                    <div>{`正在刷新...  下次刷新:${refreshIntervalSeconds}秒后`}</div>
                </div>
            )}
            <ul className="pt-3 pb-10 z-0 px-6">
                {_.map(stockData, (store, index) => {
                    const { storeName, storeNumber, city, phoneNumber, pickupSearchQuote, pickupAvailable } =
                        store || {}

                    return (
                        <li
                            key={`store-stock-${index}`}
                            className="shadow-md border-l border-t rounded-lg p-4 my-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold">{storeName}</h3>
                                <p className="text-sm text-gray-600">{city}</p>
                                <p className="text-sm text-gray-600">{storeNumber}</p>
                                <p className="text-sm text-gray-600">{phoneNumber}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className={`text-sm ${pickupAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                    {pickupSearchQuote}
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default StoreStockList
