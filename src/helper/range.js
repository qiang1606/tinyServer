/*
* @Author: GUOQIANG
* @Date:   2017-10-26 10:52:48
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 13:52:53
*/
// 读取文件大小的范围
module.exports=(totalSize,req,res)=>{
    const range=req.headers['range'];
    if(!range){
        return {code:200};
    }

    const sizes=range.match(/\bytes=(\d*)-(\d*)/);
    const end=sizes[2]||totalSize-1;
    const start=sizes[1]||totalSize-end;
    // 异常情况处理
    if(start>end||start<0||end>totalSize){
        return {code:200};
    }

    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length',end-start);
    return {
        code:206,
        start:parseInt(start),
        end:parseInt(end),
    };
}