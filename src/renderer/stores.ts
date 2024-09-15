import { createStore } from 'zustand/vanilla'
import _ from 'lodash'
// import { savePickupConfig, getPickupConfig } from '../main/electronStore'
type MainState = {
    isloading?: boolean
    count: number
}

type MainActions = {
    updateIsLoading: (loading: boolean) => void
    increment: () => void
    decrement: () => void
    updateConfig: (key: string, value: any) => void
    getConfig: (key: string) => any
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
            getConfig: (key: string) => {
                // return getPickupConfig(key)
            },
            updateConfig: (key: string, value: any) => {
                // return savePickupConfig(key, value)
            },
        }
    })
}
