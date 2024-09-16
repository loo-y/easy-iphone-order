import { ipcMain } from 'electron'
import _ from 'lodash'
import { appleAPIUrl, commonHeaders } from '../shared/constants'
import CityData from '../resources/location/city.json'
import ProvinceData from '../resources/location/province.json'
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
                    const resultList = _.map(data.body.content.pickupMessage.stores, (store: any) => {
                        const { partsAvailability, storeName, storeNumber, city, phoneNumber } = store
                        const partAvailability = partsAvailability?.[iPhoneModel] || {}
                        const { pickupDisplay, pickupSearchQuote, buyability } = partAvailability
                        return {
                            storeName,
                            storeNumber,
                            city,
                            phoneNumber,
                            pickupSearchQuote,
                            pickupAvailable: buyability?.isBuyable, // String(pickupDisplay || '').toLowerCase() == `available`,
                        }
                    })
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

    ipcMain.handle('getProvinces', async event => {
        return ProvinceData
    })

    ipcMain.handle('getCityList', async (event, { provinceId }: { provinceId: string }) => {
        const cityList = CityData?.[provinceId] || []
        console.log(`CityData`, CityData?.[provinceId])
        return cityList
    })

    ipcMain.handle('getConfig', async (event, { key }: { key: string }) => {
        return getConfig(key)
    })
    ipcMain.handle('saveConfig', async (event, { key, value }: { key: string; value: ConfigValue }) => {
        return saveConfig(key, value)
    })
}
