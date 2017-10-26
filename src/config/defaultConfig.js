/*
* @Author: GUOQIANG
* @Date:   2017-10-25 20:08:46
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 11:19:21
*/
module.exports={
    root:process.cwd(),
    hostname:'127.0.0.1',
    port:9527,
    compress:/\.(html|js|css|md)/,
    cache:{
        maxAge:600,
        expires:true,
        cacheControl:true,
        lastModified:true,
        etag:true
    }
}