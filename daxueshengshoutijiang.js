// 大学搜题酱VIP修改 - 针对明文接口
const url = $request.url;

if (url.includes('viponline/college/cashier')) {
    console.log("🎯 修改VIP支付接口");
    try {
        let obj = JSON.parse($response.body);
        console.log("原始VIP状态: " + obj.data.vipInfo.status);
        
        // 修改VIP状态
        obj.data.vipInfo.status = 1;
        obj.data.vipInfo.startTime = Math.floor(Date.now() / 1000);
        obj.data.vipInfo.stopTime = Math.floor(Date.now() / 1000) + 31536000; // 一年后
        obj.data.vipInfo.experience = 1;
        
        console.log("修改后VIP状态: " + obj.data.vipInfo.status);
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("错误: " + e);
        $done({});
    }
} 
else if (url.includes('/capi/user/mine')) {
    console.log("🎯 修改个人中心接口");
    try {
        let obj = JSON.parse($response.body);
        // 这个接口可能包含VIP相关的显示配置
        // 如果有VIP相关字段就修改
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("错误: " + e);
        $done({});
    }
}
else {
    $done({});
}
