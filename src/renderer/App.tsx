import React from 'react'
import { MainStoreProvider, useMainStore } from './providers'
import PuppeteerButton from './components/PuppeteerButton'
import StoreStockList from './components/StoreStockList'
import Configuration from './pages/Configuration'

const Main = () => {
    const { count, increment, decrement } = useMainStore(state => state)
    return (
        <div className="flex flex-col items-center justify-center w-screen overflow-y-scroll bg-gray-100">
            <Configuration />
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
