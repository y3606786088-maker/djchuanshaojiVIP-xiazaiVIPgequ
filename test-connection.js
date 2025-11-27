// 抖音Luna音乐SVIP修改脚本 - 精确匹配版
// 更新时间: 2024-01-01
(function() {
    'use strict';
    
    const url = $request.url;
    
    console.log("🎵 抖音Luna脚本开始执行");
    console.log("📡 请求URL: " + url);
    
    // 精确检查是否为抖音Luna播放列表API
    if (!url.includes('beta-luna.douyin.com/luna/me/playlist')) {
        console.log("🚫 非目标API，跳过处理");
        $done({});
        return;
    }
    
    console.log("✅ 精确匹配到目标API");
    
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        console.log("📋 处理播放列表数据");
        
        if (data.playlists && Array.isArray(data.playlists)) {
            let modifiedCount = 0;
            
            data.playlists.forEach(playlist => {
                if (playlist.owner) {
                    console.log("👤 找到用户信息，原始状态: is_vip=" + playlist.owner.is_vip);
                    
                    // 修改VIP状态
                    playlist.owner.is_vip = true;
                    playlist.owner.vip_stage = "svip";
                    
                    // 修改用户艺术家信息中的VIP状态
                    if (playlist.user_artist_info && playlist.user_artist_info.user_brief) {
                        playlist.user_artist_info.user_brief.is_vip = true;
                        playlist.user_artist_info.user_brief.vip_stage = "svip";
                    }
                    
                    modifiedCount++;
                    console.log("✅ 用户VIP状态已修改: is_vip=true, vip_stage=svip");
                }
            });
            
            console.log("🎉 总共修改 " + modifiedCount + " 个播放列表的VIP状态");
            
            // 重新序列化JSON
            body = JSON.stringify(data);
        }
        
    } catch (error) {
        console.log("❌ JSON解析错误: " + error);
    }
    
    $done({body});
})();
