// 大学搜题酱VIP修改脚本 - 针对userinfov3接口
const url = $request.url;

if (url.includes('/capi/user/userinfov3')) {
    try {
        let obj = JSON.parse($response.body);
        console.log("匹配到userinfov3接口，开始修改VIP状态");
        
        // 修改VIP相关字段
        if (obj.data) {
            obj.data.isVip = 1;                    // VIP状态：0→1
            obj.data.upGradeFlag = false;          // 关闭升级提示
            obj.data.points = 9999;                // 设置积分
            obj.data.grade = 100;                  // 设置等级
            console.log("VIP状态修改成功");
        }
        
        $done({body: JSON.stringify(obj)});
    } catch (e) {
        console.log("VIP修改错误: " + e);
        $done({});
    }
} else {
    console.log("未匹配到目标接口");
    $done({});
}
