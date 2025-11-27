// ==UserScript==
// @name         电影多多 SVIP 状态修改（含后端API拦截）
// @namespace    https://github.com/your-username/loon-scripts
// @version      2.0
// @description  同时修改前端显示+后端API响应，突破权限校验
// @author       Your Name
// @match        https://new.dianyinduoduo.com/vip/h5/index.ios.v4.php*  // 前端页面
// @match        https://new.dianyinduoduo.com/api/user/getVipInfo*     // 后端VIP接口（替换为实际URL）
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. 拦截后端VIP接口：强制返回SVIP状态
    if (typeof $response !== 'undefined' && $response.body) {
        // 判断是否为API响应（JSON格式）
        try {
            let apiData = JSON.parse($response.body);
            // 强制修改VIP相关字段（根据实际API响应结构调整）
            apiData.data.isVip = true;
            apiData.data.vipType = 2; // 2=SVIP
            apiData.data.expireTime = "2099-12-31"; // 永久有效
            apiData.data.isForever = true; // 新增永久标识（若接口支持）
            $done({ body: JSON.stringify(apiData) });
            console.log("=== 后端API已修改为SVIP ===");
            return; // 优先处理API，结束脚本
        } catch (e) {
            // 非JSON格式（前端HTML页面），继续修改前端
        }

        // 2. 拦截前端HTML页面：修改显示状态（原有逻辑优化）
        let html = $response.body;
        // 优化1：确保覆盖所有登录状态变量
        html = html.replace(/var is_login = false;/g, 'var is_login = true;');
        html = html.replace(/is_login === false/g, 'is_login === true');
        // 优化2：防止DOM选择器失效（按实际页面结构调整）
        const vipIconSelector = '.userinfo-vip-jiaobiao-img, .svip-icon'; // 多选择器兼容
        const vipDescSelector = '.userinfo-desc, .vip-status';
        html = html.replace(new RegExp(`(${vipIconSelector}).*?src="[^"]*?"`, 'g'), `$1 src="//hscdn.dianyinduoduo.com/img/vip/v1/svip_is_icon.png"`);
        html = html.replace(new RegExp(`(${vipDescSelector}>).*?</div>`, 'g'), `$1永久SVIP会员</div>`);
        // 优化3：隐藏支付按钮（避免点击后暴露未付费状态）
        html = html.replace(/class="pay-btn"/g, 'class="pay-btn" style="display:none;"');
        $done({ body: html });
        console.log("=== 前端页面已修改为SVIP显示 ===");
    }
})();
