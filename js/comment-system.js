// 项目详情页留言系统 —— Supabase REST API + 化名 + 头像 + 回复 + 图片弹幕
(function() {
    'use strict';

    var PROJECT_SLUG = document.body.getAttribute('data-project-slug') || 'unknown';
    var COMMENT_LIMIT = 50;
    var AVATAR_SIZE = 44;

    var SUPABASE_URL = 'https://snterhceunhceixgpqxy.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudGVyaGNldW5oY2VpeGdwcXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3Nzg1NzEsImV4cCI6MjA5ODM1NDU3MX0.5a7aBhN_ePKQQfbkmCq9GOKtj78l-E2URCAt8RQVLJ0';

    function apiUrl(path) { return SUPABASE_URL + '/rest/v1/' + path; }

    function apiHeaders() {
        return {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json'
        };
    }

    var apiReady = false;

    // ====== 初始化 ======
    function init() {
        injectCommentSection();
        // 健康检查：确认 API 可达后再开放功能
        fetch(apiUrl('comments') + '?select=id&limit=1', {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        }).then(function(res) {
            if (res.ok) {
                apiReady = true;
                loadComments();
                initBulletChat();
            }
        }).catch(function() {
            // API 不可达，留言区保持只读占位
            var list = document.getElementById('csCommentList');
            if (list) list.innerHTML = '<div class="cs-empty"><i class="fas fa-plug"></i><p>留言系统离线维护中，请稍后再试</p></div>';
        });

        var form = document.getElementById('commentForm');
        if (form) form.addEventListener('submit', handleSubmit);
    }

    // ====== DOM 注入 ======
    function injectCommentSection() {
        var container = document.getElementById('comment-section-mount');
        if (!container) return;

        var nickname = NameGenerator.generate();
        var seed = NameGenerator.avatarSeed(nickname);
        var avatarUrl = AvatarGenerator.draw(seed, AVATAR_SIZE);

        container.innerHTML =
            '<div class="cs-root">' +
                '<div class="cs-header">' +
                    '<h3 class="cs-title"><i class="fas fa-comments me-2" style="color:#00cc00;"></i>访客留言</h3>' +
                    '<p class="cs-subtitle">随机化名 &middot; 点击留言下方「回复」参与互动</p>' +
                '</div>' +
                '<div class="cs-form-wrap">' +
                    '<div class="cs-avatar-preview">' +
                        '<img src="' + avatarUrl + '" width="' + AVATAR_SIZE + '" height="' + AVATAR_SIZE + '" alt="头像预览" id="csAvatarPreview">' +
                        '<span class="cs-nickname-preview" id="csNickPreview">' + nickname + '</span>' +
                    '</div>' +
                    '<form id="commentForm" class="cs-form">' +
                        '<input type="hidden" name="nickname" id="csNicknameInput" value="' + nickname + '">' +
                        '<input type="hidden" name="avatar_seed" id="csSeedInput" value="' + seed + '">' +
                        '<textarea id="csContent" name="content" class="cs-textarea" placeholder="写下您的想法..." maxlength="500" required></textarea>' +
                        '<div class="cs-form-actions">' +
                            '<button type="button" id="csRefreshName" class="cs-btn-ghost" title="换个名字"><i class="fas fa-dice me-1"></i>换名字</button>' +
                            '<span class="cs-char-count"><span id="csCharCount">0</span>/500</span>' +
                            '<button type="submit" class="cs-btn-submit"><i class="fas fa-paper-plane me-1"></i>发送</button>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '<div class="cs-list" id="csCommentList"></div>' +
            '</div>';

        document.getElementById('csRefreshName').addEventListener('click', function() {
            var newNick = NameGenerator.generate();
            var newSeed = NameGenerator.avatarSeed(newNick);
            document.getElementById('csNicknameInput').value = newNick;
            document.getElementById('csSeedInput').value = newSeed;
            document.getElementById('csNickPreview').textContent = newNick;
            document.getElementById('csAvatarPreview').src = AvatarGenerator.draw(newSeed, AVATAR_SIZE);
        });

        document.getElementById('csContent').addEventListener('input', function() {
            document.getElementById('csCharCount').textContent = this.value.length;
        });
    }

    // ====== 提交主留言 ======
    function handleSubmit(e) {
        e.preventDefault();
        var btn = this.querySelector('.cs-btn-submit');
        if (btn.disabled) return;

        var nickname = document.getElementById('csNicknameInput').value;
        var seed = document.getElementById('csSeedInput').value;
        var content = document.getElementById('csContent').value.trim();
        if (!content) return;
        if (!apiReady) { alert('系统初始化中，请稍后重试'); return; }

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>发送中';

        fetch(apiUrl('comments'), {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify({
                project_slug: PROJECT_SLUG,
                nickname: nickname,
                avatar_seed: seed,
                content: content
            })
        }).then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            document.getElementById('csContent').value = '';
            document.getElementById('csCharCount').textContent = '0';
            loadComments();
            addBullet(nickname, content);
        }).catch(function(err) {
            console.error('Submit error:', err);
            alert('发送失败，请稍后重试');
        }).finally(function() {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane me-1"></i>发送';
        });
    }

    // ====== 提交回复 ======
    function submitReply(parentId, parentNick, replyContent, formEl) {
        var nickname = document.getElementById('csNicknameInput').value;
        var seed = document.getElementById('csSeedInput').value;
        var content = replyContent.trim();
        if (!content || !apiReady) return;

        formEl.querySelector('.cs-reply-send').disabled = true;

        fetch(apiUrl('comments'), {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify({
                project_slug: PROJECT_SLUG,
                nickname: nickname,
                avatar_seed: seed,
                content: content,
                parent_id: parentId,
                parent_nickname: parentNick
            })
        }).then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            loadComments();
            addBullet(nickname, '回复 ' + parentNick + '：' + content);
        }).catch(function(err) {
            console.error('Reply error:', err);
            alert('发送失败，请稍后重试');
        }).finally(function() {
            // Allow re-submit after load
        });
    }

    // ====== 加载留言列表 ======
    function loadComments() {
        var url = apiUrl('comments') +
            '?select=*' +
            '&project_slug=eq.' + encodeURIComponent(PROJECT_SLUG) +
            '&order=created_at.desc' +
            '&limit=' + COMMENT_LIMIT;

        fetch(url, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        }).then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        }).then(function(data) {
            renderComments(data || []);
        }).catch(function(err) {
            console.error('Load error:', err);
        });
    }

    function renderComments(comments) {
        var list = document.getElementById('csCommentList');
        if (!list) return;

        if (comments.length === 0) {
            list.innerHTML = '<div class="cs-empty"><i class="far fa-comment-dots"></i><p>还没有留言，来坐沙发吧</p></div>';
            return;
        }

        var html = '';
        comments.forEach(function(c) {
            var avatarUrl = AvatarGenerator.draw(c.avatar_seed, AVATAR_SIZE);
            var time = formatTime(c.created_at);
            var isReply = c.parent_id && c.parent_nickname;
            var mentionHtml = isReply
                ? '<span class="cs-reply-mention"><i class="fas fa-reply fa-flip-horizontal me-1" style="font-size:0.65rem;"></i>回复 <em>' + escapeHtml(c.parent_nickname) + '</em></span> '
                : '';

            html +=
                '<div class="cs-item' + (isReply ? ' cs-item-reply' : '') + '" data-comment-id="' + c.id + '">' +
                    '<img src="' + avatarUrl + '" width="' + AVATAR_SIZE + '" height="' + AVATAR_SIZE + '" alt="' + c.nickname + '" class="cs-avatar">' +
                    '<div class="cs-item-body">' +
                        '<div class="cs-item-header">' +
                            '<strong class="cs-item-name">' + escapeHtml(c.nickname) + '</strong>' +
                            '<time class="cs-item-time">' + time + '</time>' +
                        '</div>' +
                        '<p class="cs-item-content">' + mentionHtml + escapeHtml(c.content) + '</p>' +
                        '<button class="cs-reply-btn" data-parent-id="' + c.id + '" data-parent-nick="' + escapeHtml(c.nickname) + '"><i class="fas fa-reply fa-flip-horizontal me-1"></i>回复</button>' +
                        '<div class="cs-reply-form" style="display:none;">' +
                            '<textarea class="cs-reply-textarea" placeholder="回复 ' + escapeHtml(c.nickname) + '..." maxlength="500"></textarea>' +
                            '<div class="cs-reply-actions">' +
                                '<button class="cs-reply-cancel">取消</button>' +
                                '<button class="cs-reply-send cs-btn-submit" style="font-size:0.75rem;padding:6px 16px;">发送</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        });

        list.innerHTML = html;

        // 委托回复按钮事件
        list.querySelectorAll('.cs-reply-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var parentId = parseInt(this.getAttribute('data-parent-id'));
                var parentNick = this.getAttribute('data-parent-nick');
                var item = this.closest('.cs-item');
                var replyForm = item.querySelector('.cs-reply-form');
                var isOpen = replyForm.style.display !== 'none';

                // 关闭所有其他回复框
                list.querySelectorAll('.cs-reply-form').forEach(function(f) { f.style.display = 'none'; });

                if (!isOpen) {
                    replyForm.style.display = 'block';
                    replyForm.querySelector('.cs-reply-textarea').focus();
                }
            });
        });

        // 委托取消按钮事件
        list.querySelectorAll('.cs-reply-cancel').forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.closest('.cs-reply-form').style.display = 'none';
            });
        });

        // 委托发送按钮事件
        list.querySelectorAll('.cs-reply-send').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var item = this.closest('.cs-item');
                var parentId = parseInt(item.querySelector('.cs-reply-btn').getAttribute('data-parent-id'));
                var parentNick = item.querySelector('.cs-reply-btn').getAttribute('data-parent-nick');
                var textarea = item.querySelector('.cs-reply-textarea');
                var content = textarea.value.trim();
                if (!content) return;

                submitReply(parentId, parentNick, content, item.querySelector('.cs-reply-form'));
                item.querySelector('.cs-reply-form').style.display = 'none';
                textarea.value = '';
            });
        });
    }

    // ====== 图片弹幕 ======
    var bulletQueue = [];
    var bulletTimers = [];
    var bulletObservers = [];

    function initBulletChat() {
        var url = apiUrl('comments') +
            '?select=nickname,content' +
            '&project_slug=eq.' + encodeURIComponent(PROJECT_SLUG) +
            '&order=created_at.desc' +
            '&limit=20';

        fetch(url, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        }).then(function(res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        }).then(function(data) {
            if (data && data.length) {
                data.reverse().forEach(function(c) {
                    bulletQueue.push({ nickname: c.nickname, content: c.content });
                });
            }
            bulletQueue.forEach(function(item, i) {
                bulletTimers.push(setTimeout(function() {
                    spawnBulletOnImage(item.nickname, item.content);
                }, i * 600 + 800));
            });
        }).catch(function(err) {
            console.error('Bullet init error:', err);
        });

        setupBulletObservers();
    }

    function setupBulletObservers() {
        var imgs = document.querySelectorAll('.gtn-stream img, .gtn-row-img img');
        if (imgs.length === 0) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    clearTimeout(parseInt(entry.target.getAttribute('data-bullet-timer')));
                    var timer = setTimeout(function() {
                        spawnBulletOnElement(entry.target);
                    }, 1500 + Math.random() * 3000);
                    entry.target.setAttribute('data-bullet-timer', timer);
                } else {
                    clearTimeout(parseInt(entry.target.getAttribute('data-bullet-timer')));
                    removeBulletCanvas(entry.target);
                }
            });
        }, { threshold: 0.1 });

        imgs.forEach(function(img) { observer.observe(img); });
        bulletObservers.push(observer);
    }

    function addBullet(nickname, content) {
        bulletQueue.push({ nickname: nickname, content: content });
        spawnBulletOnImage(nickname, content);
    }

    function spawnBulletOnImage(nickname, content) {
        var imgs = document.querySelectorAll('.gtn-stream img, .gtn-row-img img');
        if (imgs.length === 0) return;
        var visible = [];
        imgs.forEach(function(img) {
            var rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) visible.push(img);
        });
        var target = visible.length ? visible[Math.floor(Math.random() * visible.length)] : imgs[Math.floor(Math.random() * imgs.length)];
        spawnBulletOnElement(target, nickname, content);
    }

    function spawnBulletOnElement(img, nickname, content) {
        if (!nickname) {
            if (bulletQueue.length === 0) return;
            var item = bulletQueue.shift();
            nickname = item.nickname;
            content = item.content;
            bulletQueue.push(item);
        }

        var canvas = img.parentElement.querySelector('.cs-bullet-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.className = 'cs-bullet-canvas';
            canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4;';
            if (getComputedStyle(img.parentElement).position === 'static') {
                img.parentElement.style.position = 'relative';
            }
            img.parentElement.appendChild(canvas);
        }

        canvas.width = img.clientWidth || img.offsetWidth || 300;
        canvas.height = img.clientHeight || img.offsetHeight || 200;
        var ctx = canvas.getContext('2d');

        var text = nickname + '：' + content;
        var fontSize = canvas.width > 400 ? 13 : 11;
        ctx.font = fontSize + 'px "Noto Sans SC", system-ui, sans-serif';
        var textWidth = ctx.measureText(text).width;
        var textHeight = fontSize + 4;

        var y = 16 + Math.random() * (canvas.height - textHeight - 24);
        var x = canvas.width;
        var speed = 0.6 + Math.random() * 0.8;

        function animate() {
            ctx.clearRect(0, y - textHeight, canvas.width, textHeight + 4);
            x -= speed;
            if (x < -textWidth) { x = canvas.width; y = 16 + Math.random() * (canvas.height - textHeight - 24); }
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.beginPath();
            ctx.roundRect(x - 6, y - textHeight + 4, textWidth + 12, textHeight, 4);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(x - 6, y - textHeight + 4, textWidth + 12, textHeight, 4);
            ctx.stroke();
            ctx.fillStyle = '#e8ecf1';
            ctx.fillText(text, x, y);
            var imgRect = img.getBoundingClientRect();
            if (imgRect.bottom < 0 || imgRect.top > window.innerHeight) { removeBulletCanvas(img); return; }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    function removeBulletCanvas(img) {
        var canvas = img.parentElement.querySelector('.cs-bullet-canvas');
        if (canvas) canvas.remove();
    }

    // ====== 工具 ======
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function formatTime(iso) {
        if (!iso) return '';
        var d = new Date(iso);
        var diff = new Date() - d;
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
