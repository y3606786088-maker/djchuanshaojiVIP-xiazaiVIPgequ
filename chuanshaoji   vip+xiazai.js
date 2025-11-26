// 传啥机VIP完整修复脚本
// 修复匹配表达式问题
(function() {
    'use strict';
    
    const url = $request.url;
    let body = $response.body;
    
    console.log("=== VIP脚本开始执行 ===");
    console.log("请求URL: " + url);
    
    try {
        let data = JSON.parse(body);
        
        // 用户信息API处理
        if (url.includes('/api/User/Info')) {
            console.log("🎯 匹配到用户信息API");
            
            if (data.result) {
                console.log("📋 原始VIP状态: isvip=" + data.result.isvip + ", viptype=" + data.result.viptype);
                
                // 设置VIP状态
                data.result.isvip = true;
                data.result.viptype = 2;
                data.result.hasvipcode = true;
                data.result.expiretime = Math.floor(Date.now() / 1000) + 31536000;
                
                // 增强显示
                data.result.nickname = "VIP会员";
                data.result.age = "相伴 : 永久会员";
                
                body = JSON.stringify(data);
                console.log("✅ VIP状态已设置: isvip=true, viptype=2");
                console.log("📋 修改后响应长度: " + body.length);
            }
        }
        
        // 下载API处理
        if (url.includes('/api/v2/Music/Down')) {
            console.log("🎯 匹配到下载API");
            console.log("📋 原始响应: " + body);
            
            if (data.retmsg && data.retmsg.includes("VIP")) {
                data.retmsg = "记录成功";
                data.result.success = true;
                body = JSON.stringify(data);
                console.log("✅ 下载权限已修复");
            }
        }
        
    } catch (error) {
        console.log("❌ 脚本执行错误: " + error);
    }
    
    console.log("=== VIP脚本执行完成 ===");
    $done({body});
})();
