import { ipcMain } from 'electron'
import _ from 'lodash'
import { appleAPIUrl, commonHeaders } from '../shared/constants'
import CityData from '../resources/location/city.json'
import { getConfig, saveConfig } from '../main/electronStore'
import { ConfigValue } from '../shared/types'

export default function apiServices() {
    ipcMain.handle(
        'getiPhoneStock',
        async (
            event,
            { iPhoneModel, storeNumber, location }: { iPhoneModel: string; storeNumber?: string; location?: string }
        ) => {
            const url = appleAPIUrl.checkStock(iPhoneModel, storeNumber, location)
            console.log(`url--->`, url)
            try {
                const response = await fetch(url, {
                    headers: commonHeaders,
                    method: 'GET',
                })
                const data = await response.json()
                if (!_.isEmpty(data?.body?.content?.pickupMessage?.stores)) {
                    let resultList = _.map(data.body.content.pickupMessage.stores, (store: any) => {
                        const {
                            partsAvailability,
                            storeName,
                            storeNumber,
                            city,
                            state,
                            storeDistanceWithUnit,
                            phoneNumber,
                        } = store
                        const partAvailability = partsAvailability?.[iPhoneModel] || {}
                        const { pickupDisplay, pickupSearchQuote, buyability } = partAvailability
                        return {
                            storeName,
                            storeNumber,
                            city,
                            state: city == state ? '' : state,
                            storeDistanceWithUnit,
                            phoneNumber,
                            pickupSearchQuote,
                            pickupAvailable: buyability?.isBuyable, // String(pickupDisplay || '').toLowerCase() == `available`,
                        }
                    })
                    // pickupAvailable 为true的排前面
                    resultList = _.sortBy(resultList, store => !store.pickupAvailable)

                    console.log(`resultList---<`, resultList)
                    return resultList
                }
                return []
            } catch (error) {
                console.error('Error fetching stock data:', error)
                return []
            }
        }
    )

    ipcMain.handle('getStates', async event => {
        const url = appleAPIUrl.addressLookup()
        console.log(`url--->`, url)
        const response = await fetch(url, {
            headers: commonHeaders,
            method: 'GET',
        })
        const data = await response.json()
        if (!_.isEmpty(data?.body?.state?.data)) {
            return data.body.state.data
        }
        try {
        } catch (e) {
            console.log(`getStates error`, e)
        }
        return []
    })

    ipcMain.handle('getCityList', async (event, { state }: { state: string }) => {
        console.log(`getCityList url--->`, state)
        const url = appleAPIUrl.addressLookup(state)

        try {
            const response = await fetch(url, {
                headers: commonHeaders,
                method: 'GET',
            })
            const data = await response.json()
            if (data?.body?.city) {
                if (typeof data.body.city == `string`) {
                    return [{ label: data.body.city, value: data.body.city }]
                } else if (!_.isEmpty(data.body.city?.data)) {
                    return data.body.city.data
                }
            }
        } catch (e) {
            console.log(`getStates error`, e)
        }
        return []
    })

    ipcMain.handle(`getDistrictList`, async (event, { state, city }: { state: string; city: string }) => {
        const url = appleAPIUrl.addressLookup(state, city)
        try {
            const response = await fetch(url, {
                headers: commonHeaders,
                method: 'GET',
            })
            const data = await response.json()
            if (data?.body?.district) {
                if (typeof data.body.district == `string`) {
                    return [{ label: data.body.district, value: data.body.district }]
                } else if (!_.isEmpty(data.body.district?.data)) {
                    return data.body.district.data
                }
            }
        } catch (e) {
            console.log(`getStates error`, e)
        }
        return []
    })

    ipcMain.handle('getConfig', async (event, { key }: { key: string }) => {
        return getConfig(key)
    })
    ipcMain.handle('saveConfig', async (event, { key, value }: { key: string; value: ConfigValue }) => {
        return saveConfig(key, value)
    })
}
