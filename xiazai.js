// 传啥机VIP下载专用修复脚本
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    console.log("=== 下载脚本开始执行 ===");
    console.log("请求URL: " + url);
    
    // 只处理下载API
    if (url.includes('/api/v2/Music/Down')) {
        console.log("🎯 精确匹配到下载API");
        console.log("请求体: " + $request.body);
        console.log("原始响应: " + body);
        
        try {
            let data = JSON.parse(body);
            console.log("解析成功 - retmsg: " + data.retmsg);
            console.log("解析成功 - success: " + data.result.success);
            
            // 强制修改为成功状态
            data.retmsg = "记录成功";
            data.result.success = true;
            
            body = JSON.stringify(data);
            console.log("✅ 下载状态已强制修改为成功");
            console.log("修改后响应: " + body);
            
        } catch (error) {
            console.log("❌ JSON解析错误: " + error);
        }
    } else {
        console.log("ℹ️ 非下载API，跳过处理");
    }
    
    console.log("=== 下载脚本执行完成 ===");
    $done({body});
})();
