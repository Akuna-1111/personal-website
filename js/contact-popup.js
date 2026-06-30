// Contact icon popups
document.addEventListener('DOMContentLoaded', function() {
    // Create modal overlay
    var overlay = document.createElement('div');
    overlay.className = 'contact-popup-overlay';
    overlay.innerHTML = '<div class="contact-popup-box"><button class="contact-popup-close">&times;</button><div class="contact-popup-content"></div></div>';
    document.body.appendChild(overlay);

    var box = overlay.querySelector('.contact-popup-box');
    var content = overlay.querySelector('.contact-popup-content');
    var closeBtn = overlay.querySelector('.contact-popup-close');

    function showPopup(html) {
        content.innerHTML = html;
        overlay.classList.add('active');
    }

    function hidePopup() {
        overlay.classList.remove('active');
    }

    closeBtn.addEventListener('click', hidePopup);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) hidePopup();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hidePopup();
    });

    // Phone
    var phoneBtn = document.querySelector('.contact-icon-phone');
    if (phoneBtn) { phoneBtn.setAttribute('aria-label', '电话 15980819253'); phoneBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup('<p class="mb-2" style="color:#00cc00;font-size:0.75rem;letter-spacing:0.1em;">PHONE</p><p class="fs-5 mb-3">15980819253</p><a href="tel:15980819253" class="btn btn-sm btn-outline-primary">Call <i class="fas fa-phone ms-1"></i></a>');
    }); }

    // Email
    var emailBtn = document.querySelector('.contact-icon-email');
    if (emailBtn) { emailBtn.setAttribute('aria-label', '邮箱 876253104@qq.com'); emailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup('<p class="mb-2" style="color:#00cc00;font-size:0.75rem;letter-spacing:0.1em;">EMAIL</p><p class="fs-5 mb-3">876253104@qq.com</p><button class="btn btn-sm btn-outline-primary" onclick="if(navigator.clipboard){navigator.clipboard.writeText(\'876253104@qq.com\');this.textContent=\'Copied!\';setTimeout(()=>this.textContent=\'Copy\',2000)}">Copy</button>');
    }); }

    // QQ
    var qqBtn = document.querySelector('.contact-icon-qq');
    if (qqBtn) { qqBtn.setAttribute('aria-label', 'QQ 876253104'); qqBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup('<p class="mb-2" style="color:#00cc00;font-size:0.75rem;letter-spacing:0.1em;">QQ</p><p class="fs-5 mb-3">876253104</p><button class="btn btn-sm btn-outline-primary" onclick="if(navigator.clipboard){navigator.clipboard.writeText(\'876253104\');this.textContent=\'Copied!\';setTimeout(()=>this.textContent=\'Copy\',2000)}">Copy</button>');
    }); }

    // WeChat
    var wechatBtn = document.querySelector('.contact-icon-wechat');
    if (wechatBtn) { wechatBtn.setAttribute('aria-label', '微信 zbk876253104'); wechatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup('<p class="mb-2" style="color:#00cc00;font-size:0.75rem;letter-spacing:0.1em;">WECHAT</p><img src="image/qr-wechat.webp" style="width:180px;height:180px;border-radius:8px;" alt="微信扫码"><p class="text-secondary mt-2" style="font-size:0.8rem;">zbk876253104</p>');
    }); }

    // Zcool
    var zcoolBtn = document.querySelector('.contact-icon-zcool');
    if (zcoolBtn) { zcoolBtn.setAttribute('aria-label', '站酷主页 zcool.com.cn/u/16878121'); zcoolBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPopup('<p class="mb-2" style="color:#00cc00;font-size:0.75rem;letter-spacing:0.1em;">ZCOOL</p><p class="fs-6 mb-3" style="word-break:break-all;">zcool.com.cn/u/16878121</p><a href="https://www.zcool.com.cn/u/16878121" target="_blank" class="btn btn-sm btn-outline-primary">Open Zcool <i class="fas fa-external-link-alt ms-1"></i></a>');
    }); }
});
