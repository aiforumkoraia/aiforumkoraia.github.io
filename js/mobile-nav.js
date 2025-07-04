// Mobile Navigation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            toggleMobileNav();
        });
    }
    
    // Close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            closeMobileNav();
        });
    }
    
    // Overlay click to close
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function() {
            closeMobileNav();
        });
    }
    
    // Submenu toggles
    submenuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            console.log('Submenu toggle clicked'); // 디버깅용
            
            // Find the submenu - it's the next sibling of the parent <a> tag
            const parentLi = this.closest('li');
            const submenu = parentLi.querySelector('.mobile-submenu');
            
            if (!submenu) {
                console.log('No submenu found'); // 디버깅용
                return;
            }
            
            const isActive = submenu.classList.contains('active');
            console.log('Submenu active state:', isActive); // 디버깅용
            
            // Close all other submenus
            document.querySelectorAll('.mobile-submenu.active').forEach(function(activeSubmenu) {
                if (activeSubmenu !== submenu) {
                    activeSubmenu.classList.remove('active');
                    const activeToggle = activeSubmenu.parentNode.querySelector('.submenu-toggle');
                    if (activeToggle) activeToggle.classList.remove('active');
                }
            });
            
            // Toggle current submenu
            if (isActive) {
                submenu.classList.remove('active');
                this.classList.remove('active');
                console.log('Submenu closed');
            } else {
                submenu.classList.add('active');
                this.classList.add('active');
                console.log('Submenu opened');
            }
        });
    });
    
    // Also handle clicks on the main menu link (not just the toggle button)
    document.querySelectorAll('.mobile-nav > ul > li > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const submenu = this.parentNode.querySelector('.mobile-submenu');
            const toggle = this.parentNode.querySelector('.submenu-toggle');
            
            if (submenu && toggle) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = submenu.classList.contains('active');
                
                // Close all other submenus
                document.querySelectorAll('.mobile-submenu.active').forEach(function(activeSubmenu) {
                    if (activeSubmenu !== submenu) {
                        activeSubmenu.classList.remove('active');
                        const activeToggle = activeSubmenu.parentNode.querySelector('.submenu-toggle');
                        if (activeToggle) activeToggle.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                if (isActive) {
                    submenu.classList.remove('active');
                    toggle.classList.remove('active');
                } else {
                    submenu.classList.add('active');
                    toggle.classList.add('active');
                }
            }
        });
    });
    
    // Close mobile nav when clicking on a link (except parent links with submenus)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const hasSubmenu = this.parentNode.querySelector('.mobile-submenu');
            if (!hasSubmenu) {
                closeMobileNav();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    
    // Prevent body scroll when mobile nav is open
    function toggleBodyScroll(disable) {
        if (disable) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function toggleMobileNav() {
        const isActive = mobileNav.classList.contains('active');
        
        if (isActive) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }
    
    function openMobileNav() {
        hamburger.classList.add('active');
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        toggleBodyScroll(true);
        
        // Add ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
    }
    
    function closeMobileNav() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        toggleBodyScroll(false);
        
        // Close all submenus
        document.querySelectorAll('.mobile-submenu.active').forEach(function(submenu) {
            submenu.classList.remove('active');
            submenu.previousElementSibling.querySelector('.submenu-toggle').classList.remove('active');
        });
        
        // Add ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Initialize ARIA attributes
    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', '메뉴 열기');
    }
    
    if (mobileNav) {
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.setAttribute('role', 'navigation');
        mobileNav.setAttribute('aria-label', '모바일 메뉴');
    }
}); 