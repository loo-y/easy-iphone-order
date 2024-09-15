import puppeteer, { Browser } from 'puppeteer'
import { ipcMain, BrowserWindow } from 'electron'
import { applePageUrl, puppeteerOptions } from '../../shared/constants'
import { getPageInitInfo } from './helpers'
import fs from 'fs'
import path from 'path'
import { OrderServicesInjects } from '../../shared/types'

const createiPhoneOrderService = async (params: { browser: Browser; iPhoneModel: string }) => {
    try {
        // 创建新页面
        await addIPhoneToCart(params)

        // 关闭浏览器
        // await browser.close()

        // 返回 cookies
        return { cookies: '', status: 'success' }
    } catch (error) {
        console.error('访问 Apple 网站时出错:', error)
        return { cookies: '', status: 'error', error }
    }
}

// 访问 apple iPhone16 网站，加购 iPhone16 进购物车
const addIPhoneToCart = async ({ browser, iPhoneModel }: { browser: Browser; iPhoneModel: string }) => {
    try {
        const page = await browser.newPage()

        // 读取打包后的 JS 文件
        const bundledCode = fs.readFileSync(path.join(__dirname, '../../dist/orderServicesInjects.bundle.js'), 'utf8')

        // 注入打包后的代码
        await page.evaluateOnNewDocument(bundledCode)

        // 访问 iPhone 16 Pro 页面
        const url = `${applePageUrl.buyiPhone16Pro}${iPhoneModel}`
        await page.goto(url)
        // const bodyHandle = await page.$('body')
        // console.log(`bodyHandle`, bodyHandle)
        // const html = await page.evaluate(async body => {
        //     console.log(`body`, body)
        //     return body.innerHTML
        // }, bodyHandle)
        // await bodyHandle.dispose()
        // console.log(`html`, html)
        // console.log(`getPageInitInfo`, getPageInitInfo)
        // await page.exposeFunction("getPageInitInfo", getPageInitInfo.bind(page));

        // const result = await page.evaluate(async () => {
        //     alert(`document`)
        //     console.log(`getPageInitInfo`, getPageInitInfo)
        //     const result = await getPageInitInfo()
        // });

        const result = await page.evaluate(() => {
            // 现在 orderServices 对象应该包含了我们导出的所有函数
            return (window as Window & typeof globalThis).orderServicesInjects.getPageInitInfo()
        })

        // console.log('页面评估结果:', result);

        // 等待"加入购物车"按钮出现并点击
        // await page.waitForSelector('button[name="add-to-cart"]');
        // await page.click('button[name="add-to-cart"]');

        // 等待购物车更新
        // await page.waitForSelector('.shopping-cart-item');

        console.log('iPhone 16 已成功加入购物车')

        // 关闭页面
        // await page.close();

        return { status: 'success', message: 'iPhone 16 已加入购物车' }
    } catch (error) {
        console.error('加入购物车时出错:', error)
        return { status: 'error', error }
    }
}

const orderServices = (iPhoneModel: string) => {
    ipcMain.handle('order-iPhone', async (event, order: string) => {
        // 启动浏览器
        const browser = await puppeteer.launch({
            executablePath: puppeteer.executablePath(),
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', `--user-agent=${puppeteerOptions.userAgent}`],
            defaultViewport: {
                width: 1600,
                height: 1000,
            },
        })

        return await createiPhoneOrderService({ browser, iPhoneModel })
    })
}

export default orderServices
