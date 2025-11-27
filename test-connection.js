// Loon脚本诊断工具
(function() {
    'use strict';
    
    // 记录基础信息
    console.log("=== Loon诊断工具 ===");
    console.log("请求URL: " + $request.url);
    console.log("请求方法: " + $request.method);
    console.log("主机名: " + $request.hostname);
    console.log("路径: " + $request.path);
    console.log("响应状态: " + $response.status);
    
    // 检查抖音Luna相关请求
    const isLunaRequest = $request.url.includes('douyin.com') || 
                         $request.url.includes('luna');
    
    if (isLunaRequest) {
        console.log("🎯 检测到抖音Luna请求");
        console.log("完整URL: " + $request.url);
        
        // 检查是否是播放列表API
        if ($request.url.includes('/luna/me/playlist')) {
            console.log("✅ 匹配到目标API: /luna/me/playlist");
            
            // 尝试修改响应
            if ($response.body) {
                try {
                    let data = JSON.parse($response.body);
                    console.log("📋 原始VIP状态: " + 
                        (data.playlists && data.playlists[0] && data.playlists[0].owner ? 
                         data.playlists[0].owner.is_vip : '未知'));
                    console.log("✅ JSON解析成功，可以修改数据");
                } catch (e) {
                    console.log("❌ JSON解析失败: " + e);
                }
            }
        }
    } else {
        console.log("ℹ️ 非抖音Luna请求");
    }
    
    console.log("=== 诊断完成 ===");
    $done({});
})();
