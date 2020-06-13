# Water UI

一款基于 `Taro` 框架开发的小程序端 UI 组件库

## 特性

- 基于 `Taro` 开发 UI 组件
- 一套组件可以在 `微信小程序`端适配运行（`ReactNative` 端暂不支持）
- 提供友好的 API，可灵活的使用组件

## 关于 Taro

Taro 是由 [凹凸实验室](https://aotu.io) 倾力打造的多端开发解决方案。现如今市面上端的形态多种多样，Web、ReactNative、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、RN等）运行的代码。

## 安装

需要安装 `Taro` 开发工具 `@tarojs/cli`，`Taro` 版本需要在 `1.0.0-beta.18` 以上

```bash
npm install -g @tarojs/cli
```

然后在项目中安装 Taro UI

```bash
npm install taro-ui
```

## 使用

在代码中 `import` 需要的组件并按照文档说明使用

```js
import { LoginBtn } from 'water-ui'

```

## 开发计划

[开发计划](./PLANS.md)

## 新增组件开发流程

1. 从master新建分支开发。

2. 开发完成后提交到远程仓库，并打tag版本。测试的版本号为`tv1.0.1`开头

3. 测试版本通过后，合并到master分支，并发布正式版本号tag，正式版本号tag为`v1.0.1`开头


## License

UNLICENSED

