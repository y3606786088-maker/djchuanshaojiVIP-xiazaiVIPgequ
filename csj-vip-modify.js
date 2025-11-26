// 传啥机VIP修改脚本 - 简化安全版
// 只修改最核心的VIP字段，最大限度保持数据结构

(function() {
    'use strict';
    
    const url = $request.url;
    
    if (!url.includes('/api/User/Info')) {
        $done({});
        return;
    }
    
    let body = $response.body;
    
    try {
        let data = JSON.parse(body);
        
        if (data.result) {
            // 只修改核心VIP字段，其他保持原样
            data.result.isvip = true;
            data.result.viptype = 1;
            data.result.hasvipcode = true;
            data.result.expiretime = Math.floor(Date.now() / 1000) + 2592000; // 30天后
            
            body = JSON.stringify(data);
            console.log("✅ 核心VIP字段修改完成");
        }
        
    } catch (e) {
        console.log("❌ 修改失败: " + e);
    }
    
    $done({body});
})();
