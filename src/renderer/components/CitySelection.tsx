// iPhone 取货门店选择器
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

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
    const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = event.target.value
        const selectedProvince = _.find(provinceList, province => province.id === provinceId)
        setSelectedProvince(selectedProvince)
        window.electronAPI.getCityList({ provinceId: selectedProvince.id }).then(cityList => {
            console.log(`cityList`, cityList)
            setSelectedCityList(cityList)
        })
        setSelectedCity(null) // 重置城市选择
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityId = event.target.value
        const selectedCity = _.find(selectedCityList, city => city.id === selectedCityId)
        setSelectedCity(selectedCity)
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
                    选择省份
                </label>
                <select
                    id="province"
                    value={selectedProvince?.id || 0}
                    onChange={handleProvinceChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">请选择省份</option>
                    {_.map(provinceList, province => (
                        <option key={province.name} value={province.id}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                    选择城市
                </label>
                <select
                    id="city"
                    value={selectedCity?.id || 0}
                    onChange={handleCityChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    disabled={_.isEmpty(selectedCityList)}
                >
                    <option value="">请选择城市</option>
                    {selectedCityList &&
                        _.map(selectedCityList, city => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    )
}

export default CitySelection
