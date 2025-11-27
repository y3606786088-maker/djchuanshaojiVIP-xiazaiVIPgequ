// 文件名: dianyinduoduo_debug.js
// 描述: 点音多多调试脚本 - 发现所有相关请求

const url = $request.url;
const host = $request.host;

// 记录所有点音多多的请求
if (host.includes('dianyinduoduo.com')) {
    console.log("📡 捕获请求:", url);
    console.log("方法:", $request.method);
    console.log("请求头:", JSON.stringify($request.headers));
    
    if ($response.body) {
        const bodyStr = $response.body;
        console.log("响应长度:", bodyStr.length);
        console.log("响应预览:", bodyStr.substring(0, 500));
        
        // 检查是否包含用户信息关键词
        const userKeywords = ['user', 'member', 'vip', 'login', 'uid', 'User', 'Member', 'VIP'];
        const hasUserInfo = userKeywords.some(keyword => 
            bodyStr.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (hasUserInfo) {
            console.log("🎯 这个响应可能包含用户信息!");
        }
    }
}

$done({});
