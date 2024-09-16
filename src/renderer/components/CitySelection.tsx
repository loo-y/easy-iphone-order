// iPhone 取货门店选择器
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useMainStore } from '../providers'
import { AddressType } from '../../shared/types'

const CitySelection: React.FC = () => {
    const { pickupConfig, updatePickupConfig } = useMainStore(state => state)
    const [stateList, setStateList] = useState<AddressType[]>([])
    const [selectedState, setSelectedState] = useState<AddressType | null>()
    const [cityList, setCityList] = useState<AddressType[]>([])
    const [selectedCity, setSelectedCity] = useState<AddressType | null>()
    const [districtList, setDistrictList] = useState<AddressType[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<AddressType | null>()
    console.log(`selectedState`, selectedState?.label, cityList)

    useEffect(() => {
        console.log(`pickupConfig`, pickupConfig)
        const { state: stateNameFromStore } = pickupConfig || {}
        window.electronAPI.getStates().then(states => {
            setStateList(states)
            const selectedState = _.find(states, state => state.value === stateNameFromStore)
            console.log(`selectedState`, selectedState)
            setSelectedState(selectedState)
        })
    }, [pickupConfig])

    useEffect(() => {
        console.log(`selectedState`, selectedState)
        const { city: cityNameFromStore } = pickupConfig || {}
        if (selectedState?.value) {
            window.electronAPI.getCityList({ state: selectedState.value }).then(cityList => {
                setCityList(cityList)
                const selectedCity = _.find(cityList, city => city.value === cityNameFromStore)
                console.log(`selectedCity`, selectedCity)
                if (selectedCity) {
                    setSelectedCity(selectedCity)
                } else if (cityList?.length == 1) {
                    setSelectedCity(cityList[0])
                    updatePickupConfig('city', cityList[0].value)
                } else {
                    setSelectedCity(null)
                }
            })
        } else {
            setCityList([])
            setSelectedCity(null)
        }
    }, [selectedState])

    useEffect(() => {
        console.log(`selectedCity`, selectedCity)
        const { district: districtNameFromStore } = pickupConfig || {}
        if (selectedState?.value && selectedCity?.value) {
            window.electronAPI
                .getDistrictList({ state: selectedState.value, city: selectedCity.value })
                .then(districtList => {
                    setDistrictList(districtList)
                    const selectedDistrict = _.find(districtList, district => district.value === districtNameFromStore)
                    console.log(`selectedDistrict`, selectedDistrict)
                    if (selectedDistrict) {
                        setSelectedDistrict(selectedDistrict)
                    } else if (districtList?.length == 1) {
                        setSelectedDistrict(districtList[0])
                        updatePickupConfig('district', districtList[0].value)
                    } else {
                        setSelectedDistrict(null)
                    }
                })
        } else {
            setDistrictList([])
            setSelectedDistrict(null)
        }
    }, [selectedCity])

    const handleStateChange = (stateValue: string) => {
        // const stateId = event.target.value
        console.log(`stateValue`, stateValue)
        const selectedState = _.find(stateList, state => state?.value == stateValue)
        if (selectedState) {
            setSelectedState(selectedState)
            window.electronAPI.getCityList({ state: selectedState.value }).then(cityList => {
                console.log(`cityList`, cityList)
                setCityList(cityList)
                updatePickupConfig('state', selectedState.value)
                if (cityList?.length == 1) {
                    setSelectedCity(cityList[0])
                    updatePickupConfig('city', cityList[0].value)
                } else {
                    setSelectedCity(null)
                    updatePickupConfig('city', null)
                }
            })
        }
    }

    const handleCityChange = selectedCityValue => {
        // const selectedCityId = event.target.value
        const selectedCity = _.find(cityList, city => city?.value == selectedCityValue)
        if (selectedCity) {
            setSelectedCity(selectedCity)
            updatePickupConfig('city', selectedCity.value)
        } else {
            setSelectedCity(null)
            updatePickupConfig('city', null)
        }
    }

    const handleDistrictChange = selectedDistrictValue => {
        const selectedDistrict = _.find(districtList, district => district?.value == selectedDistrictValue)
        if (selectedDistrict) {
            setSelectedDistrict(selectedDistrict)
            updatePickupConfig('district', selectedDistrict.value)
        } else {
            setSelectedDistrict(null)
            updatePickupConfig('district', null)
        }
    }

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md my-4">
            <h2 className="text-2xl font-bold text-center mb-6">选择省市</h2>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="mb-4 flex flex-col w-1/3 pr-4">
                    <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="state_select">
                        省份
                    </label>
                    <Select onValueChange={handleStateChange} value={selectedState?.value}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="选择省份" />
                        </SelectTrigger>
                        <SelectContent>
                            {_.map(stateList, state => (
                                <SelectItem value={state.value} key={`${state.value}_statelist`}>
                                    {state.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mb-4 flex flex-col w-1/3 pl-4">
                    <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        城市
                    </label>
                    <Select onValueChange={handleCityChange} value={selectedCity?.value}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="选择城市" />
                        </SelectTrigger>
                        {_.isEmpty(cityList) ? null : (
                            <SelectContent>
                                {_.map(cityList, city => (
                                    <SelectItem value={city.value} key={`${city.value}_citylist`}>
                                        {city.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                </div>
                <div className="mb-4 flex flex-col w-1/3 pl-4">
                    <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        区域
                    </label>
                    <Select onValueChange={handleDistrictChange} value={selectedDistrict?.value || ''}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="选择区域" />
                        </SelectTrigger>
                        {_.isEmpty(districtList) ? null : (
                            <SelectContent>
                                {_.map(districtList, district => (
                                    <SelectItem value={district.value} key={`${district.value}_districtlist`}>
                                        {district.label}
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
