import puppeteer from 'puppeteer'

const createPuppeteerService = async () => {
    try {
        // // 启动浏览器
        // const browser = await puppeteer.launch({
        //     executablePath: puppeteer.executablePath(),
        //     headless: false,
        //     args: ['--no-sandbox', '--disable-setuid-sandbox']
        // });

        // // 创建新页面
        // const page = await browser.newPage();

        // // 访问 Apple 官网
        // await page.goto('https://www.apple.com');

        // // 获取所有 cookies
        // const cookies = await page.cookies();

        // // 关闭浏览器
        // await browser.close();

        // 返回 cookies
        return { cookies: '', status: 'success' }
    } catch (error) {
        console.error('访问 Apple 网站时出错:', error)
        return { cookies: '', status: 'error', error }
    }
}

export default createPuppeteerService
