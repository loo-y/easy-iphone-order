import { createStore } from 'zustand/vanilla'
import _ from 'lodash'

type MainState = {
    isloading?: boolean
    count: number
}

type MainActions = {
    updateIsLoading: (loading: boolean) => void
    increment: () => void
    decrement: () => void
}

export type MainStore = MainState & MainActions

const defaultInitState: MainState = {
    isloading: false,
    count: 0,
}

export const initMainStore = (): MainState => {
    return defaultInitState
}

export const createMainStore = (initState: MainState = defaultInitState) => {
    return createStore<MainStore>()(set => {
        return {
            ...initState,
            updateIsLoading: (loading: boolean) => {
                return set(state => {
                    return {
                        isloading: loading,
                    }
                })
            },
            increment: () => {
                return set(state => ({ count: state.count + 1 }))
            },
            decrement: () => {
                return set(state => ({ count: state.count - 1 }))
            },
        }
    })
}
