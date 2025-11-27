// 大学搜题酱VIP全面修改
const url = $request.url;

if (url.includes('/capi/user/userinfov3')) {
    console.log("🎯 修改用户信息接口");
    try {
        let obj = JSON.parse($response.body);
        if (obj.data) {
            obj.data.isVip = 1;
            obj.data.upGradeFlag = false;
            obj.data.points = 9999;
            obj.data.grade = 100;
            console.log("✅ 用户信息VIP状态已修改");
        }
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("❌ 错误: " + e);
        $done({});
    }
} 
else if (url.includes('viponline/college/cashier')) {
    console.log("🎯 修改VIP支付接口");
    try {
        let obj = JSON.parse($response.body);
        if (obj.data && obj.data.vipInfo) {
            obj.data.vipInfo.status = 1;
            obj.data.vipInfo.startTime = Math.floor(Date.now() / 1000);
            obj.data.vipInfo.stopTime = Math.floor(Date.now() / 1000) + 31536000; // 一年后
            console.log("✅ VIP支付信息已修改");
        }
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("❌ 错误: " + e);
        $done({});
    }
}
else {
    $done({});
}
