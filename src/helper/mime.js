/*
* @Author: GUOQIANG
* @Date:   2017-10-26 09:54:47
* @Last Modified by:   GUOQIANG
* @Last Modified time: 2017-10-26 10:07:26
*/
const path=require('path');
const mimeTypes={
    'css':'text/css',
    'gif':'image/gif',
    'html':'text/html',
    'ico':'image/x-icon',
    'jpeg':'image/jpeg',
    'jpg':'image/jpeg',
    'js':'text/javascript',
    'json':'application/json',
    'pdf':'application/pdf',
    'png':'image/png',
    'svg':'image/svg+xml',
    'swf':'application/x-shockwave-flash',
    'tiff':'image/tiff',
    'txt':'text/plain',
    'wav':'audio/x-wav',
    'wma':'audio/x-ms-wma',
    'wmv':'audio/x-ms-wmv',
    'xml':'text/xml'
};

module.exports=(filePath)=>{
    let ext=path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase();

    if(!ext){
        ext=filePath;
    }
// 根据文件的扩展名返回文件类型
    return mimeTypes[ext]||mimeTypes['txt'];
}