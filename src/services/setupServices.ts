// 用于注册所有服务，需要在主进程中启动
// 类似于nodejs服务
import _ from 'lodash'
import apiServices from './apiServices'
import fileServices from './fileServices'
import trayServices from './trayServices'
import orderServices from './orderServices'
import { iPhoneModels } from '../shared/constants'

export default function setupServices() {
    fileServices()
    trayServices()
    apiServices()
    orderServices(
        _.find(iPhoneModels.iPhone16ProMax, item => item.color.value === 'black' && item.capacity === '512GB').model
    )
}
