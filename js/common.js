// Common JavaScript for all pages

// Top scroll functionality
function initTopScroll() {
    const topButton = document.querySelector('.footer_logo img:last-child');
    if (topButton) {
        topButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Ripple effect for buttons
function initRippleEffect() {
    document.querySelectorAll('.ripple-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Email copy functionality
function copyEmail() {
    const email = document.getElementById('email-text').innerText;
    navigator.clipboard.writeText(email).then(() => {
        alert('복사되었습니다.');
    }).catch(err => {
        console.error('복사 실패', err);
    });
}

// Initialize all common functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTopScroll();
    initRippleEffect();
}); 