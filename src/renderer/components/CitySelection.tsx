// iPhone 取货门店选择器
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const CitySelection: React.FC = () => {
    const [provinceList, setProvinceList] = useState<{ name: string; id: string }[]>([])
    const [selectedProvince, setSelectedProvince] = useState<{ name: string; id: string } | null>()
    const [selectedCityList, setSelectedCityList] = useState<{ name: string; id: string }[] | null>([])
    const [selectedCity, setSelectedCity] = useState<{ name: string; id: string } | null>()
    console.log(`selectedProvince`, selectedProvince?.name, selectedCityList)

    useEffect(() => {
        window.electronAPI.getProvinces().then(provinces => {
            setProvinceList(provinces)
        })
        if (selectedProvince?.id) {
            window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
                setSelectedCityList(cityList)
            })
        }
    }, [])
    const handleProvinceChange = (provinceId: string) => {
        // const provinceId = event.target.value
        console.log(`provinceId`, provinceId)
        const selectedProvince = _.find(provinceList, province => province.id === provinceId)
        setSelectedProvince(selectedProvince)
        window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
            console.log(`cityList`, cityList)
            setSelectedCityList(cityList)
            if (cityList?.length == 1) {
                setSelectedCity(cityList[0])
            }
        })
        setSelectedCity(null) // 重置城市选择
    }

    const handleCityChange = selectedCityId => {
        // const selectedCityId = event.target.value
        const selectedCity = _.find(selectedCityList, city => city.id === selectedCityId)
        setSelectedCity(selectedCity)
    }

    return (
        <div className="p-4 flex flex-row gap-4">
            <div className="mb-4 flex flex-col">
                <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="province_select">
                    省份
                </label>
                <Select onValueChange={handleProvinceChange}>
                    <SelectTrigger className="w-[180px]">
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
            <div className="mb-4 flex flex-col">
                <label className="ml-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    城市
                </label>
                <Select onValueChange={handleCityChange} value={selectedCity?.id}>
                    <SelectTrigger className="w-[180px]">
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
    )
}

export default CitySelection
