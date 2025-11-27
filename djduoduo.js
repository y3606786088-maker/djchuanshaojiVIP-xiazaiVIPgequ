// 文件名: dianyinduoduo_discover.js
// 描述: 点音多多接口发现脚本

const url = $request.url;
const method = $request.method;

// 记录所有相关请求
console.log("🔍 请求URL:", url);
console.log("📝 请求方法:", method);

if ($response.body) {
    const body = $response.body;
    console.log("📦 响应长度:", body.length);
    
    // 检查是否包含用户信息关键词
    const userKeywords = ['user', 'member', 'vip', 'login', 'uid', 'User', 'Member', 'VIP', 'is_login', 'vip_type'];
    const hasUserInfo = userKeywords.some(keyword => 
        body.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasUserInfo) {
        console.log("🎯 发现用户信息接口!");
        console.log("📄 响应预览:", body.substring(0, 300));
        
        // 如果是JSON格式，尝试解析
        if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
            try {
                const jsonData = JSON.parse(body);
                console.log("📊 JSON结构:", Object.keys(jsonData));
            } catch (e) {
                console.log("❌ JSON解析失败");
            }
        }
    }
}

$done({});
