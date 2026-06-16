// 串烧集完整VIP解决方案 - 融合版
// 同时处理用户VIP状态和下载权限
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    console.log("🎵 串烧集VIP脚本执行 - URL: " + url);
    
    try {
        let data = JSON.parse(body);
        
        // ========== 用户信息API处理 ==========
        if (url.includes('/api/User/Info')) {
            console.log("👤 处理用户信息API");
            
            if (data.result) {
                // 记录原始状态
                console.log("📋 原始状态 - isvip:" + data.result.isvip + ", viptype:" + data.result.viptype);
                
                // 设置VIP状态
                data.result.isvip = true;
                data.result.viptype = 2; // 高级VIP
                data.result.hasvipcode = true;
                
                // 设置VIP到期时间（1年后）
                const currentTime = Math.floor(Date.now() / 1000);
                data.result.expiretime = currentTime + 31536000;
                
                // 增强显示信息
                data.result.nickname = "VIP";
                data.result.age = "相伴 : 永久会员";
                
                // 下载相关权限
                data.result.canDownload = true;
                data.result.downloadVipMusic = true;
                
                body = JSON.stringify(data);
                console.log("✅ 用户VIP状态设置完成");
                console.log("🔄 修改后 - isvip:" + data.result.isvip + ", viptype:" + data.result.viptype);
            }
        }
        
        // ========== 下载API处理 ==========
        else if (url.includes('/api/v2/Music/Down')) {
            console.log("⬇️ 处理下载API");
            
            const requestData = JSON.parse($request.body);
            console.log("🎵 下载歌曲ID: " + requestData.MusicId);
            console.log("📋 原始响应: " + JSON.stringify(data));
            
            // 修复VIP下载限制
            if (data.retmsg && data.retmsg.includes("VIP")) {
                data.retmsg = "记录成功";
                data.result.success = true;
                body = JSON.stringify(data);
                console.log("✅ VIP下载限制已修复");
            } else if (data.result && data.result.success === false) {
                // 处理其他下载失败情况
                data.retmsg = "记录成功";
                data.result.success = true;
                body = JSON.stringify(data);
                console.log("✅ 下载失败状态已修复");
            } else {
                console.log("ℹ️ 下载状态正常，无需修改");
            }
        }
        
        // ========== 其他可能相关的API ==========
        else if (url.includes('/api/Song/') || url.includes('/api/Music/')) {
            console.log("🎶 处理歌曲信息API");
            
            if (data.result) {
                // 解锁歌曲权限
                data.result.canDownload = true;
                data.result.downloadable = true;
                data.result.needVip = false;
                data.result.vipOnly = false;
                
                body = JSON.stringify(data);
                console.log("✅ 歌曲下载权限已解锁");
            }
        }
        
    } catch (error) {
        console.log("❌ 脚本执行错误: " + error);
    }
    
    $done({body});
})();
