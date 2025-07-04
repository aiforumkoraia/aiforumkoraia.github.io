// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const hideForDayBtn = document.getElementById('hideForDay');
    const closePopupBtn = document.getElementById('closePopup');
    
    // 쿠키 설정 함수
    function setCookie(name, value, days) {
        let expires = "";
        
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    
    // 쿠키 가져오기 함수
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        
        return null;
    }
    
    // 팝업 표시 여부 확인
    function checkShowPopup() {
        const popupHidden = getCookie('hidePopup');
        
        if (!popupHidden && popup) {
            popup.classList.add('show');
        }
    }
    
    // 24시간 동안 안보기 버튼 클릭
    if (hideForDayBtn) {
        hideForDayBtn.addEventListener('click', function() {
            setCookie('hidePopup', 'true', 1); // 1일 동안 쿠키 설정
            popup.classList.remove('show');
        });
    }
    
    // 닫기 버튼 클릭
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            popup.classList.remove('show');
        });
    }
    
    // 페이지 로드 시 팝업 표시 확인
    checkShowPopup();
}); 