
// 文件名: dianyinduoduo_user_status.js
// 描述: 点音多多用户状态接口发现

const url = $request.url;
console.log("🔍 检查请求:", url);

if ($response.body && $response.body.length > 0) {
    let body = $response.body;
    
    // 检查是否包含用户状态信息
    const userStatusKeywords = [
        'vip_type', 'vip_expire', 'is_vip', 'vip_status', 
        'user_info', 'member_info', 'user_status', 'login_status',
        'uid', 'user_id', 'nickname', 'avatar'
    ];
    
    let hasUserStatus = false;
    let foundKeywords = [];
    
    userStatusKeywords.forEach(keyword => {
        if (body.toLowerCase().includes(keyword.toLowerCase())) {
            hasUserStatus = true;
            foundKeywords.push(keyword);
        }
    });
    
    if (hasUserStatus) {
        console.log("🎯 发现用户状态接口!");
        console.log("📌 包含关键词:", foundKeywords.join(', '));
        console.log("📄 响应预览:", body.substring(0, 500));
        
        // 如果是JSON，解析结构
        if (body.trim().startsWith('{') || body.trim().startsWith('[')) {
            try {
                const jsonData = JSON.parse(body);
                console.log("📊 JSON结构:", Object.keys(jsonData));
                
                // 深度搜索用户信息字段
                function findUserFields(obj, path = '') {
                    let results = [];
                    for (let key in obj) {
                        const currentPath = path ? `${path}.${key}` : key;
                        if (userStatusKeywords.some(kw => 
                            key.toLowerCase().includes(kw.toLowerCase()))) {
                            results.push(`${currentPath}: ${obj[key]}`);
                        }
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            results = results.concat(findUserFields(obj[key], currentPath));
                        }
                    }
                    return results;
                }
                
                const userFields = findUserFields(jsonData);
                if (userFields.length > 0) {
                    console.log("📋 用户相关字段:");
                    userFields.forEach(field => console.log("   ", field));
                }
            } catch (e) {
                console.log("❌ JSON解析失败");
            }
        }
    }
}

$done({});
