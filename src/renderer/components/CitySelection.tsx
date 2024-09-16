// iPhone 取货门店选择器
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useMainStore } from '../providers'

const CitySelection: React.FC = () => {
    const { pickupConfig, updatePickupConfig } = useMainStore(state => state)
    const [provinceList, setProvinceList] = useState<{ name: string; id: string }[]>([])
    const [selectedProvince, setSelectedProvince] = useState<{ name: string; id: string } | null>()
    const [selectedCityList, setSelectedCityList] = useState<{ name: string; id: string }[] | null>([])
    const [selectedCity, setSelectedCity] = useState<{ name: string; id: string } | null>()
    console.log(`selectedProvince`, selectedProvince?.name, selectedCityList)

    useEffect(() => {
        console.log(`pickupConfig`, pickupConfig)
        const { province: provinceNameFromStore } = pickupConfig || {}
        window.electronAPI.getProvinces().then(provinces => {
            setProvinceList(provinces)
            const selectedProvince = _.find(provinces, province => province.name === provinceNameFromStore)
            console.log(`selectedProvince`, selectedProvince)
            setSelectedProvince(selectedProvince)
        })
        // if (selectedProvince?.id) {
        //     window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
        //         setSelectedCityList(cityList)
        //     })
        // }
    }, [pickupConfig])

    useEffect(() => {
        console.log(`selectedProvince`, selectedProvince)
        const { city: cityNameFromStore } = pickupConfig || {}
        if (selectedProvince?.id) {
            window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
                setSelectedCityList(cityList)
                const selectedCity = _.find(cityList, city => city.name === cityNameFromStore)
                console.log(`selectedCity`, selectedCity)
                if (selectedCity) {
                    setSelectedCity(selectedCity)
                } else if (cityList?.length == 1) {
                    setSelectedCity(cityList[0])
                    updatePickupConfig('city', cityList[0].name)
                } else {
                    setSelectedCity(null)
                }
            })
        }
    }, [selectedProvince])

    const handleProvinceChange = (provinceId: string) => {
        // const provinceId = event.target.value
        console.log(`provinceId`, provinceId)
        const selectedProvince = _.find(provinceList, province => province.id === provinceId)
        setSelectedProvince(selectedProvince)
        window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
            console.log(`cityList`, cityList)
            setSelectedCityList(cityList)
            updatePickupConfig('province', selectedProvince.name)
            if (cityList?.length == 1) {
                setSelectedCity(cityList[0])
                updatePickupConfig('city', cityList[0].name)
            } else {
                setSelectedCity(null)
                updatePickupConfig('city', null)
            }
        })
    }

    const handleCityChange = selectedCityId => {
        // const selectedCityId = event.target.value
        const selectedCity = _.find(selectedCityList, city => city.id === selectedCityId)
        if (selectedCity) {
            setSelectedCity(selectedCity)
            updatePickupConfig('city', selectedCity.name)
        } else {
            setSelectedCity(null)
            updatePickupConfig('city', null)
        }
    }

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md my-4">
            <h2 className="text-2xl font-bold text-center mb-6">选择省市</h2>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="mb-4 flex flex-col w-1/2 pr-4">
                    <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="province_select">
                        省份
                    </label>
                    <Select onValueChange={handleProvinceChange} value={selectedProvince?.id}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="选择省份" />
                        </SelectTrigger>
                        <SelectContent>
                            {_.map(provinceList, province => (
                                <SelectItem value={province.id} key={`${province.id}_provincelist`}>
                                    {province.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4 flex flex-col w-1/2 pl-4">
                    <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        城市
                    </label>
                    <Select onValueChange={handleCityChange} value={selectedCity?.id}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="选择城市" />
                        </SelectTrigger>
                        {_.isEmpty(selectedCityList) ? null : (
                            <SelectContent>
                                {_.map(selectedCityList, city => (
                                    <SelectItem value={city.id} key={`${city.id}_citylist`}>
                                        {city.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default CitySelection
