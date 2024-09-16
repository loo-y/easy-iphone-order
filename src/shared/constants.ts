const browserUserAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36`
export const puppeteerOptions = {
    userAgent: browserUserAgent,
}

export const configKeys = {
    system: `system`,
    pickup: `pickup`,
    addressStates: `addressStates`,
    addressCities: `addressCities`,
    addressDistricts: `addressDistricts`,
}
export const iPhoneModels = {
    iPhone16Pro: [
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '128GB', model: 'MYLN3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '256GB', model: 'MYLT3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '512GB', model: 'MYLX3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '1TB', model: 'MYM53CH/A' },

        { color: { value: 'white', text: '白色钛金属' }, capacity: '128GB', model: 'MYLP3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '256GB', model: 'MYLU3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '512GB', model: 'MYLY3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '1TB', model: 'MYM63CH/A' },

        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '128GB', model: 'MYLQ3CH/A' },
        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '256GB', model: 'MYLV3CH/A' },
        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '512GB', model: 'MYM23CH/A' },
        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '1TB', model: 'MYM73CH/A' },

        { color: { value: 'primary', text: '原色钛金属' }, capacity: '128GB', model: 'MYLR3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '256GB', model: 'MYLW3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '512GB', model: 'MYM43CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '1TB', model: 'MYM83CH/A' },
    ],
    iPhone16ProMax: [
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '256GB', model: 'MYTM3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '512GB', model: 'MYTR3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '1TB', model: 'MYTY3CH/A' },

        { color: { value: 'white', text: '白色钛金属' }, capacity: '256GB', model: 'MYTN3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '512GB', model: 'MYTT3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '1TB', model: 'MYW03CH/A' },

        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '256GB', model: 'MYTP3CH/A' },
        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '512GB', model: 'MYTW3CH/A' },
        { color: { value: 'desert', text: '沙漠色钛金属' }, capacity: '1TB', model: 'MYW13CH/A' },

        { color: { value: 'primary', text: '原色钛金属' }, capacity: '256GB', model: 'MYTQ3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '512GB', model: 'MYTX3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '1TB', model: 'MYW23CH/A' },
    ],

    iPhone15Pro: [
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '128GB', model: 'MTQ43CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '256GB', model: 'MTQ83CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '512GB', model: 'MTQD3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '1TB', model: 'MTQH3CH/A' },

        { color: { value: 'white', text: '白色钛金属' }, capacity: '128GB', model: 'MTQ53CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '256GB', model: 'MTQ93CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '512GB', model: 'MTQE3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '1TB', model: 'MTQJ3CH/A' },

        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '128GB', model: 'MTQ73CH/A' },
        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '256GB', model: 'MTQC3CH/A' },
        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '512GB', model: 'MTQG3CH/A' },
        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '1TB', model: 'MTQL3CH/A' },

        { color: { value: 'primary', text: '原色钛金属' }, capacity: '128GB', model: 'MTQ63CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '256GB', model: 'MTQA3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '512GB', model: 'MTQF3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '1TB', model: 'MTQK3CH/A' },
    ],

    iPhone15ProMax: [
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '256GB', model: 'MU2N3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '512GB', model: 'MU2T3CH/A' },
        { color: { value: 'black', text: '黑色钛金属' }, capacity: '1TB', model: 'MU2X3CH/A' },

        { color: { value: 'white', text: '白色钛金属' }, capacity: '256GB', model: 'MU2P3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '512GB', model: 'MU2U3CH/A' },
        { color: { value: 'white', text: '白色钛金属' }, capacity: '1TB', model: 'MU2Y3CH/A' },

        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '256GB', model: 'MU2R3CH/A' },
        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '512GB', model: 'MU2W3CH/A' },
        { color: { value: 'blue', text: '蓝色钛金属' }, capacity: '1TB', model: 'MU613CH/A' },

        { color: { value: 'primary', text: '原色钛金属' }, capacity: '256GB', model: 'MU2Q3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '512GB', model: 'MU2V3CH/A' },
        { color: { value: 'primary', text: '原色钛金属' }, capacity: '1TB', model: 'MU603CH/A' },
    ],
}

export const applePageUrl = {
    shoppingCart: `https://www.apple.com.cn/shop/bag`,
    buyiPhone: `https://www.apple.com.cn/shop/buy-iphone`,
    shoppingCartWithoutHost: `/shop/bag`,
    buyiPhoneWithoutHost: `/shop/buy-iphone`,
    buyiPhone16Pro: `https://www.apple.com.cn/shop/buy-iphone/iphone-16-pro/`,
}

export const appleAPIUrl = {
    checkStock: (iPhoneModel: string, storeNumber?: string, location?: string) => {
        let url = `https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mts.0=regular`
        if (storeNumber) {
            url = `${url}&mts.1=compact&parts.0=${iPhoneModel}&searchNearby=true&store=${storeNumber}`
        } else {
            url = `${url}&cppart=UNLOCKED/WW&parts.0=${iPhoneModel}&location=${encodeURIComponent(location)}`
        }
        return url
    },
    addressLookup: (state?: string, city?: string, district?: string) => {
        let url = `https://www.apple.com.cn/shop/address-lookup`
        if (state) {
            url = `${url}?state=${encodeURIComponent(state)}`
            if (city) {
                url = `${url}&city=${encodeURIComponent(city)}`
                if (district) {
                    url = `${url}&district=${encodeURIComponent(district)}`
                }
            }
        }

        return url
    },
}

export const commonHeaders = {
    accept: '*/*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': browserUserAgent,
    referer: applePageUrl.buyiPhone16Pro,
    // cookie: document.cookie,
}
