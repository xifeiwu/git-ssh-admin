### intro

1. 基于http，ssh协议的git服务
2. 权限过滤，用户账号认证

### about file config.js

config.js中配置git仓库的路径，只有在配置中存在的git仓库，才能创建和访问

仓库路径规则：

node									// 一级目录，以node为例
├── start								// 入门及学习记录，总结。
│   ├── summary 						// 常用逻辑总结 
│   └── ...								// 等
├── toolbox								// 实现一定功能的，不依赖任何三方代码
│   ├── git-admin						// git服务管理工具
│   └── ...								// 等
├── vender								// 值得长期跟踪的优秀的三方代码
│   ├── ws
│   ├── git-server-by-http
│   ├── snabbdom
│   ├── vue
│   └── ...
└── ...									// 其它自定义文件夹