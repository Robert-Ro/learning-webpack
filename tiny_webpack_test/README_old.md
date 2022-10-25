### 项目简介
使用原生TS手写mini-webpack学习项目,
使用原生TS手写的mini-React全家桶(路由+全局状态管理+核心包),   运行在手写的webpack中


### 脚手架安装与运行
```
    npm i lzy-react-cli  -g    //全局安装脚手架
    lzy-react -v               // 查看版本号


    lzy-react create <projectName> // 对应目录下创建项目
    npm install                    // 项目中安装依赖包
```

### 构建与打包
项目使用手写的lzy-webpack进行构建和打包,同时提供了dev-Server功能
(注意此功能暂时不完善,仅能在文件发生修改时自动打包,在添加,引入新文件后无法自动构建,此时需要重新运行t-dev命令)
```
npm run t-build              // 打包
npm run t-dev                // 运行devServer
```

### 相关文档
文档使用本框架做成了页面,执行t-dev命令即可打开

### 提供相关工具
主要工具库都放在了my_node_modules中 没有做成npm包,引入的时候需要注意
(为了更方便修改源码和调试)
```
  lzy-webpack      //手写的打包器(集成了devServer功能)
  lzy-watchpack    //devServer的文件监视系统
  lzy-React        //lzy-react核心库
  lzy-React-Router // 适配的路由(仅实现history模式 非常不完善)
  lzy-Ruzy         // 适配的全局状态管理器
```
