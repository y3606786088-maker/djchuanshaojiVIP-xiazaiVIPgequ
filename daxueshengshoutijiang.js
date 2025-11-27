// 大学搜题酱VIP修改 - 万能版
if ($request.url.includes('/capi/user/userinfov3')) {
    console.log("🎯 万能版脚本开始执行");
    
    let body = $response.body;
    
    // 方法1: 尝试JSON解析
    try {
        let obj = JSON.parse(body);
        if (obj.data) {
            // 直接设置所有可能的VIP字段
            obj.data.isVip = 1;
            obj.data.vipStatus = 1;
            obj.data.vip = 1;
            obj.data.upGradeFlag = false;
            obj.data.points = 9999;
            obj.data.grade = 100;
            console.log("✅ 通过JSON解析修改成功");
            $done({body: JSON.stringify(obj)});
            return;
        }
    } catch(e) {
        console.log("❌ JSON解析失败: " + e);
    }
    
    // 方法2: 字符串替换
    body = body.replace(/"isVip":\s*[01]/g, '"isVip":1');
    body = body.replace(/"vipStatus":\s*[01]/g, '"vipStatus":1');
    body = body.replace(/"vip":\s*[01]/g, '"vip":1');
    body = body.replace(/"upGradeFlag":\s*true/g, '"upGradeFlag":false');
    body = body.replace(/"points":\s*\d+/g, '"points":9999');
    body = body.replace(/"grade":\s*\d+/g, '"grade":100');
    
    console.log("✅ 通过字符串替换修改完成");
    $done({body: body});
} else {
    $done({});
}
