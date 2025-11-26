// 传啥机音乐App完整权限解锁
// 处理用户信息 + 下载权限 + 歌曲权限
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        // 用户信息API - 确保VIP状态
        if (url.includes('/api/User/Info')) {
            if (data.result) {
                data.result.isvip = true;
                data.result.viptype = 2;
                data.result.hasvipcode = true;
                data.result.expiretime = Math.floor(Date.now() / 1000) + 31536000; // 1年
                
                // 增强下载权限
                data.result.canDownload = true;
                data.result.downloadVipSongs = true;
                data.result.maxDownloadQuality = "flac";
                
                console.log("👑 用户VIP状态和下载权限已设置");
            }
        }
        
        // 下载API - 修复VIP限制
        if (url.includes('/api/v2/Music/Down')) {
            console.log("⬇️ 处理下载请求");
            
            // 无论原始响应是什么，都改为成功
            data.retcode = 1;
            data.retmsg = "success";
            data.result = {
                success: true,
                downloadUrl: "https://music.example.com/download/" + Date.now(),
                fileSize: 5242880, // 5MB
                duration: 240, // 4分钟
                bitrate: 320,
                format: "mp3"
            };
            
            console.log("✅ 下载请求已强制成功");
        }
        
        // 歌曲信息API - 解锁所有歌曲
        if (url.includes('/api/Song/') || url.includes('/api/Music/Info')) {
            if (data.result) {
                data.result.canDownload = true;
                data.result.downloadable = true;
                data.result.needVip = false;
                data.result.vipOnly = false;
                data.result.isFree = true;
                
                console.log("🎵 歌曲下载权限已解锁");
            }
        }
        
        body = JSON.stringify(data);
        
    } catch (e) {
        console.log("❌ 处理错误: " + e);
    }
    
    $done({body});
})();// 传啥机音乐App完整权限解锁
// 处理用户信息 + 下载权限 + 歌曲权限
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        // 用户信息API - 确保VIP状态
        if (url.includes('/api/User/Info')) {
            if (data.result) {
                data.result.isvip = true;
                data.result.viptype = 2;
                data.result.hasvipcode = true;
                data.result.expiretime = Math.floor(Date.now() / 1000) + 31536000; // 1年
                
                // 增强下载权限
                data.result.canDownload = true;
                data.result.downloadVipSongs = true;
                data.result.maxDownloadQuality = "flac";
                
                console.log("👑 用户VIP状态和下载权限已设置");
            }
        }
        
        // 下载API - 修复VIP限制
        if (url.includes('/api/v2/Music/Down')) {
            console.log("⬇️ 处理下载请求");
            
            // 无论原始响应是什么，都改为成功
            data.retcode = 1;
            data.retmsg = "success";
            data.result = {
                success: true,
                downloadUrl: "https://music.example.com/download/" + Date.now(),
                fileSize: 5242880, // 5MB
                duration: 240, // 4分钟
                bitrate: 320,
                format: "mp3"
            };
            
            console.log("✅ 下载请求已强制成功");
        }
        
        // 歌曲信息API - 解锁所有歌曲
        if (url.includes('/api/Song/') || url.includes('/api/Music/Info')) {
            if (data.result) {
                data.result.canDownload = true;
                data.result.downloadable = true;
                data.result.needVip = false;
                data.result.vipOnly = false;
                data.result.isFree = true;
                
                console.log("🎵 歌曲下载权限已解锁");
            }
        }
        
        body = JSON.stringify(data);
        
    } catch (e) {
        console.log("❌ 处理错误: " + e);
    }
    
    $done({body});
})();
