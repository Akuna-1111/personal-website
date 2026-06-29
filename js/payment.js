(function() {
    var plans = {
        full: {
            title: '全案设计',
            en: 'Full-Service Design',
            details: [
                { label: '适用场景', text: '企业展厅、文化展馆、品牌展台等从零到落地的完整空间项目' },
                { label: '交付内容', text: '策略策划 → 概念方案 → 3D效果图 → 施工图 → 供应商管理 → 现场监理 → 竣工验收' },
                { label: '补充说明', text: '一站到底式服务，甲方只需确认节点，其余由我统筹推进。含材料选型建议、多方比价、施工过程质量把控。' }
            ],
            prices: { monthly: null, quarterly: null, semiannual: null, project: '定制' },
            available: ['project']
        },
        consult: {
            title: '设计顾问',
            en: 'Design Consulting',
            details: [
                { label: '适用场景', text: '客户有内部设计团队，需外部专业视角评审方案、把控方向、优化落地效果' },
                { label: '交付内容', text: '策略建议 → 方案评审报告 → 材料工艺咨询 → AI工作流搭建与培训 → 施工现场指导' },
                { label: '补充说明', text: '独立第三方视角，不捆绑施工方利益。可短期救火或长期陪跑。' }
            ],
            prices: { monthly: '¥8,000', quarterly: '¥22,000', semiannual: '¥40,000', project: '¥15,000' },
            available: ['monthly', 'quarterly', 'semiannual', 'project']
        },
        special: {
            title: '专项设计',
            en: 'Specialized Design',
            details: [
                { label: '适用场景', text: '客户有明确单项需求，需独立交付物，无需全流程设计管理' },
                { label: '交付内容', text: '3D效果图（含VR全景）、主视觉KV及延展、LOGO/VI系统、施工图深化、投标方案包' },
                { label: '补充说明', text: '灵活高效，适合已有执行团队但需外部专业输出的客户。可加急处理。' }
            ],
            prices: { monthly: null, quarterly: null, semiannual: null, project: '¥3,000 起' },
            available: ['project']
        }
    };

    var urlParams = new URLSearchParams(window.location.search);
    var planKey = urlParams.get('plan') || 'full';
    var plan = plans[planKey] || plans.full;

    // Fill left panel
    document.getElementById('payPlanTitle').textContent = plan.title;
    document.getElementById('payPlanEn').textContent = plan.en;
    var bodyHtml = '';
    plan.details.forEach(function(d) {
        bodyHtml += '<div class="pay-plan-row"><span class="pay-plan-label">' + d.label + '</span><p>' + d.text + '</p></div>';
    });
    document.getElementById('payPlanBody').innerHTML = bodyHtml;

    // Set summary plan name
    document.getElementById('summaryPlan').textContent = plan.title;

    // Show/hide payment methods
    var methods = document.querySelectorAll('.pay-method');
    methods.forEach(function(m) {
        var method = m.getAttribute('data-method');
        if (plan.available.indexOf(method) === -1) {
            m.classList.add('d-none');
        }
        var amountEl = m.querySelector('.pay-method-amount');
        if (amountEl && plan.prices[method]) {
            amountEl.textContent = plan.prices[method];
        }
    });

    // Select first available method
    var firstAvailable = document.querySelector('.pay-method:not(.d-none)');
    if (firstAvailable) {
        firstAvailable.classList.add('active');
        firstAvailable.querySelector('input').checked = true;
        updateSummary(firstAvailable.getAttribute('data-method'));
    }

    var calcPanel = document.getElementById('payCalc');
    var calcLocked = false;

    function updateSummary(method) {
        var names = { monthly: '月付', quarterly: '季付', semiannual: '半年付', project: '项目制' };
        document.getElementById('summaryMethod').textContent = names[method] || method;
        if (method === 'project' && calcLocked) {
            var v = parseFloat(document.getElementById('calcValue').textContent.replace(/[^0-9.]/g, ''));
            document.getElementById('summaryAmount').textContent = '¥' + v.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
        } else {
            document.getElementById('summaryAmount').textContent = plan.prices[method] || '面议';
        }
        if (calcPanel) {
            calcPanel.style.display = (method === 'project') ? 'block' : 'none';
        }
    }

    // Method click
    methods.forEach(function(m) {
        m.addEventListener('click', function() {
            methods.forEach(function(m2) { m2.classList.remove('active'); });
            this.classList.add('active');
            this.querySelector('input').checked = true;
            updateSummary(this.getAttribute('data-method'));
        });
    });

    // Calculator lock/unlock
    document.getElementById('calcLockBtn').addEventListener('click', function() {
        if (calcLocked) {
            calcLocked = false;
            document.getElementById('calcResult').style.display = 'none';
            this.innerHTML = '<i class="fas fa-lock me-2"></i>锁定计算';
            this.style.background = '';
            this.style.color = '';
            this.style.borderColor = '';
            document.getElementById('summaryAmount').textContent = plan.prices.project || '定制';
            return;
        }
        var amount = parseFloat(document.getElementById('calcAmount').value);
        var rate = parseFloat(document.getElementById('calcRate').value);
        if (isNaN(amount) || amount <= 0) { alert('请输入有效的合同金额'); return; }
        if (isNaN(rate) || rate < 0) { alert('请输入有效的项目点数'); return; }
        var result = amount * rate / 100;
        calcLocked = true;
        document.getElementById('calcValue').textContent = '¥' + result.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('calcFormula').textContent = '合同金额 ¥' + amount.toLocaleString() + ' × ' + rate + '% = ¥' + result.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
        document.getElementById('calcResult').style.display = 'flex';
        document.getElementById('summaryAmount').textContent = '¥' + result.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.innerHTML = '<i class="fas fa-unlock me-2"></i>解锁编辑';
        this.style.background = '#00cc00';
        this.style.color = '#000';
        this.style.borderColor = '#00cc00';
    });

    // Auto-unlock on input change
    function autoUnlock() {
        if (!calcLocked) return;
        calcLocked = false;
        document.getElementById('calcResult').style.display = 'none';
        var btn = document.getElementById('calcLockBtn');
        btn.innerHTML = '<i class="fas fa-lock me-2"></i>锁定计算';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        document.getElementById('summaryAmount').textContent = plan.prices.project || '定制';
    }
    document.getElementById('calcAmount').addEventListener('input', autoUnlock);
    document.getElementById('calcRate').addEventListener('input', autoUnlock);

    // Confetti animation
    function fireConfetti() {
        var colors = ['#00cc00','#ff6b6b','#ffd93d','#6bcbff','#ff922b','#cc5de8','#20c997','#fff'];
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;';
        document.body.appendChild(container);
        for (var i = 0; i < 80; i++) {
            var p = document.createElement('div');
            var x = Math.random() * 100;
            var delay = Math.random() * 0.8;
            var dur = 1.5 + Math.random() * 2.5;
            var size = 6 + Math.random() * 8;
            var color = colors[Math.floor(Math.random() * colors.length)];
            p.style.cssText =
                'position:absolute;left:' + x + '%;top:-20px;width:' + size + 'px;height:' + size + 'px;' +
                'background:' + color + ';border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';' +
                'animation:confettiFall ' + dur + 's ease-in ' + delay + 's forwards;';
            container.appendChild(p);
        }
        setTimeout(function() { container.remove(); }, 4000);
    }

    // Submit button
    document.getElementById('paySubmitBtn').addEventListener('click', function() {
        var selected = document.querySelector('.pay-method.active');
        var method = selected ? selected.getAttribute('data-method') : 'project';
        var methodNames = { monthly: '月付', quarterly: '季付', semiannual: '半年付', project: '项目制' };
        var amount = document.getElementById('summaryAmount').textContent;

        // Generate order number
        var d = new Date();
        var orderNo = 'ZBK' + d.getFullYear() + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0') + String(d.getHours()).padStart(2,'0') + String(d.getMinutes()).padStart(2,'0') + String(d.getSeconds()).padStart(2,'0');

        // Save order data
        var orderData = {
            orderNo: orderNo,
            planKey: planKey,
            title: plan.title,
            en: plan.en,
            details: plan.details,
            method: methodNames[method] || method,
            amount: amount,
            time: d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + ' ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ':' + String(d.getSeconds()).padStart(2,'0')
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));

        // Show popup
        var content = document.querySelector('.contact-popup-content');
        var overlay = document.querySelector('.contact-popup-overlay');
        content.innerHTML =
            '<p style="color:#00cc00;font-size:1.3rem;font-weight:700;margin-bottom:6px;">合作愉快！</p>' +
            '<p style="color:#5a6680;font-size:0.72rem;margin-bottom:14px;">订单编号 ' + orderNo + '</p>' +
            '<p style="color:#e8ecf1;font-size:0.9rem;margin-bottom:20px;">感谢选择' + plan.title + '方案<br>期待与您携手共创佳作</p>' +
            '<p style="color:#5a6680;font-size:0.72rem;margin-top:14px;margin-bottom:0;">即将跳转订单详情...</p>';
        overlay.classList.add('active');
        fireConfetti();

        // Auto close & redirect after 5s
        setTimeout(function() {
            overlay.classList.remove('active');
            window.location.href = 'order-detail.html';
        }, 3000);
    });
})();
