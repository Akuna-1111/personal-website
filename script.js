
// 导航栏平滑滚动和移动端菜单交互
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能（更新选择器以匹配新结构）
    document.querySelectorAll('.nav-menu a, .mobile-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // 如果是移动端，关闭下拉菜单
            const mobileDropdown = document.getElementById('mobileDropdown');
            if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                mobileDropdown.classList.remove('active');
            }

            if (targetSection) {
                // 滚动到目标区域
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 移动端菜单按钮交互
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');

    if (mobileMenuBtn && mobileDropdown) {
        const menuIcon = mobileMenuBtn.querySelector('i');

        // 打开菜单函数
        function openMenu() {
            mobileMenuBtn.classList.add('active');
            mobileDropdown.classList.add('active');

            // 等待旋转动画进行到一半时切换图标
            setTimeout(() => {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }, 150);
        }

        // 关闭菜单函数
        function closeMenu() {
            mobileMenuBtn.classList.remove('active');

            // 等待旋转复位动画进行到一半时切换图标
            setTimeout(() => {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                mobileDropdown.classList.remove('active');
            }, 150);
        }

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止事件冒泡

            if (!mobileDropdown.classList.contains('active')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        // 点击页面其他地方关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (mobileDropdown.classList.contains('active') &&
                !mobileDropdown.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // 防止下拉菜单内的点击事件冒泡
        mobileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // 标题动画（保留原有代码 - 在DOM加载后执行）
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // 观察section标题
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
});