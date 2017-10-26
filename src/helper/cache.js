/*
* @Author: GUOQIANG
* @Date:   2017-10-26 11:20:36
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 13:52:19
*/
// 判断缓存，是否向服务器请求
const {cache}=require('../config/defaultConfig');

function refreshRes(stats,res) {
    const {maxAge,expires,cacheControl,lastModified,etag}=cache;
    if(expires){
        res.setHeader('Expires',(new Date(Date.now()+maxAge*1000)).toUTCString());
    }
    if(cacheControl){
        res.setHeader('Cache-Control',`public, max-age=${maxAge}`);
    }
    if(lastModified){
        res.setHeader('Last-Modified',stats.mtime.toUTCString());
    }
    if(etag){
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`);
    }
}

module.exports=function isFresh(stats,req,res) {
    refreshRes(stats,res);
    const lastModified=req.headers['if-modified-since'];
    const etag=req.headers['if-none-match'];

    if(!lastModified&&!etag){
        return false;
    }
    if(lastModified&&lastModified!==res.getHeader('Last-Modified')){
        return false;
    }
    if(etag&&etag!==res.getHeader('ETag')){
        return false;
    }
    return true;
}