(function() {
    var raw = localStorage.getItem('orderData');
    if (!raw) {
        document.getElementById('orderContent').innerHTML = '<div class="order-empty"><p>暂无订单数据</p><a href="index.html" class="btn btn-outline-primary mt-3">返回首页</a></div>';
        return;
    }
    var o = JSON.parse(raw);
    var detailHtml = '';
    o.details.forEach(function(d) {
        detailHtml += '<div class="order-detail-row"><span class="order-detail-label">' + d.label + '</span><span class="order-detail-text">' + d.text + '</span></div>';
    });

    document.getElementById('orderContent').innerHTML =
        '<div class="order-card">' +
        '<div class="order-no">订单编号 <span>' + o.orderNo + '</span></div>' +
        '<div class="order-plan-title">' + o.title + '</div>' +
        '<div class="order-plan-en">' + o.en + '</div>' +
        detailHtml +
        '<table class="order-summary-table"><tbody>' +
        '<tr><td>支付方式</td><td>' + o.method + '</td></tr>' +
        '<tr><td>应付金额</td><td class="green">' + o.amount + '</td></tr>' +
        '<tr><td>提交时间</td><td>' + o.time + '</td></tr>' +
        '</tbody></table>' +
        '<div class="order-actions">' +
        '<a href="tel:15980819253" class="order-btn order-btn-primary"><i class="fas fa-phone me-2"></i>立即联系</a>' +
        '<button class="order-btn order-btn-outline" id="getContractBtn"><i class="fas fa-file-contract me-2"></i>获取合同</button>' +
        '</div>' +
        '</div>';

    document.getElementById('getContractBtn').addEventListener('click', function() {
        var d = new Date();
        var today = d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日';
        var detailLines = '';
        o.details.forEach(function(dd) {
            detailLines += '<p><b>' + dd.label + '：</b>' + dd.text + '</p>';
        });

        var parts = [];
        parts.push('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">');
        parts.push('<head><meta charset="UTF-8"></head>');
        parts.push('<body style="font-family:SimSun;font-size:14px;line-height:2;padding:60px 80px;">');
        parts.push('<h1 style="text-align:center;">设计服务合同</h1>');
        parts.push('<p><b>合同编号：</b>' + o.orderNo + '</p>');
        parts.push('<p><b>签订日期：</b>' + today + '</p>');
        parts.push('<p><b>签订地点：</b>福建省厦门市</p>');
        parts.push('<h2>合同双方</h2>');
        parts.push('<table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;">');
        parts.push('<tr><td width="20%"><b>甲方</b></td><td>[请填写]</td></tr>');
        parts.push('<tr><td><b>乙方</b></td><td>郑彬坤 / 15980819253</td></tr></table>');
        parts.push('<h2>服务内容</h2>');
        parts.push('<p><b>方案：</b>' + o.title + '</p>');
        parts.push(detailLines);
        parts.push('<h2>费用</h2>');
        parts.push('<p><b>支付方式：</b>' + o.method + '  <b>金额：</b>' + o.amount + '</p>');
        parts.push('<h2>其他</h2><p>本合同一式两份，自签字盖章之日起生效。</p>');
        parts.push('<br><br><table width="100%"><tr><td width="50%"><b>甲方（盖章）：</b></td><td><b>乙方（盖章）：</b></td></tr></table>');
        parts.push('</body></html>');

        var blob = new Blob([parts.join('')], { type: 'application/msword' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '设计服务合同_' + o.title + '.doc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
})();
