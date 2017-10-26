/*
* @Author: GUOQIANG
* @Date:   2017-10-26 10:21:30
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 13:52:29
*/
// 代码压缩
const {createGzip,createDeflate}=require('zlib');
module.exports=(rs,req,res)=>{
    const acceptEncoding=req.headers['accept-encoding'];

    if(!acceptEncoding||!acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
    }
}