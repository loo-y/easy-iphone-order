// 用于注册所有服务，需要在主进程中启动
// 类似于nodejs服务
import fileServices from './fileServices'
import trayServices from './trayServices'
import orderServices from './orderServices'

export default function setupServices() {
    fileServices()
    trayServices()
    orderServices()
}
