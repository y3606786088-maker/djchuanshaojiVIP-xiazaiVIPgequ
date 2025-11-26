// 传啥机VIP下载精确修复脚本
// 基于成功下载响应的精确修复
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    // 精确匹配下载API
    if (!url.includes('/api/v2/Music/Down')) {
        $done({body});
        return;
    }
    
    try {
        let data = JSON.parse(body);
        const requestData = JSON.parse($request.body);
        const musicId = requestData.MusicId;
        
        console.log("🎵 处理音乐下载请求，MusicId: " + musicId);
        
        // 检查是否是VIP限制错误
        if (data.retmsg && data.retmsg.includes("VIP")) {
            console.log("❌ 检测到VIP下载限制，修复中...");
            
            // 精确模拟成功响应结构
            data.retmsg = "记录成功";
            data.result.success = true;
            // date字段保持不变
            
            body = JSON.stringify(data);
            console.log("✅ VIP下载限制已修复，返回成功响应");
            console.log("📋 修复后响应: " + body);
        } else {
            console.log("ℹ️ 非VIP限制响应，保持原样");
        }
        
    } catch (error) {
        console.log("❌ 脚本执行错误: " + error);
    }
    
    $done({body});
})();
