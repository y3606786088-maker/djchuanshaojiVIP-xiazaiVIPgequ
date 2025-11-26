// 下载权限修复脚本
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    console.log("⬇️ 下载脚本执行");
    
    try {
        let data = JSON.parse(body);
        
        if (data.retmsg && data.retmsg.includes("VIP")) {
            data.retmsg = "记录成功";
            data.result.success = true;
            body = JSON.stringify(data);
            console.log("✅ 下载权限已修复");
        }
        
    } catch (e) {
        console.log("❌ 下载脚本错误: " + e);
    }
    
    $done({body});
})();
