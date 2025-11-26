// 传啥机VIP修改脚本 - 基于抓包数据精确匹配
// 目标API: http://csj.yy-5.com/api/User/Info
// 基于抓包数据精确修改，避免页面空白问题

(function() {
    'use strict';
    
    const requestUrl = $request.url;
    let responseBody = $response.body;
    
    // 精确匹配目标API
    if (!requestUrl.includes('/api/User/Info')) {
        $done({body: responseBody});
        return;
    }
    
    console.log("🎯 拦截到用户信息API请求");
    
    try {
        let jsonData = JSON.parse(responseBody);
        
        // 验证数据结构是否与抓包数据匹配
        if (jsonData.retcode === 1 && jsonData.retmsg === "success" && jsonData.result) {
            console.log("✅ 数据结构验证通过");
            
            const userInfo = jsonData.result;
            
            // 基于抓包数据精确修改VIP字段
            userInfo.isvip = true;                    // VIP状态
            userInfo.viptype = 2;                     // VIP类型 (2=高级VIP)
            userInfo.hasvipcode = true;               // 拥有VIP码
            
            // 设置VIP到期时间（基于当前时间+1年）
            const currentTimestamp = Math.floor(Date.now() / 1000);
            userInfo.expiretime = currentTimestamp + (365 * 24 * 60 * 60);
            
            // 可选：增强用户数据（保持与原始数据类型一致）
            userInfo.nickname = "VIP尊享会员";        // 修改昵称
            userInfo.fanscount = 128;                 // 粉丝数（保持整数）
            userInfo.focuscount = 56;                 // 关注数（保持整数）
            userInfo.visitors = 892;                  // 访客数（保持整数）
            userInfo.duration = 28800;                // 总使用时长（保持整数）
            userInfo.todayduration = 3600;            // 今日使用时长（保持整数）
            userInfo.rq = 150;                        // 人气值（保持整数）
            userInfo.sheetcount = 12;                 // 歌单数量（保持整数）
            userInfo.age = "相伴 : 永久会员";         // 会员时长显示
            
            // 注意：保持null字段不变，避免破坏数据结构
            // userInfo.avatar = userInfo.avatar;      // 保持原始值（null）
            // userInfo.banner = userInfo.banner;      // 保持原始值（null）
            // userInfo.medals = userInfo.medals;      // 保持原始值（null）
            
            console.log("✨ VIP信息修改完成");
            console.log("👤 用户ID: " + userInfo.id);
            console.log("👑 VIP类型: " + userInfo.viptype);
            console.log("⏰ VIP到期时间: " + new Date(userInfo.expiretime * 1000).toLocaleDateString('zh-CN'));
            
            // 重新序列化JSON
            responseBody = JSON.stringify(jsonData);
            
            // 验证JSON格式是否正确
            JSON.parse(responseBody);
            console.log("✅ JSON格式验证通过");
            
        } else {
            console.log("❌ 数据结构不匹配，跳过修改");
            console.log("retcode: " + jsonData.retcode);
            console.log("retmsg: " + jsonData.retmsg);
            console.log("has result: " + !!jsonData.result);
        }
        
    } catch (error) {
        console.log("❌ 脚本执行出错: " + error);
        console.log("🔙 返回原始数据");
        // 出错时返回原始数据，避免页面空白
    }
    
    $done({body: responseBody});
})();
