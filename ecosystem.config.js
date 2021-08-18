module.exports = {
    apps: [{
        name: 'atom-vite-h5',
        script: 'atom-vite-h5-server.js'
    }, ],
    deploy: {
        production: {
            user: 'root',
            host: '121.5.46.69',
            ref: 'origin/main',
            repo: 'git@github.com:DoubleWoodLin/atom.git',
            path: '/atom-vite-h5',
            'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && npm run build && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
            env: {
                NODE_ENV: 'production'
            }
        }
    }
}