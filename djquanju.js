// 文件名: dianyinduoduo_force_global_vip.js
// 描述: 点音多多强力全局VIP修改

const url = $request.url;
console.log("🚀 强力全局VIP修改 - URL:", url);

if ($response.body) {
    let body = $response.body;
    let modified = false;
    
    // 检查是否应该修改这个响应
    const shouldModify = 
        url.includes('/vip/') ||
        url.includes('/user/') ||
        url.includes('/member/') ||
        url.includes('/account/') ||
        url.includes('/profile/') ||
        body.includes('vip_type') ||
        body.includes('vip_expire') ||
        body.includes('is_vip') ||
        body.includes('user_info');
    
    if (shouldModify) {
        console.log("🎯 开始修改此响应");
        
        // 方法1: 处理JSON响应
        if ((body.trim().startsWith('{') || body.trim().startsWith('[')) && body.includes('{')) {
            try {
                let jsonData = JSON.parse(body);
                console.log("📊 原始JSON结构:", Object.keys(jsonData));
                
                // 强力递归修改函数
                function forceModifyVIP(obj, path = '') {
                    if (typeof obj !== 'object' || obj === null) return;
                    
                    for (let key in obj) {
                        const currentPath = path ? `${path}.${key}` : key;
                        const lowerKey = key.toLowerCase();
                        
                        // VIP类型修改
                        if (lowerKey.includes('vip_type') || lowerKey.includes('viptype') || 
                            lowerKey.includes('vipstatus') || lowerKey.includes('vip_level')) {
                            obj[key] = 2;
                            console.log(`✅ 修改 ${currentPath}: 2`);
                            modified = true;
                        }
                        // VIP过期时间
                        else if (lowerKey.includes('vip_expire') || lowerKey.includes('expire_time') || 
                                 lowerKey.includes('vip_end_time') || lowerKey.includes('end_time')) {
                            obj[key] = "2030-12-31 23:59:59";
                            console.log(`✅ 修改 ${currentPath}: 2030-12-31 23:59:59`);
                            modified = true;
                        }
                        // 是否VIP
                        else if (lowerKey.includes('is_vip') || lowerKey.includes('isvip') || 
                                 lowerKey.includes('vip_status') || lowerKey.includes('has_vip')) {
                            obj[key] = true;
                            console.log(`✅ 修改 ${currentPath}: true`);
                            modified = true;
                        }
                        // 用户ID
                        else if (lowerKey.includes('uid') || lowerKey.includes('user_id')) {
                            obj[key] = "12412462";
                            console.log(`✅ 修改 ${currentPath}: 12412462`);
                            modified = true;
                        }
                        // 用户名
                        else if (lowerKey.includes('nickname') || lowerKey.includes('user_name') || 
                                 lowerKey.includes('username')) {
                            obj[key] = "VIP尊享用户";
                            console.log(`✅ 修改 ${currentPath}: VIP尊享用户`);
                            modified = true;
                        }
                        // 递归处理嵌套对象
                        else if (typeof obj[key] === 'object') {
                            forceModifyVIP(obj[key], currentPath);
                        }
                    }
                }
                
                forceModifyVIP(jsonData);
                
                if (modified) {
                    body = JSON.stringify(jsonData);
                    console.log("🎉 JSON响应修改完成");
                }
                
            } catch (e) {
                console.log("❌ JSON解析失败，尝试字符串替换");
            }
        }
        
        // 方法2: 字符串替换（备用方案）
        if (!modified) {
            console.log("🔄 尝试字符串替换");
            
            // 替换常见的VIP状态字段
            const replacements = [
                [/"vip_type":\s*\d+/g, '"vip_type": 2'],
                [/"vip_status":\s*\d+/g, '"vip_status": 2'],
                [/"is_vip":\s*false/g, '"is_vip": true'],
                [/"is_vip":\s*0/g, '"is_vip": 1'],
                [/"vip_expire":\s*"[^"]*"/g, '"vip_expire": "2030-12-31 23:59:59"'],
                [/"expire_time":\s*"[^"]*"/g, '"expire_time": "2030-12-31 23:59:59"'],
                [/"uid":\s*"\d+"/g, '"uid": "12412462"'],
                [/"user_id":\s*"\d+"/g, '"user_id": "12412462"'],
                [/"nickname":\s*"[^"]*"/g, '"nickname": "VIP尊享用户"']
            ];
            
            replacements.forEach(([pattern, replacement]) => {
                if (body.match(pattern)) {
                    body = body.replace(pattern, replacement);
                    modified = true;
                    console.log(`✅ 字符串替换: ${pattern} -> ${replacement}`);
                }
            });
        }
        
        if (modified) {
            console.log("🎊 全局VIP状态强力修改完成");
        } else {
            console.log("⚠️ 未找到可修改的字段");
        }
    } else {
        console.log("⏭️ 跳过此响应（不包含用户信息）");
    }
}

$done({});
