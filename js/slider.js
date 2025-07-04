// Slider functionality for main page

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slideButtons = document.querySelectorAll('.carousel-indicators button'); // Carousel buttons
    let currentIndex = 0;
    const slideInterval = 10000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slideButtons.length > 0) {
            slideButtons.forEach(button => button.classList.remove('active'));
            slideButtons[index].classList.add('active');
        }
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function changeSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }
    
    // Global function for onclick handlers
    window.changeSlide = changeSlide;

    // Only initialize if slides exist
    if (slides.length > 0) {
        showSlide(currentIndex);
        let intervalId = setInterval(nextSlide, slideInterval); // Store the interval id

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(intervalId); // Clear the interval
            });

            sliderContainer.addEventListener('mouseleave', () => {
                intervalId = setInterval(nextSlide, slideInterval); // Restart the interval
            });
        }
    }
}); 