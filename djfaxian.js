// 文件名: dianyinduoduo_complete_debug.js
// 描述: 点音多多完整调试脚本

const url = $request.url;
console.log("=== 完整调试开始 ===");
console.log("🔗 请求URL:", url);

if ($response.body) {
    // 确保响应体是字符串
    let body = typeof $response.body === 'string' ? $response.body : JSON.stringify($response.body);
    console.log("📦 响应体长度:", body.length);
    
    // 检查是否包含用户信息关键词
    const keywords = ['vip_type', 'vip_expire', 'is_vip', 'vip_status', 'user_info', 'member_info', 'login_status', 'uid', 'user_id'];
    let foundKeywords = [];
    
    keywords.forEach(keyword => {
        if (body.includes(keyword)) {
            foundKeywords.push(keyword);
        }
    });
    
    if (foundKeywords.length > 0) {
        console.log("🎯 发现用户状态接口!");
        console.log("📌 包含关键词:", foundKeywords.join(', '));
        
        // 输出响应体的前1000字符
        console.log("📄 响应内容:", body.substring(0, Math.min(1000, body.length)));
        
        // 如果是JSON，解析结构
        if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
            try {
                const jsonData = JSON.parse(body);
                console.log("📊 JSON根级键名:", Object.keys(jsonData));
                
                // 查找嵌套的用户信息
                function findNestedUserInfo(obj, path = '') {
                    let results = [];
                    for (let key in obj) {
                        const currentPath = path ? `${path}.${key}` : key;
                        if (keywords.some(kw => key.toLowerCase().includes(kw.toLowerCase()))) {
                            results.push(`${currentPath} = ${JSON.stringify(obj[key])}`);
                        }
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            results = results.concat(findNestedUserInfo(obj[key], currentPath));
                        }
                    }
                    return results;
                }
                
                const userInfo = findNestedUserInfo(jsonData);
                if (userInfo.length > 0) {
                    console.log("📋 用户信息字段:");
                    userInfo.forEach(info => console.log("   ", info));
                }
            } catch (e) {
                console.log("❌ JSON解析失败，可能是压缩数据");
            }
        }
    } else {
        console.log("❌ 未找到用户状态关键词");
    }
} else {
    console.log("❌ 无响应体");
}

console.log("=== 完整调试结束 ===\n");
$done({});
