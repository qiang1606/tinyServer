/*
* @Author: GUOQIANG
* @Date:   2017-10-26 13:02:14
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 13:48:15
*/
const yargs =require('yargs');
const Server =require('./app');
// 构建命令行
const argv=yargs
            .usage('anywhere [options]')
            .option('p',{
                alias:'port',
                describe:'端口号',
                default:9527
            })
            .option('h',{
                alias:'hostname',
                describe:'host',
                default:'127.0.0.1'
            })
            .option('d',{
                alias:'root',
                describe:'root path',
                default:process.cwd()
            })
            .version()
            .alias('v','version')
            .help()
            .argv;

const server =new Server(argv);
server.start();