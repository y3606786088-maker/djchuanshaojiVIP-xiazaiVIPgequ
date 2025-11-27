// 大学搜题酱VIP修改 - VIP支付接口专用
if ($request.url.includes('viponline/college/cashier')) {
    console.log("🎯 开始修改VIP支付接口");
    
    try {
        let obj = JSON.parse($response.body);
        console.log("原始VIP状态: " + obj.data.vipInfo.status);
        
        // 修改VIP状态
        obj.data.vipInfo.status = 1; // 0→1
        obj.data.vipInfo.startTime = Math.floor(Date.now() / 1000); // 当前时间
        obj.data.vipInfo.stopTime = Math.floor(Date.now() / 1000) + 31536000; // 一年后
        obj.data.vipInfo.experience = 1;
        
        console.log("修改后VIP状态: " + obj.data.vipInfo.status);
        console.log("VIP开始时间: " + obj.data.vipInfo.startTime);
        console.log("VIP结束时间: " + obj.data.vipInfo.stopTime);
        
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("修改失败: " + e);
        $done({});
    }
} else {
    $done({});
}
