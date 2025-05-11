document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-nav.prev');
    const nextBtn = document.querySelector('.hero-nav.next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Função para atualizar o slide ativo
    function updateSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        if (typeof updateLanguage === 'function') {
            const lang = localStorage.getItem('preferredLanguage') || 'pt';
            updateLanguage(lang);
        }
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        updateSlide(next);
    }

    // Função para ir para o slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(prev);
    }

    // Event listeners para os botões de navegação
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlide(index));
    });

    // Autoplay do slider
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Parar autoplay quando o mouse estiver sobre o slider
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        hero.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Comportamento do dropdown no mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Fechar menu ao clicar em um link
        const navLinksItems = document.querySelectorAll('.nav-links a:not(.dropdown-trigger)');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    // Botão de voltar ao topo
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
