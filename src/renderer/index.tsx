import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../styles/main.css'

// 创建根元素
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// 渲染 App 组件
root.render(<App />)
