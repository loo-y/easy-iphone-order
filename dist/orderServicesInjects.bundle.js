var orderServicesInjects
;(() => {
    'use strict'
    var e = {
            922: (e, t, o) => {
                Object.defineProperty(t, '__esModule', { value: !0 }), (t.getPageInitInfo = void 0)
                const a = o(709)
                t.getPageInitInfo = async () => {
                    var e, t, o, l, c, r, i, p
                    let u, d
                    console.log('in getPageInitInfo')
                    const v =
                            null === (e = document.getElementById('init_data')) || void 0 === e
                                ? void 0
                                : e.textContent,
                        m = v ? JSON.parse(v) : {},
                        { meta: n, checkout: y } = m || {}
                    d = null === (t = null == n ? void 0 : n.h) || void 0 === t ? void 0 : t['x-aos-stk']
                    const M =
                            (null ===
                                (c =
                                    null ===
                                        (l =
                                            null === (o = null == y ? void 0 : y.fulfillment) || void 0 === o
                                                ? void 0
                                                : o.pickupTab) || void 0 === l
                                        ? void 0
                                        : l.pickup) || void 0 === c
                                ? void 0
                                : c.items) || {},
                        s = (null === (r = null == M ? void 0 : M.c) || void 0 === r ? void 0 : r[0]) || ''
                    if (s) {
                        const e = (M[s] || {}).d || {},
                            t =
                                null === (i = null == e ? void 0 : e.productEvar1) || void 0 === i
                                    ? void 0
                                    : i.split('|')
                        u = (null == t ? void 0 : t.length) && t[t.length - 1]
                    }
                    if (!u) {
                        let e = ''
                        try {
                            let t = { ...a.commonHeaders }
                            delete t.referer
                            const o = await fetch(a.applePageUrl.shoppingCartWithoutHost, {
                                headers: t,
                                credentials: 'include',
                            })
                            e = await o.text()
                        } catch (e) {
                            console.log('fetch error', e)
                        }
                        u =
                            null ===
                                (p =
                                    null == e ? void 0 : e.match(/(?<=productEvar1\"\:"Cart\|\|)([a-zA-Z0-9]+\/A)/g)) ||
                            void 0 === p
                                ? void 0
                                : p[0]
                    }
                    return { partNumber: u, x_aos_stk: d }
                }
            },
            709: (e, t) => {
                Object.defineProperty(t, '__esModule', { value: !0 }),
                    (t.commonHeaders = t.applePageUrl = t.iPhoneModels = t.puppeteerOptions = void 0)
                const o =
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
                ;(t.puppeteerOptions = { userAgent: o }),
                    (t.iPhoneModels = {
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
                    }),
                    (t.applePageUrl = {
                        shoppingCart: 'https://www.apple.com.cn/shop/bag',
                        buyiPhone: 'https://www.apple.com.cn/shop/buy-iphone',
                        shoppingCartWithoutHost: '/shop/bag',
                        buyiPhoneWithoutHost: '/shop/buy-iphone',
                        buyiPhone16Pro: 'https://www.apple.com.cn/shop/buy-iphone/iphone-16-pro/',
                    }),
                    (t.commonHeaders = {
                        accept: '*/*',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="129"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': o,
                        referer: t.applePageUrl.buyiPhone16Pro,
                    })
            },
        },
        t = {}
    function o(a) {
        var l = t[a]
        if (void 0 !== l) return l.exports
        var c = (t[a] = { exports: {} })
        return e[a](c, c.exports, o), c.exports
    }
    var a = {}
    ;(() => {
        var e = a
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.getPageInitInfo = void 0)
        var t = o(922)
        Object.defineProperty(e, 'getPageInitInfo', {
            enumerable: !0,
            get: function () {
                return t.getPageInitInfo
            },
        })
    })(),
        (orderServicesInjects = a)
})()
