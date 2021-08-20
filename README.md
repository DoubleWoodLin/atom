## Atom 记账本应用
### 技术栈
前端：React Hooks + Vite + zarm(组件库)

后端：egg.js + MySQL

<a href="http://121.5.46.69:5021">线上预览地址</a>

### 后端地址
<a href="https://github.com/DoubleWoodLin/egg-server">egg.server</a>

### 启动

```
// 下载仓库到本地
git clone https://github.com/DoubleWoodLin/atom.git
// 进入项目目录
cd atom
// 安装依赖
npm i
// 启动项目
npm run dev
```

### 部署
将开发完的代码推上github，然后使用pm2进行部署，注意要把服务器的SSH公钥保存到github上，因为服务器是基于SSH拉取代码的。
```javascrpt
// ecosystem.config.js文件
module.exports = {
    apps: [{
        name: 'atom-vite-h5',
        script: 'atom-vite-h5-server.js'
    }, ],
    deploy: {
        production: {
            user: 'root',
            host: '121.5.46.69',// 改成你的服务器IP
            ref: 'origin/main',// github 分支名
            repo: 'git@github.com:DoubleWoodLin/atom.git',// 仓库SSH地址
            path: '/atom-vite-h5',// 服务器保存项目的目录
            'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && npm run build && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
            env: {
                NODE_ENV: 'production'
            }
        }
    }
}

// atom-vite-h5-server.js 

const server = require('pushstate-server')

server.start({
    port: 5021,// 服务器运行端口
    directory: './dist'
})
```
运行命令
```
// 初始化
pm2 deploy ecosystem.config.js production setup
// 运行
pm2 deploy production 
```
顺利的话就可以通过ip+端口的形式访问了，如果访问不到检查一下防火墙里端口是否放行。

### 注意事项
部署时注释掉代理代码，通过后端CORS添加白名单解决跨域问题，开发时可使用代理，target处写后端地址。
```javascript
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
```
