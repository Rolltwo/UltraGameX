document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Comportamento do dropdown no mobile
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const content = dropdown.querySelector('.dropdown-content');
                        content.style.display = content.style.display === 'block' ? 'none' : 'block';
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
                dropdowns.forEach(dropdown => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) content.style.display = 'none';
                });
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) content.style.display = 'none';
                });
            }
        });
    }
}); 