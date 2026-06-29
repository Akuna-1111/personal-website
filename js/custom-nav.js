// Custom Navigation & Interaction Script
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');

    // Open/close mobile menu
    if (mobileMenuBtn && mobileDropdown) {
        const menuIcon = mobileMenuBtn.querySelector('i');

        function openMenu() {
            mobileMenuBtn.classList.add('active');
            mobileDropdown.classList.add('active');
            setTimeout(function() {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }, 150);
        }

        function closeMenu() {
            mobileMenuBtn.classList.remove('active');
            setTimeout(function() {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                mobileDropdown.classList.remove('active');
            }, 150);
        }

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!mobileDropdown.classList.contains('active')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        document.addEventListener('click', function(e) {
            if (mobileDropdown.classList.contains('active') &&
                !mobileDropdown.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        mobileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('.nav-menu a, .mobile-dropdown a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                    mobileDropdown.classList.remove('active');
                }
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            }
        });
    });

    // Logo click - go to homepage
    var personalLogo = document.querySelector('.personal-logo');
    if (personalLogo) {
        personalLogo.setAttribute('role', 'button');
        personalLogo.setAttribute('tabindex', '0');
        personalLogo.setAttribute('aria-label', '返回首页');
        function goHome() {
            if (mobileDropdown && mobileDropdown.classList.contains('active')) {
                mobileDropdown.classList.remove('active');
            }
            var path = window.location.pathname;
            var isHome = path.endsWith('index.html') || path.endsWith('/') || path === '' || path.endsWith('index.htm');
            if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = 'index.html';
            }
        }
        personalLogo.addEventListener('click', goHome);
        personalLogo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goHome();
            }
        });
        personalLogo.style.cursor = 'pointer';
    }

    // Navbar: show-on-scroll-up, hide-on-scroll-down
    var topNavbar = document.querySelector('.top-navbar');
    if (topNavbar) {
        var lastScrollY = window.scrollY || document.documentElement.scrollTop;
        var ticking = false;
        var HIDE_THRESHOLD = 300;
        function handleNavbarVisibility() {
            var scrollY = window.scrollY || document.documentElement.scrollTop;
            if (scrollY <= 0) {
                topNavbar.classList.remove('hidden');
            } else if (scrollY > HIDE_THRESHOLD && scrollY > lastScrollY) {
                topNavbar.classList.add('hidden');
            } else if (scrollY < lastScrollY) {
                topNavbar.classList.remove('hidden');
            }
            lastScrollY = scrollY;
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
        handleNavbarVisibility();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Back to top button
    var toTop = document.getElementById('return-to-top');
    if (toTop) {
        toTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Custom Mouse Cursor (with delay) ----
    if (window.innerWidth > 768) {
        var cursor = document.createElement('div');
        cursor.className = 'cb-cursor -visible';
        document.body.appendChild(cursor);

        var mouseX = 0, mouseY = 0;
        var cursorX = 0, cursorY = 0;
        var speed = 0.04; // Lower = more delay

        var rippleTimer;
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Hide ripple while moving
            cursor.classList.add('-moving');
            clearTimeout(rippleTimer);
            rippleTimer = setTimeout(function() {
                cursor.classList.remove('-moving');
            }, 1000);
        });

        // Hover effects
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('a, button, .project-card, .tools-item, .skill-tag')) {
                cursor.classList.add('-active');
            }
        });
        document.addEventListener('mouseout', function(e) {
            if (e.target.closest('a, button, .project-card, .tools-item, .skill-tag')) {
                cursor.classList.remove('-active');
            }
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.transform = 'translate(' + cursorX + 'px, ' + cursorY + 'px)';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
});
