# fetchpackage
在函数调用中下载 NPM 包



## 简介

某些特殊的情况下，无法预先下载安装 NPM 包，需要在代码运行时动态下载安装 NPM 包。使用 fetchpackage 可以直接在代码执行时动态下载安装指定的 NPM 包



## 安装

```
npm i fetchpackage
```



## 使用

```
const fetchpackage = require('fetchpackage')

fetchpackage({
	path: './',    // 指定下载目录
	package: 'package_name',    // 指定下载的 NPM 包名
	registry: 'taobao',    // 指定下载源
	global: false,    // 指定是否全局安装
})
```



## 参数

|  属性名  |  类型   |   示例   | 是否必填 |                             含义                             |
| :------: | :-----: | :------: | :------: | :----------------------------------------------------------: |
|   path   | string  | '/data'  |    否    |                   下载路径，默认为当前目录                   |
| package  | string  | 'axios'  |    是    |                    要下载的 NPM 包的包名                     |
| registry | string  | 'taobao' |    否    | 下载源，默认官方源。official 或 npm 表示使用官方源，taobao 或 cnpm 表示使用淘宝源。其他源请直接填入源地址。 |
|  global  | boolean |  false   |    否    |                    是否全局安装，默认为否                    |



## 返回

函数将返回一个 Promise —— 下载成功将返回对应 NPM 包的包名+版本号，例如 'koa@2.3.1' ，即包目录下的 package.json 文件的 _id 字段值。下载失败将返回错误原因。
