// 文件名: dianyinduoduo_vip_modify_v2.js
// 描述: 点音多多VIP信息修改脚本 - 改进版
// 更新时间: 2025-11-27

if ($response.status === 200) {
    try {
        let body = $response.body;
        
        console.log("开始修改VIP信息...");
        
        // 方法1: 直接替换用户信息HTML
        body = body.replace(
            /<div class="userinfo-title">立即登录<\/div>\s*<div class="userinfo-desc">请登录后购买会员<\/div>/,
            `<div class="userinfo-title">VIP尊享用户</div>
            <div class="userinfo-desc">有效期至: 2030-12-31 &nbsp;&nbsp; 用户ID: 12412462</div>`
        );
        
        // 方法2: 显示VIP角标
        body = body.replace(
            /<div class="userinfo-vip-jiaobiao-wrapper" style="display: none">/g,
            '<div class="userinfo-vip-jiaobiao-wrapper" style="display: block">'
        );
        
        // 方法3: 修改SVIP图标
        body = body.replace(
            /src="\/img\/vip\/v1\/vip_isnot_icon1\.png"/g,
            'src="/img/vip/v1/svip_is_icon.png"'
        );
        
        // 方法4: 修改JavaScript变量 - 更精确的匹配
        body = body.replace(
            /var is_login = false;/,
            'var is_login = true;'
        );
        
        // 方法5: 在DOM加载完成后自动调用初始化函数
        body = body.replace(
            /\$\(function \(\) \{[\s\S]*?updatePaymethod\(paymethod, true\);\s*\}/,
            function(match) {
                return match.replace(
                    /updatePaymethod\(paymethod, true\);\s*\}$/,
                    `updatePaymethod(paymethod, true);
        // 自动初始化VIP用户信息
        setTimeout(function() {
            initUserInfo("VIP尊享用户", "", "2", "2030-12-31", "12412462");
        }, 100);
    }`
                );
            }
        );
        
        // 方法6: 确保支付按钮显示正确价格
        body = body.replace(
            /<div class="pay-price">\$30<\/div>/,
            '<div class="pay-price">¥1</div>'
        );
        
        console.log("VIP信息修改完成");
        $done({ body });
        
    } catch (error) {
        console.log(`VIP修改脚本错误: ${error}`);
        $done({});
    }
} else {
    $done({});
}
