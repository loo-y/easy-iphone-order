import React, { useEffect, useState } from 'react'
import { MainStoreProvider, useMainStore } from './providers'
import StoreStockList from './pages/StoreStockList'
import Configuration from './pages/Configuration'
import TopBar from './components/TopBar'
import { PageType, PickupConfig } from '../shared/types'
import { electronServices } from '../services'
import { configKeys } from '../shared/constants'

const Main = () => {
    const { currentPage } = useMainStore(state => state)
    const [isConfiged, setIsConfiged] = useState(true)
    useEffect(() => {
        electronServices.getConfig({ key: configKeys.pickup }).then((pickupConfig: PickupConfig) => {
            const { iPhoneModel, state, city, district } = pickupConfig || {}
            setIsConfiged(!!(iPhoneModel && state && city && district))
        })
    })
    return (
        <div className="flex flex-col items-center justify-center w-screen overflow-y-scroll bg-gray-100 pt-12">
            <TopBar />
            {!isConfiged || currentPage == PageType.Configuration ? <Configuration /> : <StoreStockList />}
        </div>
    )
}

const App: React.FC = () => {
    return (
        <MainStoreProvider>
            <Main />
        </MainStoreProvider>
    )
}

export default App
