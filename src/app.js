/*
 * @Author: GUOQIANG
 * @Date:   2017-10-25 20:07:31
 * @Last Modified by:   GUOQIANG
 * @Last Modified time: 2017-10-26 13:51:04
 */
const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const conf = require('./config/defaultConfig');
const mime = require('./helper/mime');
const compress = require('./helper/compress');
const range = require('./helper/range');
const isFresh = require('./helper/cache');

const tplPath = path.join(__dirname, './template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());


class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        // 创建服务
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(`${filePath} is not a directory or file!`);
                    return;
                }
                // 如果是文件
                if (stats.isFile()) {
                    const ContentType = mime(filePath);

                    res.setHeader('Content-Type', ContentType);
                    // 判断是否有缓存
                    // if(isFresh(stats,req,res)){
                    //     res.statusCode=304;
                    //     res.end();
                    //     return;
                    // }
                    // 文档范围，一部分的读取
                    let rs;
                    const { code, start, end } = range(stats.size, req, res);
                    if (code === 200) {
                        res.statusCode = 200;
                        rs = fs.createReadStream(filePath);
                    } else {
                        res.statusCode = 206;
                        rs = fs.createReadStream(filePath, { start, end });
                    }
                    // 压缩
                    if (filePath.match(conf.compress)) {
                        rs = compress(rs, req, res);
                    }
                    rs.pipe(res);
                }
                // 如果是文件夹
                else if (stats.isDirectory()) {
                    fs.readdir(filePath, (err, files) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        const dir = path.relative(this.conf.root, filePath);
                        const data = {
                            title: path.basename(filePath),
                            dir: dir ? `/${dir}` : '',
                            files
                        }
                        res.end(template(data));
                    })
                }
            });
        });
        // 监听服务
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server started at ${chalk.green(addr)}`);
        });
    }
}

module.exports=Server;