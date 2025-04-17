document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Parallax effect for header and game cards
    const header = document.querySelector('header');
    const gameCards = document.querySelectorAll('.game-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for header
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        
        // Fade in effect for game cards
        gameCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight && cardBottom > 0) {
                const scrollPercent = (windowHeight - cardTop) / windowHeight;
                card.style.opacity = Math.min(scrollPercent, 1);
                card.style.transform = `translateY(${Math.max(0, 1 - scrollPercent) * 50}px)`;
            }
        });
    });

    // Hover effect for game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.game-info').style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.game-info').style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
