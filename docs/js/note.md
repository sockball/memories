## 补前导0
```js
/**
 * @param num 需补0的数
 * @param n 补0后的总位数
 */
function format (num, n) {
     return (Array(n).join(0) + num).slice(-n)
}
```

## 滚动条回到顶部动画
```js
/**
 * @param speed 滚动速度 值越小速度越快
 */
function scrollToTop (speed = 10) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 0)
    {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, scrollTop - scrollTop / speed)
    } 
    else 
    {
        window.cancelAnimationFrame(scrollToTop)
    }
}
```
* [参考](https://qishaoxuan.github.io/js_tricks/bom/#%E6%BB%9A%E5%8A%A8%E6%9D%A1%E5%9B%9E%E5%88%B0%E9%A1%B6%E9%83%A8%E5%8A%A8%E7%94%BB)

## 随机数
```js
function random (min, max) {
    return Math.random() * (max + 1 - min) + min
}
```
* [参考](http://www.cnblogs.com/starof/p/4988516.html)

## 快速转换整形
`value | 0` 或 `~~value` <span class='danger'>但11位及以上数字不适用</span>

## base64编码、解码
```js
// 不包含非ASCII码时编码
window.btoa()

// 不包含非ASCII码时解码
window.atob()

// 包含非ASCII码时加工
function base64Encode (str) {
    return btoa(encodeURIComponent(str))
}

function base64Decode (str) {
    return decodeURIComponent(atob(str))
}
```
* [参考](https://www.jianshu.com/p/6d6e7dde510f)

## 块拖拽
```js
﻿function on (dom, eventName, callback) {
    dom[`on${eventName}`] = callback
}

function off (dom, eventName) {
    dom[`on${eventName}`] = null
}

function drag (dom) {
    on(dom, 'mousedown', e => {
        const event = e || window.event
        // 仅左键可拖动
        if (event.button === 0)
        {
            // 记录mousedown时鼠标在dom内的坐标
            const domX = event.clientX - dom.offsetLeft
            const domY = event.clientY - dom.offsetTop
            on(document, 'mousemove', e => {
                const moveEvent = e || window.event
                dom.style.left = moveEvent.clientX - canvasX + 'px'
                dom.style.top = moveEvent.clientY - canvasY + 'px'
            })
        }
    })
    // 拖拽结束后解绑move事件
    on(dom, 'mouseup', () => {
        off(document, 'mousemove')
    })
}
```
* [参考](https://www.cnblogs.com/ghost-xyx/p/3833179.html)

## Array.slice()
`Array.slice( int start [, int end]) : Array`  
返回从原数组中指定下标之间组成的新数组，参数可正可负，不改变原数组的值
* 1个参数：返回该下标至结尾的所有项
```js
const arr = [1, 2, 3, 4]

// [3, 4]
arr.slice(2)

// [2, 3, 4]
arr.slice(-3)
```

* 2个参数：返回start至end前一项的所有项
```js
const arr = [1, 2, 3, 4]

// [3]
arr.slice(2, 3)

// [2, 3]
arr.slice(-3, -1)
```

## Array.splice()
`Array.splice(int start, int num, [, mixed insert, mixed insert ...]): Array`  
删除数组指定数量的项，返回删除项组成的数组，start可正可负，num可为0(即不删除)  
参数3及之后表示从start位置新增值
```js
// 以下结果均基于上一轮调用
const arr = [1, 2, 3, 4]

// 返回[2, 3] 原数组变为[1, 4]
arr.splice(1, 2)

// 返回[] 原数组变为[1, 2, 4]
arr.splice(1, 0, 2)

// 返回[2] 原数组变为[1, 200, 4]
arr.splice(1, 1, 200)

// 返回[200] 原数组变为[1, 400, 500, 4]
arr.splice(1, 1, 400, 500)
```

## BLOB下载
```js
function download ({ data, headers })
{
    const disposition = headers['content-disposition']
    let filename
    if (disposition.includes('filename*='))
    {
        // 多语言编码格式：filename*=utf-8''%E5%95%8A%E5%95%8A%E5%95%8A.csv
        filename = decodeURI(disposition.split("filename*=utf-8''")[1])
    }
    else
    {
        // 格式：filename="sample.csv"
        filename = disposition.split('filename=')[1].slice(1, -1)
    }

    const arr = filename.split('.')
    const exetension = arr[arr.length - 1]
    const blob = new Blob([data], { type: mimeTypes[exetension] })
    const href = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    // 释放blob对象
    window.URL.revokeObjectURL(href)
}
```
* [参考](http://www.cnblogs.com/xuejiangjun/p/8310045.html)

## other

* 控制台执行 `document.body.contentEditable='true'` 可直接编辑页面
* 无限循环简写 `for (;;) {...}`
* 拥有id的元素会创建全局变量，id即为变量名，控制台可直接使用
* `+new Date()` 可以快速得到毫秒级时间戳