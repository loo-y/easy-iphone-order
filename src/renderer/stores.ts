import { createStore } from 'zustand/vanilla'
import _ from 'lodash'
import { electronServices } from '../services'
import { ConfigValue, PickupConfig, PageType } from '../shared/types'
type MainState = {
    isloading?: boolean
    count: number
    pickupConfig?: PickupConfig
    pageTitle?: string
    currentPage?: PageType
}

type MainActions = {
    updateIsLoading: (loading: boolean) => void
    increment: () => void
    decrement: () => void
    updatePickupConfig: (key: string, value: ConfigValue) => void
    getPickupConfigFromStore: () => void
    savePickupConfigToStore: () => void
    updatePageTitle: (title: string) => void
    updateCurrentPage: (page: PageType) => void
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
            getPickupConfigFromStore: async () => {
                const pickupConfig = (await electronServices.getConfig({ key: 'pickup' })) as PickupConfig
                console.log(`getPickupConfigFromStore pickupConfig`, pickupConfig)
                return set(state => ({ pickupConfig }))
            },
            savePickupConfigToStore: () => {
                return set(state => {
                    const { pickupConfig } = state
                    console.log(`savePickupConfigToStore pickupConfig`, pickupConfig)
                    electronServices.saveConfig({ key: 'pickup', value: _.isEmpty(pickupConfig) ? {} : pickupConfig })
                    return { pickupConfig }
                })
            },
            updatePickupConfig: (key: string, value: ConfigValue) => {
                return set(state => {
                    const { pickupConfig } = state
                    return { pickupConfig: { ...pickupConfig, [key]: value } }
                })
            },
            updatePageTitle: (title: string) => {
                return set(state => {
                    return {
                        pageTitle: title || '',
                    }
                })
            },
            updateCurrentPage: (page: PageType) => {
                return set(state => {
                    return {
                        currentPage: page,
                    }
                })
            },
        }
    })
}
