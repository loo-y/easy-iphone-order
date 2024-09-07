import React from 'react'
import { create } from 'zustand'

// 定义 store 的类型
interface CounterStore {
    count: number
    increment: () => void
    decrement: () => void
}

// 创建 store
const useCounterStore = create<CounterStore>(set => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
}))

const App: React.FC = () => {
    const { count, increment, decrement } = useCounterStore()

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

export default App
