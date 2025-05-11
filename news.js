document.addEventListener('DOMContentLoaded', () => {
    const newsSlider = document.querySelector('.news-slider');
    const newsCards = document.querySelectorAll('.news-card');
    const prevBtn = document.querySelector('.news-nav.prev');
    const nextBtn = document.querySelector('.news-nav.next');
    const dots = document.querySelectorAll('.news-dots .dot');
    
    let currentSlide = 0;
    const totalSlides = Math.ceil(newsCards.length / 3);
    
    function updateSlider() {
        const offset = currentSlide * -100;
        newsSlider.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-advance slides every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    const newsCarousel = document.querySelector('.news-carousel');
    newsCarousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    newsCarousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Initial setup
    updateSlider();
});
