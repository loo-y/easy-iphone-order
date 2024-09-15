// 选择 iPhone 的型号
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { iPhoneModels } from '../../shared/constants'

const PhoneSelection: React.FC = () => {
    const [selectedModel, setSelectedModel] = useState<Record<string, any> | null>()
    const [selectedColor, setSelectedColor] = useState<{ value: string; text: string } | null>()
    const [selectedCapacity, setSelectedCapacity] = useState<string | null>()
    const [selectediPhoneType, setSelectediPhoneType] = useState<'iPhone16Pro' | 'iPhone16ProMax' | null>()
    const iPhoneTypes = _.keys(iPhoneModels)
    const [colorList, setColorList] = useState<{ value: string; text: string }[]>([])
    const [capacityList, setCapacityList] = useState<string[]>([])
    useEffect(() => {
        // set default iPhone
        if (!selectediPhoneType) {
            handleSelectiPhoneType('iPhone16Pro')
        }
    }, [])

    useEffect(() => {
        const theiPhoneModelInfo = iPhoneModels?.[selectediPhoneType]
        const selectediPhoneModel = _.find(theiPhoneModelInfo, (item: Record<string, any>) => {
            return item?.color?.value === selectedColor?.value && item?.capacity === selectedCapacity
        })
        if (!_.isEmpty(selectediPhoneModel)) {
            setSelectedModel(selectediPhoneModel)
        }
    }, [selectedColor, selectedCapacity, selectediPhoneType])

    const handleSelectiPhoneType = iPhoneType => {
        const theiPhoneModelInfo = iPhoneModels?.[iPhoneType]
        setSelectediPhoneType(iPhoneType)

        if (!_.isEmpty(theiPhoneModelInfo)) {
            const colorList = _.map(
                _.uniqBy(theiPhoneModelInfo, (c: Record<string, any>) => {
                    return c?.color?.value
                }),
                item => {
                    return item.color
                }
            )
            setColorList(colorList)

            const capacityList = _.map(
                _.uniqBy(theiPhoneModelInfo, (c: Record<string, any>) => {
                    return c?.capacity
                }),
                item => {
                    return item.capacity
                }
            )
            setCapacityList(capacityList)
        }
    }

    const handleSelectiPhoneColor = (color: { text: string; value: string }) => {
        setSelectedColor(color)
    }

    const handleSelectiPhoneCapacity = (capacity: string) => {
        setSelectedCapacity(capacity)
    }

    return (
        <div className="mx-auto p-6 bg-white rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">选择 iPhone</h2>
            <Select onValueChange={handleSelectiPhoneType} value={selectediPhoneType}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择 iPhone" />
                </SelectTrigger>
                <SelectContent>
                    {_.map(iPhoneTypes, iPhoneType => (
                        <SelectItem value={iPhoneType} key={`${iPhoneType}_iPhoneType`}>
                            {iPhoneType}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">颜色</label>
                <div className="grid grid-cols-2 gap-3">
                    {_.map(colorList, c => {
                        const { text: colorText, value: colorValue } = c || {}
                        return (
                            <Option
                                key={`${colorValue}_color`}
                                selected={colorValue === selectedColor?.value}
                                onClick={() => handleSelectiPhoneColor(c)}
                            >
                                {colorText}
                            </Option>
                        )
                    })}
                </div>
            </div>

            <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">容量</label>
                <div className="grid grid-cols-2 gap-3">
                    {_.map(capacityList, c => (
                        <Option
                            key={`${c}_capacity`}
                            selected={c === selectedCapacity}
                            onClick={() => handleSelectiPhoneCapacity(c)}
                        >
                            {c}
                        </Option>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg min-h-[120px]">
                <h3 className="text-lg font-semibold mb-2">您的选择</h3>
                {!_.isEmpty(selectedModel) ? (
                    <>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            <p>
                                <strong>型号：</strong>
                                {selectediPhoneType}
                            </p>
                            <p>
                                <strong>颜色：</strong>
                                {selectedModel.color?.text || ''}
                            </p>
                            <p>
                                <strong>容量：</strong>
                                {selectedModel.capacity}
                            </p>
                            <p>
                                <strong>Model：</strong>
                                {selectedModel.model}
                            </p>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default PhoneSelection

const Option = ({ selected, onClick, children }) => (
    <div
        className={`p-3 rounded-lg text-center cursor-pointer transition-colors ${
            selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
        onClick={onClick}
    >
        {children}
    </div>
)
