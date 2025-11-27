// 抖音Luna音乐完整SVIP解决方案
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    console.log("🎵 抖音Luna SVIP脚本 - URL: " + url);
    
    try {
        let data = JSON.parse(body);
        
        // 播放列表API
        if (url.includes('/luna/me/playlist')) {
            console.log("📋 处理播放列表");
            modifyUserVipStatus(data);
        }
        
        // 用户信息API
        else if (url.includes('/luna/me/profile') || url.includes('/luna/user/info')) {
            console.log("👤 处理用户信息");
            modifyUserVipStatus(data);
        }
        
        // 歌曲信息API
        else if (url.includes('/luna/song/') || url.includes('/luna/music/')) {
            console.log("🎶 处理歌曲信息");
            modifySongVipStatus(data);
        }
        
        // 会员权限API
        else if (url.includes('/luna/vip/') || url.includes('/luna/member/')) {
            console.log("👑 处理会员权限");
            modifyVipPrivileges(data);
        }
        
        body = JSON.stringify(data);
        
    } catch (error) {
        console.log("❌ 脚本错误: " + error);
    }
    
    $done({body});
    
    // 修改用户VIP状态函数
    function modifyUserVipStatus(data) {
        if (data.playlists && Array.isArray(data.playlists)) {
            data.playlists.forEach(playlist => {
                if (playlist.owner) {
                    playlist.owner.is_vip = true;
                    playlist.owner.vip_stage = "svip";
                    
                    if (playlist.user_artist_info && playlist.user_artist_info.user_brief) {
                        playlist.user_artist_info.user_brief.is_vip = true;
                        playlist.user_artist_info.user_brief.vip_stage = "svip";
                    }
                }
            });
            console.log("✅ 播放列表VIP状态已修改");
        }
        
        if (data.user_info || data.profile) {
            const userInfo = data.user_info || data.profile;
            userInfo.is_vip = true;
            userInfo.vip_stage = "svip";
            userInfo.vip_type = 2;
            console.log("✅ 用户信息VIP状态已修改");
        }
    }
    
    // 修改歌曲VIP状态函数
    function modifySongVipStatus(data) {
        if (data.song_info || data.music_info) {
            const songInfo = data.song_info || data.music_info;
            songInfo.need_vip = false;
            songInfo.vip_only = false;
            songInfo.can_play = true;
            songInfo.can_download = true;
            console.log("✅ 歌曲VIP限制已解除");
        }
    }
    
    // 修改会员权限函数
    function modifyVipPrivileges(data) {
        if (data.privileges || data.vip_info) {
            const privileges = data.privileges || data.vip_info;
            privileges.is_vip = true;
            privileges.vip_level = "svip";
            privileges.expire_time = 4102444800; // 2100年到期
            privileges.can_download = true;
            privileges.high_quality = true;
            console.log("✅ 会员权限已增强");
        }
    }
})();
