// 备份恢复脚本 - 紧急情况下使用
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    // 如果是登录相关API，确保不修改
    if (url.includes("/api/User/Login") || 
        url.includes("/api/User/Register") ||
        url.includes("/api/Auth")) {
        console.log("登录相关API，直接通过");
        $done({body});
        return;
    }
    
    // 其他API处理...
    $done({body});
})();
