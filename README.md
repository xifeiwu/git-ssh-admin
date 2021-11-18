### intro

1. 基于http，ssh协议的git服务
2. 权限过滤，用户账号认证

### 关于文件config.js

config.js中配置git仓库的路径，及访问权限

仓库路径规则：

node								// 一级目录，以node为例
├── start							// 入门及学习记录，总结
│   ├── summary 					// 常用逻辑总结
│   └── ...							// 等
├── vendor							// 值得长期跟踪的优秀的三方代码
│   ├── ws
│   ├── git-server-by-http
│   ├── snabbdom
│   ├── vue
│   └── ...
├── projects						// 自己开发的完成特定功能的项目
│   ├── spa-server					// spa项目后端服务
│   └── ...							// 等
├── webpack							// 如果vendor项目比较多，可以将相关项目归类的一个文件夹（如，展示webpack功能的相关项目）
│   ├── ruanyf						// 一个展示基本的webpack使用方式的项目
│   └── ...							// 等
├── toolbox							// 实现一定功能的，不依赖任何三方代码
│   ├── git-admin					// git服务管理工具
│   └── ...							// 等
└── ...								// 其它自定义文件夹

### 关于acme

acme.sh是一个开源的实现的https签名的项目，它通过调用dns提供的接口，在指定域名上加上TXT信息，并进行校验，证明域名所有权后，Let's Encrypt进行签名并返回证书。

相关项目：
bash/vendor/acme.sh，fork自github，添加了”在指定域名上加上TXT信息“的逻辑
pwrd/assist，提供了金山云88dev.cn dns的接口调用，通过node_module axios进行网络请求
