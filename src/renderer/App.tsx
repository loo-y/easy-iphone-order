import React from 'react'
import { create } from 'zustand'
import { MainStoreProvider, useMainStore } from './providers'

const Main = () => {
    const { count, increment, decrement } = useMainStore(state => state)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Electron with React, Zustand, and Tailwind</h1>
            <p className="text-xl mb-4">Count: {count}</p>
            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={increment}>
                    增加
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={decrement}>
                    减少
                </button>
            </div>
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
