
// 导航栏平滑滚动和移动端菜单交互
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能（更新选择器以匹配新结构）
    document.querySelectorAll('.nav-menu a, .mobile-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 只处理当前页面的锚点链接（以#开头）
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

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
            }
            // 对于指向其他页面的链接（如index.html#projects），允许默认跳转
        });
    });

    // 移动端菜单按钮交互
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');

    var openMenu, closeMenu;

    if (mobileMenuBtn && mobileDropdown) {
        const menuIcon = mobileMenuBtn.querySelector('i');

        // 打开菜单函数
        openMenu = function() {
            mobileMenuBtn.classList.add('active');
            mobileDropdown.classList.add('active');

            // 等待旋转动画进行到一半时切换图标
            setTimeout(() => {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }, 150);
        };

        // 关闭菜单函数
        closeMenu = function() {
            mobileMenuBtn.classList.remove('active');

            // 等待旋转复位动画进行到一半时切换图标
            setTimeout(() => {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                mobileDropdown.classList.remove('active');
            }, 150);
        };

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

    // 咨询按钮点击跳转到合作联系模块
    const cooperationBtn = document.querySelector('.cooperation-btn');
    if (cooperationBtn) {
        cooperationBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 左上角个人logo点击回到主页顶部
    const personalLogo = document.querySelector('.personal-logo');
    if (personalLogo) {
        personalLogo.addEventListener('click', function() {
            if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                closeMenu();
            }

            // 检查当前页面是否是主页（index.html）
            const currentPage = window.location.pathname;
            const isHomePage = currentPage.endsWith('index.html') ||
                               currentPage.endsWith('/') ||
                               currentPage === '' ||
                               currentPage.endsWith('index.htm');

            if (isHomePage) {
                // 如果已经在主页，平滑滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 如果不在主页，跳转到主页顶部
                window.location.href = 'index.html';
            }
        });

        // 添加手型光标提示可点击
        personalLogo.style.cursor = 'pointer';
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

    // 右下角按钮组 - 滚动超过300px时显示
    const backToTopBtn = document.getElementById('backToTop');
    const homeBtn = document.querySelector('.btn-home');
    if (backToTopBtn || homeBtn) {
        function checkScroll() {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const showThreshold = 300;

            if (scrollPosition > showThreshold) {
                if (backToTopBtn) backToTopBtn.classList.add('show');
                if (homeBtn) homeBtn.classList.add('show');
            } else {
                if (backToTopBtn) backToTopBtn.classList.remove('show');
                if (homeBtn) homeBtn.classList.remove('show');
            }
        }

        checkScroll();
        window.addEventListener('scroll', checkScroll);

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                const mobileDropdown = document.getElementById('mobileDropdown');
                if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                    mobileDropdown.classList.remove('active');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // 滚动时隐藏/显示顶部导航栏（超过800px时隐藏）
    const topNavbar = document.querySelector('.top-navbar');
    if (topNavbar) {
        let ticking = false;

        function handleNavbarVisibility() {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const hideThreshold = 800; // 滚动超过800px时隐藏

            if (scrollPosition > hideThreshold) {
                topNavbar.classList.add('hidden');
            } else {
                topNavbar.classList.remove('hidden');
            }
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleNavbarVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        }

        // 初始检查和滚动监听
        handleNavbarVisibility();
        window.addEventListener('scroll', onScroll);
    }

    // 滚动揭示动画（关于我页面）
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.timeline-item, .advantage-card, .edu-item, .cert-list li').forEach((el, i) => {
        el.classList.add('reveal', 'reveal-up');
        if (i % 3 === 1) el.classList.add('reveal-left');
        if (i % 3 === 2) el.classList.add('reveal-right');
        revealObserver.observe(el);
    });

    // ---- 技能进度条动画 ----
    const skillBarsEl = document.querySelector('.skills-bars');
    if (skillBarsEl) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
                        fill.style.width = fill.dataset.width + '%';
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        skillObserver.observe(skillBarsEl);
    }

    // ---- 亮点项目 Swiper 双行轮播 ----
    const projectsSwiper = document.querySelector('.projects-swiper');
    if (projectsSwiper && typeof Swiper !== 'undefined') {
        new Swiper(projectsSwiper, {
            slidesPerView: 3,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 3500,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
        });
    }

    // 图片懒加载渐入动画：监听所有图片加载完成
    document.addEventListener('load', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.classList.add('loaded');
        }
    }, true);

    // 对已缓存的图片（可能比DOMContentLoaded更早加载完成）直接显示
    document.querySelectorAll('img').forEach(function(img) {
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

});