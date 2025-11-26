// 传啥机完整VIP解决方案 - 用户信息+下载权限
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        // ========== 用户信息API处理 ==========
        if (url.includes('/api/User/Info')) {
            console.log("👤 处理用户信息API");
            
            if (data.result) {
                // 核心VIP状态设置
                data.result.isvip = true;
                data.result.viptype = 2; // 高级VIP
                data.result.hasvipcode = true;
                
                // 设置合理的VIP到期时间（1年后）
                const currentTime = Math.floor(Date.now() / 1000);
                data.result.expiretime = currentTime + 31536000;
                
                // 下载相关权限
                data.result.canDownload = true;
                data.result.downloadVipMusic = true;
                data.result.maxDownloadCount = 999;
                
                // 可选：增强显示信息
                data.result.nickname = "VIP尊享会员";
                data.result.age = "相伴 : 永久会员";
                
                console.log("✅ 用户VIP状态已全面设置");
                console.log("📅 VIP到期: " + new Date(data.result.expiretime * 1000).toLocaleDateString('zh-CN'));
            }
        }
        
        // ========== 下载API处理 ==========
        if (url.includes('/api/v2/Music/Down')) {
            console.log("⬇️ 处理下载请求");
            
            const requestData = JSON.parse($request.body);
            const musicId = requestData.MusicId;
            
            console.log("🎵 下载歌曲ID: " + musicId);
            
            // 修复VIP下载限制
            if (data.retmsg && data.retmsg.includes("VIP")) {
                data.retmsg = "记录成功";
                data.result.success = true;
                console.log("✅ VIP下载限制已修复");
            } else if (data.result && data.result.success === false) {
                // 处理其他下载失败情况
                data.retmsg = "记录成功";
                data.result.success = true;
                console.log("✅ 下载失败状态已修复");
            } else {
                console.log("ℹ️ 下载状态正常");
            }
        }
        
        body = JSON.stringify(data);
        
    } catch (error) {
        console.log("❌ 脚本执行错误: " + error);
    }
    
    $done({body});
})();
